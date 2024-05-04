import Joi from "joi";
import { labelsList } from "../constants/cardConstants.js";

export const createCardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  label: Joi.string()
    .valid(...labelsList)
    .required(),
  deadline: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  label: Joi.string().valid(...labelsList),
  deadline: Joi.string(),
});
