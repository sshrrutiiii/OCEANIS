function WeatherCard({ source, destination }) {
  if (!source || !destination) return null;

  return (
    <div className="mt-8 bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        AI Weather Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-2xl p-5">

          <h3 className="font-bold text-xl mb-3">
            {source.name}
          </h3>

          <p className="text-4xl">
            ☀
          </p>

          <p className="text-lg mt-2">
            Sunny
          </p>

          <p className="text-slate-400">
            28°C
          </p>

          <p className="text-slate-400">
            Wind 15 km/h
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5">

          <h3 className="font-bold text-xl mb-3">
            {destination.name}
          </h3>

          <p className="text-4xl">
            🌧
          </p>

          <p className="text-lg mt-2">
            Rain
          </p>

          <p className="text-slate-400">
            19°C
          </p>

          <p className="text-slate-400">
            Wind 30 km/h
          </p>

        </div>

      </div>

      <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">

        <p className="text-cyan-400 font-semibold">
          AI Recommendation
        </p>

        <p className="text-slate-300 mt-2">
          Weather conditions are favorable.
          Route optimization suggests normal cruising speed.
        </p>

      </div>

    </div>
  );
}

export default WeatherCard;