const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
//Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const gradeRoute = require("./routes/gradeRoute");
const courseRoute = require("./routes/courseRoute");
const chapterRoute = require("./routes/chapterRoute");
const  articleRoute = require("./routes/articleRoute");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to db")
);

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Router Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/grades", gradeRoute);
app.use("/api/courses", courseRoute);
app.use("/api/chapters", chapterRoute);
app.use("/api/articles", articleRoute);

app.listen(3000, () => {
  console.log("Server Up and running...");
});
