import { useState } from "react";
import ports from "../data/ports";

function RouteForm({ setRouteData }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [speed, setSpeed] = useState(20);

  return (
    <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-md shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">
        Route Planner
      </h2>

      {/* Source */}
      <div className="mb-6">
        <label className="block mb-2 text-slate-300">
          Source Port
        </label>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
        >
          <option value="">Select Source Port</option>

          {ports.map((port) => (
            <option key={port} value={port}>
              {port}
            </option>
          ))}
        </select>
      </div>

      {/* Destination */}
      <div className="mb-6">
        <label className="block mb-2 text-slate-300">
          Destination Port
        </label>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
        >
          <option value="">Select Destination Port</option>

          {ports.map((port) => (
            <option key={port} value={port}>
              {port}
            </option>
          ))}
        </select>
      </div>

      {/* Speed */}
      <div className="mb-8">
        <label className="block mb-2 text-slate-300">
          Ship Speed: <span className="text-cyan-400">{speed} knots</span>
        </label>

        <input
          type="range"
          min="10"
          max="40"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="w-full accent-cyan-400"
        />
      </div>

      <button
        onClick={() => {
          if (!source || !destination) {
            alert("Please select both ports.");
            return;
          }

          setRouteData({
            source,
            destination,
            speed,
            distance: "12,450 km",
            eta: "7 Days",
            fuel: "980 Tons",
            route: [source, "Suez Canal", destination],
          });
        }}
        className="w-full bg-cyan-500 hover:bg-cyan-400 transition rounded-xl py-4 text-slate-900 font-bold text-lg"
      >
        Calculate Route
      </button>
    </div>
  );
}

export default RouteForm;