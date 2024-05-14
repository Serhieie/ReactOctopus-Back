import mongoose, { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for board"],
    },
    iconId: {
      type: String,
      required: [true, "Set icon for board"],
    },
    background: {
      type: String,
      required: [false, "Set background for board"], 
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    columns: [{ type: Schema.Types.ObjectId, ref: "column" }]
  },
  { versionKey: false, timestamps: true }
);


boardSchema.pre("findOneAndUpdate", setUpdateSetting);
boardSchema.post("save", handleSaveError);
boardSchema.post("findOneAndUpdate", handleSaveError);


const Board = model("board", boardSchema);

export default Board;
