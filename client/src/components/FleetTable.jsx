const ships = [
  {
    id: 1,
    name: "Ocean Star",
    status: "🟢 Sailing",
    speed: "22 knots",
    destination: "Rotterdam",
  },
  {
    id: 2,
    name: "Pacific Queen",
    status: "🟡 Loading",
    speed: "0 knots",
    destination: "Singapore",
  },
  {
    id: 3,
    name: "Sea Falcon",
    status: "🔵 Docked",
    speed: "0 knots",
    destination: "Mumbai",
  },
  {
    id: 4,
    name: "Atlantic One",
    status: "🟢 Sailing",
    speed: "18 knots",
    destination: "Dubai",
  },
];

function FleetTable() {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 mt-10">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Live Fleet Tracker
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-slate-700">

              <th className="py-4">Ship</th>

              <th>Status</th>

              <th>Speed</th>

              <th>Destination</th>

            </tr>

          </thead>

          <tbody>

            {ships.map((ship) => (

              <tr
                key={ship.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="py-4">{ship.name}</td>

                <td>{ship.status}</td>

                <td>{ship.speed}</td>

                <td>{ship.destination}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FleetTable;