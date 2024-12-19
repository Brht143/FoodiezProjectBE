const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  // image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Categories" },
  ingredientsAmount: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "Ingredients",
      },
      name: { type: String },
      amount: { type: String },
      type: { type: String },
    },
  ],
  steps: [{ step: { type: String } }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [
    {
      rate: { type: Number, default: 0 },
      report: { type: String, default: "None" },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = model("Recipes", RecipesSchema);
