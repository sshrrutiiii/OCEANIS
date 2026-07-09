import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaAnchor,
  FaMapMarkerAlt,
  FaShip,
  FaRoute,
} from "react-icons/fa";

import ports from "../data/ports";
import { calculateDistance } from "../utils/distance";
import { generateRoute } from "../utils/routes";

function RouteForm({ setRouteData }) {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [speed, setSpeed] = useState(20);

  const handleCalculate = () => {
    if (!source || !destination) {
      alert("Please select both ports.");
      return;
    }

    if (source === destination) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    const sourcePort = ports.find((port) => port.name === source);
    const destinationPort = ports.find(
      (port) => port.name === destination
    );

    const distance = calculateDistance(sourcePort, destinationPort);

    const eta = (distance / (speed * 1.852)).toFixed(1);

    const fuel = (distance * 0.08).toFixed(0);

    const route = {
      source,
      destination,
      sourcePort,
      destinationPort,
      speed,
      distance: `${distance} km`,
      eta: `${eta} Hours`,
      fuel: `${fuel} Tons`,
      route: generateRoute(source, destination),
    };

    setRouteData(route);

    localStorage.setItem(
      "routeData",
      JSON.stringify(route)
    );

    navigate("/simulation");
  };

  return (
    <div>
      <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm mb-2">
        Intelligent Navigation
      </p>

      <h2 className="text-4xl font-bold mb-8">
        Plan Your Voyage
      </h2>

      {/* Source */}

      <div className="mb-6">
        <label className="flex items-center gap-2 text-slate-300 mb-2">
          <FaAnchor className="text-cyan-400" />
          Source Port
        </label>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-cyan-400 outline-none"
        >
          <option value="">Select Source Port</option>

          {ports.map((port) => (
            <option key={port.id} value={port.name}>
              {port.name} ({port.country})
            </option>
          ))}
        </select>
      </div>

      {/* Destination */}

      <div className="mb-6">
        <label className="flex items-center gap-2 text-slate-300 mb-2">
          <FaMapMarkerAlt className="text-cyan-400" />
          Destination Port
        </label>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-cyan-400 outline-none"
        >
          <option value="">Select Destination Port</option>

          {ports.map((port) => (
            <option key={port.id} value={port.name}>
              {port.name} ({port.country})
            </option>
          ))}
        </select>
      </div>

      {/* Speed */}

      <div className="mb-8">
        <label className="flex justify-between mb-3 text-slate-300">
          <span className="flex items-center gap-2">
            <FaShip className="text-cyan-400" />
            Ship Speed
          </span>

          <span className="text-cyan-400 font-bold">
            {speed} knots
          </span>
        </label>

        <input
          type="range"
          min="10"
          max="40"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
      </div>

      {/* Button */}

      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl py-4 text-slate-900 font-bold text-lg transition hover:scale-105"
      >
        <FaRoute />
        Calculate Route
      </button>
    </div>
  );
}

export default RouteForm;