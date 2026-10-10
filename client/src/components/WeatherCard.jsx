import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import AIRecommendation from "./AIRecommendation";
import AIRiskCard from "./AIRiskCard";
import FuelPrediction from "./FuelPrediction";

function WeatherPanel({ weather, label }) {
if (!weather?.weather?.[0] || !weather?.main || !weather?.wind) {
return ( <div className="rounded-2xl bg-slate-800 p-5"> <h3 className="mb-3 text-xl font-bold">{label}</h3> <p className="text-slate-400">
Weather information is unavailable for this port. </p> </div>
);
}

const condition = weather.weather[0];

return ( <div className="rounded-2xl bg-slate-800 p-5"> <h3 className="mb-3 text-xl font-bold">
{weather.name || label} </h3>


  <div className="flex items-center gap-4">
    {condition.icon && (
      <img
        src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
        alt={condition.description || condition.main}
      />
    )}

    <div>
      <p className="text-xl font-semibold">{condition.main}</p>
      <p className="capitalize text-slate-400">
        {condition.description}
      </p>
    </div>
  </div>

  <div className="mt-4 space-y-2">
    <p className="text-slate-300">
      🌡 Temperature:{" "}
      <span className="text-cyan-400">
        {weather.main.temp}°C
      </span>
    </p>

    <p className="text-slate-300">
      💧 Humidity:{" "}
      <span className="text-cyan-400">
        {weather.main.humidity}%
      </span>
    </p>

    <p className="text-slate-300">
      💨 Wind:{" "}
      <span className="text-cyan-400">
        {weather.wind.speed} m/s
      </span>
    </p>
  </div>
</div>


);
}

function WeatherCard({ source, destination, fuelTons }) {
const [sourceWeather, setSourceWeather] = useState(null);
const [destinationWeather, setDestinationWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
let cancelled = false;


async function loadWeather() {
  const coordinatesAvailable =
    source?.latitude != null &&
    source?.longitude != null &&
    destination?.latitude != null &&
    destination?.longitude != null;

  if (!coordinatesAvailable) {
    setSourceWeather(null);
    setDestinationWeather(null);
    setError("Valid coordinates are required to load weather.");
    setLoading(false);
    return;
  }

  setLoading(true);
  setError("");
  setSourceWeather(null);
  setDestinationWeather(null);

  try {
    const [src, dest] = await Promise.all([
      getWeather(source.latitude, source.longitude),
      getWeather(destination.latitude, destination.longitude),
    ]);

    if (!cancelled) {
      setSourceWeather(src);
      setDestinationWeather(dest);
    }
  } catch (err) {
    console.error("Weather loading failed:", err);

    if (!cancelled) {
      setError(
        "Unable to load weather. Check your internet connection, OpenWeather API key, and API usage limits."
      );
    }
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
}

loadWeather();

return () => {
  cancelled = true;
};


}, [
source?.latitude,
source?.longitude,
destination?.latitude,
destination?.longitude,
]);

if (!source || !destination) {
return null;
}

return ( <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-slate-900 p-6"> <h2 className="mb-6 text-2xl font-bold text-cyan-400">
Live Weather Analysis </h2>


  {loading && (
    <p className="py-6 text-center text-cyan-400">
      Loading live weather...
    </p>
  )}

  {!loading && error && (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-300">
      {error}
    </div>
  )}

  {!loading && !error && sourceWeather && destinationWeather && (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <WeatherPanel
          weather={sourceWeather}
          label="Source Port"
        />

        <WeatherPanel
          weather={destinationWeather}
          label="Destination Port"
        />
      </div>

      <AIRecommendation
        sourceWeather={sourceWeather}
        destinationWeather={destinationWeather}
      />

      <AIRiskCard
        sourceWeather={sourceWeather}
        destinationWeather={destinationWeather}
      />

      <FuelPrediction
        fuelTons={fuelTons}
        sourceWeather={sourceWeather}
        destinationWeather={destinationWeather}
      />
    </>
  )}
</div>


);
}

export default WeatherCard;
