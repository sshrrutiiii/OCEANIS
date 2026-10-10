
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";

import Globe from "./Globe";
import Ship from "./Ship";
import RouteLine from "./RouteLine";
import PortMarker from "./PortMarker";
import SpaceStars from "./Stars";

import { latLngToVector3 } from "../utils/globe";

function EarthScene({
  sourcePort,
  destinationPort,
  routePath = [],
  playing,
  speed,
  onProgress,
}) {
  const globeRef = useRef();
  const targetRotation = useRef(0);

  // Use the actual shortest path from the backend.
  const waypoints = useMemo(() => {
    if (routePath.length > 0) {
      return routePath.map((port) =>
        latLngToVector3(
          port.lat ?? port.latitude,
          port.lng ?? port.longitude
        )
      );
    }

    // Fallback to a direct route if no path is available.
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

  const start = waypoints[0] ?? null;
  const end = waypoints[waypoints.length - 1] ?? null;

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y = 0;
    }

    if (!start || !end) {
      targetRotation.current = 0;
      return;
    }

    targetRotation.current = Math.atan2(
      (start[0] + end[0]) / 2,
      (start[2] + end[2]) / 2
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

    globeRef.current.rotation.y += diff * 0.03;
  });

  return (
    <Globe globeRef={globeRef}>
      {waypoints.map((position, index) => (
        <PortMarker
          key={`port-${index}`}
          position={position}
          color={
            index === 0
              ? "#22d3ee"
              : index === waypoints.length - 1
              ? "#ef4444"
              : "#fbbf24"
          }
        />
      ))}

      {waypoints.slice(0, -1).map((point, index) => (
        <RouteLine
          key={`segment-${index}`}
          start={point}
          end={waypoints[index + 1]}
        />
      ))}

      {waypoints.length >= 2 && (
        <Ship
          waypoints={waypoints}
          playing={playing}
          speed={speed}
          onProgress={onProgress}
        />
      )}
    </Globe>
  );
}

function EarthSimulation({
  sourcePort,
  destinationPort,
  routePath = [],
  playing,
  speed,
  onProgress,
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
        position={[-4, -2, -3]}
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
        playing={playing}
        speed={speed}
        onProgress={onProgress}
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

export default EarthSimulation;