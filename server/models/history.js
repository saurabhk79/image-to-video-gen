const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    generation_id: {
      type: String,
      unique: true,
    },
    prompt_instructions: {
        type: String,
        default: "",
    },
    video_url: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("history", historySchema);
