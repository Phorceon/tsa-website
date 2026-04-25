'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HelpingHand() {
  const handRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      handRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={handRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[(i - 2) * 0.12, 0.4, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#F8FAFC" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function InterconnectedNode() {
  const nodesRef = useRef<THREE.Group>(null);
  
  const nodePositions = useMemo(() => [
    [-2, 1, 0],
    [2, 1, 0],
    [-1.5, -1, 0],
    [1.5, -1, 0],
    [0, 0, 1],
  ], []);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const nodeColors = ['#4A90D9', '#16A34A', '#D97706', '#9333EA', '#DC2626'];

  return (
    <group ref={nodesRef}>
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
              color={nodeColors[i]}
              emissive={nodeColors[i]}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function HeartGroup() {
  const heartsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  const hearts = useMemo(() => [
    { pos: [-3, 1, 0], scale: 0.3, color: '#DC2626' },
    { pos: [3, 1, 0], scale: 0.4, color: '#DC2626' },
    { pos: [-2, -1.5, 0], scale: 0.25, color: '#DC2626' },
    { pos: [2, -1.5, 0], scale: 0.35, color: '#DC2626' },
  ], []);

  return (
    <group ref={heartsRef}>
      {hearts.map((h, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.4}>
          <mesh position={h.pos as [number, number, number]} scale={h.scale}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial color={h.color} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CoinStack() {
  const stackRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (stackRef.current) {
      stackRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={stackRef} position={[3, -1, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, i * 0.08, 0]} rotation={[Math.random() * 0.2, Math.random() * 0.2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
            <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function VolunteerScene() {
  return (
    <group>
      <HelpingHand />
      <InterconnectedNode />
      <HeartGroup />
      <CoinStack />
      <Sparkles count={50} scale={8} size={3} speed={0.5} color="#4A90D9" opacity={0.6} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#16A34A" />
    </group>
  );
}