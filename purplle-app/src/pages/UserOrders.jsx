import React, { useEffect, useState } from "react";
import "../styles/UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetch(`https://purplleappbackend.onrender.com/getOrders/${user.mobile}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data.orders);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  // show loading first
  if (loading) {
    return (
      <div className="user-orders-container">
        <h2>My Orders</h2>
        <p>Loading...</p>
      </div>
    );
  }

  // then check orders
  if (orders.length === 0) {
    return (
      <div className="user-orders-container">
        <h2>My Orders</h2>
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div className="user-orders-container">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="user-order-card">
          <p><b>Total:</b> ₹{order.totalPrice}</p>
          <p><b>Status:</b> {order.status}</p>

          <div className="user-order-products">
            {order.products.map((p, i) => (
              <div key={i} className="user-order-product">
                <img src={p.imageUrl} alt={p.name} />
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;