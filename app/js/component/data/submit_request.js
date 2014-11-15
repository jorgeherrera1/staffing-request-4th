'use strict';

define(['flight/lib/component'], function(defineComponent) {

    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.attributes({
            submitRequestEndpoint: '/staffing-request'
        });

        this.saveRequest = function(event, data) {
            var that = this;

            $.post('/staffing-request', data, function(staffingRequest) {
                that.trigger('dataRequestSaved', staffingRequest);
            });
        };

        this.after('initialize', function() {
            this.on('uiRequestSaved', this.saveRequest);
        });
    }

});