'use strict';

module.exports = {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'development',
    db: process.env.MONGOHQ_URL || 'mongodb://jherrera:jherrera@paulo.mongohq.com:10040/jherrera',
    mailHost: 'pop.4thsource.com',
    mailPort: 110,
    secret: 'ThisIsACoolStaffingRequestApp!',
    rememberMeCookieName: 'staffing_request_remember_me',
    sessionCookieName: 'staffing_request_4th_sid'
};