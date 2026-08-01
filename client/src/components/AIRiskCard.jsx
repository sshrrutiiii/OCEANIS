function AIRiskCard({ sourceWeather, destinationWeather }) {
  if (!sourceWeather || !destinationWeather) return null;

  let score = 0;
  let status = "";
  let color = "";
  const reasons = [];

  const checkWeather = (weather) => {
    const condition = weather.weather[0].main;
    const wind = weather.wind.speed;

    if (condition === "Thunderstorm") {
      score += 45;
      reasons.push("Thunderstorm detected");
    }

    if (condition === "Rain") {
      score += 20;
      reasons.push("Rain along the route");
    }

    if (condition === "Snow") {
      score += 30;
      reasons.push("Snow conditions");
    }

    if (wind > 15) {
      score += 25;
      reasons.push("Strong winds");
    }

    if (weather.main.humidity > 90) {
      score += 10;
      reasons.push("High humidity");
    }
  };

  checkWeather(sourceWeather);
  checkWeather(destinationWeather);

  if (score <= 20) {
    status = "LOW";
    color = "text-green-400";
  } else if (score <= 50) {
    status = "MODERATE";
    color = "text-yellow-400";
  } else {
    status = "HIGH";
    color = "text-red-400";
  }

  return (
    <div className="mt-6 bg-slate-800 rounded-2xl border border-cyan-500/20 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        AI Voyage Risk Analysis
      </h2>

      <div className="flex justify-between items-center">

        <span className="text-lg">
          Risk Score
        </span>

        <span className={`text-3xl font-bold ${color}`}>
          {score}% ({status})
        </span>

      </div>

      <div className="mt-5">

        <h3 className="font-semibold mb-2">
          Factors
        </h3>

        <ul className="space-y-2">

          {reasons.length === 0 ? (
            <li className="text-green-400">
              ✔ No major weather risks detected.
            </li>
          ) : (
            reasons.map((reason, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {reason}
              </li>
            ))
          )}

        </ul>

      </div>

    </div>
  );
}

export default AIRiskCard;