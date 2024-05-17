import mongoose from "mongoose";
import {
  themeOptions
} from "../constants/userConstants.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    theme: {
      type: String,
      enum: themeOptions,
      default: "dark"
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    googleId: {
      type: String,
      required: [false, "Google authorization"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

export const User = model("user", userSchema);

// import { Schema, model } from "mongoose";
// import { handleMongooseError } from "../helpers/index.js";
// import Joi from "joi";

// const userRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       match: userRegex,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     token: {
//       type: String,
//       default: "",
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// userSchema.post("save", handleMongooseError);

// const registrationSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().pattern(userRegex).required(),
//   password: Joi.string().min(6).required(),
// });

// const loginSchema = Joi.object({
//   email: Joi.string().pattern(userRegex).required(),
//   password: Joi.string().min(6).required(),
// });

// const User = model("user", userSchema);

// const schemas = {
//   loginSchema,
//   registrationSchema,
// };

// export { User, schemas };
