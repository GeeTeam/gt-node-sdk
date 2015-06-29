"use strict";

var crypto = require('crypto'),
  request = require('request'),
  pkg = require('./package.json');

var privateKey = '', publicKey = '';

var apiServer = 'http://api.geetest.com/';

var md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

var validate = function (config, callback) {
  var hash = privateKey + 'geetest' + config.challenge;

  if (config.validate === md5(hash)) {
    request.post(apiServer + 'validate.php', {
      form: {
        seccode: config.seccode
      }
    }, function (err, res, body) {
      if(err) return callback(err);
      callback(null, body === md5(config.seccode));
    })
  }
  else {
    callback(null, false)
  }
};

var register = function (callback) {
  if (!publicKey) {
    throw new Error('You must init with public key as second param to use register api');
  }
  request.get(apiServer + 'register.php?gt=' + publicKey + '&sdk=Node_' + pkg.version, {
    timeout: 2000
  }, function (err, res, body) {
      if(err) return callback(err);
      callback(null, body);
    })
};

var bodyParser = function (req, res, next) {
  if (req.body && req.body.geetest_challenge && req.body.geetest_validate && req.body.geetest_seccode) {
    validate({
      challenge: req.body.geetest_challenge,
      validate: req.body.geetest_validate,
      seccode: req.body.geetest_seccode
    }, function (err, result) {
      if(err) return next(err);
      req.geetest = result;
      next();
    })
  }
  else {
    next();
  }
};

module.exports = function (key, id, api) {
  privateKey = key;
  if (id) {
    publicKey = id;
  }
  if (!key) {
    throw new Error('Private Key Required');
  }
  if (!id) {
    console.log('Please pass your public key as the second param to use register API')
  }
  if (api) {
    if (api[api.length - 1] != '/') {
      console.log("API server must end with \'/\'");
    }
    else {
      apiServer = api
    }
  }
  return {
    validate: validate,
    bodyParser: bodyParser,
    register: register
  }
};