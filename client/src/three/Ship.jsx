import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Ship({
  start,
  end,
  playing,
  speed,
  onProgress,
}) {
  const shipRef = useRef();
  const progress = useRef(0);

  useFrame(() => {
    if (!shipRef.current || !start || !end) return;
    if (!playing) return;

    progress.current += 0.0015 * speed;

    if (progress.current >= 1) {
      progress.current = 1;
    }

    // Parent ko progress bhejo
    if (onProgress) {
      onProgress(progress.current);
    }

    const x = start[0] + (end[0] - start[0]) * progress.current;
    const y = start[1] + (end[1] - start[1]) * progress.current;
    const z = start[2] + (end[2] - start[2]) * progress.current;

    shipRef.current.position.set(x, y, z);
  });

  if (!start || !end) return null;

  return (
    <group ref={shipRef} position={start}>
      {/* Ship Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.025, 0.09, 20]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.015, 20, 20]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#67e8f9"
          emissiveIntensity={5}
        />
      </mesh>
    </group>
  );
}

export default Ship;