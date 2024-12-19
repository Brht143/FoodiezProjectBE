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
      .populate("ingredientsAmount.ingredient", "name -_id");
    // .select("-_id");

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

  try {
    let { recipe, image, ingredientsData, steps, creator, isSubRequest } =
      req.body;
    // let creator = await User.findOne({ name: req.body.creator });
    let category = req.params.newCategory;

    console.log("image", req.file);
    // let reviews = req.body.review; //[ {"rate": 0,"report":"None" ,"user": "Hamad"}]
    let resMsg = "";

    let createdRecipe = await Recipes.findOne({ name: recipe });
    if (!createdRecipe)
      createdRecipe = await Recipes.create({
        name: recipe,
        category: category._id,
        creator: creator,
      });
    else {
      resMsg = "Recipe name already existing";
      isValid = false;
    }

    // check if recipe belongs to category else add it

    let categorized = await Categories.findOne({ recipes: createdRecipe });
    if (!categorized)
      await Categories.findOneAndUpdate(
        { name: category },
        {
          $push: { recipes: createdRecipe },
        }
      );
    else {
      resMsg = "Recipe is already categorized";
      isValid = false;
    }

    let addedToMyRecipes = await User.findOne({ Myrecipes: createdRecipe });
    if (!addedToMyRecipes)
      await User.findByIdAndUpdate(creator, {
        $push: { myRecipes: createdRecipe },
      });

    ingredientsData.forEach(async (ingredient) => {
      let selectedIngredient = await Ingredients.findOne({
        name: ingredient.toLowerCase().trim(),
      });
      await Ingredients.findOneAndUpdate(
        {
          name: ingredient.toLowerCase().trim(),
        },
        { $push: { recipes: createdRecipe } }
      );
      await Recipes.findOneAndUpdate(
        { name: recipe },
        {
          $push: {
            ingredientsAmount: {
              ingredient: selectedIngredient,
              name: ingredient.toLowerCase().trim(),
              amount: ingredient.amount,
              type: ingredient.type,
            },
          },
        }
      );
    });

    steps.forEach(async (step) => {
      await Recipes.findOneAndUpdate(
        { name: recipe },
        {
          $push: { steps: { step } },
        }
      );
    });

    // reviews.forEach(async (review) => {
    //   let reviewer = await Users.findOne({ name: review.user });
    //   await Recipes.findOneAndUpdate(
    //     { name: recipe },
    //     {
    //       $push: {
    //         reviews: {
    //           rate: review.rate,
    //           report: review.report,
    //           user: reviewer,
    //         },
    //       },
    //     }
    //   );
    // });

    res.status(201).json(`${recipe} is created successfully`);
  } catch (e) {
    console.log("recipe error", e.message);
    res.status(400).json("recipe error");
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
  let recipeId = req.params.recipeId;
  console.log(req.body);
  let review = { rate: req.body.review.rate, user: req.body.review.user };
  console.log(review);
  let foundRecipe = await Recipes.findById(recipeId).findOne({
    "reviews.user": review.user,
  });

  // console.log(foundRecipe);

  !foundRecipe
    ? await Recipes.findByIdAndUpdate(recipeId, {
        $push: { reviews: review },
      })
    : await Recipes.findByIdAndUpdate(recipeId, {
        $push: { reviews: review },
      });

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
