import { motion } from "framer-motion";
import Badge from "./ui/Badge";
import Earth from "../three/Earth";

function Hero() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-between px-12 pt-24">

      {/* Left Side */}
      <div className="w-1/2">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-cyan-400 uppercase tracking-[0.3em] mb-4"
        >
          Global Maritime Intelligence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-bold leading-tight"
        >
          Every Voyage
          <br />
          Begins with the
          <br />
          <span className="text-cyan-400">
            Right Route.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-slate-400 text-lg leading-8 max-w-xl"
        >
          Discover the shortest maritime routes using graph algorithms,
          visualize global shipping networks, and simulate ship movement
          in real time.
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Badge icon="🌍" text="200+ Global Ports" />
          <Badge icon="🚢" text="Ship Simulation" />
          <Badge icon="⚡" text="Dijkstra Algorithm" />
          <Badge icon="☕" text="Java Spring Boot" />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex gap-5"
        >
          <button className="bg-cyan-500 px-7 py-4 rounded-xl text-slate-900 font-semibold hover:bg-cyan-400 hover:scale-105 transition duration-300">
            Launch Mission
          </button>

          <button className="border border-cyan-500 px-7 py-4 rounded-xl hover:bg-cyan-500/10 hover:scale-105 transition duration-300">
            Explore Network
          </button>
        </motion.div>

      </div>

      {/* Right Side */}
     {/* Right Side */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2 }}
  className="w-1/2 h-[650px]"
>
  <Earth />
</motion.div>

    </section>
  );
}

export default Hero;