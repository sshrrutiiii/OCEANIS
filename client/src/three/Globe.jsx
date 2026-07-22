import { useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide } from "three";

import earthImg from "../assets/earth_2k.jpg";

function Globe({ globeRef, children }) {
  const texture = useLoader(TextureLoader, earthImg);

  return (
    <group ref={globeRef}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[1, 256, 256]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.85}
          emissive="#02111f"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh scale={1.03}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
          side={BackSide}
        />
      </mesh>

      {/* Everything attached to Earth */}
      {children}
    </group>
  );
}

export default Globe;