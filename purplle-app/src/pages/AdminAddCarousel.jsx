import { useState } from "react";
import axios from "axios";
import "../styles/AdminAddCarousel.css";

function AdminAddCarousel() {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!file) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    axios.post("https://purplleapp-1.onrender.com/carousel", formData)
      .then(() => alert("Carousel Image Added"))
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
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="carousel-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default AdminAddCarousel;