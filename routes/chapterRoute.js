const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const Chapter = require("../modeles/chapitreModel");
const verify = require("./verifyToken");
//Post course
router.post("/addChapter", (req, res) => {
  console.log(req.body);
  let chapter = new Chapter({
    coursID: req.body.coursID,
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    status: req.body.status,
    image: req.body.image,
  });
  chapter = chapter
    .save()
    .then((cours) => {
      res.status(200).json({ message: "Chapter has ben added...", chapter });
    })
    .catch((err) => {
      res.status(400).json({ message: " Chapter fails to be added...", err });
    });
});

//Get All courses by grade
router.get("/:coursID/chapters", async (req, res) => {
  try {
    const grandeId = req.params.gradeId;
    const allCoursesByGrade = await Cours.find({ gradeID: grandeId });
    console.log(allCoursesByGrade);
    // const Grades = await Grade.find({});
    res.status(200).json({ message: "All Grades fetched " , allCoursesByGrade});
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
