'use strict';

define(

    [
        'component_data/submit_request',
        'component_ui/staffing_request_form',
        'component_ui/date_picker',
        'component_ui/multiple_choice',
        'component_ui/suggest',
        'component_ui/tags',
        'component_ui/spinner'
    ],

    function(
        SubmitRequestData,
        StaffingRequestFormUI,
        DatePickerUI,
        MultipleChoiceUI,
        SuggestUI,
        TagsUI,
        SpinnerUI) {

    return initialize;

    function initialize() {
        SuggestUI.attachTo('[data-suggest]');
        SubmitRequestData.attachTo(document);
        StaffingRequestFormUI.attachTo('form');
        DatePickerUI.attachTo('[data-date-format]');
        MultipleChoiceUI.attachTo('.btn-group');
        TagsUI.attachTo('#location');
        TagsUI.attachTo('#requiredSkills', {
            toggleIndicator: true
        });
        SpinnerUI.attachTo('#minimumExperience');
    }

});