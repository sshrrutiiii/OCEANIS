import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const routes = [
    "Singapore → Rotterdam",
    "Mumbai → Dubai",
    "Shanghai → Los Angeles",
    "Sydney → Tokyo",
    "Hamburg → New York",
  ];

  const activity = [
    "🚢 Ship departed from Singapore",
    "⚓ Vessel arrived at Rotterdam",
    "🌊 Route recalculated",
    "📍 New port added",
    "🚢 Cargo loaded at Mumbai",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12 text-center">
          Maritime Dashboard
        </h1>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            icon="🚢"
            title="Active Ships"
            value="186"
          />

          <DashboardCard
            icon="🌍"
            title="Global Ports"
            value="200+"
          />

          <DashboardCard
            icon="🛣️"
            title="Routes Today"
            value="542"
          />

          <DashboardCard
            icon="⏱️"
            title="Average ETA"
            value="6.8 Days"
          />

        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Top Routes */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8">

            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Top Shipping Routes
            </h2>

            <div className="space-y-4">

              {routes.map((route) => (
                <div
                  key={route}
                  className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
                >
                  {route}
                </div>
              ))}

            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8">

            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              {activity.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;