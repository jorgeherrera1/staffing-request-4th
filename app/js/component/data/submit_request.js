'use strict';

define(['flight/lib/component'], function(defineComponent) {

    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.attributes({
            submitRequestEndpoint: '/staffing-request'
        });

        this.submitRequest = function(event, data) {
            var that = this;

            $.post('/staffing-request', data, function(staffingRequest) {
                that.trigger('dataRequestSaved', staffingRequest);
            });
        };

        this.after('initialize', function() {
            this.on('uiRequestSubmitted', this.submitRequest);
        });
    }

});