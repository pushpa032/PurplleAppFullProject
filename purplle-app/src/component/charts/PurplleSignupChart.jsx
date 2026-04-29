import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

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
      <h3>Signup Count</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurplleSignupChart;