'use strict';

// module dependencies
var express = require('express'),
    engines = require('consolidate'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app) {

    // view engine setup
    app.engine('html', engines.hogan);
    app.set('view engine', 'html');

    // logger
    if (app.get('config').env === 'production') {
        app.use(logger());
    } else {
        app.use(logger('dev'));
    }

    // parse application/json
    app.use(bodyParser.json());

    // serve static content
    app.use(express.static('public'));

    require(process.cwd() + '/routes/index')(app);

};