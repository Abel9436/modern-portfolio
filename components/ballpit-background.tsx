'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Ball {
  position: THREE.Vector3
  velocity: THREE.Vector3
  radius: number
  mesh?: THREE.Mesh
}

function BallPit() {
  const groupRef = useRef<THREE.Group>(null)
  const ballsRef = useRef<Ball[]>([])
  const mouseRef = useRef(new THREE.Vector3())
  const cursorBallRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const ballCount = 150
    const balls: Ball[] = []

    // Initialize balls
    for (let i = 0; i < ballCount; i++) {
      balls.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 + 5,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          0
        ),
        radius: Math.random() * 0.3 + 0.4
      })
    }

    ballsRef.current = balls

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 20 - 10
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 15 + 7.5
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    const balls = ballsRef.current
    const gravity = 0.02
    const friction = 0.9975
    const wallBounce = 0.95

    // Update cursor ball position
    if (cursorBallRef.current) {
      cursorBallRef.current.position.lerp(mouseRef.current, 0.1)
    }

    balls.forEach((ball, i) => {
      // Apply gravity
      ball.velocity.y -= gravity

      // Apply friction
      ball.velocity.multiplyScalar(friction)

      // Update position
      ball.position.add(ball.velocity)

      // Collision with walls
      if (ball.position.x - ball.radius < -10) {
        ball.position.x = -10 + ball.radius
        ball.velocity.x *= -wallBounce
      }
      if (ball.position.x + ball.radius > 10) {
        ball.position.x = 10 - ball.radius
        ball.velocity.x *= -wallBounce
      }
      if (ball.position.y - ball.radius < -7) {
        ball.position.y = -7 + ball.radius
        ball.velocity.y *= -wallBounce
      }
      if (ball.position.y + ball.radius > 15) {
        ball.position.y = 15 - ball.radius
        ball.velocity.y *= -wallBounce
      }

      // Collision with cursor ball
      if (cursorBallRef.current) {
        const cursorPos = cursorBallRef.current.position
        const dist = ball.position.distanceTo(cursorPos)
        const minDist = ball.radius + 1

        if (dist < minDist) {
          const normal = ball.position.clone().sub(cursorPos).normalize()
          ball.position.copy(cursorPos).add(normal.multiplyScalar(minDist))
          ball.velocity.add(normal.multiplyScalar(0.2))
        }
      }

      // Ball to ball collision
      for (let j = i + 1; j < balls.length; j++) {
        const otherBall = balls[j]
        const dist = ball.position.distanceTo(otherBall.position)
        const minDist = ball.radius + otherBall.radius

        if (dist < minDist) {
          const normal = ball.position.clone().sub(otherBall.position).normalize()
          const overlap = minDist - dist
          ball.position.add(normal.clone().multiplyScalar(overlap * 0.5))
          otherBall.position.sub(normal.clone().multiplyScalar(overlap * 0.5))

          const relativeVelocity = ball.velocity.clone().sub(otherBall.velocity)
          const speed = relativeVelocity.dot(normal)

          if (speed < 0) continue

          ball.velocity.sub(normal.clone().multiplyScalar(speed))
          otherBall.velocity.add(normal.clone().multiplyScalar(speed))
        }
      }

      // Update mesh position
      if (ball.mesh) {
        ball.mesh.position.copy(ball.position)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Cursor follower ball */}
      <mesh ref={cursorBallRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ball pit balls */}
      {ballsRef.current.map((ball, i) => {
        const colors = ['#ffffff', '#e5e5e5', '#cccccc']
        const color = colors[i % colors.length]
        
        return (
          <mesh
            key={i}
            position={ball.position}
            ref={(mesh) => {
              if (mesh) ball.mesh = mesh
            }}
          >
            <sphereGeometry args={[ball.radius, 16, 16]} />
            <meshStandardMaterial
              color={color}
              metalness={0.2}
              roughness={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function BallpitBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-20 dark:opacity-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={200} />
        <pointLight position={[-10, -10, -10]} intensity={100} />
        <BallPit />
      </Canvas>
    </div>
  )
}
