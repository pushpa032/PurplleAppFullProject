import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PurplleSalesChart = ({ orders }) => {

  const data = Object.values(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      const totalQty = order.products.reduce((sum, p) => sum + p.quantity, 0);

      if (!acc[date]) {
        acc[date] = { date, sales: 0 };
      }

      acc[date].sales += totalQty;
      return acc;
    }, {})
  );

  return (
    <div className="chart-box">
      <h3>Sales Count</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurplleSalesChart;