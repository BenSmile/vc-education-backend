const mongoose = require("mongoose");
const responseSchema = mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  value:{type:String},
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Response", responseSchema);
