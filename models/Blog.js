import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please provide title"],
      maxlength: 100,
      unique: true,
    },
    description: {
      type: String,
    },
    author: String,
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: [String],
      default: [],
    },
    reading_time: {
      type: String,
      default: "0",
    },
    tags: [String],
    body: {
      type: String,
      require: [true, "Please provide content body"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
