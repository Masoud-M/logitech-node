const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  slug_title: String,
  name: String,
  series: String,
  colors: [String],
  price: Number,
  on_sale: Boolean,
  discount: Number,
  thumbnail_url: String,
  in_stuck: Boolean,
  best_seller: Boolean,
  rating: Number,
  reviews: Number,
  description: String,
  category: String,
  gallery: Schema.Types.Mixed,
  misc: Schema.Types.Mixed,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
