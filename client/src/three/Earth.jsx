import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, BackSide } from "three";
import { useRef, useMemo } from "react";

import PortMarker from "./PortMarker";
import RouteLine from "./RouteLine";
import Ship from "./Ship";
import SpaceStars from "./Stars";

import { latLngToVector3 } from "../utils/globe";

import earthImg from "../assets/earth_2k.jpg";

function Globe() {
  const texture = useLoader(TextureLoader, earthImg);
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <>
      {/* Earth */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 256, 256]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.85}
          emissive="#02111f"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={1.03}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
          side={BackSide}
        />
      </mesh>
    </>
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

  return (
    <Canvas
      camera={{
        position: [0, 0, 2.6],
        fov: 40,
      }}
    >
      {/* Background Stars */}
      <SpaceStars />

      {/* Lights */}
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.8}
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={0.8}
      />

      {/* Globe */}
      <Globe />

      {/* Source Marker */}
      {start && <PortMarker position={start} />}

      {/* Destination Marker */}
      {end && <PortMarker position={end} />}

      {/* Route */}
      {start && end && (
        <RouteLine
          start={start}
          end={end}
        />
      )}

      {/* Ship */}
      {start && end && (
        <Ship
          start={start}
          end={end}
        />
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}