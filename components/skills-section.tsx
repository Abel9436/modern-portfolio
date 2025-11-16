'use client'

import { useEffect, useState } from 'react'
import { ElectricCard } from '@/components/electric-card'
import { Code2, Smartphone, Brain, Zap } from 'lucide-react'

const skills = [
  {
    icon: Code2,
    title: 'Fullstack Development',
    description: 'Building scalable web applications with modern frameworks and best practices',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Django', 'FastAPI'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Creating seamless mobile experiences for iOS and Android platforms',
    technologies: ['Flutter', 'Dart'],
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Implementing intelligent systems powered by machine learning and AI',
    technologies: ['OpenAI', 'LangChain', 'GPT'],
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamlining workflows with intelligent automation and process optimization',
    technologies: ['Zapier', 'n8n', 'APIs', 'Webhooks'],
  },
]

  export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('skills')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-24 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Transforming ideas into reality with cutting-edge technology
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.title}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease-out'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <ElectricCard
                    className="group relative p-8 glass-strong border-2 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-500 animate-morph">
                        <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {skill.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {skill.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                          style={{
                            animationDelay: `${techIndex * 50}ms`,
                            animation: hoveredIndex === index ? 'fadeInUp 0.4s ease-out forwards' : 'none'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  </ElectricCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
