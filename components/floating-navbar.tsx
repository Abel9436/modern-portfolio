'use client'

import { useEffect, useState, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Agency', href: '#agency' },
  { label: 'Contact', href: '#contact' },
]

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isDark, setIsDark] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection('#' + entry.target.id)
        }
      })
    }, observerOptions)

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div 
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass rounded-full px-6 py-3 shadow-2xl transition-all duration-500 ease-out"
          style={{
            transform: `translate(-50%, 0) perspective(1000px) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
            boxShadow: `0 20px 60px rgba(0, 0, 0, ${isDark ? '0.5' : '0.15'})`
          }}
        >
          <div className="flex items-center gap-2">
            {/* Logo with morph animation */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-bold px-4 py-2 rounded-full hover:bg-foreground/10 transition-all duration-300 hover:scale-110"
            >
              A
            </button>

            <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent" />

            {/* Navigation links with liquid morph indicator */}
            <div className="flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isActive 
                        ? 'text-background' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <div 
                        className="absolute inset-0 bg-foreground rounded-full -z-10"
                        style={{
                          animation: 'morph 8s ease-in-out infinite'
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent" />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:scale-110 transition-all duration-300 hover:rotate-180"
            >
              <div className="relative w-5 h-5">
                <Sun 
                  className={`absolute inset-0 transition-all duration-500 ${
                    isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <Moon 
                  className={`absolute inset-0 transition-all duration-500 ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass rounded-full px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-background scale-110' 
                      : 'text-muted-foreground scale-100'
                  }`}
                >
                  {isActive && (
                    <div 
                      className="absolute inset-0 bg-foreground rounded-full -z-10"
                      style={{ animation: 'morph 8s ease-in-out infinite' }}
                    />
                  )}
                  <span className="relative z-10">{link.label[0]}</span>
                </button>
              )
            })}
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:scale-110 transition-all duration-300 w-8 h-8"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}
