import { useState, useEffect } from "react";
import {
  FaAnchor,
  FaMapMarkerAlt,
  FaShip,
  FaRoute,
} from "react-icons/fa";

import { getAllPorts } from "../services/portService";
import { saveVoyage } from "../services/voyageService";
import { calculateDistance } from "../utils/distance";
import { generateRoute } from "../utils/routes";

function RouteForm({ setRouteData }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [speed, setSpeed] = useState(20);

  const [ports, setPorts] = useState([]);

  useEffect(() => {
    async function loadPorts() {
      try {
        const data = await getAllPorts();
        setPorts(data);
      } catch (error) {
        console.error("Failed to load ports:", error);
      }
    }

    loadPorts();
  }, []);

  const handleCalculate = async () => {
    if (!source || !destination) {
      alert("Please select both ports.");
      return;
    }

    if (source === destination) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    const sourcePort = ports.find(
      (port) => port.name === source
    );

    const destinationPort = ports.find(
      (port) => port.name === destination
    );

    if (!sourcePort || !destinationPort) {
      alert("Unable to find selected ports.");
      return;
    }

    // Calculate distance
    const distance = calculateDistance(
      sourcePort,
      destinationPort
    );

    // Calculate ETA
    const eta = Number(
      (distance / (speed * 1.852)).toFixed(1)
    );

    // Calculate fuel
    const fuel = Number(
      (distance * 0.08).toFixed(0)
    );

    // Create route data
    const route = {
      source,
      destination,

      sourcePort,
      destinationPort,

      speed,

      distanceKm: distance,
      etaHours: eta,
      fuelTons: fuel,

      distance: `${distance} km`,
      eta: `${eta} Hours`,
      fuel: `${fuel} Tons`,

      route: generateRoute(
        source,
        destination
      ),
    };

    // Save voyage to backend
    try {
      await saveVoyage({
        source: sourcePort.name,
        destination: destinationPort.name,
        distanceKm: distance,
        etaHours: eta,
        fuelTons: fuel,
      });

      console.log("Voyage saved successfully.");
    } catch (error) {
      console.error(
        "Failed to save voyage:",
        error
      );

      alert(
        "Route calculated, but voyage could not be saved."
      );
    }

    // Send route data to RoutePlanner
    setRouteData(route);

    // Save route locally
    localStorage.setItem(
      "routeData",
      JSON.stringify(route)
    );

    /*
      IMPORTANT:
      Do NOT navigate to /simulation here.

      RoutePlanner will now show:
      - Route information
      - Weather
      - Fuel prediction
      - Route map
      - Start Simulation button
    */
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <FaRoute className="text-cyan-400 text-2xl" />

        <h2 className="text-2xl font-bold">
          Route Planner
        </h2>

      </div>

      {/* Source */}
      <div className="mb-6">

        <label className="flex items-center gap-2 text-slate-300 mb-2">

          <FaMapMarkerAlt className="text-cyan-400" />

          Source Port

        </label>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        >

          <option value="">
            Select Source Port
          </option>

          {ports.map((port) => (
            <option
              key={port.id}
              value={port.name}
            >
              {port.name}, {port.country}
            </option>
          ))}

        </select>

      </div>

      {/* Destination */}
      <div className="mb-6">

        <label className="flex items-center gap-2 text-slate-300 mb-2">

          <FaAnchor className="text-cyan-400" />

          Destination Port

        </label>

        <select
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        >

          <option value="">
            Select Destination Port
          </option>

          {ports.map((port) => (
            <option
              key={port.id}
              value={port.name}
            >
              {port.name}, {port.country}
            </option>
          ))}

        </select>

      </div>

      {/* Ship Speed */}
      <div className="mb-8">

        <label className="flex items-center gap-2 text-slate-300 mb-2">

          <FaShip className="text-cyan-400" />

          Ship Speed (knots)

        </label>

        <input
          type="number"
          min="1"
          value={speed}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        />

      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
      >

        <FaRoute />

        Calculate Route

      </button>

    </div>
  );
}

export default RouteForm;