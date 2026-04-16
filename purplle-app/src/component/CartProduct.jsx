import React, { useContext } from 'react';
import { CartContext } from "../features/ContextProvider";
import "../styles/CartProduct.css";

const CartProduct = ({ product }) => {
    //this will get the cart data and dispatch function from global context.
    const {cart, dispatch} = useContext(CartContext) 
    // when user increase the item so this logic will applies.

    const Increase = (id) => {
        const Index = cart.findIndex( p => p._id === id)
        if(cart[Index].quantity < 10) {
            dispatch({type: "Increase", id})
        }
    };

    //when the user decrease the item this logic will work.

    const Decrease = (id) => {
        const Index = cart.findIndex( p => p._id === id)
        if(cart[Index].quantity > 1) // this if is prevents the quantity under 1.
        {
            dispatch({type: "Decrease", id})
        }
    };


    return (
      <div className='cart-product-container'>
        <div className="CartProduct">
            <img
                src={product.file}
                alt={product.name}
            />
            <div className="detail">
                <h4>{product.name}</h4>
                <h5>₹{product.price}</h5>
                <div className="buttons">
                    <button className="rounded-circle1"
                    onClick={() => Decrease(product._id)}
                    >
                        <b>-</b>
                    </button>
                    <button className="rounded-circle2">{product.quantity}</button>
                    <button className="rounded-circle3" 
                    onClick={() => Increase(product._id)}
                    >
                        <b>+</b>
                    </button>

                </div>
                <button className="button-remove" 

                //this will sends request to reducer to remove item.
                
                onClick={() => dispatch({type: "Remove", id:product._id})}
                >
                    Remove
                </button>

            </div>

        </div>
      </div>
    )
}

export default CartProduct; 