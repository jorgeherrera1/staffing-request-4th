'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(staffingRequestForm);

    // component definition
    function staffingRequestForm() {

        this.attributes({
            // selectors
            requestNoSelector: '#requestNo',
            requestedBySelector: '#requestedBy',
            requestedOnSelector: '#requestedOn',
            newOrPresaleSelector: '#newOrPresale .active',
            companyNameSelector: '#companyName',
            contactNameSelector: '#contactName',
            newOrBackfillSelector: '#newOrBackfill .active',
            positionNameSelector: '#positionName',
            minimumExperienceSelector: '#minimumExperience',
            locationSelector: '#location',
            travelRequiredSelector: '#travelRequired .active',
            saveSelector: '#saveRequest'
        });

        this.saveRequest = function(event) {
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
                minimumExperience: this.select('minimumExperienceSelector').val(),
                location: this.select('locationSelector').data('tags'),
                travelRequired: $.trim(this.select('travelRequiredSelector').text())
            };

            this.trigger('uiShowModal', { message: 'Saving...' });
            this.trigger('uiUserClickedSave', data);
        };

        this.redirectToStaffingRequest = function(event, staffingRequest) {
            if (window.location.pathname.match(/(\/staffing\-request\/)([0-9]+)/)) {
                this.trigger('uiHideModal');
            } else {
                window.location.pathname = '/staffing-request/' + staffingRequest.requestNo;
            }
        };

        this.after('initialize', function() {
            this.on('click', {
                'saveSelector': this.saveRequest
            });

            this.on(document, 'dataRequestSaved', this.redirectToStaffingRequest);
        });
    }

});