'use strict';

define(function(require) {

    // import dependencies
    var defineComponent = require('flight/lib/component');

    // export component constructor
    return defineComponent(submitRequest);

    // component definition
    function submitRequest() {

        this.handleSubmit = function(event) {
            console.log('handle submit');

            event.preventDefault();
        };

        this.after('initialize', function() {
            console.log('initialize submitRequest');

            this.on('click', this.handleSubmit);
        });
    }

});