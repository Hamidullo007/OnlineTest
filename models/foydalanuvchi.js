const Joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nomi: {
        type: String,
        required: true
    },
    vaqt: {
        type: Date,
        default: Date.now
    },
    tjs: {
        type: Number
    },
    njs: {
        type: Number
    }
});

const Foydalanuvchi = mongoose.model('foydalanuvchilar', schema);

function validate(req){
    const schema = {
        nomi: Joi.string().min(3),
        vaqt: Joi.date(),
        tjs: Joi.number(),
        njs: Joi.number()
    };
     
    return Joi.validate(req, schema);
}

exports.Foydalanuvchi = Foydalanuvchi;
exports.validate = validate;