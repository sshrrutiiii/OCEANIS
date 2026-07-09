import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

import Globe from "./Globe";
import SpaceStars from "./Stars";
import PortMarker from "./PortMarker";
import RouteLine from "./RouteLine";

import { latLngToVector3 } from "../utils/globe";

function EarthRoute({ sourcePort, destinationPort }) {
  const start = useMemo(() => {
    if (!sourcePort) return null;
    return latLngToVector3(sourcePort.lat, sourcePort.lng);
  }, [sourcePort]);

  const end = useMemo(() => {
    if (!destinationPort) return null;
    return latLngToVector3(destinationPort.lat, destinationPort.lng);
  }, [destinationPort]);

  return (
    <Canvas
      camera={{
        position: [0, 0, 3.2],
        fov: 45,
      }}
    >
      <SpaceStars />

      <ambientLight intensity={0.6} />

      <directionalLight position={[5, 3, 5]} intensity={3} />

      <directionalLight position={[-5, -3, -5]} intensity={0.8} />

      <pointLight position={[0, 0, 4]} intensity={1} />

      <Globe />

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

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default EarthRoute;