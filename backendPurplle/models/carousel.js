const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema({
  file: String
});

module.exports = mongoose.model("Carousel", CarouselSchema);