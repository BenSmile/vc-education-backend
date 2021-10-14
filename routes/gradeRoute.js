const router = require("express").Router();
const Grade = require("../modeles/gradeModel");
const verify = require("./verifyToken");

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




/**** Chapitre */
//Post Grade
router.post("/insertChapitre", verify, (req, res) => {
  const body = {
    coursID: req.query.coursID,
    title: req.query.title,
    shortDescription: req.query.shortDescription,
    description: req.query.description,
    status: req.query.status,
    image: req.query.image,
    publishAt: req.query.publishAt,
  };
  Chapitre.create(body)
    .then((chapitre) => {
      res.status(200).json({ message: "Chapitre has ben added...", chapitre });
    })
    .catch((err) => {
      res.status(400).json({ message: " Chapitre fails to be added...", err });
    });
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
