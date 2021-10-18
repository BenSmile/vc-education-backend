const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const Article = require("../modeles/articleModel");
const verify = require("./verifyToken");
const { articleValidation } = require("../validations");
//Post article
router.post("/addArticle", (req, res) => {
  const { error } = articleValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  console.log(req.body);
  let article = new Article({
    chapitreID: req.body.chapitreID,
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    status: req.body.status,
    image: req.body.image,
    video: req.body.video,
  });
  const data = article
    .save()
    .then((data) => {
      res.status(200).json({ message: "Article has been added", data });
    })
    .catch((err) => {
      res.status(400).json({ message: " Article fails to be added", err });
    });
});

// Get all articles
router.get("/", (req, res) => {
  const data =  Article.find()
    .then((data) => {
      res.status(200).json({ message: "All articles fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

// Get  article by id
router.get("/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  const data =  Article.find({_id:articleId})
    .then((data) => {
      res.status(200).json({ message: "Article fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

module.exports = router;
