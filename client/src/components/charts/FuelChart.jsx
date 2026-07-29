import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", fuel: 620 },
  { month: "Feb", fuel: 590 },
  { month: "Mar", fuel: 670 },
  { month: "Apr", fuel: 640 },
  { month: "May", fuel: 710 },
  { month: "Jun", fuel: 690 },
];

function FuelChart() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[380px]">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Monthly Fuel Consumption
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

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

          <Area
            type="monotone"
            dataKey="fuel"
            stroke="#06b6d4"
            fill="#0891b2"
            fillOpacity={0.4}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default FuelChart;