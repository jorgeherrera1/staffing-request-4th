'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    StaffingRequest = mongoose.model('StaffingRequest');

exports.getStaffingRequestByNo = function(req, res) {
    var requestNo = req.params.requestNo;

    StaffingRequest.findOne({'requestNo': requestNo}, function(error, staffingRequest) {
        if (error) {
            res.send(500);
        } else {
            res.send(staffingRequest);
        }
    });
};

exports.saveStaffingRequest = function(req, res) {
    var staffingRequest = new StaffingRequest(req.body);

    staffingRequest.save(function(error) {
        if (error) {
            res.send(500);
        } else {
            res.send(200);
        }
    });
};