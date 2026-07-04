function About() {
  const features = [
    "🌍 Interactive 3D Globe",
    "🚢 Maritime Route Planning",
    "📈 Shipping Analytics Dashboard",
    "⚡ Shortest Path using Dijkstra Algorithm",
    "🛰️ Live Fleet Tracking",
    "☕ Java Spring Boot Backend (Coming Soon)",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">
          About OCEANIS
        </h1>

        <p className="text-slate-300 text-lg leading-8 text-center mb-12">
          OCEANIS is a smart maritime navigation platform that helps optimize
          global shipping routes using graph algorithms and interactive 3D
          visualization. It combines modern web technologies with intelligent
          route planning to improve efficiency in maritime logistics.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {features.map((feature) => (
            <div
              key={feature}
              className="bg-slate-900 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400 transition"
            >
              {feature}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default About;