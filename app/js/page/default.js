'use strict';

define(

    [
        'component_data/submit_request',
        'component_ui/staffing_request_form',
        'component_ui/date_picker',
        'component_ui/multiple_choice',
        'component_ui/suggest',
        'component_ui/tags'
    ],

    function(
        SubmitRequestData,
        StaffingRequestFormUI,
        DatePickerUI,
        MultipleChoiceUI,
        SuggestUI,
        TagsUI) {

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
    }

});