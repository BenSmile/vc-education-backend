const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  speudo: { 
    type: String,
   },
  username: { type: String },
  status: { type: Boolean, default: 0 },
  publishAt: { type: Date, default: Date.now() },
  article: [
    {
      articleID: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
