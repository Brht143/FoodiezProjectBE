const express = require("express");
const app = express();
const port = 3000;

// my new code
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.listen(port, () =>
  console.log(`Express is online on http://192.168.2.108:${port}`)
);
