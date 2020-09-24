const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect(config.get('mongodbConnect'), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>
         winston.info('MongoDB ga ulanish hosil qilindi.'));
}