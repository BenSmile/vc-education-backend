const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const verify = require("./verifyToken");
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

//Get All courses by grade
router.get("/coursesByGrade/:gradeId", async (req, res) => {
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

module.exports = router;
