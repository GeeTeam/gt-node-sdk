"use strict";

var crypto = require('crypto'),
    request = require('request'),
    version = "0.4.0";

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

    var url = apiServer + 'register.php?gt=' + publicKey + '&sdk=Node_' + version;

    request.get(url, {timeout: 2000}, function (err, res, body) {

        if (err) {

            callback(err);

        } else {

            callback(null, body);

        }
    });
};

module.exports = function (key, id, api) {

    if (!key) {
        throw new Error('Private Key Required');
    }
    if (!id) {
        throw new Error("Public Key Required");
    }

    if (api) {

        if (api[api.length - 1] != '/') {

            throw new Error("API server must end with \"/\"");

        } else {

            apiServer = api

        }
    }

    privateKey = key;

    publicKey = id;

    return {
        validate: validate,
        register: register
    }
};