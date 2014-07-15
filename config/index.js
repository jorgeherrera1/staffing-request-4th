'use strict';

var config = require(__dirname + '/config');

module.exports = function(app) {

    app.set('config', config);
    require(__dirname + '/express')(app);

};