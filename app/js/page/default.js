'use strict';

define(

    [
        'component_data/submit_request',
        'component_ui/staffing_request_form',
        'component_ui/date_picker',
        'component_ui/multiple_choice',
        'component_ui/suggest',
        'component_ui/tags',
        'component_ui/spinner',
        'component_ui/modal',
        'component_ui/length'
    ],

    function(
        SubmitRequestData,
        StaffingRequestFormUI,
        DatePickerUI,
        MultipleChoiceUI,
        SuggestUI,
        TagsUI,
        SpinnerUI,
        ModalUI,
        LengthUI) {

    return initialize;

    function initialize() {
        SuggestUI.attachTo('[data-suggest]');
        SubmitRequestData.attachTo(document);
        StaffingRequestFormUI.attachTo('.staffing-request');
        DatePickerUI.attachTo('[data-date-format]');
        MultipleChoiceUI.attachTo('.btn-group');
        TagsUI.attachTo('#location');
        TagsUI.attachTo('#requiredSkills', {
            toggleIndicator: true
        });
        SpinnerUI.attachTo('#minimumExperience');
        ModalUI.attachTo(document);
        LengthUI.attachTo('#length');
    }

});