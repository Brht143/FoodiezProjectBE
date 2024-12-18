const express = require("express");
const router = express.Router();
const passport = require("passport");

const { upload } = require("../middleware/multer");
const { createNewCategories, viewCategories } = require("./controllers");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  viewCategories
);

router.post("/", upload.single("image"), createNewCategories);

module.exports = router;
