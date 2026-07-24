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
}) {
  const globeRef = useRef();

  const targetRotation = useRef(0);

  const start = useMemo(() => {
    if (!sourcePort) return null;
    return latLngToVector3(sourcePort.lat, sourcePort.lng);
  }, [sourcePort]);

  const end = useMemo(() => {
    if (!destinationPort) return null;
    return latLngToVector3(destinationPort.lat, destinationPort.lng);
  }, [destinationPort]);

  useEffect(() => {
    if (!start || !end) return;

    const mx = (start[0] + end[0]) / 2;
    const mz = (start[2] + end[2]) / 2;

    targetRotation.current = -Math.atan2(mx, mz);

  }, [start, end]);

  useFrame(() => {
    if (!globeRef.current) return;

    if (!start || !end) {
      globeRef.current.rotation.y += 0.001;
      return;
    }

    globeRef.current.rotation.y +=
      (targetRotation.current -
        globeRef.current.rotation.y) *
      0.04;
  });

  return (
    <Globe globeRef={globeRef}>

      {start && (
        <PortMarker
          position={start}
          color="#22d3ee"
        />
      )}

      {end && (
        <PortMarker
          position={end}
          color="#ef4444"
        />
      )}

      {start && end && (
        <RouteLine
          start={start}
          end={end}
        />
      )}

    </Globe>
  );
}

function EarthRoute({
  sourcePort,
  destinationPort,
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
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default EarthRoute;