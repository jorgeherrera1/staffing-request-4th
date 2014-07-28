'use strict';

var express = require('express'),
    router = express.Router(),
    controllers = require(process.cwd() + '/controllers');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = function(passport) {

    router.get('/', controllers.getIndex);

    router.get('/login', controllers.getLogin);

    router.post('/login',
        passport.authenticate('local', {
                successRedirect: '/staffing-request',
                failureRedirect: '/login',
                failureFlash: true
            }
        )
    );

    router.get('/staffing-request', isLoggedIn, controllers.getStaffingRequest);

    return router;
};