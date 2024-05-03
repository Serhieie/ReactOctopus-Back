import { Schema, model } from "mongoose";
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
      required: [true, "Set background for board"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleSaveError);
boardSchema.pre("findOneAndUpdate", setUpdateSetting);
boardSchema.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardSchema);

export default Board;
