import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { generateRoutePoints } from "../utils/routeCurve";

function Ship({
  start,
  end,
  playing,
  speed,
  progress,
  onProgress,
  globeRef,
}) {
  const shipRef = useRef();

  const internalProgress = useRef(0);

  const routePoints = useMemo(() => {
    if (!start || !end) return [];
    return generateRoutePoints(start, end, 180);
  }, [start, end]);

  // Restart support
  useEffect(() => {
    internalProgress.current = progress || 0;

    if (shipRef.current && routePoints.length > 0) {
      const first = routePoints[0];

      shipRef.current.position.set(
        first[0],
        first[1],
        first[2]
      );
    }
  }, [progress, routePoints]);

  useFrame(() => {
    if (!shipRef.current) return;
    if (routePoints.length < 2) return;

    if (playing && internalProgress.current < 1) {
      internalProgress.current += 0.0015 * speed;

      if (internalProgress.current > 1) {
        internalProgress.current = 1;
      }

      if (onProgress) {
        onProgress(internalProgress.current);
      }
    }

    const index = Math.min(
      Math.floor(
        internalProgress.current *
          (routePoints.length - 1)
      ),
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

    shipRef.current.rotateX(Math.PI / 2);

    // Earth follows ship
    if (globeRef?.current) {
      const angle =
        -Math.atan2(current[0], current[2]);

      globeRef.current.rotation.y +=
        (angle - globeRef.current.rotation.y) *
        0.05;
    }
  });

  if (!start || !end) return null;

  return (
    <group ref={shipRef}>
      {/* Ship */}

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