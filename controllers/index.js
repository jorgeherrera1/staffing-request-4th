'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    moment = require('moment'),
    _ = require('lodash'),
    StaffingRequest = mongoose.model('StaffingRequest'),
    utils = require(process.cwd() + '/utils');

var jsLib = '<script data-main="/js/main.js" src="/js/lib.js"></script>';

exports.getIndex = function(req, res) {
    res.redirect('/login');
};

exports.showLogin = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'login'
        },
        message: req.flash('error')
    });
};

exports.rememberMe = function(req, res, next) {
    // Issue a remember me cookie only if the option was checked
    if (!req.body.remember_me) {
        return next();
    }

    utils.issueToken(req.user, function(err, token) {
        if (err) {
            return next(err);
        }

        var cookieDuration = moment.duration(10, 'minutes').asMilliseconds();
        res.cookie('staffing_request_remember_me', token, {
                path: '/',
                httpOnly: true,
                maxAge: cookieDuration
            }
        );
        return next();
    });
};

exports.showNewStaffingRequest = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'staffing-request'
        },
        user: {
            email: req.user.email
        }
        ,staffingRequest: {
            requestedBy: req.user.email,
            requestedOn: moment().format('YYYY/MM/DD'),
            minimumExperience: 1
        },
        js: jsLib
    });
};

exports.showExistingStaffingRequest = function(req, res) {
    StaffingRequest.findByRequestNo(req.params.requestNo, function(error, staffingRequest) {
        render(staffingRequest);
    });

    function render(staffingRequest) {
        res.render('layout', {
            title: 'Staffing Request',
            partials: {
                'page': 'staffing-request'
            },
            user: {
                email: req.user.email
            }
            ,staffingRequest: staffingRequest.toObject(),
            js: jsLib
        });
    }
};

exports.saveStaffingRequest = function(req, res) {
    var staffingRequest = req.body;

    function callback(error, staffingRequest) {
        res.send(staffingRequest);
    }

    function save() {
        var query = { requestNo: staffingRequest.requestNo };
        var options = { upsert: true };

        StaffingRequest.findOneAndUpdate(query, staffingRequest, options, callback);
    }

    if (!staffingRequest.requestNo) {
        StaffingRequest.nextRequestNo(function(error, requestNo) {
            staffingRequest.requestNo = requestNo;

            save();
        });
    } else {
        save();
    }
};

exports.lastUsedValues = function(req, res) {
    StaffingRequest.lastUsedValues(req.query.field, 10, function(error, companies) {
        res.send(_.uniq(companies, req.query.field));
    });
};

exports.logout = function(req, res) {
    // clear the remember me cookie when logging out
    res.clearCookie('staffing_request_remember_me');
    req.logout();
    res.redirect('/login');
};