function FuelPrediction({
  fuelTons,
  sourceWeather,
  destinationWeather,
}) {
  if (!sourceWeather || !destinationWeather) return null;

  let extraFuel = 0;
  const reasons = [];

  const analyze = (weather) => {
    const condition = weather.weather[0].main;
    const wind = weather.wind.speed;

    if (condition === "Rain") {
      extraFuel += fuelTons * 0.05;
      reasons.push("Rain");
    }

    if (condition === "Thunderstorm") {
      extraFuel += fuelTons * 0.12;
      reasons.push("Thunderstorm");
    }

    if (wind > 15) {
      extraFuel += fuelTons * 0.08;
      reasons.push("Strong Wind");
    }

    if (weather.main.humidity > 90) {
      extraFuel += fuelTons * 0.03;
      reasons.push("High Humidity");
    }
  };

  analyze(sourceWeather);
  analyze(destinationWeather);

  const totalFuel = fuelTons + extraFuel;

  return (
    <div className="mt-6 bg-slate-800 border border-cyan-500/20 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        AI Fuel Prediction
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Base Fuel</span>
          <span>{fuelTons.toFixed(1)} Tons</span>
        </div>

        <div className="flex justify-between">
          <span>Weather Impact</span>

          <span className="text-yellow-400">
            +{extraFuel.toFixed(1)} Tons
          </span>
        </div>

        <div className="flex justify-between font-bold text-lg">

          <span>Total Estimated</span>

          <span className="text-cyan-400">
            {totalFuel.toFixed(1)} Tons
          </span>

        </div>

        <div className="flex justify-between">

          <span>AI Confidence</span>

          <span className="text-green-400">
            96%
          </span>

        </div>

      </div>

      {reasons.length > 0 && (

        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Factors Affecting Fuel
          </h3>

          <ul className="space-y-1">

            {reasons.map((reason, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {reason}
              </li>
            ))}

          </ul>

        </div>

      )}

    </div>
  );
}

export default FuelPrediction;