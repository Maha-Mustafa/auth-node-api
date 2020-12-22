//validation
const Joi = require('@hapi/joi');
//register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};
const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

//the way we are doing like this is b/c we have multiple validations
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;