const validateData = (req, res, next) => {
  let nullMsg = "empty fileds are not allowed";

  // This middleware is to avoid null values for POST methods
  // Validate Categories Post
  if (req.method == "POST") {
    try {
      if (req.url == "/foodiez/api/categories") {
        if (!req.body.category) res.status(400).json({ msg: nullMsg });
        else next();
      }

      if (req.url === "/foodiez/api/recipes") {
        if (!req.body.category || !req.body.recipe || !req.body.ingredientsData)
          res.status(400).json({ msg: nullMsg });
        else next();
      }

      if (req.url === "/foodiez/api/ingredients") {
        if (!req.body.ingredientsData) res.status(400).json({ msg: nullMsg });
        else next();
      }
      next();
    } catch (e) {
      res.status(404).json({ msg: "Page Not Found" });
    }
  }
};

module.exports = { validateData };
