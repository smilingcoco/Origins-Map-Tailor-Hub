import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TubePath({ points, color = '#d8d8dc', opacity = 0.42, radius = 0.01 }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(curve, 56, radius, 8, false);
  }, [points, radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function SignalNode({ position, color = '#111216', size = 0.1 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 18, 18]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Checkpoint({ position, color = '#2c54ff', scale = 0.13 }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[scale, scale, scale]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function PulseOnPath({ route, color = '#2c54ff', speed = 0.12, offset = 0, size = 0.1 }) {
  const ref = useRef();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(route.map((point) => new THREE.Vector3(...point))), [route]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const point = curve.getPoint(t);
    ref.current.position.copy(point);
    const scale = 0.9 + Math.sin(clock.getElapsedTime() * 4 + offset * 12) * 0.16;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function InputSignals({ routes }) {
  const refs = useMemo(() => routes.map(() => ({ current: null })), [routes]);
  const curves = useMemo(
    () => routes.map((route) => new THREE.CatmullRomCurve3(route.map((point) => new THREE.Vector3(...point)))),
    [routes]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    refs.forEach((ref, index) => {
      if (!ref.current) return;
      const progress = (t * 0.1 + index * 0.19) % 1;
      const point = curves[index].getPoint(progress);
      ref.current.position.copy(point);
      const scale = 0.82 + Math.sin(t * 3 + index) * 0.12;
      ref.current.scale.setScalar(scale);
      ref.current.material.opacity = 0.52 + progress * 0.35;
    });
  });

  return refs.map((ref, index) => (
    <mesh key={`input-signal-${index}`} ref={ref}>
      <sphereGeometry args={[0.085, 16, 16]} />
      <meshBasicMaterial color={index % 2 === 0 ? '#2c54ff' : '#ffb02e'} transparent opacity={0.72} />
    </mesh>
  ));
}

function CoreAssembler() {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const crystal = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.18;
    if (ringA.current) ringA.current.rotation.z = t * 0.55;
    if (ringB.current) ringB.current.rotation.x = -t * 0.48;
    if (crystal.current) {
      crystal.current.rotation.x = t * 0.35;
      crystal.current.rotation.y = t * 0.42;
      const scale = 1 + Math.sin(t * 1.9) * 0.05;
      crystal.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={ringA}>
        <torusGeometry args={[0.8, 0.02, 16, 80]} />
        <meshBasicMaterial color="#d8d8dc" transparent opacity={0.52} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, Math.PI / 8]}>
        <torusGeometry args={[0.52, 0.018, 16, 80]} />
        <meshBasicMaterial color="#2c54ff" transparent opacity={0.45} />
      </mesh>
      <mesh ref={crystal}>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#2c54ff" emissiveIntensity={0.24} roughness={0.25} metalness={0.26} />
      </mesh>
      <mesh scale={1.45}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial color="#2c54ff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function TraceTrail({ points }) {
  return (
    <>
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        return (
          <TubePath
            key={`trail-${index}`}
            points={[point, [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2, 0], next]}
            color="#2c54ff"
            opacity={0.85 - index * 0.08}
            radius={0.012}
          />
        );
      })}
    </>
  );
}

function SceneContent() {
  const inputRoutes = [
    [
      [-4.9, 1.15, 0],
      [-3.85, 1.02, 0],
      [-2.65, 0.68, 0],
      [-1.2, 0.22, 0],
      [-0.3, 0.03, 0]
    ],
    [
      [-4.95, 0.08, 0],
      [-3.9, 0.04, 0],
      [-2.7, 0.0, 0],
      [-1.25, -0.02, 0],
      [-0.3, 0.0, 0]
    ],
    [
      [-4.88, -1.05, 0],
      [-3.82, -0.92, 0],
      [-2.62, -0.62, 0],
      [-1.18, -0.2, 0],
      [-0.3, -0.03, 0]
    ]
  ];

  const mergedRoute = [
    [-0.3, 0.0, 0],
    [0, 0, 0],
    [0.9, 0.0, 0],
    [1.8, 0.0, 0],
    [2.8, 0.02, 0],
    [3.85, 0.02, 0],
    [4.8, 0.02, 0]
  ];

  const outputLinks = [
    [
      [1.8, 0.0, 0],
      [2.75, 0.42, 0],
      [4.75, 0.95, 0]
    ],
    [
      [2.8, 0.02, 0],
      [3.55, -0.42, 0],
      [4.78, -0.82, 0]
    ]
  ];

  const checkpointPositions = [
    [1.15, 0.0, 0],
    [2.35, 0.0, 0],
    [3.55, 0.02, 0]
  ];

  return (
    <>
      <color attach="background" args={['#f8f8f6']} />
      <fog attach="fog" args={['#f8f8f6', 7, 18]} />
      <ambientLight intensity={1.14} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={1.7} color="#2c54ff" />

      {inputRoutes.map((route, index) => (
        <TubePath key={`input-route-${index}`} points={route} />
      ))}

      {outputLinks.map((route, index) => (
        <TubePath key={`output-route-${index}`} points={route} color="#d8d8dc" opacity={0.36} />
      ))}

      <TraceTrail points={mergedRoute} />

      <SignalNode position={[-4.9, 1.15, 0]} />
      <SignalNode position={[-4.95, 0.08, 0]} />
      <SignalNode position={[-4.88, -1.05, 0]} />
      <SignalNode position={[-2.62, 0.68, 0]} color="#2c54ff" />
      <SignalNode position={[-2.7, 0.0, 0]} color="#2c54ff" />
      <SignalNode position={[-2.62, -0.62, 0]} color="#2c54ff" />

      <CoreAssembler />

      {checkpointPositions.map((position, index) => (
        <Checkpoint key={`checkpoint-${index}`} position={position} color={index === checkpointPositions.length - 1 ? '#ffb02e' : '#2c54ff'} />
      ))}

      <SignalNode position={[4.8, 0.02, 0]} color="#2c54ff" size={0.12} />
      <SignalNode position={[4.75, 0.95, 0]} color="#111216" size={0.08} />
      <SignalNode position={[4.78, -0.82, 0]} color="#111216" size={0.08} />

      <InputSignals routes={inputRoutes} />
      <PulseOnPath route={mergedRoute} offset={0.08} size={0.1} />
      <PulseOnPath route={mergedRoute} offset={0.42} size={0.09} color="#ffb02e" />
      <PulseOnPath route={mergedRoute} offset={0.76} size={0.1} />
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
