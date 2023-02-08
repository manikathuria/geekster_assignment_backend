const joi = require('joi');

exports.getRestaurantsReq = joi.object({
    sw: joi.object().required(),
    ne: joi.object().required()
})