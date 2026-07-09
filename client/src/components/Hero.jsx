import EarthHero from "../three/EarthHero";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#020617]">

      {/* Background Glow */}
      <div className="absolute top-[-180px] left-[-150px] w-[450px] h-[450px] bg-cyan-500/20 blur-[170px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] bg-blue-700/20 blur-[170px] rounded-full"></div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-8 pt-24 pb-16 min-h-[calc(100vh-80px)] flex items-center">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left */}
          <div>

            <div className="inline-block border border-cyan-500/40 bg-cyan-500/10 rounded-full px-5 py-3 text-cyan-300 text-xl mb-8">
              AI Powered Maritime Intelligence
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">

              Smarter{" "}
              <span className="text-cyan-400">
                Ocean
              </span>

              <br />

              Navigation

            </h1>

            <p className="mt-8 text-slate-300 text-xl leading-10 max-w-xl">
              Plan optimized maritime routes, monitor ships in real time,
              visualize maritime analytics and simulate intelligent navigation
              using a modern AI-powered dashboard.
            </p>

            <div className="flex gap-6 mt-12">

              <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl transition duration-300 hover:scale-105">
                Start Planning
              </button>

              <button className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl transition duration-300">
                View Dashboard
              </button>

            </div>

          </div>

          {/* Right */}
          <div className="relative flex justify-center items-center">

            {/* Glow */}
            <div className="absolute w-[520px] h-[520px] rounded-full bg-cyan-400/20 blur-[120px]" />

            {/* Earth */}
            <div className="relative w-[480px] h-[480px] lg:w-[560px] lg:h-[560px] mx-auto">
              <EarthHero />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;