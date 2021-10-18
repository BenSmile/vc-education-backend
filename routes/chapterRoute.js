const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const Chapter = require("../modeles/chapitreModel");
const Article = require("../modeles/articleModel");
const verify = require("./verifyToken");
const { chapterValidation } = require("../validations");
//Post chapter
router.post("/addChapter", (req, res) => {
  // let validate the data before we make A user
  const { error } = chapterValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let chapter = new Chapter({
    coursID: req.body.coursID,
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    status: req.body.status,
    image: req.body.image,
  });
  const data = chapter
    .save()
    .then((data) => {
      res.status(200).json({ message: "Chapter has been added", data });
    })
    .catch((err) => {
      res.status(400).json({ message: " Chapter fails to be added...", err });
    });
});

//Get chapter by ID
router.get("/:chapterId", async (req, res) => {
  try {
    const chapterId = req.params.chapterId;
    const data = await Chapter.find({ _id: chapterId });
    res.status(200).json({ message: "One chapter fetched", data });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All chapters
router.get("/", async (req, res) => {
  try {
    const data = await Chapter.find();
    res.status(200).json({ message: "All chapters fetched", data });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All articles by chapter
router.get("/:chapterID/articles", (req, res) => {
  const chapterID = req.params.chapterID;
  const data = Article.find({ chapitreID: chapterID })
    .then((data) => {
      res.status(200).json({ message: "Article fetched", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error occured", err });
    });
});

module.exports = router;
