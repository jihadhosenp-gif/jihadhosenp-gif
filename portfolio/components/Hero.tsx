'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'

const OVERVIEW = new THREE.Vector3(0, 0, 14)

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

function Core({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (reduced) return
    if (a.current) { a.current.rotation.y += dt * 0.18; a.current.rotation.x += dt * 0.09 }
    if (b.current) b.current.rotation.y -= dt * 0.32
  })
  return (
    <group>
      <mesh ref={a}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#00E5FF" wireframe /></mesh>
      <mesh ref={b}><octahedronGeometry args={[0.55]} /><meshStandardMaterial color="#7C5CFF" emissive="#7C5CFF" emissiveIntensity={0.9} /></mesh>
      <pointLight color="#B8FF6A" intensity={8} distance={14} />
    </group>
  )
}

function FloatingSymbol({ kind, pos, color, speed }: { kind: 'cube' | 'sphere' | 'ring'; pos: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const offset = useRef(Math.random() * Math.PI * 2)
  useFrame((state, dt) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset.current
      ref.current.position.y = pos[1] + Math.sin(t) * 0.15
      ref.current.rotation.y += dt * 0.05
      ref.current.rotation.x += dt * 0.03
    }
  })
  const Geo = kind === 'cube' ? <boxGeometry args={[0.4, 0.4, 0.4]} /> : kind === 'sphere' ? <sphereGeometry args={[0.28, 16, 16]} /> : <ringGeometry args={[0.32, 0.5, 16]} />
  return (
    <mesh ref={ref} position={pos}>
      {Geo}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} wireframe={kind === 'ring'} />
    </mesh>
  )
}

function Rig({ target, reduced, children }: { target: THREE.Vector3; reduced: boolean; children: React.ReactNode }) {
  const root = useRef<THREE.Group>(null)
  const { camera, invalidate } = useThree()
  useEffect(() => {
    if (reduced) { camera.position.copy(target); camera.lookAt(0, 0, 0); invalidate() }
  }, [reduced, target, camera, invalidate])
  useFrame((state, dt) => {
    if (reduced) return
    camera.position.lerp(target, 1 - Math.pow(0.002, dt))
    camera.lookAt(0, 0, 0)
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, state.pointer.x * 0.3, 0.05)
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -state.pointer.y * 0.15, 0.05)
    }
  })
  return <group ref={root}>{children}</group>
}

export default function Hero() {
  const reduced = useReducedMotion()
  return (
    <section className="relative h-[70vh] min-h-[640px] w-full bg-ink overflow-hidden flex items-center justify-center">
      <Canvas
        frameloop={reduced ? 'demand' : 'always'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: OVERVIEW.toArray(), fov: 45 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <color attach="background" args={['#070A12']} />
        <ambientLight intensity={0.4} />
        <Rig target={OVERVIEW} reduced={reduced}>
          <Core reduced={reduced} />
          <FloatingSymbol kind="cube" pos={[-2.6, 0.6, -1.2]} color="#7C5CFF" speed={0.9} />
          <FloatingSymbol kind="sphere" pos={[2.4, -0.4, -1.6]} color="#00E5FF" speed={1.1} />
          <FloatingSymbol kind="ring" pos={[-1.4, -0.9, -2.0]} color="#B8FF6A" speed={0.7} />
          <FloatingSymbol kind="cube" pos={[1.0, 0.9, -2.4]} color="#9AA6BD" speed={1.0} />
          <FloatingSymbol kind="sphere" pos={[-3.0, -0.2, -2.6]} color="#7C5CFF" speed={0.8} />
        </Rig>
      </Canvas>

      <div className="relative z-10 px-6 sm:px-8 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-text tracking-tight mb-4 text-balance">Jihad Hosen</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-cyan mb-6">Full-Stack Developer</h2>
        <p className="text-muted text-lg sm:text-xl mb-8 max-w-md mx-auto">
          Interfaces that respond. Backends that hold.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-6 py-3 rounded-full bg-violet text-white font-semibold hover:bg-violet/90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan">
            View projects
          </a>
          <a href="#contact" className="px-6 py-3 rounded-full border border-muted text-text font-semibold hover:bg-panel transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
