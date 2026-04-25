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

function WindowGrid({
  position,
  rotation = [0, 0, 0],
  color = '#7ec8ff',
  columns = 4,
  rows = 4,
  width = 1.6,
  height = 2.4,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  columns?: number;
  rows?: number;
  width?: number;
  height?: number;
}) {
  const windows = useMemo(() => {
    const items: Array<[number, number, number]> = [];
    const xGap = width / Math.max(columns - 1, 1);
    const yGap = height / Math.max(rows - 1, 1);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        if ((row + column) % 5 === 0) continue;
        items.push([column * xGap - width / 2, row * yGap, 0]);
      }
    }

    return items;
  }, [columns, rows, width, height]);

  return (
    <group position={position} rotation={rotation}>
      {windows.map((windowPosition, index) => (
        <mesh key={`${windowPosition.join('-')}-${index}`} position={windowPosition}>
          <boxGeometry args={[0.12, 0.08, 0.018]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.7} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function StreetLight({
  position,
  color = '#ffd67a',
}: {
  position: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.018, 0.026, 0.92, 10]} />
        <meshStandardMaterial color="#4b5563" roughness={0.62} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.96, 0]}>
        <sphereGeometry args={[0.085, 18, 18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.1} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.95, 0]} intensity={0.75} color={color} distance={2.6} />
    </group>
  );
}

function SignPylon({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.4} floatIntensity={0.08} rotationIntensity={0.025}>
      <group position={position}>
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

  const cameraKeyframes = useMemo(
    () => [
      { at: 0, point: new THREE.Vector3(2.55, -0.18, 7.4) },
      { at: 0.16, point: new THREE.Vector3(2.9, -0.16, 6.7) },
      { at: 0.3, point: new THREE.Vector3(3.2, -0.12, 5.95) },
      { at: 0.44, point: new THREE.Vector3(3.1, -0.1, 5.3) },
      { at: 0.56, point: new THREE.Vector3(1.9, -0.08, 0.4) },
      { at: 0.68, point: new THREE.Vector3(2.55, -0.34, -5.55) },
      { at: 0.78, point: new THREE.Vector3(3.05, -0.42, -6.15) },
      { at: 0.88, point: new THREE.Vector3(4.2, 0, -10) },
      { at: 1, point: new THREE.Vector3(4.9, 0.02, -11) },
    ],
    []
  );
  const lookAtKeyframes = useMemo(
    () => [
      { at: 0, point: new THREE.Vector3(5.55, 0.32, 0.75) },
      { at: 0.16, point: new THREE.Vector3(5.7, 0.35, 0.78) },
      { at: 0.3, point: new THREE.Vector3(5.72, 0.38, 0.82) },
      { at: 0.44, point: new THREE.Vector3(5.55, 0.4, 0.88) },
      { at: 0.56, point: new THREE.Vector3(2.1, 0.38, -3.4) },
      { at: 0.68, point: new THREE.Vector3(0.8, -0.04, -8.55) },
      { at: 0.78, point: new THREE.Vector3(0.35, -0.02, -9.1) },
      { at: 0.88, point: new THREE.Vector3(4.9, 0.42, -13.2) },
      { at: 1, point: new THREE.Vector3(5.05, 0.45, -15.0) },
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
        <planeGeometry args={[20, 32]} />
        <meshStandardMaterial color="#123020" roughness={0.96} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.61, -5.8]}>
        <planeGeometry args={[4.2, 27]} />
        <meshStandardMaterial color="#344451" roughness={0.88} />
      </mesh>
      {[-9.6, -6.6, -3.6, -0.6, 2.4, 5.4].map((z) => (
        <mesh key={z} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, z]}>
          <planeGeometry args={[0.18, 1.24]} />
          <meshStandardMaterial color="#ffd67a" emissive="#ffd67a" emissiveIntensity={0.16} roughness={0.78} />
        </mesh>
      ))}
      {[-2.6, 2.6].map((x) => (
        <mesh key={x} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[x, -1.57, -5.8]}>
          <planeGeometry args={[0.12, 27]} />
          <meshStandardMaterial color="#8ea4ad" roughness={0.86} />
        </mesh>
      ))}
      {[
        [-2.7, -0.2],
        [2.75, -1.8],
        [-2.75, -6.8],
        [2.7, -8.9],
        [-2.7, -13.4],
        [2.75, -15.7],
      ].map(([x, z]) => (
        <StreetLight key={`${x}-${z}`} position={[x, -1.54, z]} />
      ))}
      <Sparkles count={42} scale={[13, 1.6, 24]} size={0.7} speed={0.06} color="#ffd67a" position={[0, -0.95, -6.2]} />
    </group>
  );
}

function SkylineRidges() {
  return (
    <group position={[0, -1.35, -22]}>
      {[-7.5, -5.1, -2.6, 0, 2.8, 5.6, 8.1].map((x, index) => (
        <mesh key={x} position={[x, 1.15 + (index % 3) * 0.45, 0]}>
          <boxGeometry args={[1.2 + (index % 2) * 0.7, 2.4 + (index % 4) * 0.7, 1.3]} />
          <meshStandardMaterial color="#071521" emissive="#0f3150" emissiveIntensity={0.28} roughness={0.9} />
        </mesh>
      ))}
      <Sparkles count={58} scale={[18, 5, 3]} size={0.65} speed={0.08} color="#7ec8ff" position={[0, 3.4, 0.4]} />
    </group>
  );
}

function Atmosphere() {
  return (
    <group>
      <Stars radius={48} depth={24} count={900} factor={2.4} saturation={0.35} fade speed={0.18} />
      <mesh position={[-4.8, 4.2, -12]} rotation={[0.1, 0.34, -0.18]}>
        <planeGeometry args={[9, 1.8]} />
        <meshBasicMaterial color="#4A90D9" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[4.4, 2.85, -7.4]} rotation={[0.04, -0.42, 0.12]}>
        <planeGeometry args={[8, 1.35]} />
        <meshBasicMaterial color="#55efc4" transparent opacity={0.075} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function BusinessesDistrict() {
  return (
    <group position={[6.35, -1.58, 0.55]}>
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-b.glb"
        position={[1.15, 0, -0.9]}
        rotation={[0, -0.23, 0]}
        scale={1.08}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb"
        position={[0, 0, 0]}
        rotation={[0, -0.18, 0]}
        scale={1.18}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-k.glb"
        position={[-1.4, 0, -0.55]}
        rotation={[0, 0.18, 0]}
        scale={1.08}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/low-detail-building-wide-b.glb"
        position={[1.1, 0, 1.95]}
        rotation={[0, -0.2, 0]}
        scale={1.12}
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
      <WindowGrid position={[1.12, 1.15, -0.15]} rotation={[0, -0.23, 0]} columns={5} rows={7} height={3.1} color="#8bd4ff" />
      <WindowGrid position={[-0.02, 1.05, 0.62]} rotation={[0, -0.18, 0]} columns={4} rows={5} height={2.2} color="#fff0a8" />
      <SignPylon position={[-1.62, 0.48, 1.15]} color="#4A90D9" />
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
        url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-c.glb"
        position={[-1.7, 0, -0.35]}
        rotation={[0, 0.25, 0]}
        scale={1.2}
      />
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/building-type-q.glb"
        position={[1.65, 0, -0.4]}
        rotation={[0, -0.4, 0]}
        scale={1.18}
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
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/fence-2x3.glb"
        position={[-1.15, 0, 1.9]}
        rotation={[0, 0.05, 0]}
        scale={1.2}
      />
      <BuildingModel
        url="/models/kenney/city-kit-suburban/Models/GLB format/planter.glb"
        position={[1.05, 0, 1.7]}
        rotation={[0, -0.3, 0]}
        scale={1.1}
      />
      <SignPylon position={[0.92, 0.48, 1.45]} color="#ff7675" />
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
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-d.glb"
        position={[1.35, 0, -0.65]}
        rotation={[0, -0.48, 0]}
        scale={1.26}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb"
        position={[0, 0, 0]}
        rotation={[0, -0.38, 0]}
        scale={1.22}
      />
      <BuildingModel
        url="/models/kenney/city-kit-commercial/Models/GLB format/building-f.glb"
        position={[-1.25, 0, -0.5]}
        rotation={[0, -0.22, 0]}
        scale={1.08}
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
      <WindowGrid position={[1.33, 1.6, -0.08]} rotation={[0, -0.48, 0]} columns={5} rows={7} height={3.1} color="#90ffe7" />
      <WindowGrid position={[-1.08, 1.05, 0.04]} rotation={[0, -0.22, 0]} columns={4} rows={4} height={1.8} color="#c5fff2" />
      <SignPylon position={[-0.95, 0.48, 1.35]} color="#55efc4" />
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
      <Sparkles count={140} scale={[18, 8, 23]} size={1.2} speed={0.16} color="#bfe7ff" position={[0, 2.25, -6]} />
    </group>
  );
}

export default function HeroScene({ scrollProgress }: { scrollProgress: MotionValueLike }) {
  return (
    <>
      <color attach="background" args={['#04111f']} />
      <fog attach="fog" args={['#04111f', 9, 31]} />
      <ambientLight intensity={0.78} color="#d7ecff" />
      <hemisphereLight args={['#fff4cf', '#0b1d26', 1.7]} />
      <directionalLight position={[-6, 9, 6]} intensity={3.25} color="#fff1cb" castShadow />
      <pointLight position={[-4.3, 3.2, 1.6]} intensity={5.6} color="#4A90D9" distance={10} />
      <pointLight position={[0, 2.8, -5.2]} intensity={5.3} color="#ff8f85" distance={10} />
      <pointLight position={[4.3, 3.3, -11.6]} intensity={5.4} color="#55efc4" distance={11} />
      <spotLight position={[3, 7, 3]} angle={0.42} penumbra={0.75} intensity={2.4} color="#fff2c7" castShadow />

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

useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-i.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-k.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-f.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-n.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-b.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/building-skyscraper-d.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-awning-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-overhang-wide.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-a.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/detail-parasol-b.glb');
useGLTF.preload('/models/kenney/city-kit-commercial/Models/GLB format/low-detail-building-wide-b.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-c.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-q.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/building-type-t.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-large.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/tree-small.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/path-stones-short.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/fence-2x3.glb');
useGLTF.preload('/models/kenney/city-kit-suburban/Models/GLB format/planter.glb');
