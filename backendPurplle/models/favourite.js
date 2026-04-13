const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      file: String
    }
  ]
});

module.exports = mongoose.model("Favourite", FavouriteSchema);