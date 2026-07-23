import { useMemo, useState } from "react";
import EarthSimulation from "../three/EarthSimulation";
import SimulationControls from "../components/SimulationControls";

function Simulation() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);

  // Reset ke liye
  const [resetKey, setResetKey] = useState(0);

  const resetSimulation = () => {
    setPlaying(false);
    setSpeed(1);
    setProgress(0);

    // EarthSimulation ko dobara mount karega
    setResetKey((prev) => prev + 1);
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

  const covered = (routeData.distanceKm * progress).toFixed(0);
  const remaining = (
    routeData.distanceKm -
    routeData.distanceKm * progress
  ).toFixed(0);

  const fuelUsed = (routeData.fuelTons * progress).toFixed(1);

  const etaRemaining = (
    routeData.etaHours *
    (1 - progress)
  ).toFixed(1);

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

            <div className="space-y-5 text-lg">

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
                <span>Total Distance</span>
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

                <span
                  className={`font-semibold ${
                    progress >= 1
                      ? "text-green-400"
                      : playing
                      ? "text-cyan-400"
                      : "text-yellow-400"
                  }`}
                >
                  {progress >= 1
                    ? "Voyage Completed"
                    : playing
                    ? "Sailing"
                    : "Paused"}
                </span>
              </div>

            </div>

            {/* Progress */}

            <div className="mt-8">

              <div className="flex justify-between mb-2">
                <span>Voyage Progress</span>

                <span className="text-cyan-400">
                  {(progress * 100).toFixed(0)}%
                </span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{
                    width: `${progress * 100}%`,
                  }}
                />

              </div>

            </div>

            {/* Live Statistics */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Distance Covered
                </p>

                <h3 className="text-xl font-bold text-cyan-400">
                  {covered} km
                </h3>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Distance Left
                </p>

                <h3 className="text-xl font-bold text-cyan-400">
                  {remaining} km
                </h3>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Fuel Used
                </p>

                <h3 className="text-xl font-bold text-cyan-400">
                  {fuelUsed} Tons
                </h3>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  ETA Remaining
                </p>

                <h3 className="text-xl font-bold text-cyan-400">
                  {etaRemaining} Hrs
                </h3>
              </div>

            </div>

            {/* Controls */}

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
              key={resetKey}
              sourcePort={routeData.sourcePort}
              destinationPort={routeData.destinationPort}
              playing={playing}
              speed={speed}
              onProgress={setProgress}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Simulation;