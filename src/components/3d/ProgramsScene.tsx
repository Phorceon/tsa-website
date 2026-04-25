'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// One orbital ring with orbiting activity icons (spheres)
function OrbitalRing({ radius, speed, color, count = 5, tilt = 0, size = 0.15 }: {
  radius: number; speed: number; color: string; count?: number; tilt?: number; size?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orbs = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
      groupRef.current.rotation.x = tilt;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The ring itself */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 8, 80]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
      {/* Orbiting spheres */}
      {orbs.map((frac, i) => {
        const angle = frac * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.1} metalness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

// Central pulsing energy core
function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.08 + 1;
    ref.current.scale.set(pulse, pulse, pulse);
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} floatIntensity={0.2}>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[0.7, 3]} />
        <meshStandardMaterial
          color="#9333EA"
          emissive="#9333EA"
          emissiveIntensity={1.2}
          wireframe={false}
          roughness={0.05}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Geometric floating accent tokens (sport ball, art brush, science flask, fitness ring)
function AccentToken({ position, color, shape }: {
  position: [number, number, number];
  color: string;
  shape: 'sphere' | 'box' | 'torus' | 'cone';
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.7;
  });

  const geo = shape === 'sphere' ? <sphereGeometry args={[0.28, 24, 24]} />
    : shape === 'box' ? <boxGeometry args={[0.4, 0.4, 0.4]} />
    : shape === 'torus' ? <torusGeometry args={[0.25, 0.1, 12, 32]} />
    : <coneGeometry args={[0.22, 0.5, 8]} />;

  return (
    <Float speed={2} floatIntensity={0.4} rotationIntensity={0.3}>
      <mesh ref={ref} position={position} castShadow>
        {geo}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} roughness={0.1} metalness={0.5} />
      </mesh>
    </Float>
  );
}

export default function ProgramsScene() {
  return (
    <group>
      <color attach="background" args={['#080215']} />
      <fog attach="fog" args={['#080215', 9, 24]} />

      <ambientLight intensity={0.15} color="#1a0a35" />
      <pointLight position={[0, 0, 0]} color="#9333EA" intensity={8} distance={8} />
      <pointLight position={[-4, 3, 2]} color="#4A90D9" intensity={4} distance={10} />
      <pointLight position={[4, -2, -1]} color="#D97706" intensity={4} distance={10} />
      <pointLight position={[0, 4, -2]} color="#16A34A" intensity={4} distance={10} />
      <Environment preset="night" />

      {/* Orbital rings at different angles */}
      <OrbitalRing radius={2.5} speed={0.35} color="#9333EA" count={6} tilt={0} />
      <OrbitalRing radius={3.5} speed={-0.22} color="#4A90D9" count={8} tilt={0.5} size={0.12} />
      <OrbitalRing radius={4.5} speed={0.18} color="#D97706" count={10} tilt={-0.4} size={0.1} />
      <OrbitalRing radius={1.5} speed={0.55} color="#16A34A" count={4} tilt={1.1} size={0.18} />

      {/* Central energy core */}
      <CoreSphere />

      {/* Accent tokens at corners */}
      <AccentToken position={[-4, 2, 0]} color="#D97706" shape="sphere" />
      <AccentToken position={[4, 2, 0]} color="#9333EA" shape="torus" />
      <AccentToken position={[-4, -2, 0]} color="#4A90D9" shape="box" />
      <AccentToken position={[4, -2, 0]} color="#16A34A" shape="cone" />

      <Sparkles count={150} scale={[14, 10, 10]} size={1.0} speed={0.25} color="#9333EA" opacity={0.6} />
      <Sparkles count={80} scale={[12, 8, 8]} size={0.7} speed={0.35} color="#D97706" opacity={0.4} />
    </group>
  );
}
