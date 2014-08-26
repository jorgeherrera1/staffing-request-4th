'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(suggest);

    // component definition
    function suggest() {
        this.defaultAttrs({
            name: '',
            fromData: ''
        });

        this.after('initialize', function() {
            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: 10,
                prefetch: {
                    url: this.attr.fromData,
                    filter: function(list) {
                        return $.map(list, function(value) { return { value: value}; });
                    },
                    ttl: 1000
                }
            });
            engine.initialize();

            this.$node.typeahead({
                    minLength: 1,
                    highlight: true,
                    hint: true
                },
                {
                    name: this.attr.name,
                    source: engine.ttAdapter()
                });
        });
    }

});