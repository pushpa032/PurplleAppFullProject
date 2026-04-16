import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/SingleProductView.css";
import Header from "../component/Header";
import { CartContext } from "../features/ContextProvider.jsx";


function SingleProduct() {
  const { dispatch } = useContext(CartContext)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`https://purplleappbackend.onrender.com/products/${id}`);
      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product)
    return <h2>Loading...</h2>;


  return (
    <>
      <Header />
      <div className="single-product-page-view">
        <div className="single-product-image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="single-product-information">
          <h2>{product.name}</h2>
          <p className="single-price">₹{product.price}</p>
          <p>{product.description}</p>
          <button className="buy-button" onClick={() => {dispatch({
            type: "Add", product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl
            },
          });
          alert("Product Added to Cart");
          }}>
            Add to Cart
        </button>
        <button className="Wishlist-Button" onClick={() => dispatch({
          type: "ADD_WISHLIST",
          products:{
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl
          }
        })}>
          Add to Wishlist
        </button>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;