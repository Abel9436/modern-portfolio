'use client'

import { Download } from 'lucide-react'
import { useState } from 'react'

export function FloatingCVButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="https://drive.google.com/file/d/1zl8fAgy8d94kTZE9_rOpowcwbu0B-I7T/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 group"
      aria-label="View CV"
    >
      <div className="relative">
        {/* Main button */}
        <div className={`glass rounded-full p-3 md:p-4 transition-all duration-500 hover:scale-110 hover:shadow-2xl ${
          isHovered ? 'bg-foreground text-background' : ''
        }`}>
          <Download className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
            isHovered ? 'animate-bounce' : ''
          }`} />
        </div>

        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full border-2 border-foreground/50 animate-ping-slow opacity-0 group-hover:opacity-100" />
        
        {/* Label */}
        <span 
          className={`absolute bottom-full mb-2 md:mb-4 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1.5 md:py-2 bg-foreground text-background text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-300 ${
            isHovered 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          View CV
        </span>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-foreground/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </a>
  )
}
