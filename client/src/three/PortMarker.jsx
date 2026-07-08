function PortMarker({ position }) {
  return (
    <group position={position}>
      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={3}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner Marker */}
      <mesh>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={5}
        />
      </mesh>
    </group>
  );
}

export default PortMarker;