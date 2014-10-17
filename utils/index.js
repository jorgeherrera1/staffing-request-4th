'use strict';

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

exports.issueToken = function(user, done) {
    var token = new Buffer(user.email).toString('base64');

    return done(null, token);
};