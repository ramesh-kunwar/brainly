import mongoose from "mongoose";

const tagModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tag Title is required"],
      unique: [true, "Tag must be unique"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tag", tagModel);
