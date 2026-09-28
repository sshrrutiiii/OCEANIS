import { useState, useEffect } from "react";

import {
  FaAnchor,
  FaMapMarkerAlt,
  FaShip,
  FaRoute,
} from "react-icons/fa";

import { getAllPorts } from "../services/portService";
import { saveVoyage } from "../services/voyageService";
import { findShortestRoute } from "../services/routeService";

function RouteForm({ setRouteData }) {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [speed, setSpeed] = useState(20);

  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------
  // Load ports from backend
  // --------------------------------

  useEffect(() => {

    async function loadPorts() {

      try {

        setLoading(true);
        setError("");

        const data = await getAllPorts();

        console.log("Ports loaded:", data);

        setPorts(data);

      } catch (error) {

        console.error(
          "Failed to load ports:",
          error
        );

        setError(
          "Unable to load ports. Please make sure the backend is running."
        );

      } finally {

        setLoading(false);

      }
    }

    loadPorts();

  }, []);


  // --------------------------------
  // Calculate shortest route
  // --------------------------------

  const handleCalculate = async () => {

    if (!source || !destination) {

      alert("Please select both ports.");

      return;

    }


    if (source === destination) {

      alert(
        "Source and Destination cannot be the same."
      );

      return;

    }


    // Find selected ports

    const sourcePort = ports.find(
      (port) => port.name === source
    );

    const destinationPort = ports.find(
      (port) => port.name === destination
    );


    if (!sourcePort || !destinationPort) {

      alert(
        "Unable to find selected ports."
      );

      return;

    }


    try {

      setCalculating(true);
      setError("");


      // --------------------------------
      // Call Dijkstra backend
      // --------------------------------

      const shortestRoute =
        await findShortestRoute(
          sourcePort.id,
          destinationPort.id
        );


      console.log(
        "Shortest Route from Backend:",
        shortestRoute
      );


      // --------------------------------
      // Check response
      // --------------------------------

      if (
        !shortestRoute ||
        !shortestRoute.path ||
        shortestRoute.path.length === 0
      ) {

        alert(
          "No shipping route found between these ports."
        );

        return;

      }


      // --------------------------------
      // Distance from Dijkstra
      // --------------------------------

      const distance =
        Number(
          shortestRoute.distanceKm
        );


      // --------------------------------
      // ETA
      // --------------------------------

      const eta = Number(
        (
          distance /
          (speed * 1.852)
        ).toFixed(1)
      );


      // --------------------------------
      // Fuel estimation
      // --------------------------------

      const fuel = Number(
        (distance * 0.08).toFixed(0)
      );


      // --------------------------------
      // Path names
      // --------------------------------

      const pathNames =
        shortestRoute.path.map(
          (port) => port.name
        );


      console.log(
        "Shortest Path:",
        pathNames
      );


      // --------------------------------
      // Final route data
      // --------------------------------

      const route = {

        source:
          shortestRoute.source,

        destination:
          shortestRoute.destination,

        sourcePort,

        destinationPort,

        speed,

        // Dijkstra distance
        distanceKm: distance,

        etaHours: eta,

        fuelTons: fuel,

        // Display values
        distance:
          `${distance} km`,

        eta:
          `${eta} Hours`,

        fuel:
          `${fuel} Tons`,

        // Full path with coordinates
        path:
          shortestRoute.path,

        // Names for older components
        route:
          pathNames,
      };


      console.log(
        "Final Route Data:",
        route
      );


      // --------------------------------
      // Save voyage
      // --------------------------------

      try {

        await saveVoyage({

          source:
            sourcePort.name,

          destination:
            destinationPort.name,

          distanceKm:
            distance,

          etaHours:
            eta,

          fuelTons:
            fuel,

        });


        console.log(
          "Voyage saved successfully."
        );

      } catch (error) {

        console.error(
          "Failed to save voyage:",
          error
        );

        alert(
          "Route calculated, but voyage could not be saved."
        );

      }


      // --------------------------------
      // Send to RoutePlanner
      // --------------------------------

      setRouteData(route);


      // --------------------------------
      // Save locally
      // --------------------------------

      localStorage.setItem(
        "routeData",
        JSON.stringify(route)
      );


      console.log(
        "Route data stored successfully."
      );

    } catch (error) {

      console.error(
        "Route calculation failed:",
        error
      );

      alert(
        "Unable to calculate shortest route. Please check the backend."
      );

    } finally {

      setCalculating(false);

    }

  };


  return (

    <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8">


      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <FaRoute
          className="text-cyan-400 text-2xl"
        />

        <h2 className="text-2xl font-bold">
          Route Planner
        </h2>

      </div>


      {/* Error */}

      {error && (

        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4">

          {error}

        </div>

      )}


      {/* Source Port */}

      <div className="mb-6">

        <label className="flex items-center gap-2 text-slate-300 mb-2">

          <FaMapMarkerAlt
            className="text-cyan-400"
          />

          Source Port

        </label>


        <select

          value={source}

          onChange={(e) =>
            setSource(e.target.value)
          }

          disabled={
            loading ||
            calculating
          }

          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 disabled:opacity-50"

        >

          <option value="">

            {loading
              ? "Loading Ports..."
              : "Select Source Port"}

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


      {/* Destination Port */}

      <div className="mb-6">

        <label className="flex items-center gap-2 text-slate-300 mb-2">

          <FaAnchor
            className="text-cyan-400"
          />

          Destination Port

        </label>


        <select

          value={destination}

          onChange={(e) =>
            setDestination(e.target.value)
          }

          disabled={
            loading ||
            calculating
          }

          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"

        >

          <option value="">

            {loading
              ? "Loading Ports..."
              : "Select Destination Port"}

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

          <FaShip
            className="text-cyan-400"
          />

          Ship Speed (knots)

        </label>


        <input

          type="number"

          min="1"

          max="100"

          value={speed}

          onChange={(e) =>
            setSpeed(
              Number(e.target.value)
            )
          }

          disabled={calculating}

          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 disabled:opacity-50"

        />

      </div>


      {/* Calculate Button */}

      <button

        onClick={handleCalculate}

        disabled={
          loading ||
          calculating ||
          ports.length === 0
        }

        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"

      >

        <FaRoute />

        {calculating
          ? "Calculating Shortest Route..."
          : "Calculate Route"}

      </button>


    </div>

  );

}

export default RouteForm;