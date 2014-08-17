'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StaffingRequestSchema = new Schema({
    requestNo: Number,
    requestedBy: String,
    requestedOn: Date,
    newOrPresale: {
        type: String,
        enum: ['New', 'Presale']
    },
    dateNeeded: Date,
    companyName: String,
    contactName: String,
    newOrBackfill: {
        type: String,
        enum: ['New', 'Backfill']
    },
    positionName: String
});

StaffingRequestSchema.statics.nextRequestNo = function(cb) {
    this.findOne()
        .sort('-requestNo')
        .exec(function(error, staffingRequest) {
            if (error) {
                cb(error);
            } else {
                var nextRequestNo = staffingRequest === null ? 1 : staffingRequest.requestNo + 1;

                cb(error, nextRequestNo);
            }
        });
};

mongoose.model('StaffingRequest', StaffingRequestSchema);