import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import earth from "../assets/earth.jpg";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617]">

      {/* Background Glow */}
      <div className="absolute top-[-180px] left-[-150px] w-[450px] h-[450px] bg-cyan-500/20 blur-[170px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] bg-blue-700/20 blur-[170px] rounded-full"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-8 pt-28 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 mb-8">
              AI Powered Maritime Intelligence
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Smarter
              <span className="text-cyan-400"> Ocean </span>
              Navigation
            </h1>

            <p className="text-slate-400 text-lg mt-8 leading-8 max-w-xl">
              Plan optimized maritime routes, monitor ships in real time,
              visualize maritime analytics and simulate intelligent navigation
              using a modern AI-powered dashboard.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/route-planner"
                className="px-7 py-4 rounded-xl bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400 transition duration-300"
              >
                Start Planning
              </Link>

              <Link
                to="/dashboard"
                className="px-7 py-4 rounded-xl border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 transition duration-300"
              >
                View Dashboard
              </Link>

            </div>

          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >

            <div className="relative">

              <div className="absolute inset-0 bg-cyan-500 blur-[120px] opacity-30 rounded-full"></div>

              <img
                src={earth}
                alt="Earth"
                className="relative w-[520px] rounded-full animate-spin"
                style={{
                  animationDuration: "80s",
                }}
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;