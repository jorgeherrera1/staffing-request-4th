'use strict';

module.exports = {

    index: function(req, res) {
        res.redirect('/login');
    },

    login: function(req, res) {
        res.render('layout', {
            title: 'Staffing Request',
            partials: {
                'page': 'login'
            }
        });
    }

};