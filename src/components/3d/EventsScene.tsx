'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// A single glowing floating lantern
function Lantern({ position, delay = 0, color = '#ffd670' }: {
  position: [number, number, number];
  delay?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <group ref={ref} position={position}>
      {/* Lantern body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.45, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0}
        />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.22, 0.18, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      {/* Bottom fringe */}
      <mesh position={[0, -0.28, 0]}>
        <coneGeometry args={[0.18, 0.14, 12, 1, true]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      {/* Glow point light */}
      <pointLight color={color} intensity={2.5} distance={3.5} decay={2} />
    </group>
  );
}

// Ribbon / streamer forming an arc across the scene
function Streamer({ color, startAngle, radius = 5 }: { color: string; startAngle: number; radius?: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const angle = startAngle + t * Math.PI;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(t * Math.PI) * 2.5 - 1,
        Math.sin(angle) * radius * 0.4
      ));
    }
    return pts;
  }, [startAngle, radius]);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const line = useMemo(() => {
    return new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 })
    );
  }, [geo, color]);

  return <primitive object={line} />;
}

// Firework burst at a point
function Burst({ position, color }: { position: [number, number, number]; color: string }) {
  const geo = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 0.6 + Math.random() * 0.6;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.cos(theta);
      positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15 + 1;
      pointsRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <points ref={pointsRef} geometry={geo} position={position}>
      <pointsMaterial color={color} size={0.08} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

export default function EventsScene() {
  const lanterns = useMemo(() => [
    { position: [-3.5, 0, -1] as [number,number,number], delay: 0, color: '#ffd670' },
    { position: [-1.5, 1, -2] as [number,number,number], delay: 1.2, color: '#ff9f7f' },
    { position: [0.5, -0.5, -1.5] as [number,number,number], delay: 0.6, color: '#ffd670' },
    { position: [2.5, 0.5, -1] as [number,number,number], delay: 1.8, color: '#ff7eb3' },
    { position: [4, -0.2, -2] as [number,number,number], delay: 0.3, color: '#ffd670' },
    { position: [-2.5, 2, 0] as [number,number,number], delay: 0.9, color: '#ff9f7f' },
    { position: [1.5, 2.2, 0] as [number,number,number], delay: 1.5, color: '#ffd670' },
    { position: [-0.5, -1, 1] as [number,number,number], delay: 2.1, color: '#ff7eb3' },
    { position: [3.5, 1.5, 0.5] as [number,number,number], delay: 0.7, color: '#ffd670' },
  ], []);

  return (
    <group>
      <color attach="background" args={['#0a0510']} />
      <fog attach="fog" args={['#0a0510', 8, 22]} />

      <ambientLight intensity={0.2} color="#1a0a2e" />
      <Environment preset="night" />

      {/* Streamers */}
      <Streamer color="#ffd670" startAngle={0} radius={5} />
      <Streamer color="#ff9f7f" startAngle={0.7} radius={4.5} />
      <Streamer color="#ff7eb3" startAngle={1.4} radius={5.5} />

      {/* Lanterns */}
      {lanterns.map((l, i) => <Lantern key={i} {...l} />)}

      {/* Burst clusters */}
      <Burst position={[-3, 2.5, -1]} color="#ffd670" />
      <Burst position={[3, 2.8, -1.5]} color="#ff9f7f" />
      <Burst position={[0, 3.2, -2]} color="#ff7eb3" />

      {/* Ambient sparkles */}
      <Sparkles count={200} scale={[16, 10, 10]} size={1.2} speed={0.3} color="#ffd670" opacity={0.7} />
      <Sparkles count={100} scale={[14, 8, 8]} size={0.8} speed={0.4} color="#ff9f7f" opacity={0.5} />
    </group>
  );
}
