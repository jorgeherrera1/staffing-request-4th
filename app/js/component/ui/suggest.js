'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(suggest);

    // component definition
    function suggest() {
        this.attributes({
            fromData: '/suggest/lastUsedValues.json',
            keepTime: 5 // TODO: change default keep time
        });

        this.after('initialize', function() {
            var that = this;
            var field = this.node.id;

            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: 10,
                prefetch: {
                    url: that.attr.fromData + '?field=' + field,
                    filter: function(list) {
                        var datums = $.map(list, function(obj) {
                            return { value: obj[field] };
                        });

                        return datums;
                    },
                    ttl: that.attr.keepTime * 1000
                }
            });
            engine.initialize();

            this.$node.typeahead({
                    minLength: 1,
                    highlight: true,
                    hint: true
                },
                {
                    name: field,
                    source: engine.ttAdapter()
                });
        });
    }

});