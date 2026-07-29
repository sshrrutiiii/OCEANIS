import DashboardCard from "../components/DashboardCard";

import MonthlyRoutesChart from "../components/charts/MonthlyRoutesChart";
import ShipTypeChart from "../components/charts/ShipTypeChart";
import PortTrafficChart from "../components/charts/PortTrafficChart";
import FuelChart from "../components/charts/FuelChart";

import {
  FaShip,
  FaCloudSun,
  FaRoute,
  FaRobot,
  FaTriangleExclamation,
  FaClock,
} from "react-icons/fa6";

function Dashboard() {
  const routes = [
    {
      name: "Singapore → Rotterdam",
      status: "On Schedule",
      color: "text-green-400",
    },
    {
      name: "Mumbai → Dubai",
      status: "High Waves",
      color: "text-yellow-400",
    },
    {
      name: "Shanghai → Los Angeles",
      status: "Storm Alert",
      color: "text-red-400",
    },
    {
      name: "Sydney → Tokyo",
      status: "Optimized",
      color: "text-cyan-400",
    },
  ];

  const aiAlerts = [
    "AI predicts 18% fuel saving using Route B.",
    "Heavy storm detected near Pacific Ocean.",
    "Best departure window: 09:30 UTC.",
    "Port congestion expected at Rotterdam.",
    "Weather conditions favorable near Dubai.",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8 pb-16">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          AI Maritime Dashboard
        </h1>

        {/* Top Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            icon={<FaShip />}
            title="Active Ships"
            value="186"
          />

          <DashboardCard
            icon={<FaCloudSun />}
            title="Weather"
            value="Stable"
          />

          <DashboardCard
            icon={<FaRoute />}
            title="Routes Today"
            value="542"
          />

          <DashboardCard
            icon={<FaRobot />}
            title="AI Decisions"
            value="97%"
          />

        </div>

        {/* Live Routes + AI */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Live Routes
            </h2>

            <div className="space-y-4">

              {routes.map((route) => (

                <div
                  key={route.name}
                  className="bg-slate-800 rounded-xl p-5 flex justify-between"
                >

                  <span>{route.name}</span>

                  <span className={route.color}>
                    {route.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-8">

            <h2 className="text-2xl font-bold mb-6">
              AI Recommendations
            </h2>

            <div className="space-y-4">

              {aiAlerts.map((alert, index) => (

                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-4 flex gap-3 items-start"
                >

                  <FaTriangleExclamation className="text-cyan-400 mt-1" />

                  <span>{alert}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <MonthlyRoutesChart />

          <ShipTypeChart />

          <PortTrafficChart />

          <FuelChart />

        </div>

        {/* Bottom Cards */}

        <div className="grid lg:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-8">

            <h2 className="text-xl font-bold mb-4">
              Fuel Efficiency
            </h2>

            <p className="text-5xl font-bold text-cyan-400">
              91%
            </p>

            <p className="text-slate-400 mt-3">
              AI optimized shipping routes saved fuel.
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-8">

            <h2 className="text-xl font-bold mb-4">
              Average ETA
            </h2>

            <p className="text-5xl font-bold text-green-400">
              6.2 Days
            </p>

            <p className="text-slate-400 mt-3">
              Based on AI route prediction.
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-8">

            <h2 className="text-xl font-bold mb-4">
              System Status
            </h2>

            <p className="text-5xl font-bold text-cyan-400">
              Online
            </p>

            <p className="text-slate-400 mt-3 flex items-center gap-2">
              <FaClock />
              Last updated 2 min ago
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;