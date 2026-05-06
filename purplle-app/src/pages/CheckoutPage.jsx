"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../features/ContextProvider";
import { totalItem, totalPrice } from "../features/CartReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "../styles/CheckoutPagePayment.css";

function CheckoutPage() {
  const { cart = [], dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login to continue");
      navigate("/login");
    }
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    number: "",
    email: "",
    address: "",
    payment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadScript(
      `https://checkout.razorpay.com/v1/checkout.js`,
    );
    if (!res) return alert("Razorpay failed");

    const { data } = await axios.post(
      `https://purplleappbackend.onrender.com/create-order`,
      {
        amount: totalPrice(cart) * 100,
        currency: "INR",
      },
    );

    const options = {
      key: "rzp_test_SfDr1mY7vGO9lZ",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verify = await axios.post(
            "https://purplleappbackend.onrender.com/verify-payment",
            response,
          );

          if (verify.data.success) {
            // FIRST place order
            const orderRes = await placeOrder(
              "Online",
              response.razorpay_payment_id,
            );

            if (orderRes) {
              alert("Payment completed & invoice sent to email ");

              dispatch({ type: "CLEAR_CART" });
              navigate("/");
            }
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.log("Payment Error:", error);
          alert("Something went wrong after payment");
        }
      },

      prefill: {
        name: form.fullName,
        contact: form.number,
        email: form.email,
      },
    };

    new window.Razorpay(options).open();
  };

  /*const placeOrder = async (mode, paymentId = "") => {

    const orderData = {
      products: cart,
      user: { ...form, payment: mode },
      totalItems: totalItem(cart),
      totalPrice: totalPrice(cart),
      paymentId,
    };*/

  const placeOrder = async (mode, paymentId = "") => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      products: cart,
      user: { ...form, payment: mode },

      mobile: loggedUser?.mobile,

      totalItems: totalItem(cart),
      totalPrice: totalPrice(cart),
      paymentId,
    };

    await axios.post(
      "https://purplleappbackend.onrender.com/orders/add/payment",
      orderData,
    );

    alert("Order Placed Successfully");

    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, number, email, address, payment } = form;

    if (!fullName || !number || !email || !address || !payment) {
      return alert("Fill all fields");
    }

    if (payment === "Online") {
      handlePayment();
    } else {
      placeOrder("COD");
    }
  };

  return (
    <div className="checkout-page-container">
      <form className="checkout-page-form" onSubmit={handleSubmit}>
        <h2 className="checkout-page-title">Checkout</h2>

        <div className="checkout-page-summary">
          <h3>Total Items: {totalItem(cart)}</h3>
          <h3>Total Price: ₹{totalPrice(cart)}</h3>
        </div>

        <input
          className="checkout-page-input"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          className="checkout-page-input"
          name="number"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          className="checkout-page-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <textarea
          className="checkout-page-textarea"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <select
          className="checkout-page-select"
          name="payment"
          onChange={handleChange}
        >
          <option value="">Select Payment</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <button className="checkout-page-button" type="submit">
          Proceed To Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
