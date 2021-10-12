const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
//Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to db")
);

// Middleware
app.use(express.json());

// Router Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
  console.log("Server Up and running...");
});
