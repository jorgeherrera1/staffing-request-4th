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

RememberMeSchema.statics.findAndRemoveToken = function(encodedLoginCookie, notFoundCb, successCb, failCb) {
    var loginCookie = new Buffer(encodedLoginCookie, 'base64').toString('ascii'),
        loginCookieParts = loginCookie.split('|'),
        rememberMe = {
            series: loginCookieParts[0],
            token: loginCookieParts[1],
            email: loginCookieParts[2]
        };

    this.findOneAndRemove(rememberMe, function(err, result) {
        if (err) {
            return failCb();
        }

        if (!result) {
            return notFoundCb();
        } else {
            return successCb(result.email);
        }
    });
};

mongoose.model('RememberMe', RememberMeSchema);