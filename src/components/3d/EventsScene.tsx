'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function CalendarPage({ position, rotation, isFlipping }: { position: [number, number, number]; rotation: [number, number, number]; isFlipping: boolean }) {
  const pageRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (pageRef.current && isFlipping) {
      pageRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group position={position} rotation={rotation}>
        <mesh ref={pageRef}>
          <boxGeometry args={[1.2, 1.5, 0.05]} />
          <meshStandardMaterial color="#F8FAFC" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1, 1.2]} />
          <meshStandardMaterial color="#4A90D9" />
        </mesh>
      </group>
    </Float>
  );
}

function EventSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={sphereRef} position={[3, 0, 0]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial 
          color="#16A34A" 
          wireframe
          emissive="#16A34A"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function FloatingCalendar() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

const calendarPages = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [-2 + i * 1, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      isFlipping: i === 2,
    }));
  }, []);

return (
    <group>
      {calendarPages.map((page, i) => (
        <CalendarPage key={i} position={page.position} rotation={page.rotation} isFlipping={page.isFlipping} />
      ))}
      <EventSphere />
    </group>
  );
}

function Star() {
  const starRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={starRef} position={[-3, 1.5, 0]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial 
          color="#D97706" 
          emissive="#D97706"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function PartyCone() {
  const coneRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coneRef.current) {
      coneRef.current.rotation.y = state.clock.elapsedTime * 2;
      coneRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <mesh ref={coneRef} position={[3, 1.5, 0]}>
      <coneGeometry args={[0.3, 0.6, 8]} />
      <meshStandardMaterial color="#DC2626" />
    </mesh>
  );
}

export default function EventsScene() {
  return (
    <group>
      <FloatingCalendar />
      <Star />
      <PartyCone />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4A90D9" />
    </group>
  );
}