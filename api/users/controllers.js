const Users = require("../../models/Users");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../config/keys");

exports.signup = async (req, res) => {
  const { password } = req.body;
  console.log(password);
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await Users.create(req.body);
    // console.log("exports.signup -> hashedPassword", hashedPassword);
    // console.log("new", newUser);
    res.status(201).json({ mshg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "User already created" });
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  console.log(user);
  const payload = {
    id: user._id,
    name: user.name,
    exp: Date.now() + parseInt(900000), // the token will expire 15 minutes from when it's generated
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
