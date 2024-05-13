import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  iconId: Joi.string().required(),
  background: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  iconId: Joi.string(),
  background: Joi.string(),
});
