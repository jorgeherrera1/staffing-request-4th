'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(tags);

    // component definition
    function tags() {

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

            if (this.attr.toggleIndicator === true) {
                var tagsInput = this.$node.siblings('.bootstrap-tagsinput');

                this.on(tagsInput, 'click', {
                    tagSelector: this.toggleColor
                });
            }
        });
    }

});