const mongoose = require("mongoose");
const articleSchema = mongoose.Schema({
  chapitreID: { type: mongoose.Schema.Types.ObjectId, ref: "Chapitre" },
  title: { type: String },
  description: { type: String },
  status: { type: Boolean, default: 0 },
  image: { type: String },
  video: { type: String },
  publishAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Article", articleSchema);
