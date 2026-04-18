import { useState } from "react";
import axios from "axios";
import "../styles/AdminAddBanner.css";

function AdminAddBanner() {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    if (!imageUrl) {
      alert("Please select image URL");
      return;
    }

    axios.post("https://purplleappbackend.onrender.com/banner", {
      imageUrl,
    })
      .then(() => {
        alert("Banner Image Added");
        setImageUrl("");
      })
      .catch(err => {
        console.log(err);
        alert("Error adding image");
      });
  };

  return (
    <div className="admin-add-banner-container">
      <h2 className="banner-title">Add Banner Image</h2>

      <input
        className="banner-input"
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button className="banner-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default AdminAddBanner;