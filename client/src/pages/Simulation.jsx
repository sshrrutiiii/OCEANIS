import { useMemo, useState } from "react";
import EarthSimulation from "../three/EarthSimulation";
import SimulationControls from "../components/SimulationControls";

function Simulation() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const resetSimulation = () => {
    setPlaying(false);
    setSpeed(1);
  };

  const routeData = useMemo(() => {
    return JSON.parse(localStorage.getItem("routeData"));
  }, []);

  if (!routeData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        No Route Selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          Live Ship Simulation
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Panel */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-cyan-500/20">

            <h2 className="text-3xl font-bold text-cyan-400 mb-8">
              Voyage Details
            </h2>

            <div className="space-y-6 text-lg">

              <div className="flex justify-between">
                <span>Source Port</span>
                <span className="text-cyan-400">
                  {routeData.source}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Destination</span>
                <span className="text-cyan-400">
                  {routeData.destination}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Distance</span>
                <span>{routeData.distance}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Time</span>
                <span>{routeData.eta}</span>
              </div>

              <div className="flex justify-between">
                <span>Fuel Required</span>
                <span>{routeData.fuel}</span>
              </div>

              <div className="flex justify-between">
                <span>Ship Speed</span>
                <span>{routeData.speed} knots</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-400 font-semibold">
                  {playing ? "Sailing" : "Paused"}
                </span>
              </div>

            </div>

            {/* Simulation Controls */}
            <div className="mt-10">
              <SimulationControls
                playing={playing}
                setPlaying={setPlaying}
                speed={speed}
                setSpeed={setSpeed}
                resetSimulation={resetSimulation}
              />
            </div>

          </div>

          {/* Earth */}
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 overflow-hidden h-[650px]">

            <EarthSimulation
              sourcePort={routeData.sourcePort}
              destinationPort={routeData.destinationPort}
              playing={playing}
              speed={speed}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Simulation;