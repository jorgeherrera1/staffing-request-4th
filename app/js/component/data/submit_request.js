'use strict';

define(['flight/lib/component'], function(defineComponent) {

    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.defaultAttrs({
            submitRequestEndpoint: '/staffing-request'
        });

        this.submitRequest = function(event, data) {
            console.log(data);

            $.post('/staffing-request', data);
        };

        this.after('initialize', function() {
            this.on('uiRequestSubmitted', this.submitRequest);
        });
    }

});