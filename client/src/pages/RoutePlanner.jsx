import { useState } from "react";
import RouteForm from "../components/RouteForm";
import RouteInfo from "../components/RouteInfo";
import Earth from "../three/Earth";
import { FaRoute, FaShip, FaClock, FaGlobe } from "react-icons/fa";

function RoutePlanner() {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 px-6">

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-3">
          OCEANIS
        </p>

        <h1 className="text-5xl font-bold">
          Maritime Route Planner
        </h1>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Calculate intelligent sea routes with real-time visualization,
          estimated travel distance and optimized navigation.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-5 mb-10">

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <FaRoute className="text-cyan-400 text-2xl mb-3" />
          <h2 className="text-3xl font-bold">500+</h2>
          <p className="text-slate-400">Global Routes</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <FaShip className="text-cyan-400 text-2xl mb-3" />
          <h2 className="text-3xl font-bold">120+</h2>
          <p className="text-slate-400">Ships</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <FaClock className="text-cyan-400 text-2xl mb-3" />
          <h2 className="text-3xl font-bold">24/7</h2>
          <p className="text-slate-400">Monitoring</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
          <FaGlobe className="text-cyan-400 text-2xl mb-3" />
          <h2 className="text-3xl font-bold">99%</h2>
          <p className="text-slate-400">Accuracy</p>
        </div>

      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* Form */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-lg">
          <RouteForm setRouteData={setRouteData} />
        </div>

        {/* Earth */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl h-[650px] overflow-hidden shadow-lg">
          <Earth
            sourcePort={routeData?.sourcePort}
            destinationPort={routeData?.destinationPort}
          />
        </div>

      </div>

      {/* Route Info */}
      {routeData && (
        <div className="max-w-7xl mx-auto mt-10">
          <RouteInfo routeData={routeData} />
        </div>
      )}

    </div>
  );
}

export default RoutePlanner;