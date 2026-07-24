import { useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide } from "three";

import earthImg from "../assets/earth_2k.jpg";

function Globe({
  globeRef,
  rotation = [0, 0, 0],
  children,
}) {
  const texture = useLoader(
    TextureLoader,
    earthImg
  );

  return (
    <group
      ref={globeRef}
      rotation={rotation}
    >
      {/* Earth */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 256, 256]} />

        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.9}
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
          opacity={0.12}
          side={BackSide}
        />
      </mesh>

      {/* Soft outer glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.04}
          side={BackSide}
        />
      </mesh>

      {/* Future Layers */}

      {/* Weather Clouds */}
      {/*
      <CloudLayer />
      */}

      {/* AI Weather Overlay */}
      {/*
      <WeatherLayer />
      */}

      {/* Shipping Density */}
      {/*
      <TrafficLayer />
      */}

      {/* Ports / Routes / Ships */}
      {children}
    </group>
  );
}

export default Globe;