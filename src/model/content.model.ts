import mongoose from "mongoose";
const contentTypes = ["image", "video", "article", "audio"]; // Extend as needed

const contentModel = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    type: {
      type: String,
      enum: contentTypes,
      required: [true, "Content Type is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
      requried: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentModel);
