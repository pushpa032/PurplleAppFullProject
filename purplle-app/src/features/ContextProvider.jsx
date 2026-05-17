import React, { createContext, useReducer, useEffect } from "react";
import CartReducer from "./CartReducer";
import axios from "axios";

export const CartContext = createContext();



// WISHLIST REDUCER
const WishlistReducer = (state, action) => {

  switch (action.type) {

    case "ADD_WISHLIST":

      const exist = state.find(
        item => item._id === action.product._id
      );

      if (exist) {
        return state;
      }

      return [...state, action.product];

    case "REMOVE_WISHLIST":

      return state.filter(
        item => item._id !== action.id
      );

    default:
      return state;
  }
};



const ContextProvider = ({ children }) => {

  // CART LOCAL STORAGE
  const getInitialCart = () => {

    try {

      const data = localStorage.getItem("cart");

      if (!data || data === "undefined") {
        return [];
      }

      return JSON.parse(data);

    } catch (error) {

      console.log(error);

      return [];
    }
  };



  // WISHLIST LOCAL STORAGE
  const getInitialWishlist = () => {

    try {

      const data = localStorage.getItem("wishlist");

      if (!data || data === "undefined") {
        return [];
      }

      return JSON.parse(data);

    } catch (error) {

      console.log(error);

      return [];
    }
  };



  // CART STATE
  const [cart, dispatch] = useReducer(
    CartReducer,
    [],
    getInitialCart
  );



  // WISHLIST STATE
  const [wishlist, wishlistDispatch] = useReducer(
    WishlistReducer,
    [],
    getInitialWishlist
  );



  // GET CART FROM BACKEND
  useEffect(() => {

    axios
      .get(`https://purplleappbackend.onrender.com/getCart`)
      .then((res) => {

        if (res.data && res.data.product) {

          dispatch({
            type: "SET_CART",
            payload: res.data.product,
          });
        }
      })
      .catch((err) => console.log(err));

  }, []);




  // SAVE CART
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    axios.post(
      `https://purplleappbackend.onrender.com/addCart`,
      {
        cart,
      }
    );

  }, [cart]);




  // SAVE WISHLIST
  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);




  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,

        wishlist,
        wishlistDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;