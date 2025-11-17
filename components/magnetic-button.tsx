'use client'

import { useRef, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({ 
  children, 
  className = '',
  onClick,
  variant = 'default',
  size = 'default',
  type = 'button'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Magnetic strength
    setPosition({ 
      x: x * 0.3, 
      y: y * 0.3 
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  )
}
