import { FaShip } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-cyan-500 p-2 rounded-xl">
            <FaShip className="text-slate-900 text-xl" />
          </div>

          <div>
            <h1 className="text-white font-bold tracking-[0.25em]">
              OCEANIS
            </h1>
            <p className="text-slate-400 text-xs">
              Maritime Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8 text-slate-300 font-medium">
          <li>
            <Link to="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/route-planner" className="hover:text-cyan-400 transition">
              Route Planner
            </Link>
          </li>

          <li>
            <Link to="/dashboard" className="hover:text-cyan-400 transition">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/simulation" className="hover:text-cyan-400 transition">
              Simulation
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-cyan-400 transition">
              About
            </Link>
          </li>
        </ul>

        {/* Button */}
        <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2 rounded-lg font-semibold transition">
          Launch
        </button>
      </nav>
    </header>
  );
}

export default Navbar;