'use strict';

var mongoose = require('mongoose'),
    config = require(__dirname + '/config');

module.exports = function(app) {

    mongoose.connect(config.db);
    require('../models/staffing-request');
    require('../models/remember-me');

    app.set('config', config);
    require(__dirname + '/express')(app);

};