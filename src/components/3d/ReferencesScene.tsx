'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// A floating book / document slab with glowing edges
function FloatingBook({ position, rotation, color, width = 0.7, height = 0.95, delay = 0 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  width?: number;
  height?: number;
  delay?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.1;
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.12;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Book cover */}
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.06]} />
        <meshStandardMaterial
          color="#0d1b2e"
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Glowing spine */}
      <mesh position={[-(width / 2) + 0.01, 0, 0]}>
        <boxGeometry args={[0.02, height, 0.065]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>
      {/* Text lines on cover */}
      {[0.28, 0.1, -0.05, -0.2].map((y, i) => (
        <mesh key={i} position={[0.05, y, 0.034]}>
          <boxGeometry args={[width * 0.6, 0.02, 0.002]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
      ))}
      <pointLight color={color} intensity={0.8} distance={2} decay={2} />
    </group>
  );
}

// Citation particle — small glowing text-dot that orbits
function CitationOrb({ orbitRadius, speed, color, yOffset }: {
  orbitRadius: number; speed: number; color: string; yOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * orbitRadius;
    ref.current.position.z = Math.sin(t) * orbitRadius;
    ref.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.06, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

// Central rotating pile of books
function BookStack() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={0.8} floatIntensity={0.15}>
      <group ref={ref}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.09 - 0.14, 0]} rotation={[0, i * 0.35, 0]} castShadow>
            <boxGeometry args={[0.9, 0.08, 0.65]} />
            <meshStandardMaterial
              color="#0a1628"
              emissive={['#D97706', '#4A90D9', '#9333EA', '#55efc4'][i]}
              emissiveIntensity={0.5}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function ReferencesScene() {
  const books = useMemo(() => [
    { position: [-3.2, 0.3, -0.5] as [number,number,number], rotation: [0, 0.4, 0.1] as [number,number,number], color: '#D97706', delay: 0 },
    { position: [3, 0.5, -1] as [number,number,number], rotation: [0, -0.5, -0.05] as [number,number,number], color: '#4A90D9', delay: 1.2 },
    { position: [-1.5, 1.5, -1.5] as [number,number,number], rotation: [0.1, 0.6, 0.08] as [number,number,number], color: '#9333EA', width: 0.6, delay: 0.7 },
    { position: [2, -0.8, 0.5] as [number,number,number], rotation: [-0.05, -0.3, 0.06] as [number,number,number], color: '#55efc4', delay: 1.8 },
    { position: [-3.5, -1, 0.2] as [number,number,number], rotation: [0.08, 0.2, -0.08] as [number,number,number], color: '#D97706', width: 0.55, delay: 0.4 },
    { position: [0.5, 2, -2] as [number,number,number], rotation: [0.15, -0.4, 0.05] as [number,number,number], color: '#4A90D9', delay: 2 },
  ], []);

  const citOrbs = useMemo(() => [
    { orbitRadius: 2.2, speed: 0.5, color: '#D97706', yOffset: 0.5 },
    { orbitRadius: 3.0, speed: -0.35, color: '#4A90D9', yOffset: -0.3 },
    { orbitRadius: 1.5, speed: 0.7, color: '#9333EA', yOffset: 1.0 },
    { orbitRadius: 3.8, speed: 0.25, color: '#55efc4', yOffset: -0.8 },
    { orbitRadius: 2.6, speed: -0.55, color: '#D97706', yOffset: 0.1 },
  ], []);

  return (
    <group>
      <color attach="background" args={['#04080f']} />
      <fog attach="fog" args={['#04080f', 10, 24]} />

      <ambientLight intensity={0.12} color="#0a0818" />
      <pointLight position={[0, 2, 2]} color="#D97706" intensity={5} distance={12} />
      <pointLight position={[-3, 3, 0]} color="#4A90D9" intensity={3} distance={10} />
      <pointLight position={[3, -1, 0]} color="#9333EA" intensity={3} distance={10} />
      <Environment preset="night" />

      {/* Books */}
      {books.map((b, i) => <FloatingBook key={i} {...b} />)}

      {/* Central book stack */}
      <BookStack />

      {/* Citation orbs orbiting the center */}
      {citOrbs.map((o, i) => <CitationOrb key={i} {...o} />)}

      <Sparkles count={120} scale={[16, 10, 10]} size={1.2} speed={0.2} color="#D97706" opacity={0.7} />
      <Sparkles count={60} scale={[14, 8, 8]} size={0.8} speed={0.3} color="#4A90D9" opacity={0.4} />
    </group>
  );
}