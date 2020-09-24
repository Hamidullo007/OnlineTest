const Joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nomi: {
        type: String
    },
    beingImage: {
        type: Boolean,
        default: false
    },
    variant1: {
        type: String
    },
    variant2: {
        type: String
    },
    variant3: {
        type: String
    },
    tj: {
        type: String
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contentes.files'
    }
});

const Savol =  mongoose.model('contents', schema);

function validate(req){
    const schema = {
        nomi: Joi.string(),
        beingImage: Joi.boolean(),
        variant1: Joi.string(),
        variant2: Joi.string(),
        variant3: Joi.string(),
        tj: Joi.string(),
        imageId: Joi.string()
    }

    return Joi.validate(req, schema);
}

exports.Savol = Savol;
exports.validate = validate;