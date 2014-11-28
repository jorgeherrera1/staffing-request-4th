'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(lengthComponent);

    // component definition
    function lengthComponent() {

        this.attributes({
            permanentSelector: '#permanent'
        });

        this.permanentCheckboxWasClicked = function() {
            alert('checkbox clicked');
        };

        this.after('initialize', function() {
            this.on('click', {
                permanentSelector: this.permanentCheckboxWasClicked
            });
        });
    }

});