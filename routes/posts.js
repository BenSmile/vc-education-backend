const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "My first Post",
      description: "lorem ipsum",
      user : req.user
    },
  });
});

module.exports = router; 
