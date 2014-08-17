'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    moment = require('moment'),
    StaffingRequest = mongoose.model('StaffingRequest');

exports.getIndex = function(req, res) {
    res.redirect('/login');
};

exports.getLogin = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'login'
        }
    });
};

exports.getStaffingRequest = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'staffing-request'
        },
        requestedOn: moment().format('YYYY/MM/DD'),
        js: '<script data-main="js/main.js" src="js/lib.js"></script>'
    });
};

exports.postStaffingRequest = function(req, res) {
    var staffingRequest = new StaffingRequest(req.body);
    staffingRequest.save();

    res.send(200);
};