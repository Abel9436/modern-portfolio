'use client'

import { Linkedin, Twitter, Instagram, Youtube, Send } from 'lucide-react'
import { useState } from 'react'

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abelabekele?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbSfASUqKTZCtyTCjtCRGEA%3D%3D', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
  { icon: Send, href: 'https://t.me/AbelBekele07', label: 'Telegram', color: 'hover:bg-[#0088cc]' },
  { icon: Twitter, href: 'https://x.com/abelbk007', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: Instagram, href: 'https://www.instagram.com/abel.techh/', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
  { icon: Youtube, href: 'https://www.youtube.com/@abeltechs', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
]

export function FloatingSocials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 md:gap-4">
      {socials.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`group relative w-12 h-12 md:w-14 md:h-14 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
          aria-label={social.label}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <social.icon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" />
          
          {/* Tooltip */}
          <span 
            className={`absolute right-full mr-4 px-3 py-1.5 bg-foreground text-background text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
              hoveredIndex === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            {social.label}
          </span>

          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-foreground/20 animate-ping-slow opacity-0 group-hover:opacity-100" />
        </a>
      ))}
    </div>
  )
}
