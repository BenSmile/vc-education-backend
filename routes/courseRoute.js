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
      res.status(200).json({ message: "Course has ben added", data });
    })
    .catch((err) => {
      res.status(400).json({ message: " Course fails to be added...", err });
    });
});

//Get All courses
router.get("/allCourses", async (req, res) => {
  try {
    const data = await Cours.find();
    res.status(200).json({ message: "All courses fetched " , data});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});



//Get All chapters by course
router.get("/:coursID/chapters", async (req, res) => {
  try {
    const coursID = req.params.coursID;
    const data = await Chapter.find({ coursID: coursID });
    res.status(200).json({ message: "All Chapters fetched " , data});
  } catch (err) {
    res.status(400).json({ message: "error", err });
  }
});

module.exports = router;
