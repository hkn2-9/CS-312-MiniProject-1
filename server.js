const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
