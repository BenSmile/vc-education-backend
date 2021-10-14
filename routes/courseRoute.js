const router = require("express").Router();
const Cours = require("../modeles/coursModel");
const verify = require("./verifyToken");
//Post Grade
router.post("/addCourse", (req, res) => {
  console.log(req.body);
  let cours =  new Cours({
    gradeID: req.body.gradeID,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    image: req.body.image
  });
  cours = cours.save()
    .then((cours) => {
      res.status(200).json({ message: "Course has ben added...", cours });
    })
    .catch((err) => {
      res.status(400).json({ message: " Course fails to be added...", err });
    });
});

module.exports = router;

