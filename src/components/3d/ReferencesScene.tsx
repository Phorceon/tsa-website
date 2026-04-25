'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingDocument({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const docRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (docRef.current) {
      docRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      docRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={docRef} position={position} rotation={rotation}>
        <boxGeometry args={[0.8, 1.1, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  );
}

function StackOfPapers() {
  const stackRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (stackRef.current) {
      stackRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      stackRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={stackRef}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 0.05, 0]} rotation={[0, i * 0.1, 0]}>
          <boxGeometry args={[0.7, 1, 0.03]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
      ))}
    </group>
  );
}

function Checkmark() {
  const checkRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (checkRef.current) {
      checkRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={checkRef} position={[2, 1, 0]}>
        <mesh rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#16A34A" emissive="#16A34A" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.2, -0.1, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#16A34A" emissive="#16A34A" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Certificate() {
  const certRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (certRef.current) {
      certRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={certRef} position={[-2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.02]} />
          <meshStandardMaterial color="#1E4D8C" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1, 0.7]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
      </group>
    </Float>
  );
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={globeRef} position={[-2, 1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#4A90D9" 
          wireframe
          emissive="#4A90D9"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Award() {
  const awardRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (awardRef.current) {
      awardRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      awardRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={awardRef} position={[2, 1.5, 0]}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.4, 0.1, 5]} />
        <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 5]} />
        <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function ReferencesScene() {
  const documents = useMemo(() => [
    { position: [-1.5, 0.5, 0] as [number, number, number], rotation: [0.2, 0.3, 0] as [number, number, number], color: '#F8FAFC' },
    { position: [1.5, 0.5, 0] as [number, number, number], rotation: [-0.2, -0.3, 0] as [number, number, number], color: '#E8F0F8' },
    { position: [0, -0.5, 0.5] as [number, number, number], rotation: [0, 0.5, 0.1] as [number, number, number], color: '#F3F4F6' },
  ], []);

  return (
    <group>
      {documents.map((doc, i) => (
        <FloatingDocument key={i} {...doc} />
      ))}
      <StackOfPapers />
      <Checkmark />
      <Certificate />
      <Globe />
      <Award />
      <Sparkles count={30} scale={6} size={2} speed={0.3} color="#D97706" />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}