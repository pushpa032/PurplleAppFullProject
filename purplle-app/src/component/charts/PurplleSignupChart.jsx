import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PurplleSignupChart = ({ users }) => {

  const data = Object.values(
    users.reduce((acc, user) => {
      const date = new Date(user.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = { date, users: 0 };
      }

      acc[date].users += 1;
      return acc;
    }, {})
  );

  return (
    <div className="chart-box">
      <h3>Signup Activity</h3>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis dataKey="users" />
          <Tooltip />

          <Scatter data={data} fill="#6a1b9a" />
        </ScatterChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PurplleSignupChart;