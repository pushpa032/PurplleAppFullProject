import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddProductAdmin.css";

function ProductAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  /*const [file, setFile] = useState(null);*/
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !rating || !imageUrl) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("rating", rating);
    /*formData.append("file", file);*/
    formData.append("imageUrl", imageUrl);

    try {
      await axios.post(`https://purplleappbackend.onrender.com/upload`, formData);

      alert("Product Added Successfully!");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setRating("");
      /*setFile(null);*/
      setImageUrl("");



    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-title">Add Product</h2>

      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" >Select Category</option>
          <option value="Skincare">Skincare</option>
          <option value="Makeup">Makeup</option>
          <option value="Hair Care">Hair Care</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Fragrance">Fragrance</option>
          <option value="Bath and Body">Bath and Body</option>
        </select>

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="number"
          placeholder="Rating(1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        //<input
         // type="file"
         // placeholder="Choose File"
         // onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Add Image URL "
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>

      <button
        className="view-product-button"
        onClick={() => navigate("/admin/viewProduct")}
      >
        View Products
      </button>
    </div>
  );
}

export default ProductAdd;