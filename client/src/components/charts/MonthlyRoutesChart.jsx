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
  { month: "Jan", routes: 180 },
  { month: "Feb", routes: 220 },
  { month: "Mar", routes: 260 },
  { month: "Apr", routes: 310 },
  { month: "May", routes: 360 },
  { month: "Jun", routes: 420 },
];

function MonthlyRoutesChart() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[380px]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Monthly Shipping Routes
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis
            dataKey="month"
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
            dataKey="routes"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyRoutesChart;