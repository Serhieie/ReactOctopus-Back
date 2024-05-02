const Joi = require('joi');

const userRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const needHelpSchema = Joi.object({
  email: Joi.string().pattern(userRegex).required(),
  message: Joi.string().required(),
});

module.exports = {
  needHelpSchema,
};
