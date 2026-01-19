const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    media: String,
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
