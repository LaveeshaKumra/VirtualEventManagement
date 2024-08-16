const Joi = require('joi');

const validateRegistration = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('participant', 'organiser')
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const validateEventDetails= (data) => {
    const schema = Joi.object({
        eventname: Joi.string().required(),
        datetime:Joi.date().required(),
        location:Joi.string().required(),
        description:Joi.string().required(),
        cost:Joi.number().min(0).required(),
        participants: Joi.array().default([]),
    })
    return schema.validate(data, { convert: true, abortEarly: false });
    return schema.validate(data);
};

module.exports = { validateRegistration, validateLogin , validateEventDetails};
