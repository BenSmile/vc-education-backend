const router = require("express").Router();
const Grade = require("../modeles/gradeModel");
const verify = require("./verifyToken");
const Cours = require("../modeles/coursModel");

/**  Grade */
//Post Grade
router.post("/insertGrade", (req, res) => {
  let grade =  new Grade({
    title: req.body.title,
  });
  grade = grade.save()
    .then((grade) => {
      res.status(200).json({ message: "Grade has ben added...", grade });
    })
    .catch((err) => {
      res.status(400).json({ message: " Grade fails to be added...", err });
    });
});
//Get All Grade
router.get("/allGrades", verify, async (req, res) => {
  try {
    const Grades = await Grade.find({});
    res.status(200).json({ message: "All Grades fetched ", Grades });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get All courses by grade
router.get("/:gradeId/courses", async (req, res) => {
  try {
    const grandeId = req.params.gradeId;
    const data = await Cours.find({ gradeID: grandeId });
    res.status(200).json({ message: "All courses fetched " , data});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});


module.exports = router;
