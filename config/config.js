'use strict';

module.exports = {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'development',
    db: process.env.MONGOHQ_URL || 'mongodb://jherrera:jherrera@paulo.mongohq.com:10040/jherrera',
    mailHost: 'pop.4thsource.com',
    mailPort: 110
};