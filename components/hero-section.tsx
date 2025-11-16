'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxOffset = {
    x: (mousePosition.x - window.innerWidth / 2) * 0.02,
    y: (mousePosition.y - window.innerHeight / 2) * 0.02,
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* 3D Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float animate-morph"
          style={{
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-accent/10 rounded-full animate-float animate-morph"
          style={{
            transform: `translate(${-parallaxOffset.x}px, ${-parallaxOffset.y}px)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-primary/10 animate-float animate-morph"
          style={{
            transform: `translate(${parallaxOffset.x * 1.5}px, ${parallaxOffset.y * 1.5}px)`,
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Abel</span>
          </h1>
          
          <div className="space-y-2 mb-8">
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground">
              <span className="inline-block hover:text-foreground transition-colors duration-300">Software Engineer</span>
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground">
              <span className="inline-block hover:text-foreground transition-colors duration-300">Fullstack & Mobile App Developer</span>
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground">
              <span className="inline-block hover:text-foreground transition-colors duration-300">AI & Automation Expert</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button 
              size="lg" 
              className="group relative overflow-hidden"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="group glass hover:bg-foreground/1 transition-all duration-300 px-8 py-6 text-lg rounded-full bg-background"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
