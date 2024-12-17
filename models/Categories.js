const { model, Schema } = require("mongoose");

const CategoriesSchema = new Schema({
  name: { type: String },
  image: { type: String },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("Categories", CategoriesSchema);
