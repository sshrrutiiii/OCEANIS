import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoutePlanner from "./pages/RoutePlanner";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/route-planner" element={<RoutePlanner />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;