import { useMemo } from "react";

function FuelPrediction({ fuelTons, sourceWeather, destinationWeather }) {
const prediction = useMemo(() => {
const baseFuel = Number(fuelTons);


if (!Number.isFinite(baseFuel) || baseFuel < 0) {
  return null;
}

const weatherData = [sourceWeather, destinationWeather].filter(
  (weather) =>
    weather?.weather?.[0] &&
    weather?.main &&
    weather?.wind
);

if (weatherData.length === 0) return null;

let extraPercentage = 0;
const reasons = [];

const conditions = weatherData.map((weather) =>
  String(weather.weather[0].main || "").toLowerCase()
);

if (conditions.includes("thunderstorm")) {
  extraPercentage += 0.12;
  reasons.push("Thunderstorm conditions");
} else if (conditions.includes("rain")) {
  extraPercentage += 0.05;
  reasons.push("Rain conditions");
}

const maxWind = Math.max(
  ...weatherData.map((weather) => Number(weather.wind.speed) || 0)
);

if (maxWind > 15) {
  extraPercentage += 0.08;
  reasons.push("Strong wind");
}

const maxHumidity = Math.max(
  ...weatherData.map(
    (weather) => Number(weather.main.humidity) || 0
  )
);

if (maxHumidity > 90) {
  extraPercentage += 0.03;
  reasons.push("High humidity");
}

const extraFuel = baseFuel * extraPercentage;

return {
  baseFuel,
  extraFuel,
  totalFuel: baseFuel + extraFuel,
  reasons,
};


}, [fuelTons, sourceWeather, destinationWeather]);

if (!prediction) return null;

const { baseFuel, extraFuel, totalFuel, reasons } = prediction;

// Ensure values are valid numbers before rendering.
if (
!Number.isFinite(baseFuel) ||
!Number.isFinite(extraFuel) ||
!Number.isFinite(totalFuel)
) {
return null;
}

return ( <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-800 p-6"> <h2 className="mb-2 text-2xl font-bold text-cyan-400">
AI Fuel Prediction </h2>


  <p className="mb-5 text-sm text-slate-400">
    Estimated fuel consumption based on the selected ports' weather.
  </p>

  <div className="space-y-4">
    <div className="flex justify-between gap-4">
      <span className="text-slate-300">Base Fuel</span>
      <span className="font-medium">
        {baseFuel.toFixed(1)} Tons
      </span>
    </div>

    <div className="flex justify-between gap-4">
      <span className="text-slate-300">
        Estimated Weather Impact
      </span>
      <span className="font-medium text-yellow-400">
        +{extraFuel.toFixed(1)} Tons
      </span>
    </div>

    <div className="flex justify-between gap-4 border-t border-slate-700 pt-4 text-lg font-bold">
      <span>Total Estimated Fuel</span>
      <span className="text-cyan-400">
        {totalFuel.toFixed(1)} Tons
      </span>
    </div>
  </div>

  <div className="mt-5 rounded-xl bg-slate-900/70 p-4">
    <p className="text-sm text-slate-300">
      Prediction Type:{" "}
      <span className="text-cyan-400">
        Rule-Based Estimate
      </span>
    </p>

    <p className="mt-2 text-xs text-slate-500">
      Weather impact percentages are illustrative assumptions,
      not validated maritime fuel-consumption measurements.
    </p>
  </div>

  {reasons.length > 0 ? (
    <div className="mt-6">
      <h3 className="mb-2 font-semibold">
        Factors Affecting Fuel
      </h3>

      <ul className="space-y-2">
        {reasons.map((reason) => (
          <li key={reason} className="text-slate-300">
            <span className="mr-2 text-yellow-400">•</span>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="mt-5 text-sm text-green-400">
      No additional fuel impact was estimated by the current rules.
    </p>
  )}
</div>


);
}

export default FuelPrediction;
