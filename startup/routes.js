const errorAsync = require('../errors/errorAsync');
const foydalanuvchilarRoute = require('../routes/foydalanuvchilar');
const savollarRoute = require('../routes/savollar');
const asosiyRoute = require('../routes/asosiy');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');

module.exports = function (app) {
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use('/api/foydalanuvchilar', foydalanuvchilarRoute);
    app.use('/api/savollar', savollarRoute);  ///////////////////////////////////////////// url almashritiladi
    app.use('/', asosiyRoute);
    app.use(errorAsync);

}