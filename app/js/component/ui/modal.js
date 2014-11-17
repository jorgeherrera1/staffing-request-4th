'use strict';

define(['flight/lib/component'], function(defineComponent) {

    // export component constructor
    return defineComponent(modal);

    // component definition
    function modal() {

        this.showModal = function(event, opts) {
            var hourglass = this.hourglass.render(opts);
            $(hourglass).appendTo('.staffing-request').modal({
                backdrop: false,
                keyboard: false,
                show: true
            });
        };

        this.hideModal = function() {
            $('.modal').modal('hide').remove();
        };

        this.after('initialize', function() {
            var template =
                '<div class="modal fade" tabindex="-1" role="dialog">' +
                    '<div class="modal-dialog modal-sm">' +
                        '<div class="modal-content">' +
                            '<div class="modal-body">' +
                                '<i class="fa fa-spinner fa-spin"></i> {{message}}' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            this.hourglass = Hogan.compile(template);

            this.on('uiShowModal', this.showModal);
            this.on('uiHideModal', this.hideModal);
        });
    }

});