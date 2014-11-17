'use strict';

define(['flight/lib/component'], function(defineComponent) {

    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.attributes({
            saveStaffingRequestEndpoint: '/staffing-request'
        });

        this.saveRequest = function(event, data) {
            var that = this;

            $.post(this.attr.saveStaffingRequestEndpoint, data, function(staffingRequest) {
                that.trigger('dataRequestSaved', staffingRequest);
            });
        };

        this.after('initialize', function() {
            this.on('uiUserClickedSave', this.saveRequest);
        });
    }

});