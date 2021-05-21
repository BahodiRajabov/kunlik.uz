const Joi = require('joi');

const schema = Joi.object().keys({
    region_name: Joi.string().min(4).required(),
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
