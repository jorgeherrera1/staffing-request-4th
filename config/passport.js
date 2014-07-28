'use strict';

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    var parameters = {
        usernameField: 'email',
        passwordField: 'password'
    };

    passport.serializeUser(function(user, done) {
        console.log('Serialize: ' + user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log('Deserialize: ' + user);
        done(null, user);
    });

    passport.use(new LocalStrategy(parameters,
        function(email, password, done) {
            console.log(email);
            console.log(password);

            return done(null, {
                email: email
            });
        }
    ));

};