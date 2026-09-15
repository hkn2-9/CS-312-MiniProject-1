const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let nextID = 1;

app.get("/", (req, res) => {
  res.render("stuff", { posts });
});

app.post("/posts", (req, res) => {
  const { author, title, content } = req.body;
  const newPost = {
    id: nextID++,
    author,
    title,
    content,
    createdAt: new Date().toLocaleString(),
  };
  posts.unshift(newPost);
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("edit", { post });
});

app.post("/posts/:id/update", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  post.author = req.body.author;
  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});