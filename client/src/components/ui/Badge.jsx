function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-cyan-500/20 hover:border-cyan-400 transition">
      <span className="text-lg">{icon}</span>
      <span className="text-slate-200 text-sm font-medium">
        {text}
      </span>
    </div>
  );
}

export default Badge;