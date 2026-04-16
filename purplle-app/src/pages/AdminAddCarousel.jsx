import { useState } from "react";
import axios from "axios";
import "../styles/AdminAddCarousel.css";

function AdminAddCarousel() {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    if (!imageUrl) {
      alert("Please select image URL");
      return;
    }

    axios.post("https://purplleappbackend.onrender.com/carousel", {
      imageUrl,
    })
      .then(() => {
        alert("Carousel Image Added");
        setImageUrl("");
      })
      .catch(err => {
        console.log(err);
        alert("Error adding image");
      });
  };

  return (
    <div className="admin-add-carousel-container">
      <h2 className="carousel-title">Add Carousel Image</h2>

      <input
        className="carousel-input"
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button className="carousel-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default AdminAddCarousel;