import React, { useContext } from "react";
import { CartContext } from "../features/ContextProvider";
import Header from "../component/Header";
import "../styles/Wishlist.css";

function Wishlist() {

  const {
    wishlist,
    wishlistDispatch
  } = useContext(CartContext);

  return (
    <>
      <Header />

      <div className="wishlist-page">

        <h2>My Wishlist</h2>

        {
          wishlist.length === 0 ? (
            <p>No Wishlist Items</p>
          ) : (
            <div className="wishlist-container">

              {
                wishlist.map((item) => (

                  <div
                    className="wishlist-card"
                    key={item._id}
                  >

                    <img
                      src={item.imageUrl}
                      alt={item.name}
                    />

                    <h3>{item.name}</h3>

                    <p>₹{item.price}</p>

                    <button
                      onClick={() =>
                        wishlistDispatch({
                          type: "REMOVE_WISHLIST",
                          id: item._id,
                        })
                      }
                    >
                      Remove
                    </button>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>
    </>
  );
}

export default Wishlist;