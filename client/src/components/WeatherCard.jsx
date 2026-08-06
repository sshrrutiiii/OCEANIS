import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import AIRecommendation from "./AIRecommendation";
import AIRiskCard from "./AIRiskCard";

function WeatherCard({ source, destination }) {
  const [sourceWeather, setSourceWeather] = useState(null);
  const [destinationWeather, setDestinationWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      if (!source || !destination) return;

      setLoading(true);

      try {
        const [src, dest] = await Promise.all([
          getWeather(source.latitude, source.longitude),

          getWeather(destination.latitude, destination.longitude),
        ]);

        setSourceWeather(src);
        setDestinationWeather(dest);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadWeather();
  }, [source, destination]);

  if (!source || !destination) return null;

  if (loading) {
    return (
      <div className="mt-8 bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 text-center">
        <h2 className="text-2xl font-bold text-cyan-400">
          Loading Live Weather...
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Live Weather Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Source */}

        <div className="bg-slate-800 rounded-2xl p-5">

          <h3 className="font-bold text-xl mb-3">
            {sourceWeather.name}
          </h3>

          <div className="flex items-center gap-4">

            <img
              src={`https://openweathermap.org/img/wn/${sourceWeather.weather[0].icon}@2x.png`}
              alt={sourceWeather.weather[0].main}
            />

            <div>

              <p className="text-xl font-semibold">
                {sourceWeather.weather[0].main}
              </p>

              <p className="text-slate-400">
                {sourceWeather.weather[0].description}
              </p>

            </div>

          </div>

          <div className="mt-4 space-y-2">

            <p className="text-slate-300">
              🌡 Temperature :
              <span className="text-cyan-400">
                {" "}
                {sourceWeather.main.temp}°C
              </span>
            </p>

            <p className="text-slate-300">
              💧 Humidity :
              <span className="text-cyan-400">
                {" "}
                {sourceWeather.main.humidity}%
              </span>
            </p>

            <p className="text-slate-300">
              💨 Wind :
              <span className="text-cyan-400">
                {" "}
                {sourceWeather.wind.speed} m/s
              </span>
            </p>

          </div>

        </div>

        {/* Destination */}

        <div className="bg-slate-800 rounded-2xl p-5">

          <h3 className="font-bold text-xl mb-3">
            {destinationWeather.name}
          </h3>

          <div className="flex items-center gap-4">

            <img
              src={`https://openweathermap.org/img/wn/${destinationWeather.weather[0].icon}@2x.png`}
              alt={destinationWeather.weather[0].main}
            />

            <div>

              <p className="text-xl font-semibold">
                {destinationWeather.weather[0].main}
              </p>

              <p className="text-slate-400">
                {destinationWeather.weather[0].description}
              </p>

            </div>

          </div>

          <div className="mt-4 space-y-2">

            <p className="text-slate-300">
              🌡 Temperature :
              <span className="text-cyan-400">
                {" "}
                {destinationWeather.main.temp}°C
              </span>
            </p>

            <p className="text-slate-300">
              💧 Humidity :
              <span className="text-cyan-400">
                {" "}
                {destinationWeather.main.humidity}%
              </span>
            </p>

            <p className="text-slate-300">
              💨 Wind :
              <span className="text-cyan-400">
                {" "}
                {destinationWeather.wind.speed} m/s
              </span>
            </p>

          </div>

        </div>

      </div>

      {/* AI Recommendation */}

      <AIRecommendation
        sourceWeather={sourceWeather}
        destinationWeather={destinationWeather}
      />

      <AIRiskCard
        sourceWeather={sourceWeather}
        destinationWeather={destinationWeather}
      />

    </div>
  );
}

export default WeatherCard;