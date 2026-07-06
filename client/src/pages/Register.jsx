import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import earth from "../assets/earth.jpg";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/users/register",
        user
      );

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      alert("Email already exists");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-xl bg-white/10 border border-cyan-400/20 rounded-3xl p-10 shadow-2xl"
        >
          <h1 className="text-5xl font-bold text-white mb-2">
            OCEANIS
          </h1>

          <p className="text-cyan-300 mb-8">
            Maritime Intelligence Platform
          </p>

          <h2 className="text-3xl font-bold text-white mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-300 transition duration-300"
            >
              Create Account
            </button>

          </form>

          <p className="text-gray-300 mt-8 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Login
            </Link>
          </p>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex justify-center"
        >
          <img
            src={earth}
            alt="Earth"
            className="w-[500px] animate-spin"
            style={{
              animationDuration: "40s",
            }}
          />
        </motion.div>

      </div>

    </div>
  );
}

export default Register;