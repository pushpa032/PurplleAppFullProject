import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminManageOrder.css";

function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const status = ["Pending", "Shipped", "Delivered", "Cancelled"];

  async function orderStatus(id, e) {
    let status = e.target.value;
    await axios.put(`https://purplleapp-1.onrender.com/orders/${id}`, { status })
    getOrders();
    console.log(res)
  }

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios.get(`https://purplleapp-1.onrender.com/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteOrder = (id) => {
    axios.delete(`https://purplleapp-1.onrender.com/orders/${id}`)
      .then(() => {
        alert("Order Deleted");
        getOrders();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="admin-manage-orders">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Date</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>

              <td>{order._id}</td>

              <td>
                {order.products?.map((item, i) => (
                  <p key={i}>
                    {item.name} (₹{item.price} * {item.quantity})
                  </p>
                ))}
              </td>

              <td>₹{order.totalPrice}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.user?.address}</td>
              <td>{order.user?.payment}</td>
              <td>
                <select
                  className="form-control"
                  value={order.status}
                  onChange={(e) => orderStatus(order._id, e)}
                >
                  {status.map((statusValue, index) => (
                    <option key={index} value={statusValue}>
                      {statusValue}
                    </option>
                  ))}
                </select>

              </td>
              <td>
                <button
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </button>


              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageOrders;