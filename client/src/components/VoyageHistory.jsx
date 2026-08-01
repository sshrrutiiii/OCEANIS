function VoyageHistory() {
  const voyages = [
    {
      ship: "Ocean Titan",
      route: "Mumbai → Dubai",
      status: "Completed",
      eta: "5.8 Days",
    },
    {
      ship: "Sea Explorer",
      route: "Singapore → Rotterdam",
      status: "On Route",
      eta: "9.2 Days",
    },
    {
      ship: "Blue Horizon",
      route: "Shanghai → Los Angeles",
      status: "Delayed",
      eta: "13.4 Days",
    },
    {
      ship: "Atlantic Star",
      route: "Sydney → Tokyo",
      status: "Completed",
      eta: "7.1 Days",
    },
  ];

  return (
    <div className="mt-10 bg-slate-900 border border-cyan-500/20 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Voyage History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-slate-700">

              <th className="py-3">Ship</th>

              <th>Route</th>

              <th>Status</th>

              <th>ETA</th>

            </tr>

          </thead>

          <tbody>

            {voyages.map((voyage) => (

              <tr
                key={voyage.ship}
                className="border-b border-slate-800"
              >

                <td className="py-4">
                  {voyage.ship}
                </td>

                <td>
                  {voyage.route}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      voyage.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : voyage.status === "Delayed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {voyage.status}
                  </span>

                </td>

                <td>
                  {voyage.eta}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default VoyageHistory;