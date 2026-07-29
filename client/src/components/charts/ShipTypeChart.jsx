import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Cargo",
    value: 45,
  },
  {
    name: "Container",
    value: 30,
  },
  {
    name: "Oil Tanker",
    value: 15,
  },
  {
    name: "Passenger",
    value: 10,
  },
];

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#14b8a6",
  "#0ea5e9",
];

function ShipTypeChart() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[380px]">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Fleet Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #06b6d4",
              borderRadius: "10px",
            }}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ShipTypeChart;