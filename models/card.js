import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for card"],
    },
    description: {
      type: String,
      required: [true, "Set description for card"],
    },
    priority: {
      type: String,
      required: [true, "Set priority for card"],
      enum: ["high", "medium", "low", "without"],
      default: "grey",
    },
    deadline: {
      type: String,
      required: [true, "Set deadline for card"],
    },
    columnId: {
      type: String,
      required: [true, "Set column id"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleSaveError);
cardSchema.pre("findOneAndUpdate", setUpdateSetting);
cardSchema.post("findOneAndUpdate", handleSaveError);

const Card = model("card", cardSchema);

export default Card;
