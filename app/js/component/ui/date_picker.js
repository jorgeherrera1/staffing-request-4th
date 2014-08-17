'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(datepicker);

    // component definition
    function datepicker() {
        this.after('initialize', function() {
            this.$node.datetimepicker({
                pickTime: false
            });
        });
    }

});