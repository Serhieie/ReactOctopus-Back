const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const  boardSchema = new Schema(
  {
      owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createBoardSchema = {};

const updateBoardSchema = {}

const schemas = {
  createBoardSchema,
  updateBoardSchema,
};

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board, schemas };
