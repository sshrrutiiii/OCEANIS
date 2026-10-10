
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { generateRoutePoints } from "../utils/routeCurve";

function Ship({
  waypoints = [],
  playing,
  speed,
  onProgress,
}) {
  const shipRef = useRef();
  const progress = useRef(0);
  const lastSent = useRef(0);

  // Create a smooth curve for each leg and join the legs.
  const routePoints = useMemo(() => {
    if (waypoints.length < 2) return [];

    const points = [];

    for (let i = 0; i < waypoints.length - 1; i++) {
      const segment = generateRoutePoints(
        waypoints[i],
        waypoints[i + 1],
        120
      );

      // Avoid duplicating the joining point between segments.
      points.push(
        ...(i === 0 ? segment : segment.slice(1))
      );
    }

    return points;
  }, [waypoints]);

  useEffect(() => {
    progress.current = 0;
    lastSent.current = 0;

    if (shipRef.current && routePoints.length > 0) {
      const first = routePoints[0];

      shipRef.current.position.set(
        first[0],
        first[1],
        first[2]
      );
    }

    onProgress?.(0);
  }, [routePoints, onProgress]);

  useFrame((_, delta) => {
    if (!shipRef.current || !playing) return;
    if (routePoints.length < 2) return;
    if (progress.current >= 1) return;

    // Keep animation speed consistent across frame rates.
    progress.current = Math.min(
      1,
      progress.current + delta * 0.09 * Math.max(0, speed)
    );

    if (
      onProgress &&
      (
        Math.abs(progress.current - lastSent.current) >= 0.01 ||
        progress.current >= 1
      )
    ) {
      lastSent.current = progress.current;
      onProgress(progress.current);
    }

    const lastIndex = routePoints.length - 1;
    const positionOnPath = progress.current * lastIndex;

    const index = Math.min(
      Math.floor(positionOnPath),
      lastIndex - 1
    );

    const fraction = positionOnPath - index;
    const current = routePoints[index];
    const next = routePoints[index + 1];

    const x = current[0] + (next[0] - current[0]) * fraction;
    const y = current[1] + (next[1] - current[1]) * fraction;
    const z = current[2] + (next[2] - current[2]) * fraction;

    shipRef.current.position.set(x, y, z);
    shipRef.current.lookAt(next[0], next[1], next[2]);
    shipRef.current.rotation.z = 0;
    shipRef.current.rotateX(Math.PI / 2);
  });

  if (routePoints.length < 2) return null;

  return (
    <group ref={shipRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.025, 0.09, 20]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2}
        />
      </mesh>

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