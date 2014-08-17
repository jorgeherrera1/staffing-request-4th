'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.defaultAttrs({
            // selectors
            requestNoSelector: '#requestNo',
            requestedBySelector: '#requestedBy',
            requestedOnSelector: '#requestedOn',
            newOrPresaleSelector: '#newOrPresale .active',
            companyNameSelector: '#companyName',
            contactNameSelector: '#contactName',
            newOrBackfillSelector: '#newOrBackfill .active',
            positionNameSelector: '#positionName',
            travelRequiredSelector: '#travelRequired .active',
            submitSelector: '#submitRequest'
        });

        this.submitRequest = function(event) {
            event.preventDefault();

            var data = {
                requestNo: this.select('requestNoSelector').text(),
                requestedBy: this.select('requestedBySelector').val(),
                requestedOn: this.select('requestedOnSelector').val(),
                newOrPresale: $.trim(this.select('newOrPresaleSelector').text()),
                companyName: this.select('companyNameSelector').val(),
                contactName: this.select('contactNameSelector').val(),
                newOrBackfill: $.trim(this.select('newOrBackfillSelector').text()),
                positionName: this.select('positionNameSelector').val(),
                travelRequired: $.trim(this.select('travelRequiredSelector').text())
            };

            this.trigger('uiRequestSubmitted', data);
        };

        this.enableSubmit = function() {
            this.select('submitSelector').prop('disabled', false);
        };

        this.disableSubmit = function() {
            this.select('submitSelector').prop('disabled', true);
        };

        this.after('initialize', function() {
            console.log('Initializing Staffing Request Form');

            this.on('click', {
                'submitSelector': this.submitRequest
            });
        });
    }

});