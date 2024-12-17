//Express Instance
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// MongoDB connection
const connectDb = require("./database");
connectDb();

// Middleware of Local and JWT Strategies for Passport
const { localStrategy, jwtStrategy } = require("./api/middleware/passport");
const passport = require("passport");
app.use(passport.initialize());

// Middlware CORS enable
const cors = require("cors");
app.use(cors());

// Middleware - JSON Body Parser
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));

passport.use(localStrategy);
passport.use(jwtStrategy);

// Middleware - Validate req body
// const { validateData } = require("./api/middleware/validation");
// app.use(validateData);

// Routes
const categoriesRouter = require("./api/categories/routes");
const ingredientsRouter = require("./api/ingredients/routes");
const recipesRouter = require("./api/recipes/routes");
const authRouter = require("./api/users/routes");

app.use("/foodiez/api/categories", categoriesRouter);
app.use("/foodiez/api/recipes", recipesRouter);
app.use("/foodiez/api/ingredients", ingredientsRouter);
app.use("/foodiez/api/auth", authRouter);

app.listen(port, () =>
  console.log(`
    Categories is accessible via on http://localhost:${port}/catogories
    Categories is accessible via on http://localhost:${port}/recipes
    Categories is accessible via on http://localhost:${port}/ingredients
    `)
);
