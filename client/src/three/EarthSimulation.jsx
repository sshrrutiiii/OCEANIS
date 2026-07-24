import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";

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
  progress,
  onProgress,
}) {
  const globeRef = useRef();

  const start = useMemo(() => {
    if (!sourcePort) return null;
    return latLngToVector3(sourcePort.lat, sourcePort.lng);
  }, [sourcePort]);

  const end = useMemo(() => {
    if (!destinationPort) return null;
    return latLngToVector3(destinationPort.lat, destinationPort.lng);
  }, [destinationPort]);

  useFrame(() => {
    if (!globeRef.current) return;

    // Idle rotation
    if (!playing) {
      globeRef.current.rotation.y += 0.001;
    }
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
          progress={progress}
          onProgress={onProgress}
          globeRef={globeRef}
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
  progress,
  onProgress,
}) {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 3.2],
        fov: 45,
      }}
    >
      <SpaceStars />

      <ambientLight intensity={0.65} />

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
        playing={playing}
        speed={speed}
        progress={progress}
        onProgress={onProgress}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default EarthSimulation;