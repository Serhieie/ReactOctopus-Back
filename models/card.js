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
      required: [true, "Set label for card"],
      enum: ["low", "medium", "high", "without"],
      default: "without",
    },
    deadline: {
      type: String,
      required: [true, "Set deadline for card"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "column",
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
