const Users = require("../../models/Users");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../config/keys");

exports.signup = async (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    // console.log("exports.signup -> hashedPassword", hashedPassword);
    // console.log("new", newUser);
    const payload = {
      id: savedUser._id,
      name: savedUser.name,
      exp: Date.now() + parseInt(900000), // the token will expire 15 minutes from when it's generated
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "User already created" });
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  console.log(user);
  console.log(req.body);
  const payload = {
    id: user._id,
    name: user.name,
    exp: Date.now() + parseInt(900000), // the token will expire 15 minutes from when it's generated
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
