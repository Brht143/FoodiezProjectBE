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

router.post(
  "/",
  createNewIngredients,
  upload.single("image"),
  createNewCategories,
  createRecipe
);

router.put("/:recipeId", editRecipe);
router.put("/like/:recipeId", likeRecipe);
router.put("/report/:recipeId", reportRecipe);
router.put("/save/:recipeId", rateRecipe);

router.delete(
  "/:recipeName",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);

module.exports = router;
