import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", routes: 120 },
  { day: "Tue", routes: 180 },
  { day: "Wed", routes: 240 },
  { day: "Thu", routes: 210 },
  { day: "Fri", routes: 310 },
  { day: "Sat", routes: 420 },
  { day: "Sun", routes: 390 },
];

function RouteChart() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[400px]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Weekly Route Analytics
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="day" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="routes"
            stroke="#22d3ee"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RouteChart;