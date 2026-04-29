import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PurplleOrdersChart = ({ orders }) => {

  const data = Object.values(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = { date, orders: 0 };
      }

      acc[date].orders += 1;
      return acc;
    }, {})
  );

  return (
    <div className="chart-box">
      <h3> Total Orders</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PurplleOrdersChart;