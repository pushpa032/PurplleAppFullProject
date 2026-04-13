const express = require("express");
const router = express.Router();
const Carousel = require("../models/carousel");
const upload = require("../Multer/upload"); 

// get all  the images  to add in the home page so that the image will appear in the home page.
router.get("/", async (req, res) => {
  const data = await Carousel.find();
  res.json(data);
});

// add image to show in the front page or home page so that the image will appear.
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newImage = new Carousel({
      file: req.file.filename   
    });

    await newImage.save();
    res.json("Image added");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

module.exports = router;