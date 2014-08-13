'use strict';

define(function(require) {

    /**
     * Module dependencies
     */
    var SubmitRequest = require('component_ui/submit_request');

    /**
     * Module exports
     */

    return initialize;

    /**
     * Module function
     */

    function initialize() {
        SubmitRequest.attachTo('#submitRequest');
    }

});