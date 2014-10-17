'use strict';

var LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    POP3Client = require("poplib"),
    utils = require(process.cwd() + '/utils');

module.exports = function(app, passport) {

    var mailHost = app.get('config').mailHost,
        mailPort = app.get('config').mailPort,
        parameters = {
            usernameField: 'email',
            passwordField: 'password'
        };

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy(parameters,
        function(email, password, done) {

            var client = new POP3Client(mailPort, mailHost, {
                tlserrs: false,
                enabletls: false,
                debug: false
            });

            client.on('error', function(err) {
                console.log('Unable to connect to Server: ' + err);

                return done(null, false, {
                    message: 'Unable to connect to server'
                });
            });

            client.on('connect', function() {
                console.log('Logging in: ' + email);

                client.login(email, password);
            });

            client.on('login', function(status, data) {
                if (status) {
                    console.log('Logged in: ' + email);

                    client.quit();
                    return done(null, {
                        email: email
                    });
                } else {
                    console.log('Invalid username or password: ' + email);

                    client.quit();
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                }
            });
        }
    ));

    passport.use(new RememberMeStrategy({ key: 'staffing_request_remember_me' }, utils.verifyToken, utils.issueToken));

};