'use strict';

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    var parameters = {
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
            return done(null, {
                email: email
            });
        }
    ));

};