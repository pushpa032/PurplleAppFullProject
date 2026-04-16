import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from './CartReducer';
import axios from "axios";

export const CartContext = createContext();

const ContextProvider = ({ children }) => {

  const getInitialCart = () => {
    try {
      const data = localStorage.getItem("cart");
      if (!data || data === "undefined") {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  };

  const [cart, dispatch] = useReducer(CartReducer, [], getInitialCart);

  
  useEffect(() => {
    axios.get(`https://purplleappbackend.onrender.com/getCart`)
      .then(res => {
        if (res.data && res.data.product) {
          dispatch({
            type: "SET_CART",
            payload: res.data.product
          });
        }
      })
      .catch(err => console.log(err));
  }, []);

 
  useEffect(() => {
   
    localStorage.setItem("cart", JSON.stringify(cart));

   
    axios.post(`https://purplleappbackend.onrender.com/addCart`, {
      cart
    });

  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider; 