import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProduct.css";


function EditProduct(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        axios.get(`https://purplleappbackend.onrender.com/products/${id}`)
        .then(res => {
            setName(res.data.name);
            setPrice(res.data.price);
            setCategory(res.data.category);
            setDescription(res.data.description);
            setRating(res.data.rating);
            setImageUrl(res.data.imageUrl)
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("rating", rating);
        formData.append("imageUrl", ImageUrl);

        if (image){
            formData.append("imageUrl", image);
        }

        await axios.put(`https://purplleappbackend.onrender.com/products/${id}`, formData);
        alert("Product Updated");
        navigate("/admin/manageProduct");
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>

            <form onSubmit={handleUpdate}>
                <input
                type="text"
                value={name}
                placeholder="Product Name"
                onChange= { (e) => setName(e.target.value)}
                />

                <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                />

                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="">Select Category</option>
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Bath and Body">Bath and Body</option>
                </select>

                <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                />

                <input
                type="number"
                value={rating}
                placeholder="Rating"
                onChange={(e) => setRating(e.target.value)}
                />

                <input
                type="imageUrl"
                value={imageUrl}
                placeholder="Add New Image URL"
                onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit">
                    Update Product
                </button>


            </form>
        </div>
    );

}

export default EditProduct;