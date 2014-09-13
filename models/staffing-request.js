'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    moment = require('moment'),
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
    positionName: String,
    location: Array,
    travelRequired: {
        type: String,
        enum: ['Possible', 'Yes', 'No']
    }
});

StaffingRequestSchema.statics.findByRequestNo = function(requestNo, cb) {
    var query = { requestNo: requestNo };

    this.findOne(query, cb);
};

StaffingRequestSchema.statics.nextRequestNo = function(cb) {
    this.findOne()
        .sort('-requestNo')
        .exec(function(error, staffingRequest) {
            var nextRequestNo = staffingRequest === null ? 1 : staffingRequest.requestNo + 1;
            cb(error, nextRequestNo);
        });
};

StaffingRequestSchema.statics.lastUsedValues = function(field, noOfValues, cb) {
    this.find()
        .limit(noOfValues)
        .sort('-requestedOn')
        .select('-_id ' + field)
        .exec(cb);
};

if (!StaffingRequestSchema.options.toObject) {
    StaffingRequestSchema.options.toObject = {};
}
StaffingRequestSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret._id;

    ret.requestedOn = moment(ret.requestedOn).format('YYYY/MM/DD');
    ret.dateNeeded = moment(ret.dateNeeded).format('YYYY/MM/DD');
};

mongoose.model('StaffingRequest', StaffingRequestSchema);