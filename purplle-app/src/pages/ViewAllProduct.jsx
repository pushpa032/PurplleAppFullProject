import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewAllProduct.css";

function ViewAllProduct (){
    const [products, setProducts] =useState([]);
    
    useEffect(() => {
        axios.get(`https://purplleappbackend.onrender.com/products`)
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="viewProductSection">
            <h2> View All Product</h2>
            <div className="ViewProduct-row">
                {products.map((product, i) =>
                <div className="ViewProduct-card" key ={i}>

                    <img
                    src={`https://purplleappbackend.onrender.com/Images/${product.file}`}
                    alt={product.name}
                    />

                    <div className="ViewProduct-info">

                        <p className="ViewProductCategory">{product.category}</p>
                        <p className="ViewProductName">{product.name}</p>
                        <div  className="ViewProductPrice-row">
                            <span className="ViewProductPrice">₹{product.price}</span>

                        </div>
                        <p className="ViewProductDescription">{product.description}</p>
                        <p className="ViewProductRating">{product.rating}
                            <i className="fa-solid fa-star"></i>
                        </p>
                    </div>

                </div>
            )}
            </div>
        </div>
    );
}

export default ViewAllProduct;