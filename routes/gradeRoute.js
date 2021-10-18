const router = require("express").Router();
const Grade = require("../modeles/gradeModel");
const verify = require("./verifyToken");
const Cours = require("../modeles/coursModel");
const { gradeValidation } = require("../validations");

/**  Grade */
//Post Grade
router.post("/insertGrade", (req, res) => {
  const { error } = gradeValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let grade =  new Grade({
    title: req.body.title,
  });
  const data = grade.save()
    .then((data) => {
      res.status(200).json({ message: "Grade has been added", data });
    })
    .catch((err) => {
      res.status(400).json({ message: " Grade fails to be added...", err });
    });
});
//Get All Grade
router.get("/allGrades", async (req, res) => {
  try {
    const data = await Grade.find({});
    res.status(200).json({ message: "All Grades fetched ", data });
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

//Get Grade by id
router.get("/gradeById/:gradeId", async (req, res) => {
  try {
    const gradeID = req.params.gradeId;
    const data = await Grade.find({_id:gradeID});
    res.status(200).json({ message: "Grade find by id with success", data });
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
