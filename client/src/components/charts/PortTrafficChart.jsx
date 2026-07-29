import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  {
    port: "Singapore",
    traffic: 95,
  },
  {
    port: "Rotterdam",
    traffic: 90,
  },
  {
    port: "Dubai",
    traffic: 82,
  },
  {
    port: "Mumbai",
    traffic: 76,
  },
  {
    port: "Shanghai",
    traffic: 99,
  },
];

function PortTrafficChart() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[380px]">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Port Traffic
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="port"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #06b6d4",
              borderRadius: "10px",
            }}
          />

          <Bar
            dataKey="traffic"
            fill="#14b8a6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PortTrafficChart;