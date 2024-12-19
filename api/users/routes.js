const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controller functions
const { signup, signin } = require("./controllers");

// routes for foodiez/api/auth
router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
