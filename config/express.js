'use strict';

// module dependencies
var express = require('express'),
    favicon = require('serve-favicon'),
    engines = require('consolidate'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app) {

    // view engine setup
    app.engine('html', engines.hogan);
    app.set('view engine', 'html');

    app.use(favicon(process.cwd() + '/public/img/favicon.ico'));

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

    app.use('/', require(process.cwd() + '/routes/index'));

};