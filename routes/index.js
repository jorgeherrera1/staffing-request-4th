'use strict';

var express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    controllers = require(process.cwd() + '/controllers'),
    utils = require(process.cwd() + '/utils');

module.exports = function(passport) {

    router.get('/', utils.isLoggedIn, controllers.showNewStaffingRequest);

    router.get('/login', controllers.showLogin);

    router.post('/login',
        passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: true
            }
        ),
        controllers.rememberMe,
        function(req, res) {
            res.redirect('/staffing-request');
        }
    );

    router.get('/staffing-request', utils.isLoggedIn, controllers.showNewStaffingRequest);
    router.get('/staffing-request/:requestNo', utils.isLoggedIn, controllers.showExistingStaffingRequest);

    router.post('/staffing-request', utils.isLoggedIn, controllers.saveStaffingRequest);
    router.post('/staffing-request/:requestNo', utils.isLoggedIn, controllers.saveStaffingRequest);

    router.get('/suggest/lastUsedValues.json', utils.isLoggedIn, controllers.lastUsedValues);

    return router;
};