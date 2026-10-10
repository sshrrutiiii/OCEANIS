import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";

import Globe from "./Globe";
import SpaceStars from "./Stars";
import PortMarker from "./PortMarker";
import RouteLine from "./RouteLine";

import { latLngToVector3 } from "../utils/globe";

function EarthScene({
  sourcePort,
  destinationPort,
  routePath = [],
}) {
  const globeRef = useRef();
  const targetRotation = useRef(0);

  // Convert backend route points into 3D globe coordinates.
  const pathPoints = useMemo(() => {
    if (routePath.length > 0) {
      return routePath.map((port) =>
        latLngToVector3(
          port.lat ?? port.latitude,
          port.lng ?? port.longitude
        )
      );
    }

    // Fallback: show a direct route if no calculated path exists.
    if (sourcePort && destinationPort) {
      return [
        latLngToVector3(
          sourcePort.latitude,
          sourcePort.longitude
        ),
        latLngToVector3(
          destinationPort.latitude,
          destinationPort.longitude
        ),
      ];
    }

    return [];
  }, [routePath, sourcePort, destinationPort]);

  const start = pathPoints[0] ?? null;
  const end = pathPoints[pathPoints.length - 1] ?? null;

  useEffect(() => {
    if (!start || !end) return;

    const center = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2,
    ];

    targetRotation.current = Math.atan2(
      center[0],
      center[2]
    );
  }, [start, end]);

  useFrame(() => {
    if (!globeRef.current) return;

    if (!start || !end) {
      globeRef.current.rotation.y += 0.001;
      return;
    }

    const current = globeRef.current.rotation.y;
    let diff = targetRotation.current - current;

    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;

    globeRef.current.rotation.y += diff * 0.06;
  });

  return (
    <Globe globeRef={globeRef}>
      {/* Source port */}
      {start && (
        <PortMarker
          position={start}
          color="#22d3ee"
        />
      )}

      {/* Destination port */}
      {end && pathPoints.length > 1 && (
        <PortMarker
          position={end}
          color="#ef4444"
        />
      )}

      {/* Intermediate ports */}
      {pathPoints.slice(1, -1).map((position, index) => (
        <PortMarker
          key={`route-port-${index}`}
          position={position}
          color="#fbbf24"
        />
      ))}

      {/* Draw each segment of the calculated shortest path */}
      {pathPoints.slice(0, -1).map((point, index) => (
        <RouteLine
          key={`route-segment-${index}`}
          start={point}
          end={pathPoints[index + 1]}
        />
      ))}
    </Globe>
  );
}

function EarthRoute({
  sourcePort,
  destinationPort,
  routePath = [],
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3.2],
        fov: 45,
      }}
    >
      <SpaceStars />

      <ambientLight intensity={0.7} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-5, -3, -5]}
        intensity={1}
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={1}
      />

      <EarthScene
        sourcePort={sourcePort}
        destinationPort={destinationPort}
        routePath={routePath}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default EarthRoute;
