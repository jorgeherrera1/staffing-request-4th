'use strict';

var indexCtrl = require(process.cwd() + '/controllers/index');

module.exports = function(app) {

    app.route('/')
        .get(indexCtrl.index);

};