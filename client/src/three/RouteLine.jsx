import { Line } from "@react-three/drei";

function RouteLine({ start, end }) {
  if (!start || !end) return null;

  const points = [];

  for (let i = 0; i <= 50; i++) {
    const t = i / 50;

    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;
    const z = start[2] + (end[2] - start[2]) * t;

    // Lift route above the Earth
    const scale = 1 + 0.18 * Math.sin(Math.PI * t);

    points.push([
      x * scale,
      y * scale,
      z * scale,
    ]);
  }

  return (
    <Line
      points={points}
      color="#22d3ee"
      lineWidth={2.5}
    />
  );
}

export default RouteLine;