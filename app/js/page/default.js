'use strict';

define(

    [
        'component_data/submit_request',
        'component_ui/staffing_request_form',
        'component_ui/date_picker',
        'component_ui/multiple_choice',
        'component_ui/suggest'
    ],

    function(
        SubmitRequestData,
        StaffingRequestFormUI,
        DatePickerUI,
        MultipleChoiceUI,
        SuggestUI) {

    return initialize;

    function initialize() {
        SubmitRequestData.attachTo(document);
        StaffingRequestFormUI.attachTo('form');
        DatePickerUI.attachTo('[data-date-format]');
        MultipleChoiceUI.attachTo('.btn-group');
        SuggestUI.attachTo('#companyName', {
            name: 'companyName',
            fromData: '/suggest/clients.json'
        });
    }

});