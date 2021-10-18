const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const verify = require("./verifyToken");
const Chapter = require("../modeles/chapitreModel");
const { courseValidation } = require("../validations");

//Post course
router.post("/addCourse", (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let cours = new Cours({
    gradeID: req.body.gradeID,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    image: req.body.image,
  });
  const data = cours
    .save()
    .then((data) => {
      res.status(200).json({ message: "Course has ben added", data });
    })
    .catch((err) => {
      res.status(400).json({ message: " Course fails to be added...", err });
    });
});

//Get All courses
router.get("/", async (req, res) => {
  try {
    const data = await Cours.find();
    res.status(200).json({ message: "All courses fetched ", data });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get course By Id
router.get("/:courseID", async (req, res) => {
  try {
    const courseID = req.params.courseID;
    const data = await Cours.find({ _id: courseID });
    return res.status(200).json({ message: "Course by id fetched", data });
  } catch (err) {
    res.status(400).json({ message: "error while fetching course" });
  }
});


//Get All chapters by course
router.get("/:coursID/chapters", async (req, res) => {
  try {
    const coursID = req.params.coursID;
    const data = await Chapter.find({ coursID: coursID });
    res.status(200).json({ message: "All Chapters fetched ", data });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

module.exports = router;
