function PortMarker({ position, color = "#22d3ee" }) {
  return (
    <group position={position}>
      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner Marker */}
      <mesh>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={5}
        />
      </mesh>
    </group>
  );
}

export default PortMarker;