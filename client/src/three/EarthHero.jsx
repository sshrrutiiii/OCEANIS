import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import Globe from "./Globe";
import SpaceStars from "./Stars";

function RotatingEarth() {
  const globeRef = useRef();

  useFrame(() => {
    if (!globeRef.current) return;

    globeRef.current.rotation.y += 0.002;
  });

  return <Globe globeRef={globeRef} />;
}

function EarthHero() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
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
        intensity={1.2}
      />

      <RotatingEarth />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

export default EarthHero;