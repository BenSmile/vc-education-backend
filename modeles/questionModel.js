const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
  chapitreID: { type: mongoose.Schema.Types.ObjectId, ref: "Chapitre" },
  description: { type: String },
  options: {type: [String]},
  response:{type:String},
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Question", questionSchema);