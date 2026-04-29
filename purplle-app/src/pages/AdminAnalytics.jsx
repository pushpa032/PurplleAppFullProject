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

  return (
    <div className="admin-analytics">

      <h2>Purplle Admin Dashboard</h2>

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