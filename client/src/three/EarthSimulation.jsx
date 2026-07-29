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
  playing,
  speed,
  onProgress,
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
    if (globeRef.current) {
      globeRef.current.rotation.y = 0;
    }

    if (!start || !end) {
      targetRotation.current = 0;
      return;
    }

    const centerX = (start[0] + end[0]) / 2;
    const centerZ = (start[2] + end[2]) / 2;

    targetRotation.current = Math.atan2(centerX, centerZ);
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

      {start && end && (
        <Ship
          start={start}
          end={end}
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