const Joi = require('joi');

// Schema for the registration request data
const registerSchema = Joi.object({
    username: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{5,30}$/)).required().messages({
        'string.pattern.base' : 'The username must be an alphanumeric string with a minimum length of 5 and a maximum length of 30'
    }),
    password: Joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,128}$/)).required().messages({
        'string.pattern.base' : 'The password must have at least 6 characters, contain at least one uppercase letter,' + 
                                ' at least one lowercase letter, and at least one digit'
    }),
});

module.exports = { registerSchema };

// TODO: as the app grows and there are many request per domain create a separate file for each domain/model