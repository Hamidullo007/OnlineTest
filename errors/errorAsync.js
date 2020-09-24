const winston = require('winston');

module.exports = function(err, req, res, next){
    winston.error(err, "Serverda xatolik sodir bo'ldi.");
    return res.status(500).send("Serverda xatolik sodir bo'ldi.");
}