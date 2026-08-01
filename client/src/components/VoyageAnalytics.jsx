import {
  FaShip,
  FaLeaf,
  FaClock,
  FaRobot,
} from "react-icons/fa";

function VoyageAnalytics() {
  const cards = [
    {
      title: "Completed Voyages",
      value: "128",
      icon: <FaShip />,
      color: "text-cyan-400",
    },
    {
      title: "Fuel Saved",
      value: "14%",
      icon: <FaLeaf />,
      color: "text-green-400",
    },
    {
      title: "Average Delay",
      value: "2.1 hrs",
      icon: <FaClock />,
      color: "text-yellow-400",
    },
    {
      title: "AI Accuracy",
      value: "96%",
      icon: <FaRobot />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Voyage Analytics
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6"
          >

            <div className={`${card.color} text-3xl mb-4`}>
              {card.icon}
            </div>

            <p className="text-slate-400">
              {card.title}
            </p>

            <h3 className={`text-4xl font-bold mt-3 ${card.color}`}>
              {card.value}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default VoyageAnalytics;