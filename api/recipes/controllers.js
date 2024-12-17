//DB Model and Schema
const Recipes = require("../../models/Recipes");
const Categories = require("../../models/Categories");
const Ingredients = require("../../models/Ingredients");
const User = require("../../models/Users");
const Users = require("../../models/Users");

exports.viewRecipes = async (req, res) => {
  try {
    // DB query

    const allRecipes = await Recipes.find()
      .populate("creator", "name _id")
      .populate("category", "name -_id")
      .populate("ingredientsAmount.ingredient", "name -_id")
      .select("-_id");

    const authorizedUser = {
      id: req.user._id,
      name: req.user.name,
      myFavoriteecipes: req.user.myFavoriteecipes,
    };
    const objRecipes = Object.assign(
      { allRecipes: allRecipes },
      authorizedUser
    );

    console.log(objRecipes);

    res.status(200).json(objRecipes);
  } catch (e) {
    res.status(404).json({ msg: e.Message });
    console.log(e.Message);
  }
};

exports.createRecipe = async (req, res, next) => {
  // parse req params and body
  if (req.file) {
    req.body.image = `http://${req.get(
      "host"
    )}/media/${req.file.filename.trim()}`;
  }
  let creator = await User.findOne({ name: req.body.creator });
  let category = req.params.newCategory;
  let recipe = req.body.recipe.toLowerCase().trim();
  let image = req.body.image;
  let ingredients = req.body.ingredientsData;
  let reviews = req.body.review; //[ {"rate": 0,"report":"None" ,"user": "Hamad"}]
  let resMsg = "";
  let isValid = true;
  try {
    // check if recipe exists else create it

    let createdRecipe = await Recipes.findOne({ name: recipe });
    if (!createdRecipe)
      createdRecipe = await Recipes.create({
        name: recipe,
        category: category._id,
        creator: creator,
      });
    else {
      resMsg = "Recipe name already existing";
      isValid = flase;
    }

    // check if recipe belongs to category else add it

    let categorized = await Categories.findOne({ recipes: createdRecipe });
    if (!categorized)
      await Categories.findByIdAndUpdate(category, {
        $push: { recipes: createdRecipe },
      });
    else {
      resMsg = "Recipe is already categorized";
      isValid = flase;
    }

    let addedToMyRecipes = await User.findOne({ Myrecipes: createdRecipe });
    if (!addedToMyRecipes)
      await User.findOneAndUpdate(creator, {
        $push: { myRecipes: createdRecipe },
      });

    ingredients.forEach(async (ingredient) => {
      let selectedIngredient = await Ingredients.findOne({
        name: ingredient.name.toLowerCase().trim(),
      });
      await Ingredients.findOneAndUpdate(
        {
          name: ingredient.name.toLowerCase().trim(),
        },
        { $push: { recipes: createdRecipe } }
      );
      await Recipes.findOneAndUpdate(
        { name: recipe },
        {
          $push: {
            ingredientsAmount: {
              ingredient: selectedIngredient,
              name: ingredient.name.toLowerCase().trim(),
              amount: ingredient.amount,
              type: ingredient.type,
            },
          },
        }
      );
    });

    reviews.forEach(async (review) => {
      let reviewer = await Users.findOne({ name: review.user });
      await Recipes.findOneAndUpdate(
        { name: recipe },
        {
          $push: {
            reviews: {
              rate: review.rate,
              report: review.report,
              user: reviewer,
            },
          },
        }
      );
    });

    if (isValid) res.status(201).json(`${recipe} is created successfully`);
  } catch (e) {
    res.status(400).json({ msg: "recipe error", resMsg });
    // console.log(e.Message);
  }
};

exports.editRecipe = async (req, res) => {
  const recipeName = req.params.recipeName;
  const recipeData = req.body;
  try {
    const found = await Recipes.findOne({ name: recipeName });
    if (!found)
      return res.status(404).json({ Message: "Recipe does not exist" });
    const updated = found && (await found.updateOne(recipeData));
    return res.status(201).json(updated);
  } catch (e) {
    res.status(500).json({ msg: `error updating ${recipeName}` });
    // console.log(e.Message);
  }
};

exports.rateRecipe = async (req, res) => {
  res.json(req.params.recipeId);
};

exports.reportRecipe = async (req, res) => {
  res.json(req.params.recipeId);
};

exports.likeRecipe = async (req, res) => {
  res.json(req.params.recipeId);
};

exports.deleteRecipe = async (req, res) => {
  const recipeName = req.params.recipeName;
  console.log("recipeName ", recipeName);
  console.log("delete", req);
  try {
    const found = await Recipes.findOne({ name: recipeName });
    if (!found)
      return res.status(404).json({ Message: "Recipe does not exist" });

    const deleted = await found.deleteOne({ name: recipeName });
    return res.status(204).json({ msg: `${recipeName} is deleted` });
  } catch (e) {
    res
      .status(500)
      .json({ msg: `error executing the delete query for ${recipeName}` });
  }
};
