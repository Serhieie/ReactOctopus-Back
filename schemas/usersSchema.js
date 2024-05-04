import Joi from "joi";

import { emailRegexp, passwordRegexp } from "../constants/userConstants.js";

export const authUserSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().pattern(new RegExp(passwordRegexp)).required(),
});

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const findVerifyTokenUserSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
}).messages({
  "any.required": "missing required field email",
});
