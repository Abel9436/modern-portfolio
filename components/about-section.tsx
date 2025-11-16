'use client'

import { useEffect, useState } from 'react'
import { ElectricCard } from '@/components/electric-card'
import { Code2, Smartphone, Brain, Workflow } from 'lucide-react'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

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

    const element = document.getElementById('about')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      icon: Code2,
      title: 'Fullstack Development',
      skills: ['React', 'Next.js', 'Django', 'FastAPI'],
      years: '5+'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      skills: ['Flutter', 'Dart'],
      years: '3+'
    },
    {
      icon: Brain,
      title: 'AI Integration',
      skills: ['Python', 'OpenAI', 'LangChain'],
      years: '3+'
    },
    {
      icon: Workflow,
      title: 'AI & Automation',
      skills: ['n8n', 'Zapier', 'Make', 'Automation Scripts'],
      years: '3+'
    }
  ]

  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ElectricCard>
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I'm a passionate <span className="text-foreground font-semibold">Software Engineer</span> with expertise in fullstack web development, mobile app development, and cutting-edge AI solutions.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Specializing in <span className="text-foreground font-semibold">Python, Flutter, React, and Next.js</span>, I build seamless experiences across web and mobile platforms.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    With deep expertise in <span className="text-foreground font-semibold">AI & Automation</span>, I transform business operations through intelligent systems and workflow optimization.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    As the founder of an <span className="text-foreground font-semibold">AI & Automation Agency</span>, I deliver innovative solutions that drive efficiency and scalability.
                  </p>
                </div>
              </div>
            </ElectricCard>

            <ElectricCard>
              <div className="p-8 md:p-12">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-liquidMorph rounded-2xl" />
                  <div className="absolute inset-4 bg-gradient-to-tl from-accent/20 to-primary/20 animate-liquidMorph rounded-2xl" style={{ animationDelay: '3s' }} />
                  <div className="absolute inset-8 bg-gradient-to-br from-primary/30 to-transparent animate-liquidMorph rounded-2xl" style={{ animationDelay: '6s' }} />
                  <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center backdrop-blur-xl">
                    <div className="text-center space-y-4">
                      <div className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        4+
                      </div>
                      <div className="text-lg md:text-xl text-muted-foreground font-medium">
                        Years of Experience
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Building Digital Excellence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ElectricCard>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <ElectricCard key={exp.title}>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl glass">
                      <exp.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">{exp.years} years</div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 text-xs rounded-full glass"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ElectricCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
