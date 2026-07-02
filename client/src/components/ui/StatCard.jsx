function StatCard({ icon, title, value }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 w-48 hover:border-cyan-400 transition duration-300">

      <div className="text-3xl mb-3">
        {icon}
      </div>

      <h3 className="text-sm text-slate-400">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}

export default StatCard;