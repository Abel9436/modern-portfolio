'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const mouseRef = useRef(new THREE.Vector2())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Wave motion
      positions[i + 1] = y + Math.sin(time + x * 0.5) * 0.02

      // Mouse interaction
      const dx = x - mouseRef.current.x * 10
      const dy = y - mouseRef.current.y * 10
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 2) {
        positions[i] += dx * 0.001
        positions[i + 1] += dy * 0.001
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.05
  })

  const particleCount = 3000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  )
}
