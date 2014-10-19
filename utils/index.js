'use strict';

var util = require('util'),
    random = require('node-random'),
    POP3Client = require('poplib');

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

exports.issueToken = function(user, done) {
    random.strings({ number: 8, len: 8 }, function(err, data) {
        var randomStr = data.join('');
        var token = util.format('%s|%s', randomStr, user.email);
        var encodedToken = new Buffer(token).toString('base64');

        return done(null, encodedToken);
    });
};

exports.verifyToken = function(token, done) {
    var email = new Buffer(token, 'base64').toString('ascii');
    console.log('Verified user ' + email + ' with token ' + token);

    return done(null, { email: email });
};

exports.Email = function(host, port) {

    var client = new POP3Client(port, host, {
        tlserrs: false,
        enabletls: false,
        debug: false
    });

    client.on('error', function(err) {
        if (err.errno === 111) {
            console.log('Unable to connect to server');
        } else {
            console.log('Server error occurred');
        }

        console.log(err);
    });

    return {
        authenticate: function(email, password, successCallback, errorCallback) {
            client.on('connect', function() {
                console.log('Logging in: ' + email);

                client.login(email, password);
            });

            client.on('login', function(status) {
                if (status) {
                    console.log('Authentication successful: ' + email);
                    client.quit();
                    return successCallback();
                } else {
                    console.log('Invalid username or password: ' + email);
                    client.quit();
                    return errorCallback();
                }
            });
        }
    };
};