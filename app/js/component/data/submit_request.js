'use strict';

define(function(require) {

    // import dependencies
    var defineComponent = require('flight/lib/component');

    // export component constructor
    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.defaultAttrs({
            submitRequestEndpoint: '/staffing-request'
        });

        this.submitRequest = function(event, data) {
            console.log(data);
        };

        this.after('initialize', function() {
            this.on('uiRequestSubmitted', this.submitRequest);
        });
    }

});