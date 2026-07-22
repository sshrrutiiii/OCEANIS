import { Line } from "@react-three/drei";

function RouteLine({ start, end }) {
  if (!start || !end) return null;

  const points = [];
  const segments = 120;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    // Linear interpolation
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;
    const z = start[2] + (end[2] - start[2]) * t;

    // Smooth arc
    const arcHeight = 0.25 * Math.sin(Math.PI * t);

    // Normalize direction
    const length = Math.sqrt(x * x + y * y + z * z);

    points.push([
      (x / length) * (1 + arcHeight),
      (y / length) * (1 + arcHeight),
      (z / length) * (1 + arcHeight),
    ]);
  }

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