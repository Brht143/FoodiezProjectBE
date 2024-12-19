const express = require("express");
const router = express.Router();

const { createNewIngredients } = require("./controllers");

router.post("/", createNewIngredients);

module.exports = router;
