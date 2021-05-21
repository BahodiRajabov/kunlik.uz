const Joi = require('joi');

const schema = (key) => Joi.object().keys({
    first_name: Joi.string().min(4)[key](),
    last_name: Joi.string().min(4)[key](),
    phone_number: Joi.string().length(13).required(),
    password: Joi.string().min(8).required(),
})

const validateSign = async (req, res, next) => {
    try {
        const validatedBody = await schema(req.typeRequired).validateAsync(
            req.body
        );

        req.body = validatedBody;

        next();

    } catch (error) {
        next(error);
    }
};

module.exports = validateSign;
