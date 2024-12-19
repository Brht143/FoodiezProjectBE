//DB Model and Schema
const Categories = require("../../models/Categories");
const Recipes = require("../../models/Categories");

exports.viewCategories = async (req, res) => {
  try {
    const authorizedUser = {
      id: req.user._id,
      name: req.user.name,
      myFavoriteecipes: req.user.myFavoriteecipes,
    };
    const allCategories = await Categories.find();
    const objRecipes = Object.assign({ allCategories }, authorizedUser);
    res.status(200).json(objRecipes);
  } catch (e) {
    res.status(500).json({ msg: "error" });
    console.log(e.message);
  }
};

exports.createNewCategories = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    let isSubRequest = req.body.isSubRequest;
    let category = req.body.category.toLowerCase().trim() || "";
    if (req.file) {
      req.body.image = `http://${req.get(
        "host"
      )}/media/${req.file.filename.trim()}`;
    }
    let image = req.body.image || "";
    let newCategory = await Categories.findOne({ name: category });
    if (!newCategory)
      newCategory = await Categories.create({ name: category, image: image });
    // in case req is to create recipe
    req.params.newCategory = newCategory;

    if (isSubRequest) next();
    else res.status(201).json(newCategory);
  } catch (e) {
    res.status(500).json({ msg: "category error" });
    console.log("category error ", e.message);
  }
};
