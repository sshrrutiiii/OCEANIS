import { useState } from "react";
import SimulationControls from "../components/SimulationControls";
import Earth from "../three/Earth";

function Simulation() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const resetSimulation = () => {
    setPlaying(false);
    setSpeed(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8">

      <h1 className="text-5xl font-bold text-center mb-12">
        Ship Simulation
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        <SimulationControls
          playing={playing}
          setPlaying={setPlaying}
          speed={speed}
          setSpeed={setSpeed}
          resetSimulation={resetSimulation}
        />

        <div className="bg-slate-900 rounded-3xl h-[600px] border border-cyan-500/20 overflow-hidden">
          <Earth />
        </div>

      </div>

    </div>
  );
}

export default Simulation;