'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        'component_ui': 'component/ui',
        'component_data': 'component/data'
    }
});

require(
    [
        'flight/lib/compose',
        'flight/lib/registry',
        'flight/lib/advice',
        'flight/lib/logger',
        'flight/lib/debug'
    ],

    function (compose, registry, advice, withLogging, debug) {
        debug.enable(true);
        compose.mixin(registry, [advice.withAdvice]);

        require(['page/default'], function (initializeDefault) {
            initializeDefault();
        });
    }
);