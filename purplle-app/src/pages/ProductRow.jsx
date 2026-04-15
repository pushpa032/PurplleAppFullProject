import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProductRow.css";
import { useNavigate } from "react-router-dom";

/*import maybelline from "../assets/maybelline.jpg";
import goodvibes from "../assets/goodvibes.jpg";
import alps from "../assets/alps.jpg";
import mamaearth from "../assets/mamaearth.jpg";

const products = [
  {
    brand: "Maybelline",
    name: "New York The Colossal 2x Volume Waterproof Mascara - Black (10 ml)",
    price: 294,
    save: "₹205 (41% off)",
    rating: 4.3,
    image: maybelline,
  },
  {
    brand: "Good Vibes",
    name: "Ubtan Super Light Gel Moisturiser - 200 gm",
    price: 225,
    save: "₹75 (25% off)",
    rating: 4.2,
    image: goodvibes,
  },
  {
    brand: "Alps Goodness",
    name: "Flaxseed Gel (300 ml)",
    price: 228,
    save: "₹37 (14% off)",
    rating: 4.4,
    image: alps,
  },
  {
    brand: "Mamaearth",
    name: "Onion Hair Oil with Redensyl - 150 ml",
    price: 353,
    save: "₹66 (16% off)",
    rating: 4.2,
    image: mamaearth,
  },
];*/

function ProductRow() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    <div className="section">
      <h2>HANDPICKED FOR YOU</h2>
      <p className="view-all"
      onClick={() => navigate("/view-all")}>
        View All <i className="fa-solid fa-arrow-right"></i>
      </p>
      <div className="product-row">
        {products.map((product, i) => (
          <div className="product-card" key={i}>

            <img 
            src={product.imageUrl}
            alt={product.name}
            onClick={() => navigate(`/single-product-view/${product._id}`)} 
            />

            <div className="product-info">

              <p className="category">{product.category}</p>
              <p className="name">{product.name}</p>
              <div className="price-row">
                <span className="price">₹{product.price}</span>
              </div>
              <p className="description">{product.description}</p>
              <p className="rating">{product.rating}
                <i className="fa-solid fa-star"></i>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRow;