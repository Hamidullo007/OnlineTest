const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.MongoDB({ db: config.get('winstonDB'), level: 'error' }));
    process.on('rejectionHandled', ex => {
        throw ex;
    });

}