const htmlInput = require('joi-html-input');
const Joi = require('joi').extend(htmlInput);

module.exports = Joi.object({
  post: Joi.object({
    title: Joi.htmlInput().allowedTags().min(1).required(),
    name: Joi.htmlInput().allowedTags().min(1).required(),
    content: Joi.htmlInput().allowedTags().min(1).required(),
  }),
});
