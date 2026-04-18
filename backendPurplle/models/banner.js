const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  imageUrl: String
});

module.exports = mongoose.model("Banner", BannerSchema);