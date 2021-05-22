const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().min(4).required(),
    descripton: Joi.string().min(8).required(),
    region_id: Joi.number().integer().required(),
    service_id: Joi.number().integer().required(),
    jbt_type: Joi.string().min(2).required(),
    price: Joi.number().integer().required(),
    owner_id: Joi.number().integer().required()    
})

const validate = async (req, res, next) => {
    try {
        const validatedBody = await schema.validateAsync(
            req.body
        );

        req.body = validatedBody;

        next();

    } catch (error) {
        next(error);
    }
};

module.exports = validate;
