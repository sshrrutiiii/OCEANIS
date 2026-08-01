function AIRecommendation({ sourceWeather, destinationWeather }) {
  if (!sourceWeather || !destinationWeather) return null;

  let recommendation = "";
  let color = "text-green-400";

  const sourceCondition = sourceWeather.weather[0].main;
  const destinationCondition = destinationWeather.weather[0].main;

  const sourceWind = sourceWeather.wind.speed;
  const destinationWind = destinationWeather.wind.speed;

  if (
    sourceCondition === "Thunderstorm" ||
    destinationCondition === "Thunderstorm"
  ) {
    recommendation =
      "Severe storm detected. Consider delaying departure or selecting an alternative route.";
    color = "text-red-400";
  } else if (
    sourceCondition === "Rain" ||
    destinationCondition === "Rain"
  ) {
    recommendation =
      "Rain expected along the voyage. Reduce cruising speed and monitor visibility.";
    color = "text-yellow-400";
  } else if (
    sourceWind > 12 ||
    destinationWind > 12
  ) {
    recommendation =
      "Strong winds detected. Sail with caution and reduce speed.";
    color = "text-orange-400";
  } else {
    recommendation =
      "Weather conditions are favorable. Safe for normal cruising speed.";
    color = "text-green-400";
  }

  return (
    <div className="mt-6 bg-slate-800 rounded-2xl p-5 border border-cyan-500/20">

      <h3 className="text-xl font-bold text-cyan-400 mb-3">
        AI Recommendation
      </h3>

      <p className={color}>
        {recommendation}
      </p>

    </div>
  );
}

export default AIRecommendation;