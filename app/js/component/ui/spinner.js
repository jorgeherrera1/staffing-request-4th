'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(spinner);

    // component definition
    function spinner() {
        this.defaultAttrs({
            // selectors
            minusButtonSelector: 'a:first-child',
            plusButtonSelector: 'a:last-child'
        });

        this.onlyNumbers = function() {
            var currentValue = this.node.value;
            this.node.value = currentValue.replace(/[^0-9\.]/g,'');
        };

        this.minusOne = function() {
            var currentValue = this.node.value;
            var newValue = Number(currentValue) - 1;

            if (newValue >= 0) {
                this.node.value = newValue;
            }
        };

        this.plusOne = function() {
            var currentValue = this.node.value;
            this.node.value = Number(currentValue) + 1;
        };

        this.after('initialize', function() {
            var buttons = this.$node.siblings('.input-group-btn');

            this.on('keyup', this.onlyNumbers);

            this.on(buttons, 'click', {
                minusButtonSelector: this.minusOne,
                plusButtonSelector: this.plusOne
            });
        });
    }

});