const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mediaUrl: String,
  expiresAt: { type: Date, default: () => Date.now() + 86400000 }
});

module.exports = mongoose.model("Story", StorySchema);
