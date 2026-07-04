function SimulationControls({
  playing,
  setPlaying,
  speed,
  setSpeed,
  resetSimulation,
}) {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Simulation Controls
      </h2>

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setPlaying(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-3 rounded-xl font-semibold"
        >
          ▶ Play
        </button>

        <button
          onClick={() => setPlaying(false)}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-5 py-3 rounded-xl font-semibold"
        >
          ⏸ Pause
        </button>

        <button
          onClick={resetSimulation}
          className="bg-red-500 hover:bg-red-400 text-white px-5 py-3 rounded-xl font-semibold"
        >
          🔄 Reset
        </button>

      </div>

      <label className="block mb-2">
        Simulation Speed: <span className="text-cyan-400">{speed}x</span>
      </label>

      <input
        type="range"
        min="1"
        max="5"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />

    </div>
  );
}

export default SimulationControls;