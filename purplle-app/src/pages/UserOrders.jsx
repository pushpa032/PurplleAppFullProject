import React, { useEffect, useState } from "react";
import "../styles/UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetch(`https://purplleappbackend.onrender.com/getOrders/${user.mobile}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="user-orders-container">
        <h2>My Orders</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="user-orders-container">
        <h2>My Orders</h2>
        <p>No Orders Found</p>
      </div>
    );
  }

  return (
    <div className="user-orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          
          {/* TOP */}
          <div className="order-top">
            <div>
              <p className="label">Order ID</p>
              <h4>{order._id}</h4>
            </div>

            <div>
              <p className="label">Date</p>
              <h4>
                {new Date(order.createdAt).toLocaleDateString()}
              </h4>
            </div>

            <div>
              <p className="label">Total</p>
              <h3 className="price">₹{order.totalPrice}</h3>
            </div>

            <div>
              <p className="label">Status</p>

              <span
                className={
                  order.status === "Shipped"
                    ? "status shipped"
                    : "status pending"
                }
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="products-section">
            {order.products.map((p, i) => (
              <div className="product-card" key={i}>
                <img src={p.imageUrl} alt={p.name} />

                <div>
                  <h4>{p.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;