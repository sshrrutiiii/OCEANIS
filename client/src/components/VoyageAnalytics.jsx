import { useEffect, useState } from "react";
import {
  FaShip,
  FaRoute,
  FaGasPump,
  FaClock,
} from "react-icons/fa";

import { getAllVoyages } from "../services/voyageService";

function VoyageAnalytics() {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVoyages() {
      try {
        const data = await getAllVoyages();
        setVoyages(data);
      } catch (error) {
        console.error("Failed to load voyage analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadVoyages();
  }, []);

  const totalVoyages = voyages.length;

  const totalDistance = voyages.reduce(
    (total, voyage) => total + (voyage.distanceKm || 0),
    0
  );

  const totalFuel = voyages.reduce(
    (total, voyage) => total + (voyage.fuelTons || 0),
    0
  );

  const averageEta =
    totalVoyages > 0
      ? voyages.reduce(
          (total, voyage) => total + (voyage.etaHours || 0),
          0
        ) / totalVoyages
      : 0;

  const cards = [
    {
      title: "Total Voyages",
      value: totalVoyages,
      icon: <FaShip />,
      color: "text-cyan-400",
    },
    {
      title: "Total Distance",
      value: `${Math.round(totalDistance).toLocaleString()} km`,
      icon: <FaRoute />,
      color: "text-blue-400",
    },
    {
      title: "Total Fuel",
      value: `${Math.round(totalFuel).toLocaleString()} Tons`,
      icon: <FaGasPump />,
      color: "text-green-400",
    },
    {
      title: "Average ETA",
      value: `${averageEta.toFixed(1)} hrs`,
      icon: <FaClock />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Voyage Analytics
      </h2>

      {loading ? (
        <p className="text-slate-400">
          Loading analytics...
        </p>
      ) : (
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

              <h3
                className={`text-4xl font-bold mt-3 ${card.color}`}
              >
                {card.value}
              </h3>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default VoyageAnalytics;