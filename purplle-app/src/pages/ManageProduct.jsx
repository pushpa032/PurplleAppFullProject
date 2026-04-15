import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/ManageProduct.css";
import { useNavigate } from "react-router-dom";

function ManageProduct(){
    const [products, setProducts] = useState([]);
    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[category, setCategory] = useState("");
    const[description, setDescription] = useState("");
    const[rating, setRating] = useState("");
    const[image, setImage] = useState(null);

    const navigate = useNavigate();

    const getProducts=()=>{
        axios.get(`https://purplleappbackend.onrender.com/products`)
        .then(res =>{
            setProducts(res.data);
        })
        .catch(err => console.log(err));
    };
    useEffect(() =>{
        getProducts();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://purplleappbackend.onrender.com/products/${id}`)
            .then(() => {
                alert("Product deleted");
                getProducts();

            }
        )
        .catch(err => console.log(err));
    };


    return (
        <div className ="ManageProduct-container">
            <h2>Manage Products</h2>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key = {product._id}>
                            <td>
                                <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-img"
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.rating}</td>
                            <td>
                                <button className="edit-button" onClick={() => navigate(`/admin/editProduct/${product._id}`)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
        
    );
}
export default ManageProduct;

