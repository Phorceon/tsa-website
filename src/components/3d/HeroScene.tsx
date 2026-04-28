'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Clone, Float, Sparkles, Stars, useGLTF } from '@react-three/drei';
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

function BuildingModel({ url, position, rotation = [0, 0, 0], scale = 1 }: BuildingModelProps) {
  const gltf = useGLTF(url);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Clone object={gltf.scene} />
    </group>
  );
}


function StreetLight({
  position,
  color = '#ffd67a',
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.018, 0.026, 0.92, 10]} />
        <meshStandardMaterial color="#4b5563" roughness={0.62} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.96, 0]}>
        <sphereGeometry args={[0.085, 18, 18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.1} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.95, 0]} intensity={0.75} color={color} distance={3.5} />
    </group>
  );
}

function SignPylon({
  position,
  color,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number]
}) {
  return (
    <Float speed={1.4} floatIntensity={0.08} rotationIntensity={0.025}>
      <group position={position} rotation={rotation}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.05, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.48} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[0.72, 0.34, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.4} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: MotionValueLike }) {
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(4.1, 0.28, 0.85), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const keyframePosition = useMemo(() => new THREE.Vector3(), []);

  // Update keyframes to better frame the new dense districts
  const cameraKeyframes = useMemo(
    () => [
      // 0: Welcome
      { at: 0, point: new THREE.Vector3(2.5, 0.8, 8.5) },
      { at: 0.16, point: new THREE.Vector3(3.2, 0.6, 7.5) },
      // 1: Businesses
      { at: 0.3, point: new THREE.Vector3(5.8, 0.5, 4.5) },
      { at: 0.44, point: new THREE.Vector3(4.8, 0.4, 3.5) },
      // 2: Non-profits
      { at: 0.56, point: new THREE.Vector3(2.2, -0.4, -3.5) },
      { at: 0.68, point: new THREE.Vector3(1.2, -0.4, -4.5) },
      // 3: Services
      { at: 0.82, point: new THREE.Vector3(3.0, 1.2, -9.0) },
      { at: 1, point: new THREE.Vector3(4.0, 1.8, -10.0) },
    ],
    []
  );
  
  const lookAtKeyframes = useMemo(
    () => [
      // 0: Welcome (Looking generally towards the city center)
      { at: 0, point: new THREE.Vector3(4.0, 0.3, 0.0) },
      { at: 0.16, point: new THREE.Vector3(4.5, 0.3, -1.0) },
      // 1: Businesses (Looking directly at the business plaza)
      { at: 0.3, point: new THREE.Vector3(7.0, 0.2, 0.0) },
      { at: 0.44, point: new THREE.Vector3(6.5, 0.1, -1.0) },
      // 2: Non-profits (Looking at the suburban neighborhood)
      { at: 0.56, point: new THREE.Vector3(-1.5, -0.8, -8.0) },
      { at: 0.68, point: new THREE.Vector3(-2.0, -0.8, -9.0) },
      // 3: Services (Looking up at the skyscrapers)
      { at: 0.82, point: new THREE.Vector3(5.0, 1.5, -15.5) },
      { at: 1, point: new THREE.Vector3(5.0, 2.5, -16.5) },
    ],
    []
  );

  const sampleKeyframes = (
    progress: number,
    keyframes: Array<{ at: number; point: THREE.Vector3 }>,
    output: THREE.Vector3
  ) => {
    if (progress <= keyframes[0].at) {
      output.copy(keyframes[0].point);
      return;
    }

    for (let i = 1; i < keyframes.length; i += 1) {
      const current = keyframes[i];
      if (progress <= current.at) {
        const previous = keyframes[i - 1];
        const segmentProgress = (progress - previous.at) / (current.at - previous.at);
        const easedProgress = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);

        output.lerpVectors(previous.point, current.point, easedProgress);
        return;
      }
    }

    output.copy(keyframes[keyframes.length - 1].point);
  };

  useFrame((state, delta) => {
    const progress = Math.min(1, Math.max(0, scrollProgress.get()));
    sampleKeyframes(progress, cameraKeyframes, keyframePosition);
    sampleKeyframes(progress, lookAtKeyframes, lookAt);

    const damping = 1 - Math.exp(-delta * 4.2);
    const lookAtDamping = 1 - Math.exp(-delta * 3.4);
    target.copy(keyframePosition);
    state.camera.position.lerp(target, damping);
    currentLookAt.lerp(lookAt, lookAtDamping);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

function DistrictGround() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.68, -5.8]}>
        <planeGeometry args={[26, 40]} />
        <meshStandardMaterial color="#123020" roughness={0.96} />
      </mesh>
      
      {/* Main Streets */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.61, -5.8]}>
        <planeGeometry args={[4.2, 35]} />
        <meshStandardMaterial color="#2d3748" roughness={0.88} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[4.5, -1.61, -4.0]}>
        <planeGeometry args={[18, 3.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.88} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[4.5, -1.61, -12.0]}>
        <planeGeometry args={[18, 3.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.88} />
      </mesh>

      {/* Street Lines */}
      {[-12.6, -9.6, -6.6, -3.6, -0.6, 2.4, 5.4, 8.4].map((z) => (
        <mesh key={`z-${z}`} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, z]}>
          <planeGeometry args={[0.18, 1.24]} />
          <meshStandardMaterial color="#ffd67a" emissive="#ffd67a" emissiveIntensity={0.16} roughness={0.78} />
        </mesh>
      ))}
      {[-2, 1.5, 4.5, 7.5, 10.5].map((x) => (
        <mesh key={`x1-${x}`} receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[x, -1.55, -4.0]}>
          <planeGeometry args={[0.18, 1.24]} />
          <meshStandardMaterial color="#ffd67a" emissive="#ffd67a" emissiveIntensity={0.16} roughness={0.78} />
        </mesh>
      ))}
      {[-2, 1.5, 4.5, 7.5, 10.5].map((x) => (
        <mesh key={`x2-${x}`} receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[x, -1.55, -12.0]}>
          <planeGeometry args={[0.18, 1.24]} />
          <meshStandardMaterial color="#ffd67a" emissive="#ffd67a" emissiveIntensity={0.16} roughness={0.78} />
        </mesh>
      ))}

      {/* Sidewalks */}
      {[-2.6, 2.6].map((x) => (
        <mesh key={`sw-z-${x}`} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[x, -1.57, -5.8]}>
          <planeGeometry args={[1.0, 35]} />
          <meshStandardMaterial color="#8ea4ad" roughness={0.86} />
        </mesh>
      ))}
      {[-2.1, -5.9].map((z) => (
        <mesh key={`sw-x1-${z}`} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[6.5, -1.57, z]}>
          <planeGeometry args={[16, 0.8]} />
          <meshStandardMaterial color="#8ea4ad" roughness={0.86} />
        </mesh>
      ))}
      {[-10.1, -13.9].map((z) => (
        <mesh key={`sw-x2-${z}`} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[6.5, -1.57, z]}>
          <planeGeometry args={[16, 0.8]} />
          <meshStandardMaterial color="#8ea4ad" roughness={0.86} />
        </mesh>
      ))}

      {/* Streetlights */}
      {[
        [-2.7, -0.2],
        [2.75, -1.8],
        [-2.75, -6.8],
        [2.7, -8.9],
        [-2.7, -13.4],
        [2.75, -15.7],
        [6.0, -2.5],
        [9.0, -2.5],
        [6.0, -5.5],
        [9.0, -5.5],
        [6.0, -10.5],
        [9.0, -10.5],
      ].map(([x, z]) => (
        <StreetLight key={`light-${x}-${z}`} position={[x, -1.54, z]} />
      ))}
      
      <Sparkles count={42} scale={[13, 1.6, 24]} size={0.7} speed={0.06} color="#ffd67a" position={[0, -0.95, -6.2]} />
    </group>
  );
}

function SkylineRidges() {
  return (
    <group position={[0, -1.35, -28]}>
      {[-12, -8.5, -5.1, -2.6, 0, 2.8, 5.6, 8.1, 11.5].map((x, index) => (
        <mesh key={x} position={[x, 1.15 + (index % 3) * 0.45, 0]}>
          <boxGeometry args={[1.5 + (index % 2) * 0.7, 3.4 + (index % 4) * 0.7, 1.8]} />
          <meshStandardMaterial color="#071521" emissive="#0f3150" emissiveIntensity={0.28} roughness={0.9} />
        </mesh>
      ))}
      {[-10, -6, -3, 2, 4, 7, 10].map((x, index) => (
        <mesh key={`back-${x}`} position={[x, 2.15 + (index % 3) * 0.65, -3]}>
          <boxGeometry args={[2.0, 4.4 + (index % 4) * 0.9, 1.5]} />
          <meshStandardMaterial color="#040c14" emissive="#0a1d30" emissiveIntensity={0.15} roughness={0.9} />
        </mesh>
      ))}
      <Sparkles count={58} scale={[25, 6, 4]} size={0.65} speed={0.08} color="#7ec8ff" position={[0, 4.4, 0.4]} />
    </group>
  );
}

function Atmosphere() {
  return (
    <group>
      <Stars radius={48} depth={24} count={1200} factor={2.8} saturation={0.4} fade speed={0.18} />
      <mesh position={[-4.8, 4.2, -12]} rotation={[0.1, 0.34, -0.18]}>
        <planeGeometry args={[12, 2.5]} />
        <meshBasicMaterial color="#4A90D9" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[6.4, 3.85, -7.4]} rotation={[0.04, -0.42, 0.12]}>
        <planeGeometry args={[10, 2.0]} />
        <meshBasicMaterial color="#55efc4" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function BusinessesDistrict() {
  // A dense commercial block with multiple buildings, awnings, and parasols
  return (
    <group position={[6.5, -1.58, -0.5]}>
      {/* Front Row */}
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-a.glb" position={[-1.2, 0, -0.2]} rotation={[0, -Math.PI/2, 0]} scale={1.1} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb" position={[-1.2, 0.05, 0.7]} rotation={[0, 0, 0]} scale={1.1} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-a.glb" position={[-1.6, 0, 1.2]} rotation={[0, 0.3, 0]} scale={1.0} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-b.glb" position={[-0.8, 0, 1.3]} rotation={[0, -0.2, 0]} scale={1.0} />

      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-b.glb" position={[0.2, 0, -0.2]} rotation={[0, -Math.PI/2, 0]} scale={1.1} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb" position={[0.2, 0.05, 0.7]} rotation={[0, 0, 0]} scale={1.1} />
      
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-c.glb" position={[1.6, 0, -0.2]} rotation={[0, -Math.PI/2, 0]} scale={1.1} />
      
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-e.glb" position={[3.0, 0, -0.2]} rotation={[0, -Math.PI/2, 0]} scale={1.1} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb" position={[3.0, 0.9, 0.7]} rotation={[0, 0, 0]} scale={1.1} />

      {/* Back Row */}
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-b.glb" position={[-0.5, 0, -1.8]} rotation={[0, Math.PI, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb" position={[1.2, 0, -1.8]} rotation={[0, 0, 0]} scale={1.3} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-k.glb" position={[2.8, 0, -1.8]} rotation={[0, Math.PI, 0]} scale={1.1} />
      
      {/* Floating Elements & Signage */}
      <SignPylon position={[-2.3, 0.48, 0.5]} color="#4A90D9" rotation={[0, -Math.PI/4, 0]} />
      <SignPylon position={[4.0, 0.48, 0.5]} color="#38bdf8" rotation={[0, Math.PI/4, 0]} />
      
      <Float speed={1.1} floatIntensity={0.14} rotationIntensity={0.03}>
        <group position={[1.2, 3.8, -1.8]}>
          <mesh>
            <sphereGeometry args={[0.25, 24, 24]} />
            <meshStandardMaterial color="#7ec8ff" emissive="#4A90D9" emissiveIntensity={1.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function NonprofitDistrict() {
  // A suburban neighborhood feel with houses, fences, and lots of trees
  return (
    <group position={[-1.5, -1.58, -8.0]}>
      {/* Front Row Houses */}
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-a.glb" position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-c.glb" position={[0, 0, -2.0]} rotation={[0, Math.PI/2, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-e.glb" position={[0, 0, -4.0]} rotation={[0, Math.PI/2, 0]} scale={1.2} />
      
      {/* Details */}
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/driveway-short.glb" position={[1.0, 0.01, -0.5]} rotation={[0, -Math.PI/2, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/path-stones-short.glb" position={[1.0, 0.01, 0.5]} rotation={[0, -Math.PI/2, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/fence-3x2.glb" position={[0.8, 0, -2.8]} rotation={[0, Math.PI/2, 0]} scale={1.2} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/planter.glb" position={[0.8, 0, -1.5]} rotation={[0, -Math.PI/4, 0]} scale={1.1} />

      {/* Trees */}
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb" position={[-1.2, 0, 1.0]} rotation={[0, 0.3, 0]} scale={1.5} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb" position={[-1.5, 0, -3.0]} rotation={[0, 1.5, 0]} scale={1.6} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb" position={[0.5, 0, 1.2]} rotation={[0, -0.25, 0]} scale={1.3} />
      <BuildingModel url="/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb" position={[0.8, 0, -3.8]} rotation={[0, 2.1, 0]} scale={1.2} />

      {/* Signage and Float */}
      <SignPylon position={[1.5, 0.48, -1.0]} color="#ff7675" rotation={[0, -Math.PI/2, 0]} />
      <Float speed={1.2} floatIntensity={0.15} rotationIntensity={0.03}>
        <group position={[-0.5, 2.5, -2.0]}>
          <mesh>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color="#ffb1a8" emissive="#ff7675" emissiveIntensity={1.35} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function ServicesDistrict() {
  // Dense downtown civic center with tall skyscrapers
  return (
    <group position={[6.0, -1.58, -15.5]}>
      {/* Front Row */}
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-a.glb" position={[-1.0, 0, 0]} rotation={[0, 0, 0]} scale={1.3} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-c.glb" position={[1.2, 0, 0]} rotation={[0, 0, 0]} scale={1.4} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb" position={[3.2, 0, 0]} rotation={[0, 0, 0]} scale={1.2} />
      
      {/* Mid/Back Row */}
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-d.glb" position={[-1.8, 0, -2.0]} rotation={[0, -Math.PI/2, 0]} scale={1.6} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-e.glb" position={[0.8, 0, -2.5]} rotation={[0, Math.PI, 0]} scale={1.8} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/building-f.glb" position={[3.5, 0, -2.0]} rotation={[0, Math.PI/2, 0]} scale={1.4} />
      
      {/* Details */}
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb" position={[-1.0, 0.05, 0.9]} rotation={[0, 0, 0]} scale={1.3} />
      <BuildingModel url="/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb" position={[1.2, 1.2, 0.9]} rotation={[0, 0, 0]} scale={1.4} />

      <SignPylon position={[-2.5, 0.48, 0.8]} color="#ffffff" rotation={[0, -Math.PI/6, 0]} />
      <SignPylon position={[4.2, 0.48, 0.8]} color="#ffffff" rotation={[0, Math.PI/6, 0]} />
    </group>
  );
}

function StoryGuide() {
  return null;
}

export default function HeroScene({ scrollProgress }: { scrollProgress: MotionValueLike }) {
  return (
    <>
      <color attach="background" args={['#020713']} />
      <fog attach="fog" args={['#020713', 7, 28]} />
      <ambientLight intensity={1.2} color="#ffffff" />
      <hemisphereLight args={['#ffffff', '#111111', 2.0]} />
      <directionalLight position={[-6, 12, 8]} intensity={4.5} color="#ffffff" castShadow />
      
      {/* Stark architectural lighting for districts */}
      <pointLight position={[-3.0, 4.0, 3.0]} intensity={2.0} color="#ffffff" distance={12} />
      <pointLight position={[6.5, 4.0, -0.5]} intensity={3.0} color="#ffffff" distance={15} />
      <pointLight position={[-1.5, 3.5, -8.0]} intensity={3.0} color="#ffffff" distance={15} />
      <pointLight position={[6.0, 5.0, -15.5]} intensity={4.0} color="#ffffff" distance={20} />
      
      <spotLight position={[3, 9, 3]} angle={0.45} penumbra={0.1} intensity={3.6} color="#ffffff" castShadow />

      <CameraRig scrollProgress={scrollProgress} />
      <Atmosphere />
      <SkylineRidges />
      <DistrictGround />
      <StoryGuide />
      <BusinessesDistrict />
      <NonprofitDistrict />
      <ServicesDistrict />
    </>
  );
}

// Update preloads
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-a.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-b.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-c.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-e.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-f.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-k.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-a.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-b.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-c.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-d.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-e.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-a.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-b.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-a.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-c.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-e.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/path-stones-short.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/driveway-short.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/fence-3x2.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/planter.glb');