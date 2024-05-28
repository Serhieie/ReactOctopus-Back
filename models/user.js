import mongoose from "mongoose";
import { themeOptions } from "../constants/userConstants.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    theme: {
      type: String,
      enum: themeOptions,
      default: "dark",
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
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = model("user", userSchema);
