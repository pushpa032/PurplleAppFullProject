const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema({
  imageUrl: String
});

module.exports = mongoose.model("Carousel", CarouselSchema);