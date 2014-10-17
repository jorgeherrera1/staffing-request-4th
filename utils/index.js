'use strict';

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

exports.issueToken = function(user, done) {
    var token = new Buffer(user.email).toString('base64');
    console.log('Generated remember-me token '+ token + ' for user ' + user.email);

    return done(null, token);
};

exports.verifyToken = function(token, done) {
    var email = new Buffer(token, 'base64').toString('ascii');
    console.log('Verified user ' + email + ' with token ' + token);

    return done(null, { email: email });
};