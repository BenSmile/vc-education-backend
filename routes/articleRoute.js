const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const Chapter = require("../modeles/chapitreModel");
const Article = require("../modeles/articleModel");
const verify = require("./verifyToken");
//Post article
router.post("/addArticle", (req, res) => {
  console.log(req.body);
  let article = new Article({
    coursID: req.body.coursID,
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
      res.status(400).json({ message: " Chapter fails to be added...", err });
    });
});

router.get("/allArticles", (req, res) => {
  const data =  Cours.find()
    .then((data) => {
      res.status(200).json({ message: "Article fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

module.exports = router;
