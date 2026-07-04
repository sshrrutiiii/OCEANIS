import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, useMemo } from "react";

import ports from "../data/ports";
import PortMarker from "./PortMarker";
import RouteLine from "./RouteLine";
import Ship from "./Ship";
import { latLngToVector3 } from "../utils/globe";

import earthImg from "../assets/earth.jpg";
import SpaceStars from "./Stars";

function Globe() {
  const texture = useLoader(TextureLoader, earthImg);
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}

export default function Earth({ sourcePort, destinationPort }) {

  const start = useMemo(() => {
    if (!sourcePort) return null;
    return latLngToVector3(sourcePort.lat, sourcePort.lng);
  }, [sourcePort]);

  const end = useMemo(() => {
    if (!destinationPort) return null;
    return latLngToVector3(destinationPort.lat, destinationPort.lng);
  }, [destinationPort]);

  const shipPosition = useMemo(() => {
    if (!start || !end) return null;

    return [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2,
    ];
  }, [start, end]);

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <SpaceStars />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Globe />

      {start && end && (
        <RouteLine start={start} end={end} />
      )}

      {start && end && (
        <Ship
          start={start}
          end={end}
        />
      )}
      {ports.map((port) => (
        <PortMarker
          key={port.id}
          position={latLngToVector3(port.lat, port.lng)}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}