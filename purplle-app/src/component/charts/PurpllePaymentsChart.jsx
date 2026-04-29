import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PurpllePaymentsChart = ({ orders }) => {

  const data = Object.values(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = { date, payments: 0 };
      }

      acc[date].payments += 1;
      return acc;
    }, {})
  );

  return (
    <div className="chart-box">
      <h3>Payments Received</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="payments" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurpllePaymentsChart;