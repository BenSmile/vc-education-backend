const mongoose = require("mongoose");
const historyView = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  viewAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("HistoryView", historyView);
