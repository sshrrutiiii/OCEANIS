function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300">
      <div className="text-4xl mb-4">{icon}</div>

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-cyan-400">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;