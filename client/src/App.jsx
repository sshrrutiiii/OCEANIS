import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoutePlanner from "./pages/RoutePlanner";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// New Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main Pages */}
      <Route path="/route-planner" element={<RoutePlanner />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/about" element={<About />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;