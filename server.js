'use strict';

// module dependencies
var express = require('express'),
    app = express();

// configure app
require(__dirname + '/config')(app);

// start server
app.listen(app.get('config').port, function() {
    console.log('[%s] Listening on port: %d', app.get('config').env, app.get('config').port);
});

module.exports = app;