'use strict';

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