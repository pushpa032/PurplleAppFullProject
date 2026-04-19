import React, { useEffect, useState } from "react";
import "../styles/UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  //  GET LOGGED USER
  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH USER ORDERS
  useEffect(() => {
    if (user) {
      fetch(`https://purplleappbackend.onrender.com/getOrders/${user.mobile}`)
        .then(res => res.json())
        .then(data => setOrders(data.orders))
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>Status:</b> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;