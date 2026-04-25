'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// A single data node
function DataNode({ position, color, size = 0.18 }: {
  position: [number, number, number]; color: string; size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.08 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
    if (glowRef.current) {
      const gpulse = Math.sin(state.clock.elapsedTime * 0.8 + position[1]) * 0.2 + 1;
      glowRef.current.scale.set(gpulse, gpulse, gpulse);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.12} />
      </mesh>
      {/* Core node */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} roughness={0.05} metalness={0.8} />
      </mesh>
      <pointLight color={color} intensity={1.8} distance={2.5} decay={2} />
    </group>
  );
}

// Connection beam between two nodes
function Connection({ from, to, color }: {
  from: [number, number, number]; to: [number, number, number]; color: string;
}) {
  const points = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const line = useMemo(() => {
    return new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
    );
  }, [geo, color]);

  return <primitive object={line} />;
}

// Animated data stream — traveling dashes along a path
function DataStream({ from, to, color }: {
  from: [number, number, number]; to: [number, number, number]; color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const count = 8;
  const positions = useMemo(() => new Float32Array(count * 3), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.5) % 1;
    for (let i = 0; i < count; i++) {
      const frac = ((t + i / count) % 1);
      positions[i * 3] = from[0] + (to[0] - from[0]) * frac;
      positions[i * 3 + 1] = from[1] + (to[1] - from[1]) * frac;
      positions[i * 3 + 2] = from[2] + (to[2] - from[2]) * frac;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={0.06} transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

export default function ResourcesScene() {
  const nodes: { position: [number,number,number]; color: string; size?: number }[] = useMemo(() => [
    { position: [0, 0, 0], color: '#4A90D9', size: 0.28 },      // center hub
    { position: [-3, 1.5, -0.5], color: '#55efc4', size: 0.2 }, // housing
    { position: [3, 1.5, -0.5], color: '#D97706', size: 0.2 },  // food
    { position: [-2.5, -1.5, 0.5], color: '#9333EA', size: 0.2 }, // legal
    { position: [2.5, -1.5, 0.5], color: '#DC2626', size: 0.2 },  // health
    { position: [0, 2.8, -1], color: '#4A90D9', size: 0.16 },
    { position: [-1.5, -2.8, -0.5], color: '#55efc4', size: 0.14 },
    { position: [1.5, -2.8, -0.5], color: '#D97706', size: 0.14 },
    { position: [-4, 0, 0], color: '#4A90D9', size: 0.14 },
    { position: [4, 0, 0], color: '#9333EA', size: 0.14 },
  ], []);

  const connections: Array<{from: [number,number,number]; to: [number,number,number]; color: string}> = useMemo(() => [
    { from: nodes[0].position, to: nodes[1].position, color: '#55efc4' },
    { from: nodes[0].position, to: nodes[2].position, color: '#D97706' },
    { from: nodes[0].position, to: nodes[3].position, color: '#9333EA' },
    { from: nodes[0].position, to: nodes[4].position, color: '#DC2626' },
    { from: nodes[0].position, to: nodes[5].position, color: '#4A90D9' },
    { from: nodes[1].position, to: nodes[5].position, color: '#55efc4' },
    { from: nodes[2].position, to: nodes[4].position, color: '#D97706' },
    { from: nodes[3].position, to: nodes[6].position, color: '#9333EA' },
    { from: nodes[4].position, to: nodes[7].position, color: '#DC2626' },
    { from: nodes[1].position, to: nodes[8].position, color: '#55efc4' },
    { from: nodes[2].position, to: nodes[9].position, color: '#9333EA' },
  ], [nodes]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group>
      <color attach="background" args={['#020d1a']} />
      <fog attach="fog" args={['#020d1a', 10, 25]} />

      <ambientLight intensity={0.1} color="#071525" />
      <pointLight position={[0, 0, 2]} color="#4A90D9" intensity={5} distance={12} />
      <Environment preset="night" />

      <group ref={groupRef}>
        {connections.map((c, i) => (
          <Connection key={`c${i}`} {...c} />
        ))}
        {connections.map((c, i) => (
          <DataStream key={`ds${i}`} {...c} />
        ))}
        {nodes.map((n, i) => (
          <DataNode key={`n${i}`} {...n} />
        ))}
      </group>

      <Sparkles count={200} scale={[18, 12, 10]} size={1.0} speed={0.2} color="#4A90D9" opacity={0.5} />
      <Sparkles count={80} scale={[14, 8, 8]} size={0.6} speed={0.3} color="#55efc4" opacity={0.4} />
    </group>
  );
}
