const mongoose = require("mongoose");
const coursSchema = mongoose.Schema({
  gradeID: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
  title: { type: String },
  description: { type: String },
  status: { type: Boolean, default: 0 },
  image: { type: String },
  publishAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Cours", coursSchema);
