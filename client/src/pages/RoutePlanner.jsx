import { useState } from "react";
import RouteForm from "../components/RouteForm";
import RouteInfo from "../components/RouteInfo";

function RoutePlanner() {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8">
      <div className="max-w-4xl mx-auto">
        <RouteForm setRouteData={setRouteData} />

        {routeData && <RouteInfo routeData={routeData} />}
      </div>
    </div>
  );
}

export default RoutePlanner;