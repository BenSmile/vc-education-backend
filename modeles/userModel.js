const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  speudo: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  status: { type: Boolean, default: 0 },
  publishAt: { type: Date, default: Date.now() },
  article: [
    {
      articleID: { type: mongoose.SchemaType.types.ObjectId, ref: "article" },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
