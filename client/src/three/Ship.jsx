import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { generateRoutePoints } from "../utils/routeCurve";

function Ship({
  start,
  end,
  playing,
  speed,
  onProgress,
}) {
  const shipRef = useRef();

  const progress = useRef(0);
  const lastSent = useRef(0);

  const routePoints = useMemo(() => {
    if (!start || !end) return [];
    return generateRoutePoints(start, end, 120);
  }, [start, end]);

  useFrame(() => {
    if (!shipRef.current) return;
    if (!playing) return;
    if (routePoints.length === 0) return;

    // Move ship
    progress.current += 0.0015 * speed;

    if (progress.current > 1) {
      progress.current = 1;
    }

    // Update progress every 1%
    if (
      onProgress &&
      Math.abs(progress.current - lastSent.current) >= 0.01
    ) {
      lastSent.current = progress.current;
      onProgress(progress.current);
    }

    const index = Math.min(
      Math.floor(progress.current * (routePoints.length - 1)),
      routePoints.length - 2
    );

    const current = routePoints[index];
    const next = routePoints[index + 1];

    shipRef.current.position.set(
      current[0],
      current[1],
      current[2]
    );

    shipRef.current.lookAt(
      next[0],
      next[1],
      next[2]
    );

    // Keep ship pointing forward
    shipRef.current.rotation.z = 0;
    shipRef.current.rotateX(Math.PI / 2);
  });

  if (!start || !end) return null;

  return (
    <group ref={shipRef}>
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