'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { SplitText } from '@/components/split-text'
import * as THREE from 'three'

function ShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useRef({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.current.u_mouse.value.x = e.clientX / window.innerWidth
      uniforms.current.u_mouse.value.y = 1 - e.clientY / window.innerHeight
    }
    
    const handleResize = () => {
      uniforms.current.u_resolution.value.x = window.innerWidth
      uniforms.current.u_resolution.value.y = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useFrame((state) => {
    uniforms.current.u_time.value = state.clock.elapsedTime * 0.5
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 mouseInfluence = (st - u_mouse) * 2.0;
      
      float dist = length(mouseInfluence);
      float wave = sin(dist * 10.0 - u_time * 2.0) * 0.5 + 0.5;
      
      float pattern = sin(st.x * 20.0 + u_time) * cos(st.y * 20.0 + u_time);
      pattern = smoothstep(0.0, 0.5, pattern);
      
      float n = noise(st * 5.0 + u_time * 0.1);
      
      float finalValue = mix(pattern, wave, 0.3) * n;
      
      vec3 color1 = vec3(0.05, 0.05, 0.05);
      vec3 color2 = vec3(0.15, 0.15, 0.15);
      vec3 color = mix(color1, color2, finalValue);
      
      gl_FragColor = vec4(color, 0.3);
    }
  `

  return (
    <mesh ref={meshRef} scale={[window.innerWidth / 100, window.innerHeight / 100, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  )
}

function MorphingShapes() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.3
    }
  })

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <MorphingSphere key={i} position={[
          Math.sin(i * 2) * 3,
          Math.cos(i * 2) * 2,
          -5 + i * 0.5
        ]} />
      ))}
    </group>
  )
}

function MorphingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y += Math.sin(time + position[0]) * 0.002
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial 
        color="#ffffff"
        wireframe
        opacity={0.2}
        transparent
      />
    </mesh>
  )
}

export function ShaderHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ShaderBackground />
          <MorphingShapes />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="glass rounded-3xl p-12 md:p-16 max-w-4xl mx-auto">
          <div 
            className={`transition-all duration-1000 text-center ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold mb-6 tracking-tighter relative">
              <span className="inline-block hover:scale-110 transition-all duration-500 relative">
                <SplitText text="Abel" className="text-7xl md:text-9xl lg:text-[10rem] font-bold" />
                <svg className="absolute -bottom-2 left-0 w-full h-4 opacity-50" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="2">
                    <animate
                      attributeName="d"
                      dur="3s"
                      repeatCount="indefinite"
                      values="M0,5 Q50,0 100,5 T200,5;M0,5 Q50,10 100,5 T200,5;M0,5 Q50,0 100,5 T200,5"
                    />
                  </path>
                </svg>
              </span>
            </h1>
            
            <div className="space-y-3 mb-12">
              <p className="text-xl md:text-3xl lg:text-4xl font-light bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Software Engineer
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-light text-muted-foreground">
                Fullstack & Mobile App Developer
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-light bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                AI & Automation Expert
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-foreground text-background hover:scale-105 transition-all duration-300 px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-foreground to-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button 
                size="lg" 
                className="group glass hover:bg-foreground/10 transition-all duration-300 px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-1.5 animate-pulse">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
