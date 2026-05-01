import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PurplleOrdersChart = ({ orders }) => {

  // Count COD vs Online
  const paymentData = [
    {
      name: "COD",
      value: orders.filter(o => o.user?.payment === "COD").length
    },
    {
      name: "Online",
      value: orders.filter(o => o.user?.payment !== "COD").length
    }
  ];

  const COLORS = ["#ff9800", "#4caf50"]; // COD = orange, Online = green

  return (
    <div className="chart-box">
      <h3>Payment Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {paymentData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PurplleOrdersChart;