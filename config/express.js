'use strict';

// module dependencies
var express = require('express'),
    favicon = require('serve-favicon'),
    engines = require('consolidate'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');

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
    app.use(bodyParser.urlencoded({ extended: true }));

    // request validator
    app.use(expressValidator());

    // session support
    app.use(session({
        name: 'staffing-request-4th-sid',
        saveUninitialized: true,
        resave: true,
        secret: 'ThisIsACoolStaffingRequestApp!'
    }));

    // passport support
    require(__dirname + '/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // serve static content
    app.use(express.static('public'));

    app.use('/', require(process.cwd() + '/routes')(passport));

};