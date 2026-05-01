import { useEffect, useState } from "react";
import axios from "axios";

import PurplleSalesChart from "../component/charts/PurplleSalesChart";
import PurplleOrdersChart from "../component/charts/PurplleOrdersChart";
import PurpllePaymentsChart from "../component/charts/PurpllePaymentsChart";
import PurplleSignupChart from "../component/charts/PurplleSignupChart";

import "../styles/AdminAnalytics.css";

const AdminAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersRes = await axios.get("http://localhost:5000/orders");
      const usersRes = await axios.get("http://localhost:5000/users");

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalOrders = orders.length;

  const totalSales = orders.reduce((sum, order) => {
    return sum + (order.totalPrice || 0);
  }, 0);

  const totalProductsSold = orders.reduce((sum, order) => {
    return sum + order.products.reduce((s, p) => s + p.quantity, 0);
  }, 0);

  const totalUsers = users.length;

  return (
    <div className="admin-analytics">
      <h2>Purplle Admin Dashboard</h2>

      <div className="summary-boxes">
        <div className="summary-card">
          <h4>Total Sales</h4>
          <p>₹{totalSales}</p>
        </div>

        <div className="summary-card">
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>

        <div className="summary-card">
          <h4>Products Sold</h4>
          <p>{totalProductsSold}</p>
        </div>

        <div className="summary-card">
          <h4>Total Users</h4>
          <p>{totalUsers}</p>
        </div>
      </div>

      <div className="charts-grid">
        <PurplleSalesChart orders={orders} />
        <PurplleOrdersChart orders={orders} />
        <PurpllePaymentsChart orders={orders} />
        <PurplleSignupChart users={users} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
