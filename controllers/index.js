'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    moment = require('moment'),
    StaffingRequest = mongoose.model('StaffingRequest');

var jsLib = '<script data-main="/js/main.js" src="js/lib.js"></script>';

exports.getIndex = function(req, res) {
    res.redirect('/login');
};

exports.showLogin = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'login'
        }
    });
};

exports.showNewStaffingRequest = function(req, res) {
    res.render('layout', {
        title: 'Staffing Request',
        partials: {
            'page': 'staffing-request'
        },
        staffingRequest: {
            requestedOn: moment().format('YYYY/MM/DD')
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
            staffingRequest: staffingRequest,
            js: jsLib
        });
    }
};

exports.saveStaffingRequest = function(req, res) {
    var staffingRequest = req.body;

    function ok() {
        res.send(200);
    }

    function save() {
        var query = { requestNo: staffingRequest.requestNo };
        var options = { upsert: true };

        StaffingRequest.findOneAndUpdate(query, staffingRequest, options, ok);
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