const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const Chapter = require("../modeles/chapitreModel");
const verify = require("./verifyToken");
//Post chapter
router.post("/addChapter", (req, res) => {
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

//Get All chapter
router.get("/allChapters", async (req, res) => {
  try {
    const data = await Chapter.find();
    res.status(200).json({ message: "All chapters fetched" , data});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All Grade
router.get("/allChapitres", verify, async (req, res) => {
  try {
    const Chapitre = await Chapitre.find({});
    res.status(200).json({ message: "All Chapitres fetched ", Chapitre });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

module.exports = router;
