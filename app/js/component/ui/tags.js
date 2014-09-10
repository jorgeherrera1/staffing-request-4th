'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(suggest);

    // component definition
    function suggest() {

        this.defaultAttrs({
            toggleIndicator: false,
            tagSelector: '.tag'
        });

        this.toggleColor = function(event) {
            $(event.target).toggleClass('label-info');
            $(event.target).toggleClass('label-danger');
        };

        this.after('initialize', function() {
            this.$node.tagsinput();
            var tagsInput = this.$node.siblings('.bootstrap-tagsinput');

            this.on(tagsInput, 'click', {
                tagSelector: this.toggleColor
            });
        });
    }

});