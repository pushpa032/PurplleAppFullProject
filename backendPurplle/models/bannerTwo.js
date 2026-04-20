const mongoose = require("mongoose");

const BannerTwoSchema = new mongoose.Schema({
  imageUrl: String
});

module.exports = mongoose.model("BannerTwo", BannerTwoSchema);