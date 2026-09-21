import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getAllVoyages } from "../../services/voyageService";

function MonthlyRoutesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadVoyages() {
      try {
        const voyages = await getAllVoyages();

        const monthlyRoutes = Array.from({ length: 12 }, (_, index) => ({
          month: new Date(2026, index, 1).toLocaleString("default", {
            month: "short",
          }),
          routes: 0,
        }));

        voyages.forEach((voyage) => {
          if (!voyage.createdAt) return;

          const date = new Date(voyage.createdAt);
          const month = date.getMonth();

          monthlyRoutes[month].routes++;
        });

        setData(monthlyRoutes);
      } catch (error) {
        console.error("Failed to load monthly routes:", error);
      }
    }

    loadVoyages();
  }, []);

  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 h-[380px]">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Monthly Shipping Routes
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
            allowDecimals={false}
          />

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