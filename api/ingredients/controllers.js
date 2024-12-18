//DB Model and Schema
const Ingredients = require("../../models/Ingredients");

exports.createNewIngredients = async (req, res, next) => {
  try {
    let isSubRequest = req.body.isSubRequest;
    let ingredients = req.body.ingredientsData || "";
    ingredients.forEach(async (ingredient, index) => {
      let name = ingredient.toLowerCase().trim() || "";

      let newIngredient = await Ingredients.findOne({ name: name });
      if (!newIngredient)
        newIngredient = await Ingredients.create({ name: name });
      if (index === ingredients.length - 1) {
        if (isSubRequest) next();
        else res.status(201).json(ingredients);
      }
    });
  } catch (e) {
    res.status(404).json({ msg: "ingredient error" });
    console.log("Ingredient Error ", e.Message);
  }
};
