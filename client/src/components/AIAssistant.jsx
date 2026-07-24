import {
  FaRobot,
  FaShieldAlt,
  FaCloudSun,
  FaWater,
  FaGasPump,
  FaShip,
  FaExclamationTriangle,
} from "react-icons/fa";

function AIAssistant({ routeData }) {
  if (!routeData) return null;

  const distance = routeData.distanceKm;
  const speed = routeData.speed;
  const eta = routeData.etaHours;

  let risk = "Low";
  let riskColor = "text-green-400";

  if (distance > 12000) {
    risk = "High";
    riskColor = "text-red-400";
  } else if (distance > 7000) {
    risk = "Medium";
    riskColor = "text-yellow-400";
  }

  let weather = "Clear Sky";
  let sea = "Calm";
  let piracy = "Low";

  let efficiency = 94;

  if (speed > 30) efficiency = 78;
  else if (speed > 25) efficiency = 86;

  let recommendation =
    "Optimal route selected. Maintain current speed for best fuel efficiency.";

  if (speed > 30) {
    recommendation =
      "Reduce speed to around 22 knots to save fuel and improve efficiency.";
  }

  if (distance > 12000) {
    recommendation =
      "Long voyage detected. Monitor fuel reserves and weather conditions.";
  }

  const delay =
    eta > 300 ? "High" :
    eta > 180 ? "Medium" :
    "Low";

  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 mt-8">

      <div className="flex items-center gap-3 mb-8">
        <FaRobot className="text-cyan-400 text-3xl" />
        <h2 className="text-3xl font-bold text-cyan-400">
          AI Maritime Assistant
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaShieldAlt className="text-cyan-400" />
            Risk Level
          </div>

          <h3 className={`text-xl font-bold ${riskColor}`}>
            {risk}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCloudSun className="text-cyan-400" />
            Weather
          </div>

          <h3 className="text-xl font-bold">
            {weather}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaWater className="text-cyan-400" />
            Sea Condition
          </div>

          <h3 className="text-xl font-bold">
            {sea}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaGasPump className="text-cyan-400" />
            Fuel Efficiency
          </div>

          <h3 className="text-xl font-bold text-green-400">
            {efficiency}%
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaShip className="text-cyan-400" />
            Recommended Speed
          </div>

          <h3 className="text-xl font-bold">
            22 knots
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-cyan-400" />
            Delay Probability
          </div>

          <h3 className="text-xl font-bold">
            {delay}
          </h3>
        </div>

      </div>

      <div className="mt-8 bg-slate-800 rounded-xl p-5 border border-cyan-500/20">

        <h3 className="text-xl font-bold text-cyan-400 mb-3">
          AI Recommendation
        </h3>

        <p className="text-slate-300 leading-7">
          {recommendation}
        </p>

      </div>

    </div>
  );
}

export default AIAssistant;