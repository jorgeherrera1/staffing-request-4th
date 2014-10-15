'use strict';

var express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    controllers = require(process.cwd() + '/controllers');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function issueToken(user, done) {
    var token = new Buffer(user.email).toString('base64');
    return done(null, token);
}

module.exports = function(passport) {

    router.get('/', isLoggedIn, controllers.showNewStaffingRequest);

    router.get('/login', controllers.showLogin);

    router.post('/login',
        passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: true
            }
        ),
        function(req, res, next) {
            // Issue a remember me cookie only if the option was checked
            if (!req.body.remember_me) {
                return next();
            }

            issueToken(req.user, function(err, token) {
                if (err) {
                    return next(err);
                }

                var cookieDuration = moment.duration(2, 'minutes').asMilliseconds();
                res.cookie('staffing_request_remember_me', token, {
                        path: '/',
                        httpOnly: true,
                        maxAge: cookieDuration
                    }
                );
                return next();
            });
        },
        function(req, res) {
            res.redirect('/staffing-request');
        }
    );

    router.get('/staffing-request', isLoggedIn, controllers.showNewStaffingRequest);
    router.get('/staffing-request/:requestNo', isLoggedIn, controllers.showExistingStaffingRequest);

    router.post('/staffing-request', isLoggedIn, controllers.saveStaffingRequest);
    router.post('/staffing-request/:requestNo', isLoggedIn, controllers.saveStaffingRequest);

    router.get('/suggest/lastUsedValues.json', isLoggedIn, controllers.lastUsedValues);

    return router;
};