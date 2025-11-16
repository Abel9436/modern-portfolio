'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(var(--primary), 0.5)'
        }}
      />
    </div>
  )
}
