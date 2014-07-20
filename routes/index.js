'use strict';

var express = require('express'),
    router = express.Router(),
    indexCtrl = require(process.cwd() + '/controllers/index');

router.get('/', indexCtrl.index);

router.get('/login', indexCtrl.login);

module.exports = router;