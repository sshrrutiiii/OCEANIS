import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Ship({ start, end, playing, speed }) {
  const shipRef = useRef();
  const progress = useRef(0);

  useFrame(() => {
    if (!shipRef.current || !start || !end || !playing) return;

    progress.current += 0.001 * speed;

    if (progress.current > 1) {
      progress.current = 1;
    }

    shipRef.current.position.lerpVectors(
      { x: start[0], y: start[1], z: start[2] },
      { x: end[0], y: end[1], z: end[2] },
      progress.current
    );
  });

  if (!start || !end) return null;

  return (
    <mesh
      ref={shipRef}
      position={start}
    >
      <coneGeometry args={[0.03, 0.08, 12]} />
      <meshStandardMaterial color="#22d3ee" />
    </mesh>
  );
}

export default Ship;