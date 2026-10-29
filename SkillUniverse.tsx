'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { CATEGORIES, type Category, type Skill } from '@/data/skills';

const OVERVIEW = new THREE.Vector3(0, 5, 15);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function Shape({ shape }: { shape: Category['shape'] }) {
  switch (shape) {
    case 'box': return <boxGeometry args={[0.34, 0.34, 0.34]} />;
    case 'cylinder': return <cylinderGeometry args={[0.2, 0.2, 0.36, 6]} />;
    case 'cone': return <coneGeometry args={[0.22, 0.42, 3]} />;
    case 'octahedron': return <octahedronGeometry args={[0.26]} />;
    default: return <icosahedronGeometry args={[0.22, 1]} />;
  }
}

interface NodeProps {
  cat: Category; skill: Skill; angle: number;
  dim: boolean; showLabel: boolean; selected: boolean;
  onSelect: (s: Skill) => void;
}

function SkillNode({ cat, skill, angle, dim, showLabel, selected, onSelect }: NodeProps) {
  const [hover, setHover] = useState(false);
  const pos: [number, number, number] = [Math.cos(angle) * cat.radius, 0, Math.sin(angle) * cat.radius];
  return (
    <mesh
      position={pos}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = ''; }}
      onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
      scale={hover || selected ? 1.35 : 1}
    >
      <Shape shape={cat.shape} />
      <meshStandardMaterial
        color={cat.color} emissive={cat.color} emissiveIntensity={hover || selected ? 1.2 : 0.55}
        wireframe={!!skill.learning} transparent opacity={dim ? 0.18 : 1}
      />
      {(showLabel || hover || selected) && (
        <Html center distanceFactor={9} position={[0, 0.55, 0]} style={{ pointerEvents: 'none' }}>
          <span style={{ color: '#F5F7FF', fontSize: 14, whiteSpace: 'nowrap', textShadow: '0 1px 4px #070A12' }}>
            {skill.name}
          </span>
        </Html>
      )}
    </mesh>
  );
}

function Orbit({ cat, active, anySelected, reduced, selectedSkill, onSelect }: {
  cat: Category; active: boolean; anySelected: boolean; reduced: boolean;
  selectedSkill: Skill | null; onSelect: (s: Skill) => void;
}) {
  const spin = useRef<THREE.Group>(null);
  const ring = useMemo(() => {
    const pts = Array.from({ length: 96 }, (_, i) => {
      const a = (i / 96) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * cat.radius, 0, Math.sin(a) * cat.radius);
    });
    return new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: cat.color, transparent: true, opacity: 0.35 }),
    );
  }, [cat]);

  useEffect(() => {
    (ring.material as THREE.LineBasicMaterial).opacity = anySelected && !active ? 0.1 : 0.4;
  }, [ring, active, anySelected]);

  useEffect(() => () => { ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); }, [ring]);

  useFrame((_, dt) => {
    if (!reduced && spin.current) spin.current.rotation.y += dt * (0.12 / cat.radius) * (active ? 0.4 : 1);
  });

  return (
    <group rotation={[cat.tilt, 0, 0]}>
      <primitive object={ring} />
      <group ref={spin}>
        {cat.skills.map((s, i) => (
          <SkillNode
            key={s.name} cat={cat} skill={s}
            angle={(i / cat.skills.length) * Math.PI * 2}
            dim={anySelected && !active} showLabel={active}
            selected={selectedSkill?.name === s.name} onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

function Core({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (reduced) return;
    if (a.current) { a.current.rotation.y += dt * 0.25; a.current.rotation.x += dt * 0.1; }
    if (b.current) b.current.rotation.y -= dt * 0.4;
  });
  return (
    <group>
      <mesh ref={a}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#00E5FF" wireframe /></mesh>
      <mesh ref={b}><octahedronGeometry args={[0.55]} /><meshStandardMaterial color="#7C5CFF" emissive="#7C5CFF" emissiveIntensity={0.9} /></mesh>
      <pointLight color="#B8FF6A" intensity={8} distance={14} />
    </group>
  );
}

function Rig({ target, reduced, children }: { target: THREE.Vector3; reduced: boolean; children: React.ReactNode }) {
  const root = useRef<THREE.Group>(null);
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if (reduced) { camera.position.copy(target); camera.lookAt(0, 0, 0); invalidate(); }
  }, [reduced, target, camera, invalidate]);
  useFrame((state, dt) => {
    if (reduced) return;
    camera.position.lerp(target, 1 - Math.pow(0.002, dt));
    camera.lookAt(0, 0, 0);
    if (root.current) { // pointer depth, works with touch drag too
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, state.pointer.x * 0.3, 0.05);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -state.pointer.y * 0.15, 0.05);
    }
  });
  return <group ref={root}>{children}</group>;
}

export default function SkillUniverse() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [skill, setSkill] = useState<Skill | null>(null);

  const lowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const n = navigator as Navigator & { deviceMemory?: number };
    return (n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) < 4;
  }, []);

  const target = useMemo(() => {
    const c = CATEGORIES.find((x) => x.id === activeId);
    return c ? new THREE.Vector3(0, 2 + c.radius * 0.35, c.radius + 5) : OVERVIEW;
  }, [activeId]);

  const choose = (id: string | null) => { setActiveId(id); setSkill(null); };

  return (
    <section aria-label="Skill universe" className="relative h-[560px] w-full overflow-hidden rounded-2xl bg-[#070A12]">
      <Canvas
        frameloop={reduced ? 'demand' : 'always'}
        dpr={lowPower ? 1 : [1, 1.75]}
        gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}
        camera={{ position: OVERVIEW.toArray(), fov: 45 }}
        style={{ touchAction: 'pan-y' }}
        onPointerMissed={() => setSkill(null)}
      >
        <color attach="background" args={['#070A12']} />
        <ambientLight intensity={0.5} />
        <Rig target={target} reduced={reduced}>
          <Core reduced={reduced} />
          {CATEGORIES.map((c) => (
            <Orbit
              key={c.id} cat={c} reduced={reduced}
              active={activeId === c.id} anySelected={activeId !== null}
              selectedSkill={skill} onSelect={setSkill}
            />
          ))}
        </Rig>
      </Canvas>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-[#070A12] to-transparent p-4">
        <p aria-live="polite" className="min-h-[2.5rem] text-sm text-[#F5F7FF]">
          {skill
            ? <><strong>{skill.name}</strong>{skill.learning ? ' (still learning)' : ''}: <span className="text-[#9AA6BD]">{skill.description}</span></>
            : <span className="text-[#9AA6BD]">Pick an orbit, then tap a node. Hollow nodes are skills I am still learning.</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => choose(null)} aria-pressed={activeId === null}
            className="rounded-full border border-[#9AA6BD]/40 px-3 py-1 text-sm text-[#F5F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF] aria-pressed:bg-[#0D1321]">
            All
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => choose(c.id)} aria-pressed={activeId === c.id}
              style={{ borderColor: c.color }}
              className="rounded-full border px-3 py-1 text-sm text-[#F5F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF] aria-pressed:bg-[#0D1321]">
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
