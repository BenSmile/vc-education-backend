const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use((req, resp, next) => {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  resp.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,auth-token');
  next();
});

//Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/posts");
const gradeRoute = require("./routes/gradeRoute");
const courseRoute = require("./routes/courseRoute");
const chapterRoute = require("./routes/chapterRoute");
const  articleRoute = require("./routes/articleRoute");

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
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/grades", gradeRoute);
app.use("/api/courses", courseRoute);
app.use("/api/chapters", chapterRoute);
app.use("/api/articles", articleRoute);

app.listen(PORT, () => {
  console.log(`Server Up and running on ${PORT}...`);
});
