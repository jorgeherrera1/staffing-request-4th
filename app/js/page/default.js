'use strict';

define(function(require) {

    /**
     * Module dependencies
     */
    var SubmitRequest = require('component_data/submit_request');
    var StaffingRequestForm = require('component_ui/staffing_request_form');
    var DatePicker = require('component_ui/date_picker');

    /**
     * Module exports
     */

    return initialize;

    /**
     * Module function
     */

    function initialize() {
        SubmitRequest.attachTo(document);
        StaffingRequestForm.attachTo('form');
        DatePicker.attachTo('[data-date-format]');
    }

});