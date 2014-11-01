'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('util'),
    _ = require('lodash');

var RememberMeSchema = new Schema({
    email: String,
    series: Number,
    token: Number
});

RememberMeSchema.statics.issueToken = function(email, successCb, failCb) {
    var min = 1000000000000000,
        max = 9999999999999999;

    var rememberMe = this.model('RememberMe')({
        email: email,
        series: _.random(min, max),
        token: _.random(min, max)
    });

    rememberMe.save(function(err, rememberMe) {
        if (err) {
            return failCb();
        }

        var loginCookie = util.format('%d|%d|%s', rememberMe.series, rememberMe.token, rememberMe.email),
            encodedLoginCookie = new Buffer(loginCookie).toString('base64');

        return successCb(encodedLoginCookie);
    });
};

mongoose.model('RememberMe', RememberMeSchema);