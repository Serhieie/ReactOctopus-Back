import mongoose from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";


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

export { Board, schemas };
