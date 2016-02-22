"use strict";

var crypto = require('crypto'),
    request = require('request'),
    pkg = require("./package.json");

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

            if (err) {

                callback(err);

            } else {

                callback(null, body === md5(config.seccode));

            }
        });

    } else {

        callback(null, false);

    }
};

var register = function (callback) {

    var url = apiServer + 'register.php?gt=' + publicKey + '&sdk=Node_' + pkg.version;

    request.get(url, {timeout: 2000}, function (err, res, body) {

        if (err) {

            // failback
            callback(err);

        } else {

            callback(null, md5(body + privateKey));

        }
    });
};

module.exports = function (key, id) {

    if (!key) {
        throw new Error('Private Key Required');
    }
    if (!id) {
        throw new Error("Public Key Required");
    }

    privateKey = key;

    publicKey = id;

    return {
        validate: validate,
        register: register
    }
};