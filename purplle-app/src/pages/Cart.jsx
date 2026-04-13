import React, { useContext} from 'react';
import { CartContext } from '../features/ContextProvider.jsx';
import CartProduct from '../component/CartProduct';
import { totalItem, totalPrice } from '../features/CartReducer.jsx';
import { useNavigate } from 'react-router-dom';
import "../styles/Cart.css";

const Cart = () => {
    const {cart} = useContext(CartContext)
    const navigate = useNavigate()

    return (
        <div className="CartContainer">
            <div className="CartRow">
                <div className="col-8">
                    {cart.map((p, i) => (
                        <CartProduct key={i} product={p}></CartProduct>
                    ))}

                </div>
                <div className="col-4">
                    <div className="secondary">
                        <h5>Total Items: {totalItem(cart)}</h5>
                        <h5>Total Price:₹{totalPrice(cart)} </h5>
                        <button className="cart-button-warning"
                        onClick={() => navigate("/checkout")}>
                            Checkout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Cart;