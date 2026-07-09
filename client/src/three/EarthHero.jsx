import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import Globe from "./Globe";
import SpaceStars from "./Stars";

function RotatingEarth() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <Globe />
    </group>
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

      <ambientLight intensity={0.6} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.8}
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={1}
      />

      <RotatingEarth />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default EarthHero;