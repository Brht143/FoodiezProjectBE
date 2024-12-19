const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, unique: true },
  password: String,
  myRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
  myFavoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("User", UserSchema);
