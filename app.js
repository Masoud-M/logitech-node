const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Product = require("./models/product");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://notadmin:37UiVr0Qh59l0lA5@cluster0.1s00v.mongodb.net/logitech?retryWrites=true&w=majority&appName=Cluster0";

const port = process.env.PORT || 8080;

mongoose
  .connect(dbURI)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes

// product routes
app.get("/", (req, res) => {
  Product.find()
    .then((result) => {
      res.render("index", { products: result, title: "All Products" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/products/:productId/:slugTitle", (req, res) => {
  const productId = req.params.productId;
  const slugTitle = req.params.slugTitle;

  Product.findById(productId)
    .then((result) => {
      res.render("details", { product: result, title: slugTitle });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Product not found" });
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
