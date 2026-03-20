import { useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CurvedLink({ points, color = '#d8d8dc', opacity = 0.5 }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(curve, 48, 0.01, 8, false);
  }, [points]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function StaticNode({ position, color = '#111216', scale = 0.12 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale, 20, 20]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function HaloNode({ position, color = '#2c54ff', radius = 0.2 }) {
  const ref = useMemo(() => ({ current: null }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.8) * 0.08;
    ref.current.scale.setScalar(pulse);
    ref.current.material.opacity = 0.1 + (Math.sin(t * 2.2) + 1) * 0.04;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.14} />
    </mesh>
  );
}

function ActivePulse({ route, color = '#2c54ff', speed = 0.1, offset = 0 }) {
  const ref = useMemo(() => ({ current: null }), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(route.map((point) => new THREE.Vector3(...point))), [route]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const point = curve.getPoint(t);
    ref.current.position.copy(point);
    const scale = 0.9 + Math.sin(clock.getElapsedTime() * 3 + offset * 10) * 0.2;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function FloatingCloud({ anchors }) {
  const refs = useMemo(() => anchors.map(() => ({ current: null })), [anchors]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.forEach((ref, index) => {
      if (!ref.current) return;
      const [x, y, z] = anchors[index];
      ref.current.position.set(x, y + Math.sin(t * 0.8 + index) * 0.08, z + Math.cos(t * 0.65 + index) * 0.05);
    });
  });

  return refs.map((ref, index) => (
    <mesh key={index} ref={ref} position={anchors[index]}>
      <sphereGeometry args={[0.06, 14, 14]} />
      <meshBasicMaterial color={index % 2 === 0 ? '#2c54ff' : '#ffb02e'} transparent opacity={0.72} />
    </mesh>
  ));
}

function SceneContent() {
  const leftLinks = [
    [[-4.8, 1.3, 0], [-3.4, 1.0, 0], [-2.1, 0.65, 0]],
    [[-4.7, 0.4, 0], [-3.45, 0.18, 0], [-2.1, 0.15, 0]],
    [[-4.6, -0.55, 0], [-3.3, -0.45, 0], [-2.1, -0.25, 0]]
  ];

  const rightLinks = [
    [[2.1, 0.8, 0], [3.35, 1.0, 0], [4.85, 1.2, 0]],
    [[2.1, 0.0, 0], [3.35, 0.0, 0], [4.8, -0.05, 0]],
    [[2.1, -0.85, 0], [3.35, -1.05, 0], [4.75, -1.35, 0]]
  ];

  const activeRoute = [
    [-4.7, 0.45, 0],
    [-3.5, 0.18, 0],
    [-2.15, 0.15, 0],
    [-0.8, 0.0, 0],
    [0, 0, 0],
    [0.95, -0.02, 0],
    [2.1, 0.0, 0],
    [3.35, 0.0, 0],
    [4.8, -0.05, 0]
  ];

  return (
    <>
      <color attach="background" args={['#f8f8f6']} />
      <fog attach="fog" args={['#f8f8f6', 7, 18]} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={1.6} color="#2c54ff" />

      {leftLinks.map((link, index) => (
        <CurvedLink key={`left-${index}`} points={link} />
      ))}
      {rightLinks.map((link, index) => (
        <CurvedLink key={`right-${index}`} points={link} />
      ))}

      <CurvedLink
        points={activeRoute}
        color="#2c54ff"
        opacity={0.9}
      />

      <StaticNode position={[-4.8, 1.3, 0]} color="#111216" />
      <StaticNode position={[-4.7, 0.4, 0]} color="#111216" />
      <StaticNode position={[-4.6, -0.55, 0]} color="#111216" />
      <StaticNode position={[-2.1, 0.65, 0]} color="#2c54ff" scale={0.1} />
      <StaticNode position={[-2.1, 0.15, 0]} color="#2c54ff" scale={0.1} />
      <StaticNode position={[-2.1, -0.25, 0]} color="#2c54ff" scale={0.1} />

      <HaloNode position={[0, 0, 0]} radius={0.34} />
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#2c54ff" emissiveIntensity={0.22} roughness={0.25} metalness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[0.66, 0.02, 16, 80]} />
        <meshBasicMaterial color="#d8d8dc" transparent opacity={0.58} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, -Math.PI / 7]}>
        <torusGeometry args={[0.45, 0.018, 16, 80]} />
        <meshBasicMaterial color="#2c54ff" transparent opacity={0.44} />
      </mesh>

      <StaticNode position={[2.1, 0.8, 0]} color="#2c54ff" scale={0.1} />
      <StaticNode position={[2.1, 0.0, 0]} color="#2c54ff" scale={0.1} />
      <StaticNode position={[2.1, -0.85, 0]} color="#2c54ff" scale={0.1} />
      <StaticNode position={[4.85, 1.2, 0]} color="#111216" />
      <StaticNode position={[4.8, -0.05, 0]} color="#111216" />
      <StaticNode position={[4.75, -1.35, 0]} color="#111216" />

      <FloatingCloud anchors={[[-3.95, 1.7, 0.12], [-4.05, 0.9, -0.08], [-3.85, -0.95, 0.07], [3.95, 1.55, 0.1], [4.1, -0.55, -0.05], [3.8, -1.8, 0.08]]} />
      <ActivePulse route={activeRoute} speed={0.11} offset={0.02} />
      <ActivePulse route={activeRoute} speed={0.11} offset={0.38} color="#ffb02e" />
      <ActivePulse route={activeRoute} speed={0.11} offset={0.7} color="#2c54ff" />
    </>
  );
}

const defaultCopy = {
  kicker: 'Operational mesh',
  title: 'Fragmented inputs become one traceable flow.',
  body:
    'Pilots, aircraft, operations, checklists and evidence no longer live in disconnected pockets. AIROPS structures them into one operational chain with a visible record from planning to validation.',
  labels: {
    left: { over: 'Inputs', strong: 'Pilots · Aircraft · Docs' },
    center: { over: 'Core', strong: 'Operational system of record' },
    right: { over: 'Output', strong: 'Validated operation trace' }
  }
};

export default function OperationsMeshScene({ copy = defaultCopy }) {
  return (
    <div className="operations-scene-shell">
      <div className="operations-scene-copy">
        <p className="operations-scene-kicker">{copy.kicker}</p>
        <h3 className="operations-scene-title">{copy.title}</h3>
        <p className="operations-scene-body">{copy.body}</p>
      </div>

      <div className="operations-scene-frame" aria-hidden="true">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8.2], fov: 34 }}>
          <SceneContent />
        </Canvas>

        <div className="operations-scene-label operations-scene-label-left">
          <span>{copy.labels.left.over}</span>
          <strong>{copy.labels.left.strong}</strong>
        </div>
        <div className="operations-scene-label operations-scene-label-center">
          <span>{copy.labels.center.over}</span>
          <strong>{copy.labels.center.strong}</strong>
        </div>
        <div className="operations-scene-label operations-scene-label-right">
          <span>{copy.labels.right.over}</span>
          <strong>{copy.labels.right.strong}</strong>
        </div>
      </div>
    </div>
  );
}
