import { useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAGES = ['Ingest', 'Extract', 'Correlate', 'Alert'];

function FlowLine({ start, end, color = '#d8d8dc', opacity = 0.85 }) {
  const geometry = useMemo(() => {
    const next = new THREE.BufferGeometry();
    next.setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
    return next;
  }, [start, end]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <line>
      <primitive attach="geometry" object={geometry} />
      <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} />
    </line>
  );
}

function StreamParticles({ side = 'left', color = '#2c54ff', count = 16 }) {
  const refs = useMemo(() => Array.from({ length: count }, () => ({ current: null })), [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    refs.forEach((ref, index) => {
      if (!ref.current) return;

      const progress = (t * 0.16 + index * 0.11) % 1;
      const direction = side === 'left' ? 1 : -1;
      const xStart = side === 'left' ? -5.2 : 5.2;
      const x = xStart + direction * progress * 4.05;
      const y = Math.sin(t * 1.1 + index * 0.75) * 0.68;
      const z = Math.cos(t * 0.9 + index * 0.6) * 0.42;
      const nearCore = progress > 0.8;
      const scale = nearCore ? 1.25 : 0.85 + ((index % 3) * 0.12);

      ref.current.position.set(x, y, z);
      ref.current.scale.setScalar(scale);
      ref.current.material.opacity = nearCore ? 0.96 : 0.56;
    });
  });

  return refs.map((ref, index) => (
    <mesh key={`${side}-${index}`} ref={ref}>
      <sphereGeometry args={[0.09, 18, 18]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  ));
}

function AlertParticles() {
  const refs = useMemo(() => Array.from({ length: 10 }, () => ({ current: null })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    refs.forEach((ref, index) => {
      if (!ref.current) return;

      const progress = (t * 0.18 + index * 0.19) % 1;
      const x = Math.sin(index * 1.7 + t * 0.8) * 1.15;
      const y = -0.7 - progress * 3.1;
      const z = Math.cos(index * 1.2 + t) * 0.34;
      const highRisk = index % 4 === 0;

      ref.current.position.set(x, y, z);
      ref.current.scale.setScalar(highRisk ? 1.2 : 0.9);
      ref.current.material.opacity = highRisk ? 0.95 : 0.7;
    });
  });

  return refs.map((ref, index) => (
    <mesh key={`alert-${index}`} ref={ref}>
      <octahedronGeometry args={[0.11, 0]} />
      <meshBasicMaterial color={index % 4 === 0 ? '#ff7a45' : '#2c54ff'} transparent opacity={0.8} />
    </mesh>
  ));
}

function CoreCluster() {
  const group = useMemo(() => ({ current: null }), []);
  const ringA = useMemo(() => ({ current: null }), []);
  const ringB = useMemo(() => ({ current: null }), []);
  const crystal = useMemo(() => ({ current: null }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.2;
    if (ringA.current) ringA.current.rotation.z = t * 0.65;
    if (ringB.current) ringB.current.rotation.x = -t * 0.55;
    if (crystal.current) {
      crystal.current.rotation.x = t * 0.38;
      crystal.current.rotation.y = t * 0.52;
      const scale = 1 + Math.sin(t * 1.8) * 0.06;
      crystal.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={ringA}>
        <torusGeometry args={[1.12, 0.02, 16, 120]} />
        <meshBasicMaterial color="#d8d8dc" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.03, 16, 120]} />
        <meshBasicMaterial color="#2c54ff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={crystal}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial color="#f3f5ff" emissive="#2c54ff" emissiveIntensity={0.24} roughness={0.22} metalness={0.35} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.23, 18, 18]} />
        <meshBasicMaterial color="#2c54ff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#f8f8f6']} />
      <fog attach="fog" args={['#f8f8f6', 8, 18]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={2.8} color="#2c54ff" />

      <group position={[0, 0.2, 0]}>
        <FlowLine start={[-5.2, 0, 0]} end={[-1.2, 0, 0]} />
        <FlowLine start={[5.2, 0, 0]} end={[1.2, 0, 0]} />
        <FlowLine start={[0, -0.35, 0]} end={[0, -4.2, 0]} color="#2c54ff" opacity={0.8} />
        <FlowLine start={[0, -1.3, 0]} end={[-1.5, -4.1, 0]} color="#ffb02e" opacity={0.35} />
        <FlowLine start={[0, -1.3, 0]} end={[1.5, -4.1, 0]} color="#ffb02e" opacity={0.35} />

        <StreamParticles side="left" color="#2c54ff" />
        <StreamParticles side="right" color="#111216" />
        <AlertParticles />
        <CoreCluster />
      </group>
    </>
  );
}

export default function ComplianceFlowScene() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % STAGES.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="compliance-scene-shell">
      <div className="compliance-scene-copy">
        <p className="compliance-scene-kicker">Live correlation engine</p>
        <h3 className="compliance-scene-title">Two data streams. One decision layer.</h3>
        <p className="compliance-scene-body">
          SAP Concur and NovoVision flow into a single correlation engine. Normal cases pass quietly. Signals with
          real risk pulse out into the alert inbox with evidence attached.
        </p>
      </div>

      <div className="compliance-scene-frame" aria-hidden="true">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8.5], fov: 38 }}>
          <SceneContent />
        </Canvas>

        <div className="compliance-scene-label compliance-scene-label-left">
          <span>Source A</span>
          <strong>SAP Concur</strong>
        </div>
        <div className="compliance-scene-label compliance-scene-label-right">
          <span>Source B</span>
          <strong>NovoVision</strong>
        </div>
        <div className="compliance-scene-label compliance-scene-label-center">
          <span>Core</span>
          <strong>AI correlation engine</strong>
        </div>
        <div className="compliance-scene-label compliance-scene-label-bottom">
          <span>Output</span>
          <strong>Prioritized alerts</strong>
        </div>
      </div>

      <div className="compliance-stage-strip">
        {STAGES.map((stage, index) => (
          <div key={stage} className={index === activeStage ? 'compliance-stage-pill active' : 'compliance-stage-pill'}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
}
