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
      required: [true, "Set background for board"],
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

// import mongoose from "mongoose";
// boardSchema.post('remove', async function(next) {
//   try {
//     await mongoose.model('column').deleteMany({ boardId: this._id });
//     console.log("ID АЙДІ ЦЬОГО ОБ'ЄКТУ", this._id)
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Board = model("board", boardSchema);

export default Board;
