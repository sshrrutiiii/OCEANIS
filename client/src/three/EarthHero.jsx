import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import Globe from "./Globe";
import SpaceStars from "./Stars";

function RotatingEarth() {
  const globeRef = useRef();

  useFrame(() => {
    if (!globeRef.current) return;

    // Smooth rotation
    globeRef.current.rotation.y += 0.002;
  });

  return (
    <Globe globeRef={globeRef} />
  );
}

function EarthHero() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3.2],
        fov: 45,
      }}
    >
      <SpaceStars />

      {/* Lights */}

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
        intensity={1.2}
      />

      {/* Earth */}

      <RotatingEarth />

      {/* Controls */}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default EarthHero;