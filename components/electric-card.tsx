'use client'

import { ReactNode, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ElectricCardProps {
  children: ReactNode
  className?: string
}

export function ElectricCard({ children, className }: ElectricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      className={cn('relative group', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Electric border effect */}
      <div className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 rounded-[inherit] opacity-60"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3), transparent 80%)`,
          }}
        />
        <div className="absolute inset-0 rounded-[inherit]">
          <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: `
                conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  rgba(255, 255, 255, 0.8) ${isHovered ? '90deg' : '0deg'},
                  transparent ${isHovered ? '180deg' : '0deg'}
                )
              `,
              animation: isHovered ? 'spin 2s linear infinite' : 'none',
            }}
          />
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15), transparent 70%)`,
        }}
      />

      {/* Card content */}
      <div className={cn('relative glass rounded-2xl', className)}>
        {children}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
