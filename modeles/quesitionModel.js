const mongoose = require("mongoose");
const articleSchema = mongoose.Schema({
  chapitreID: { type: mongoose.SchemaType.types.ObjectId, ref: "Chapitre" },
  title: { type: String },
  description: { type: String },
  status: { type: Boolean, default: 0 },
  video: { type: String },
  publishAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Article", articleSchema);
