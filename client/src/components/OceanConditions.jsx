function OceanConditions({
  sourceWeather,
  destinationWeather,
}) {
  if (!sourceWeather || !destinationWeather) return null;

  const avgWind =
    (
      sourceWeather.wind.speed +
      destinationWeather.wind.speed
    ) / 2;

  let waveHeight = (avgWind * 0.35).toFixed(1);

  let seaState = "Calm";
  let safety = "Safe";
  let color = "text-green-400";

  if (avgWind > 6) {
    seaState = "Moderate";
    safety = "Proceed With Caution";
    color = "text-yellow-400";
  }

  if (avgWind > 12) {
    seaState = "Rough";
    safety = "Unsafe";
    color = "text-red-400";
  }

  return (
    <div className="mt-8 bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Ocean Conditions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Wave Height
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {waveHeight} m
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Sea State
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {seaState}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Avg Wind
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {avgWind.toFixed(1)} m/s
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Navigation
          </p>

          <h3 className={`text-xl font-bold ${color}`}>
            {safety}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default OceanConditions;