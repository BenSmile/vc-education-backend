const router = require("express").Router();
const User = require("../modeles/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registrerValidation, loginValidation } = require("../validations");

router.post("/register", async (req, res) => {
  // let validate the data before we make A user
  const { error } = registrerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user Exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({ user: user._id });
  } catch (err) {
    console.log("-> ", err);
    res.status(400).send(user);
  }
});

//Login

router.post("/login", async (req, res) => {
  // // let validate the data before login a user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user Exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is not valid");
  }

  //check password
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd) {
    return res.status(400).send("Password is not valid");
  }

  // Generate token
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header('auth-token', token).send(token);
  // res.status(200).send("Logged in");
});

module.exports = router;
