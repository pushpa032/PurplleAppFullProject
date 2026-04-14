import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/viewProduct.css";

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://purplleappbackend.onrender.com/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []); 

  return (
    <div className="add-viewProduct-container">
      <h2 className="add-viewProduct-title">View Products</h2>

      <div className="view-list">
        {products.map((product, index) => (
          <div key={index} className="view-item">
            <img
              src={`https://purplleappbackend.onrender.com/Images/${product.file}`} 
              alt={product.name}
              className="product-image"
            />
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong>{product.category}</p>
            <p><strong>Description:</strong>{product.description}</p>
          </div>
        ))}
      </div>

      <button
        className="view-viewProduct-button"
        onClick={() => navigate("/admin/AddProduct")}
      >
        Add New Product
      </button>
    </div>
  );
}

export default ViewProduct;