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

    <table className="user-orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>

            <td>
              {order.products.map((p, i) => (
                <div key={i} className="order-item">
                  <img src={p.imageUrl} alt={p.name} />
                  <span>{p.name}</span>
                </div>
              ))}
            </td>

            <td>₹{order.totalPrice}</td>
            <td>{order.status}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default UserOrders;