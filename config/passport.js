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

            var emailSender = utils.Email(mailHost, mailPort);

            function successCallback() {
                return done(null, {
                    email: email
                });
            }

            function errorCallback() {
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }

            emailSender.authenticate(email, password, successCallback, errorCallback);
        }
    ));

    passport.use(new RememberMeStrategy({
        key: app.get('config').rememberMeCookieName
    }, utils.verifyToken, utils.issueToken));

};