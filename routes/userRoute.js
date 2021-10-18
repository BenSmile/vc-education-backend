const router = require("express").Router();
const User = require("../modeles/userModel");
const History = require("../modeles/historyModel");
const Article = require("../modeles/articleModel");
const verify = require("./verifyToken");
const { recentViewValidation } = require("../validations");

//Get all users
router.get("/", (req, res) => {
  const data = User.find()
    .then((data) => {
      res.status(200).json({ message: "Users fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

//Get user by Id
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const data = User.find({ _id: userId })
    .then((data) => {
      res.status(200).json({ message: "User fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

//Add Article To Recent
router.post("/addArticleToRecent", async (req, res) => {
  const { error } = recentViewValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const articleId = req.body.articleId;
  const userId = req.body.userId;

  const article = await Article.find({ _id: articleId });
  if (!article) {
    return res.status(400).json({
      message: "Article not exists",
    });
  }
  const user = await Article.find({ _id: userId });
  if (!user) {
   return res.status(400).json({
      message: "User not exists",
    });
  }

  const history = new History({
    userId: req.body.userId,
    articleId: req.body.articleId,
  });

  const data = await history.save();
  res.status(200).json({
    message: "An view history has been added", data
  });
});

// get recently viewed articles
router.get("/:userID/recentArticles", (req, res) => {
  const userID = req.params.userID;
  const data = User.find({ _id: userID })
    .then((data) => {
      res.status(200).json({
        message: "Articles fetched",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

module.exports = router;
