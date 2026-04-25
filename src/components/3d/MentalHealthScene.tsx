'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BreathingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + 1;
      sphereRef.current.scale.set(breathe, breathe, breathe);
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (innerRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.5 + Math.PI) * 0.1 + 1;
      innerRef.current.scale.set(breathe, breathe, breathe);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#4A90D9"
            speed={1.5}
            distort={0.3}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#1E4D8C"
            emissive="#1E4D8C"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

function CalmParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    const colors = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      colors[i * 3] = 0.3 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.85;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
}

function Helix() {
  const helixRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 8;
      const radius = 0.3 + t * 0.5;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * 4,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, []);

  return (
    <group ref={helixRef} position={[3, 0, 0]}>
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function HeartbeatLine() {
  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = (i / 100 - 0.5) * 8;
      let y = 0;
      if (i > 20 && i < 25) y = 0.5;
      else if (i >= 25 && i < 30) y = -0.3;
      else if (i >= 30 && i < 35) y = 0.8;
      else if (i >= 35 && i < 40) y = -0.2;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, []);

  return (
    <group position={[-3, 0, 0]}>
      {geometry.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

function CrisisRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 2, -1]}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function MentalHealthScene() {
  return (
    <group>
      <BreathingSphere />
      <CalmParticles />
      <Helix />
      <HeartbeatLine />
      <CrisisRing />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}