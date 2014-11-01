'use strict';

var util = require('util'),
    random = require('node-random'),
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
    var randomOptions = {
        number: 8,
        minimum: 1000,
        maximum: 9999
    };

    random.integers(randomOptions, function(err, data) {
        var rememberMe = new RememberMe({
            email: user.email,
            series: data.slice(0, 4).join(''),
            token: data.slice(4, 8).join('')
        });

        console.log('Saving remember-me cookie: ' + rememberMe);
        rememberMe.save();

        var loginCookie = util.format('%d|%d|%s', rememberMe.series, rememberMe.token, rememberMe.email);
        var encodedLoginCookie = new Buffer(loginCookie).toString('base64');

        return done(null, encodedLoginCookie);
    });
};

exports.verifyToken = function(encodedLoginCookie, done) {
    var loginCookie = new Buffer(encodedLoginCookie, 'base64').toString('ascii'),
        loginCookieParts = loginCookie.split('|');

    RememberMe.findOneAndRemove({
        series: loginCookieParts[0],
        token: loginCookieParts[1],
        email: loginCookieParts[2]
    }, function(err, result) {
        if (!result) {
            console.log('Invalid cookie: ' + loginCookie);

            return done(null, false, { message: 'Invalid cookie' });
        } else {
            console.log('Cookie valid for user: ' + result.email);

            return done(null, { email: result.email });
        }
    });
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