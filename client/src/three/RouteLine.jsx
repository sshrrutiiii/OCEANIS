import { Line } from "@react-three/drei";

function RouteLine({ start, end }) {
  if (!start || !end) return null;

  const mid = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + 0.35,
    (start[2] + end[2]) / 2,
  ];

  return (
    <Line
      points={[start, mid, end]}
      color="#22d3ee"
      lineWidth={3}
    />
  );
}

export default RouteLine;