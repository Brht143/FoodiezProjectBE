const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () =>
  console.log(`Express is online on http://192.168.2.108:${port}`)
);
