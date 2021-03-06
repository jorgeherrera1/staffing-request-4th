'use strict';

var util = require('util'),
    _ = require('lodash'),
    POP3Client = require('poplib'),
    mongoose = require('mongoose'),
    RememberMe = mongoose.model('RememberMe');

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

exports.issueToken = function(user, done) {
    RememberMe.issueToken(user.email, successCb, failCb);

    function successCb(cookie) {
        return done(null, cookie);
    }

    function failCb() {
        return done(null, false, { message: 'Could not save cookie' });
    }
};

exports.verifyToken = function(encodedLoginCookie, done) {
    RememberMe.findAndRemoveToken(encodedLoginCookie, notFoundCb, successCb, failCb);

    function notFoundCb() {
        return done(null, false, { message: 'Invalid cookie' });
    }

    function successCb(email) {
        return done(null, { email: email });
    }

    function failCb() {
        return done(null, false, { message: 'Could not find cookie' });
    }
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