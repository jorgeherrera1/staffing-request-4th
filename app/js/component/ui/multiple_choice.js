'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(multipleChoice);

    // component definition
    function multipleChoice() {

        this.defaultAttrs({
            // selectors
            choicesSelector: '.btn'
        });

        this.selectedValue = function() {
            return this.$node.attr('data-selected-value');
        };

        this.updateSelectedValue = function(selectedValue) {
            this.$node.attr('data-selected-value', selectedValue);
        };

        this.valueWasSelected = function(event) {
            var selectedValue = $.trim(event.target.textContent);

            this.updateSelectedValue(selectedValue);
        };

        this.after('initialize', function() {
            var selectedValue = this.selectedValue();

            if (selectedValue === '') {
                selectedValue = $.trim(this.select('choicesSelector').first().text());
                this.updateSelectedValue(selectedValue);
            }

            this.select('choicesSelector').each(function(index, choice) {
                var choiceValue = $.trim(choice.textContent);

                if (choiceValue === selectedValue) {
                    $(choice).addClass('active');
                    return false;
                }
            });

            this.on('click', this.valueWasSelected);
        });
    }

});