import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef } from "react";

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

export default function Earth() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <SpaceStars />

      <ambientLight intensity={1} />

      <directionalLight position={[5, 5, 5]} intensity={2} />

      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Globe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}