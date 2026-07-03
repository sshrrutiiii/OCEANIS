function RouteInfo({ routeData }) {
  return (
    <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-md shadow-xl mt-8">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        Route Information
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <p className="text-slate-400">Distance</p>
          <h3 className="text-2xl font-bold mt-2">
            {routeData.distance}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <p className="text-slate-400">ETA</p>
          <h3 className="text-2xl font-bold mt-2">
            {routeData.eta}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <p className="text-slate-400">Fuel</p>
          <h3 className="text-2xl font-bold mt-2">
            {routeData.fuel}
          </h3>
        </div>

      </div>

      <div className="bg-slate-800 rounded-xl p-6">

        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
          Shortest Route
        </h3>

        <div className="space-y-3 text-lg">
          {routeData.route.map((port, index) => (
            <div key={index}>
              <p>📍 {port}</p>

              {index !== routeData.route.length - 1 && (
                <p className="text-cyan-400">↓</p>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default RouteInfo;