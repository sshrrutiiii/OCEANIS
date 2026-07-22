import { Line } from "@react-three/drei";
import { generateRoutePoints } from "../utils/routeCurve";

function RouteLine({ start, end }) {
  if (!start || !end) return null;

  const points = generateRoutePoints(start, end);

  return (
    <Line
      points={points}
      color="#38bdf8"
      lineWidth={3}
      transparent
      opacity={0.9}
    />
  );
}

export default RouteLine;