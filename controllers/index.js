'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
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
        }
    });
};

exports.postStaffingRequest = function(req, res) {
    var staffingRequest = new StaffingRequest(req.body);
    staffingRequest.save();

    res.send(200);
};