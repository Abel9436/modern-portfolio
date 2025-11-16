'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const trailIdRef = useRef(0)

  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Add trail point
      if (Math.random() > 0.7) {
        const newTrail = { 
          x: e.clientX, 
          y: e.clientY, 
          id: trailIdRef.current++ 
        }
        
        setTrails(prev => {
          const updated = [...prev, newTrail]
          if (updated.length > 15) {
            return updated.slice(-15)
          }
          return updated
        })

        // Remove trail after animation
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== newTrail.id))
        }, 800)
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer')
      
      setIsPointer(isInteractive)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    const animate = () => {
      // Smooth cursor movement with easing
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      
      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: isPointer ? '60px' : '40px',
          height: isPointer ? '60px' : '40px',
          marginLeft: isPointer ? '-30px' : '-20px',
          marginTop: isPointer ? '-30px' : '-20px',
        }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
            isPointer 
              ? 'border-primary bg-primary/10 scale-110' 
              : 'border-foreground/30 bg-foreground/5'
          }`}
          style={{
            backdropFilter: 'blur(2px)',
          }}
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isPointer ? 'bg-primary scale-150' : 'bg-foreground'
          }`}
        />
      </div>

      {/* Cursor trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 pointer-events-none z-[9998]"
          style={{
            transform: `translate(${trail.x}px, ${trail.y}px)`,
          }}
        >
          <div 
            className="w-full h-full rounded-full bg-primary animate-trail-fade"
          />
        </div>
      ))}
    </>
  )
}
