'use strict';

// module dependencies
var express = require('express'),
    favicon = require('serve-favicon'),
    engines = require('consolidate'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');

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

    // serve static content
    app.use(express.static('public'));
    app.use(favicon(process.cwd() + '/public/img/favicon.ico'));

    // parse application/json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // request validator
    app.use(expressValidator());

    app.use(cookieParser());

    // session support
    app.use(session({
        name: 'staffing-request-4th-sid', // cookie name
        saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store
        resave: true, // forces session to be saved even when unmodified
        secret: app.get('config').secret // session cookie is signed with this secret to prevent tampering
    }));

    // passport support
    require(__dirname + '/passport')(app, passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('remember-me'));
    app.use(flash());

    app.use('/', require(process.cwd() + '/routes')(passport));

};