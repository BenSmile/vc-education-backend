const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const verify = require("./verifyToken");
const Chapter = require("../modeles/chapitreModel");

//Post course
router.post("/addCourse", (req, res) => {
  console.log(req.body);
  let cours = new Cours({
    gradeID: req.body.gradeID,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    image: req.body.image,
  });
  cours = cours
    .save()
    .then((cours) => {
      res.status(200).json({ message: "Course has ben added...", cours });
    })
    .catch((err) => {
      res.status(400).json({ message: " Course fails to be added...", err });
    });
});

//Get All courses
router.get("/allCourses", async (req, res) => {
  try {
    const allCourses = await Cours.find();
    console.log(allCourses);
    res.status(200).json({ message: "All courses fetched " , allCourses});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All courses by grade
router.get("/coursesByGrade/:gradeId", async (req, res) => {
  try {
    const grandeId = req.params.gradeId;
    const allCoursesByGrade = await Cours.find({ gradeID: grandeId });
    console.log(allCoursesByGrade);
    // const Grades = await Grade.find({});
    res.status(200).json({ message: "All courses fetched " , allCoursesByGrade});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All chapters by course
router.get("/:coursID/chapters", async (req, res) => {
  try {
    const coursID = req.params.coursID;
    const allChaptersByCourses = await Chapter.find({ coursID: coursID });
    // const Grades = await Grade.find({});
    res.status(200).json({ message: "All Chapters fetched " , allChaptersByCourses});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

module.exports = router;
