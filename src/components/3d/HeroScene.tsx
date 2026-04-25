'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Clone, Float, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type MotionValueLike = {
  get: () => number;
};

type BuildingModelProps = {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smootherStep(value: number) {
  const t = clamp01(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function interpolateWaypoints(points: THREE.Vector3[], progress: number) {
  if (points.length === 1) return points[0];
  const scaled = clamp01(progress) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const localT = smootherStep(scaled - index);
  return points[index].clone().lerp(points[index + 1], localT);
}

function BuildingModel({ url, position, rotation = [0, 0, 0], scale = 1 }: BuildingModelProps) {
  const gltf = useGLTF(url);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Clone object={gltf.scene} />
    </group>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: MotionValueLike }) {
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const cameraPoints = useMemo(
    () => [
      new THREE.Vector3(0.85, 2.05, 7.8),
      new THREE.Vector3(4.15, 2.18, 5.8),
      new THREE.Vector3(1.85, 3.05, -2.9),
      new THREE.Vector3(3.95, 2.42, -8.9),
    ],
    []
  );
  const lookAtPoints = useMemo(
    () => [
      new THREE.Vector3(2.35, 0.55, 0.9),
      new THREE.Vector3(4.75, 0.85, 0.75),
      new THREE.Vector3(0.55, 0.3, -9.1),
      new THREE.Vector3(5.15, 1, -15.1),
    ],
    []
  );

  useFrame((state, delta) => {
    const progress = smootherStep(scrollProgress.get());
    target.copy(interpolateWaypoints(cameraPoints, progress));
    lookAt.copy(interpolateWaypoints(lookAtPoints, progress));

    const damping = 1 - Math.exp(-delta * 3.2);
    state.camera.position.lerp(target, damping);
    state.camera.lookAt(lookAt);
  });

  return null;
}

function DistrictGround() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.62, -5.8]}>
        <planeGeometry args={[20, 32]} />
        <meshStandardMaterial color="#162635" roughness={0.96} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.58, -5.8]}>
        <planeGeometry args={[4.2, 27]} />
        <meshStandardMaterial color="#445869" roughness={0.88} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.56, -5.8]}>
        <planeGeometry args={[1.05, 27]} />
        <meshStandardMaterial color="#ffd67a" roughness={0.78} />
      </mesh>
    </group>
  );
}

function BusinessesDistrict() {
  return (
    <group position={[4.65, -1.58, 0.7]}>
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb"
        position={[0, 0, 0]}
        rotation={[0, -0.18, 0]}
        scale={1.18}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-b.glb"
        position={[-1.1, 0, 1.6]}
        rotation={[0, -0.15, 0]}
        scale={1.15}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-a.glb"
        position={[-0.2, 0, 1.35]}
        rotation={[0, 0.18, 0]}
        scale={1.15}
      />
      <Float speed={1.1} floatIntensity={0.14} rotationIntensity={0.03}>
        <group position={[0.05, 3.4, 0.6]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#7ec8ff" emissive="#4A90D9" emissiveIntensity={1.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function NonprofitDistrict() {
  return (
    <group position={[0.35, -1.58, -9.2]}>
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-t.glb"
        position={[0, 0, 0]}
        rotation={[0, -0.22, 0]}
        scale={1.48}
      />
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb"
        position={[-1.7, 0, 1.5]}
        rotation={[0, 0.3, 0]}
        scale={1.45}
      />
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb"
        position={[1.45, 0, 1.1]}
        rotation={[0, -0.25, 0]}
        scale={1.3}
      />
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/path-stones-short.glb"
        position={[0.15, 0.01, 1.42]}
        scale={1.5}
      />
      <Float speed={1.2} floatIntensity={0.15} rotationIntensity={0.03}>
        <group position={[0.1, 2.75, 0.85]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#ffb1a8" emissive="#ff7675" emissiveIntensity={1.35} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function ServicesDistrict() {
  return (
    <group position={[5.2, -1.58, -15.4]}>
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb"
        position={[0, 0, 0]}
        rotation={[0, -0.38, 0]}
        scale={1.22}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb"
        position={[0.45, 0, 1.72]}
        rotation={[0, -0.38, 0]}
        scale={1.22}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb"
        position={[0.45, 0.95, 1.72]}
        rotation={[0, -0.38, 0]}
        scale={1.22}
      />
      <Float speed={1.05} floatIntensity={0.13} rotationIntensity={0.03}>
        <group position={[0.15, 4.05, 0.65]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#8af3d8" emissive="#55efc4" emissiveIntensity={1.35} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function StoryGuide() {
  return (
    <group>
      <Sparkles count={70} scale={[16, 7, 18]} size={1.25} speed={0.18} color="#bfe7ff" position={[0, 2.2, -6]} />
    </group>
  );
}

export default function HeroScene({ scrollProgress }: { scrollProgress: MotionValueLike }) {
  return (
    <>
      <color attach="background" args={['#04111f']} />
      <fog attach="fog" args={['#04111f', 8, 24]} />
      <ambientLight intensity={1.05} color="#cfe4ff" />
      <hemisphereLight args={['#dff5ff', '#162229', 1.55]} />
      <directionalLight position={[-6, 9, 6]} intensity={2.4} color="#fff1cb" castShadow />
      <pointLight position={[-4.3, 3.2, 1.6]} intensity={4.2} color="#4A90D9" distance={9} />
      <pointLight position={[0, 2.8, -5.2]} intensity={4.2} color="#ff8f85" distance={9} />
      <pointLight position={[4.3, 3.3, -11.6]} intensity={4.4} color="#55efc4" distance={10} />

      <CameraRig scrollProgress={scrollProgress} />
      <DistrictGround />
      <StoryGuide />
      <BusinessesDistrict />
      <NonprofitDistrict />
      <ServicesDistrict />
    </>
  );
}

useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-a.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-b.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-t.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/path-stones-short.glb');
