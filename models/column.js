import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for column"],
    },
   boardId: {
      type: String,
      required: [true, "Set board id"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
     cards: [{ type: Schema.Types.ObjectId, ref: "card" }]
  },
  { versionKey: false, timestamps: true },
     
);

columnSchema.post("save", handleSaveError);
columnSchema.pre("findOneAndUpdate", setUpdateSetting);
columnSchema.post("findOneAndUpdate", handleSaveError);

const Column = model("column", columnSchema);

export default Column;
