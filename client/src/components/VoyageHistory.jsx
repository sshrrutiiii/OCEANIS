import { useEffect, useState } from "react";
import { getAllVoyages } from "../services/voyageService";

function VoyageHistory() {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVoyages() {
      try {
        const data = await getAllVoyages();
        setVoyages(data);
      } catch (error) {
        console.error("Failed to load voyages:", error);
        setError("Unable to load voyage history.");
      } finally {
        setLoading(false);
      }
    }

    loadVoyages();
  }, []);

  const formatEta = (hours) => {
    if (hours == null) {
      return "—";
    }

    const days = hours / 24;

    return `${days.toFixed(1)} Days`;
  };

  return (
    <div className="mt-10 bg-slate-900 border border-cyan-500/20 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Voyage History
      </h2>

      {loading && (
        <p className="text-slate-400">
          Loading voyage history...
        </p>
      )}

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && voyages.length === 0 && (
        <p className="text-slate-400">
          No voyages found.
        </p>
      )}

      {!loading && !error && voyages.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="text-left border-b border-slate-700">

                <th className="py-3">
                  Ship
                </th>

                <th>
                  Route
                </th>

                <th>
                  Status
                </th>

                <th>
                  ETA
                </th>

              </tr>
            </thead>

            <tbody>

              {voyages.map((voyage) => (

                <tr
                  key={voyage.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-4">
                    —
                  </td>

                  <td>
                    {voyage.source} → {voyage.destination}
                  </td>

                  <td>

                    <span className="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400">
                      Saved
                    </span>

                  </td>

                  <td>
                    {formatEta(voyage.etaHours)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default VoyageHistory;