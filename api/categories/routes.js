const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer");
const { createNewCategories, viewCategories } = require("./controllers");

router.get("/", viewCategories);

router.post("/", upload.single("image"), createNewCategories);

module.exports = router;
