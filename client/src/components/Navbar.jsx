import { FaShip, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const active =
    "text-cyan-400 border-b-2 border-cyan-400 pb-1";

  const normal =
    "text-gray-300 hover:text-cyan-400 transition";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-cyan-500/20">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <div className="bg-cyan-400 p-3 rounded-xl">

            <FaShip className="text-slate-900 text-xl" />

          </div>

          <div>

            <h1 className="text-white text-xl font-bold tracking-[0.25em]">
              OCEANIS
            </h1>

            <p className="text-xs text-cyan-300">
              Maritime Intelligence
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <ul className="hidden lg:flex gap-8 font-medium">

          <li>
            <Link
              className={location.pathname === "/" ? active : normal}
              to="/"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={
                location.pathname === "/route-planner"
                  ? active
                  : normal
              }
              to="/route-planner"
            >
              Route Planner
            </Link>
          </li>

          <li>
            <Link
              className={
                location.pathname === "/dashboard"
                  ? active
                  : normal
              }
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className={
                location.pathname === "/simulation"
                  ? active
                  : normal
              }
              to="/simulation"
            >
              Simulation
            </Link>
          </li>

          <li>
            <Link
              className={
                location.pathname === "/about"
                  ? active
                  : normal
              }
              to="/about"
            >
              About
            </Link>
          </li>

        </ul>

        {/* Right */}

        <div className="flex items-center gap-4">

          {user && (

            <>
              <div className="flex items-center gap-2 text-cyan-300">

                <FaUserCircle size={22} />

                <span>{user.fullName}</span>

              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white transition"
              >
                <FaSignOutAlt />

                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;