'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RememberMeSchema = new Schema({
    email: String,
    series: Number,
    token: Number
});

mongoose.model('RememberMe', RememberMeSchema);