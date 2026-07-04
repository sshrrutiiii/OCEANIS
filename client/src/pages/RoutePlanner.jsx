import { useState } from "react";
import RouteForm from "../components/RouteForm";
import RouteInfo from "../components/RouteInfo";
import Earth from "../three/Earth";

function RoutePlanner() {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8">

      <h1 className="text-5xl font-bold text-center mb-12">
        Maritime Route Planner
      </h1>

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}
          <RouteForm setRouteData={setRouteData} />

          {/* Right */}
          <div className="bg-slate-900 rounded-3xl h-[650px] border border-cyan-500/20 overflow-hidden">
            <Earth />
          </div>

        </div>

        {routeData && (
          <RouteInfo routeData={routeData} />
        )}

      </div>

    </div>
  );
}

export default RoutePlanner;