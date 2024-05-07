import Joi from "joi";

import {
  emailRegexp,
  nameRegexp,
  passwordRegexp,
} from "../constants/userConstants.js";

export const authUserRegisterSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(nameRegexp))
    .message(
      "Name must be between 2 and 32 characters (letters, numbers, or Cyrillic/Latin characters) without special characters"
    )
    .required(),
  email: Joi.string()
    .pattern(new RegExp(emailRegexp))
    .message("Please enter a valid email address")
    .required(),
  password: Joi.string()
    .pattern(new RegExp(passwordRegexp))
    .message(
      "Password must be between 3 and 30 characters (letters or numbers) without special characters"
    )
    .required(),
});

export const authUserUpdateSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(nameRegexp))
    .message(
      "Name must be between 2 and 32 characters (letters, numbers, or Cyrillic/Latin characters) without special characters"
    ),
  email: Joi.string()
    .pattern(new RegExp(emailRegexp))
    .message("Please enter a valid email address"),
  password: Joi.string()
    .pattern(new RegExp(passwordRegexp))
    .message(
      "Password must be between 3 and 30 characters (letters or numbers) without special characters"
    ),
}).or("name", "email", "password");

export const authUserLoginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().pattern(new RegExp(passwordRegexp)).required(),
});
