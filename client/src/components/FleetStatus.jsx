import {
  FaShip,
  FaCircle,
} from "react-icons/fa";

function FleetStatus() {
  const ships = [
    {
      name: "Ocean Titan",
      status: "Sailing",
      color: "text-green-400",
    },
    {
      name: "Sea Explorer",
      status: "Sailing",
      color: "text-green-400",
    },
    {
      name: "Blue Horizon",
      status: "Port Loading",
      color: "text-yellow-400",
    },
    {
      name: "Atlantic Star",
      status: "Maintenance",
      color: "text-red-400",
    },
    {
      name: "Pacific Queen",
      status: "Sailing",
      color: "text-green-400",
    },
    {
      name: "Ocean Pearl",
      status: "Waiting",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="mt-10 bg-slate-900 border border-cyan-500/20 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Fleet Status
      </h2>

      <div className="space-y-4">

        {ships.map((ship) => (

          <div
            key={ship.name}
            className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
          >

            <div className="flex items-center gap-3">

              <FaShip className="text-cyan-400" />

              <span>{ship.name}</span>

            </div>

            <div className={`flex items-center gap-2 ${ship.color}`}>

              <FaCircle size={10} />

              {ship.status}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FleetStatus;