const express = require("express");
const router = express.Router();
const passport = require("passport");

const { upload } = require("../middleware/multer");

const {
  viewRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  followRecipeCreator,
  rateRecipe,
  reportRecipe,
  likeRecipe,
  //   filterMyRecipes,
  //   filterOutRecipes
} = require("./controllers");
const { createNewCategories } = require("../categories/controllers");
const { createNewIngredients } = require("../ingredients/controllers");

router.get("/", passport.authenticate("jwt", { session: false }), viewRecipes);

router.post("/", createNewIngredients, createNewCategories, createRecipe);
// upload.single("image"),

router.put("/:recipeId", editRecipe);
router.put("/:recipeId", rateRecipe);
router.put("/:recipeId", reportRecipe);
router.put("/:recipeId", likeRecipe);

router.delete(
  "/:recipeName",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);

module.exports = router;
