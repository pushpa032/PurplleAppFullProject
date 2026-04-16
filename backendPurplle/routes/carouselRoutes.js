const express = require("express");
const router = express.Router();
const Carousel = require("../models/carousel");

// GET all images
router.get("/", async (req, res) => {
  try {
    const data = await Carousel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json("Error fetching images");
  }
});

// ADD image using URL
router.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    let newImage;

    if (imageUrl) {
      // NEW URL
      newImage = new Carousel({ imageUrl });
    } else if (req.file) {
      newImage = new Carousel({ file: req.file.filename });
    } else {
      return res.status(400).json("Image required");
    }

    await newImage.save();

    res.json("Image added");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
module.exports = router;