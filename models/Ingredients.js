const { model, Schema } = require("mongoose");

const IngredientsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  recipes: { type: Schema.Types.ObjectId, ref: "Recipes" },
});

module.exports = model("Ingredients", IngredientsSchema);
