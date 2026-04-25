'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Calm animated water plane
function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      // animate UV offset to give flowing feel
      (meshRef.current.material as THREE.MeshStandardMaterial).envMapIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.5, -2]}>
      <planeGeometry args={[20, 18, 80, 80]} />
      <MeshDistortMaterial
        color="#0a2a4a"
        emissive="#0a2a4a"
        emissiveIntensity={0.3}
        speed={0.8}
        distort={0.18}
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Rising light particle — bioluminescent
function LightParticle({ x, z, delay }: { x: number; z: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const colors = ['#56d8e4', '#7ee8fa', '#80ff72', '#a8edea'];
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const startY = useMemo(() => -1.5 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + delay) % 5;
    ref.current.position.y = startY + t;
    const wane = 1 - Math.max(0, (t - 3) / 2);
    ref.current.material instanceof THREE.MeshStandardMaterial &&
      (ref.current.material.emissiveIntensity = 2.5 * wane);
    ref.current.scale.set(wane, wane, wane);
  });

  return (
    <mesh ref={ref} position={[x, startY, z]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
    </mesh>
  );
}

// The calm breathing central orb
function BreathingOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.12 + 1;
    ref.current.scale.set(breathe, breathe, breathe);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
  });

  return (
    <group>
      {/* Outer glow shell — large transparent */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#56d8e4"
          emissive="#56d8e4"
          emissiveIntensity={0.15}
          transparent
          opacity={0.07}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      {/* Mid shell */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#80ff72"
          emissive="#80ff72"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
      {/* Core */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <MeshDistortMaterial
          color="#56d8e4"
          emissive="#56d8e4"
          emissiveIntensity={0.8}
          speed={1.2}
          distort={0.22}
          metalness={0.6}
          roughness={0.1}
          transparent
          opacity={0.88}
        />
      </mesh>
      <pointLight color="#56d8e4" intensity={4} distance={7} decay={2} />
    </group>
  );
}

export default function MentalHealthScene() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      x: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 8,
      delay: i * 0.2,
    })), []);

  return (
    <group>
      <color attach="background" args={['#020b14']} />
      <fog attach="fog" args={['#020b14', 10, 24]} />

      <ambientLight intensity={0.12} color="#071525" />
      <directionalLight position={[0, 8, 4]} intensity={0.5} color="#56d8e4" />
      <pointLight position={[-4, 3, 2]} color="#80ff72" intensity={3} distance={10} />
      <pointLight position={[4, 2, -2]} color="#56d8e4" intensity={3} distance={10} />
      <Environment preset="night" />

      <WaterSurface />
      <BreathingOrb />

      {particles.map((p, i) => <LightParticle key={i} {...p} />)}

      <Sparkles count={120} scale={[16, 8, 10]} size={1.5} speed={0.15} color="#56d8e4" opacity={0.5} />
      <Sparkles count={60} scale={[12, 6, 8]} size={0.9} speed={0.2} color="#80ff72" opacity={0.4} />
    </group>
  );
}