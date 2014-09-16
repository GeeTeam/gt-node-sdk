"use strict";

var crypto = require('crypto'),
  request = require('request');

var privateKey = '';

var md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

var validate = function (config, callback) {
  var hash = privateKey + 'geetest' + config.challenge;

  if (config.validate === md5(hash)) {
    request.post('http://api.geetest.com/validate.php', {
      form: {
        seccode: config.seccode
      }
    }, function (err, res, body) {
      callback(!err && res.statusCode === 200 && body === md5(config.seccode));
    })
  }
  else {
    callback(false)
  }
};

var bodyParser = function (req, res, next) {
  if (req.body && req.body.geetest_challenge && req.body.geetest_validate && req.body.geetest_seccode) {
    validate({
      challenge: req.body.geetest_challenge,
      validate: req.body.geetest_validate,
      seccode: req.body.geetest_seccode
    }, function (result) {
      req.geetest = result;
      next();
    })
  }
  else {
    req.geetest = false;
    next();
  }
};

module.exports = function (key) {
  privateKey = key;
  if (!key) {
    throw new Error('Private Key Required');
  }
  return {
    validate: validate,
    bodyParser: bodyParser
  }
};