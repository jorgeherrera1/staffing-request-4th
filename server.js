'use strict';

var express = require('express'),
    app = express();

app.listen(3000, function() {
    console.log('[%s] Listening on port: %d', 'development', 3000);
});

module.exports = app;