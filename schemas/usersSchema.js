import Joi from "joi";

import {
  emailRegexp,
  nameRegexp,
  passwordRegexp,
} from "../constants/userConstants.js";

export const authUserRegisterSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegexp)).required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().pattern(new RegExp(passwordRegexp)).required(),
});

export const authUserUpdateSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegexp)),
  email: Joi.string().pattern(new RegExp(emailRegexp)),
  password: Joi.string().pattern(new RegExp(passwordRegexp)),
}).or("name", "email", "password");

export const authUserLoginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().pattern(new RegExp(passwordRegexp)).required(),
});
