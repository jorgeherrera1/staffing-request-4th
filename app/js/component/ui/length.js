'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(lengthComponent);

    // component definition
    function lengthComponent() {

        this.attributes({
            permanentSelector: '#permanent',
            monthsPartSelector: '#months',
            monthsSelector: '#months > input'
        });

        this.permanentCheckboxWasClicked = function() {
            if (this.select('permanentSelector').is(':checked')) {
                this.$node.attr('data-length', 'Permanent');
            } else {
                var months = this.select('monthsSelector').val() + ' months';
                this.$node.attr('data-length', months);
            }

            this.select('monthsPartSelector').toggleClass('invisible');
        };

        this.onlyNumbers = function(event) {
            var currentValue = event.target.value;
            event.target.value = currentValue.replace(/[^0-9\.]/g, '');
        };

        this.after('initialize', function() {
            var lengthValue = this.$node.attr('data-length');
            if (lengthValue === 'Permanent') {
                this.select('permanentSelector').prop('checked', true);
                this.select('monthsPartSelector').addClass('invisible');
            } else {
                this.select('permanentSelector').prop('checked', false);
                this.select('monthsPartSelector').removeClass('invisible');
            }

            this.on('click', {
                permanentSelector: this.permanentCheckboxWasClicked
            });

            this.on('keyup', {
                monthsSelector: this.onlyNumbers
            });
        });
    }

});