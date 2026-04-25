'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ResourceBuildingProps {
  position: [number, number, number];
  type: 'house' | 'hospital' | 'school' | 'food' | 'legal';
}

function ResourceBuilding({ position, type }: ResourceBuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colors: Record<string, string> = {
    house: '#1E4D8C',
    hospital: '#DC2626',
    school: '#4A90D9',
    food: '#16A34A',
    legal: '#D97706',
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });

  const geometry = type === 'house' 
    ? <boxGeometry args={[0.8, 1.2, 0.8]} />
    : type === 'hospital'
    ? <cylinderGeometry args={[0.5, 0.6, 1.2, 8]} />
    : type === 'school'
    ? <boxGeometry args={[1, 0.8, 0.8]} />
    : type === 'food'
    ? <coneGeometry args={[0.6, 1.2, 6]} />
    : <boxGeometry args={[0.9, 1.4, 0.6]} />;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={0.8}>
        {geometry}
        <meshStandardMaterial 
          color={colors[type]} 
          metalness={0.4} 
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const lineData = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 8; i++) {
      const startX = (Math.random() - 0.5) * 10;
      const startY = (Math.random() - 0.5) * 6;
      const endX = (Math.random() - 0.5) * 10;
      const endY = (Math.random() - 0.5) * 6;
      lines.push({
        start: new THREE.Vector3(startX, startY, 0),
        end: new THREE.Vector3(endX, endY, 0),
      });
    }
    return lines;
  }, []);

  return (
    <group ref={linesRef}>
      {lineData.map((line, i) => (
        <primitive key={i} object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([line.start, line.end]),
          new THREE.LineBasicMaterial({ color: '#4A90D9', transparent: true, opacity: 0.3 })
        )} />
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper 
      args={[20, 20, '#4A90D9', '#1E4D8C']} 
      position={[0, -3, 0]} 
    />
  );
}

export default function ResourcesScene() {
  const buildings = useMemo(() => [
    { position: [-4, 0, 0] as [number, number, number], type: 'house' as const },
    { position: [-2, 0.5, 0] as [number, number, number], type: 'hospital' as const },
    { position: [0, -0.5, 0] as [number, number, number], type: 'school' as const },
    { position: [2, 0, 0] as [number, number, number], type: 'food' as const },
    { position: [4, 0.5, 0] as [number, number, number], type: 'legal' as const },
  ], []);

  return (
    <group>
      {buildings.map((b, i) => (
        <ResourceBuilding key={i} {...b} />
      ))}
      <ConnectingLines />
      <GridFloor />
    </group>
  );
}