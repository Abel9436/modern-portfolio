'use client'

import { useEffect, useState } from 'react'

interface SplitTextProps {
  text: string
  className?: string
}

export function SplitText({ text, className = '' }: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0 rotate-0' 
              : 'opacity-0 translate-y-8 -rotate-12'
          }`}
          style={{
            transitionDelay: `${index * 0.05}s`,
            transformOrigin: 'center',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
