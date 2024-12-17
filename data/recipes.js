const { categories } = require("./categories");

const ingredients = [
  [
    { name: "Eggs", amount: 2, type: "qty" },
    { name: "Tomato", amount: 50, type: "g" },
    { name: "Feta Cheese", amount: 30, type: "g" },
    { name: "Olive Oil", amount: 1, type: "tsp" },
    { name: "Salt", amount: 1, type: "g" },
    { name: "Pepper", amount: 1, type: "g" },
  ],
  [
    { name: "Whole Grain Bread", amount: 2, type: "slices" },
    { name: "Chicken Breast", amount: 50, type: "g" },
    { name: "Cheddar Cheese", amount: 30, type: "g" },
    { name: "Spinach", amount: 20, type: "g" },
  ],
  [
    { name: "Salmon Fillet", amount: 150, type: "g" },
    { name: "Whole Grain Bun", amount: 1, type: "qty" },
    { name: "Lettuce", amount: 1, type: "qty" },
    { name: "Tomato", amount: 1, type: "slice" },
    { name: "Onion", amount: 1, type: "slice" },
    { name: "Avocado", amount: 1, type: "slice" },
  ],
];

exports.recipes = [
  {
    id: 1,
    name: "Cheese and Tomato Omelette",
    catogory: "breakfast",
    ingredients: ingredients[0],
    steps: ["step 1 ", "step 2"],
  },
  {
    id: 2,
    name: "Chicken and Cheese Sandwich",
    catogory: "Chicken",
    ingredients: ingredients[2],
    steps: ["step 1 ", "step 2"],
  },
  {
    id: 3,
    name: "Salmon Burger",
    catogory: "seafood",
    ingredients: ingredients[3],
    steps: ["step 1 ", "step 2"],
  },
];
