import Joi from "joi";
import { priorityList } from "../constants/cardConstants.js";

export const createCardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string()
    .valid(...priorityList)
    .required(),
  deadline: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.string(),
});
