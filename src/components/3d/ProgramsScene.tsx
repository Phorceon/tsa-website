'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ActivityDiorama({ type, position }: { type: 'sports' | 'art' | 'stem' | 'fitness'; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const colors: Record<string, string> = {
    sports: '#D97706',
    art: '#9333EA',
    stem: '#4A90D9',
    fitness: '#16A34A',
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'sports':
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case 'art':
        return <torusKnotGeometry args={[0.4, 0.15, 100, 16]} />;
      case 'stem':
        return <octahedronGeometry args={[0.6]} />;
      case 'fitness':
        return <cylinderGeometry args={[0.4, 0.4, 1, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [type]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position}>
        <mesh>
          {geometry}
          <meshStandardMaterial 
            color={colors[type]} 
            metalness={0.5} 
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.8, 1, 0.2, 32]} />
          <meshStandardMaterial color="#1E4D8C" />
        </mesh>
      </group>
    </Float>
  );
}

function BouncingBall() {
  const ballRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ballRef.current) {
      ballRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 2)) * 2;
    }
  });

  return (
    <mesh ref={ballRef} position={[-3, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#D97706" />
    </mesh>
  );
}

function Palette() {
  const paletteRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (paletteRef.current) {
      paletteRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      paletteRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  const paletteColors = ['#DC2626', '#16A34A', '#4A90D9', '#D97706'];

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={paletteRef} position={[0, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <circleGeometry args={[0.6, 32]} />
          <meshStandardMaterial color="#F8FAFC" side={THREE.DoubleSide} />
        </mesh>
        {paletteColors.map((color, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 2) * 0.3,
            Math.sin(i * Math.PI / 2) * 0.3,
            0.05
          ]}>
            <circleGeometry args={[0.08, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DNAHelix() {
  const dnaRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (dnaRef.current) {
      dnaRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const basePairs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      y: (i - 6) * 0.3,
      rotation: i * 0.5,
    }));
  }, []);

  return (
    <group ref={dnaRef} position={[3, 0, 0]}>
      {basePairs.map((bp, i) => (
        <group key={i} position={[0, bp.y, 0]} rotation={[0, bp.rotation, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#4A90D9' : '#9333EA'} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#9333EA' : '#4A90D9'} />
          </mesh>
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#6B7280" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Dumbbell() {
  const dumbbellRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (dumbbellRef.current) {
      dumbbellRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3;
      dumbbellRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.7) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={dumbbellRef} position={[-3, 2, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#6B7280" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1E4D8C" />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1E4D8C" />
        </mesh>
      </group>
    </Float>
  );
}

export default function ProgramsScene() {
  const dioramas = useMemo(() => [
    { type: 'sports' as const, position: [-3, 0, 0] as [number, number, number] },
    { type: 'art' as const, position: [-1, 0.5, 0] as [number, number, number] },
    { type: 'stem' as const, position: [1, 0, 0] as [number, number, number] },
    { type: 'fitness' as const, position: [3, 0.5, 0] as [number, number, number] },
  ], []);

  return (
    <group>
      {dioramas.map((d, i) => (
        <ActivityDiorama key={i} {...d} />
      ))}
      <BouncingBall />
      <Palette />
      <DNAHelix />
      <Dumbbell />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}