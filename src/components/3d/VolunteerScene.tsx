'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Rising ember/firefly particle
function Ember({ x, z, delay, color }: { x: number; z: number; delay: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.25 + Math.random() * 0.4, []);
  const startY = useMemo(() => -2 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + delay) % 6;
    ref.current.position.y = startY + t;
    ref.current.position.x = x + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.3;
    const wane = 1 - Math.max(0, (t - 4) / 2);
    if (ref.current.material instanceof THREE.MeshStandardMaterial) {
      ref.current.material.emissiveIntensity = 3 * wane;
      ref.current.material.opacity = wane;
    }
    ref.current.scale.set(wane * 0.8, wane * 0.8, wane * 0.8);
  });

  return (
    <mesh ref={ref} position={[x, startY, z]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={1} />
    </mesh>
  );
}

// Heart shape using tube geometry along a heart curve
function Heart({ position, color, scale = 1 }: {
  position: [number, number, number]; color: string; scale?: number;
}) {
  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push(new THREE.Vector3(x * 0.028 * scale, y * 0.028 * scale, 0));
    }
    return new THREE.CatmullRomCurve3(pts, true);
  }, [scale]);

  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
      const pulse = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.08 + 1;
      ref.current.scale.z = pulse;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <tubeGeometry args={[curve, 80, 0.025 * scale, 8, true]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} roughness={0.1} metalness={0.3} />
    </mesh>
  );
}

// People cluster — simplified glowing humanoid icon form (capsule + sphere)
function PersonIcon({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.05}>
      <group position={position}>
        {/* Head */}
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.38, 8, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} transparent opacity={0.85} />
        </mesh>
        <pointLight color={color} intensity={1.5} distance={2} decay={2} />
      </group>
    </Float>
  );
}

export default function VolunteerScene() {
  const embers = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    x: (Math.random() - 0.5) * 14,
    z: (Math.random() - 0.5) * 8,
    delay: i * 0.11,
    color: Math.random() > 0.5 ? '#ff7675' : '#D97706',
  })), []);

  const people: { position: [number, number, number]; color: string }[] = [
    { position: [-3.5, 0, 0], color: '#4A90D9' },
    { position: [-1.5, 0.3, 0.5], color: '#ff7675' },
    { position: [0.5, -0.2, -0.5], color: '#D97706' },
    { position: [2.5, 0.4, 0.3], color: '#55efc4' },
    { position: [4, 0, 0], color: '#9333EA' },
    { position: [-2.5, 0.8, -1], color: '#ff7675' },
    { position: [1.5, 0.6, 1], color: '#D97706' },
  ];

  return (
    <group>
      <color attach="background" args={['#0d0508']} />
      <fog attach="fog" args={['#0d0508', 10, 25]} />

      <ambientLight intensity={0.15} color="#1a0808" />
      <pointLight position={[0, 3, 2]} color="#ff7675" intensity={5} distance={12} />
      <pointLight position={[-3, 2, -1]} color="#D97706" intensity={4} distance={10} />
      <pointLight position={[3, 1, 1]} color="#4A90D9" intensity={3} distance={10} />
      <Environment preset="night" />

      {/* Rising ember particles */}
      {embers.map((e, i) => <Ember key={i} {...e} />)}

      {/* Heart shapes floating in the scene */}
      <Heart position={[0, 0.8, 0]} color="#ff7675" scale={1.8} />
      <Heart position={[-3, 1.5, -1]} color="#D97706" scale={0.9} />
      <Heart position={[3.2, 1.2, -0.5]} color="#ff7675" scale={1.1} />

      {/* People icons */}
      {people.map((p, i) => <PersonIcon key={i} {...p} />)}

      <Sparkles count={150} scale={[16, 10, 10]} size={1.5} speed={0.3} color="#ff7675" opacity={0.6} />
      <Sparkles count={80} scale={[14, 8, 8]} size={0.8} speed={0.4} color="#D97706" opacity={0.4} />
    </group>
  );
}
