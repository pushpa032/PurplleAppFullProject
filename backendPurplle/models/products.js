const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name:String,
  price:Number,
  category:String,
  description:String,
  rating:Number,
  file:String,
});


const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;