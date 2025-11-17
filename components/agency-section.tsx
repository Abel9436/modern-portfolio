'use client'

import { useEffect, useState } from 'react'
import { ElectricCard } from '@/components/electric-card'
import { MagneticButton } from '@/components/magnetic-button'
import { Workflow, Target, TrendingUp } from 'lucide-react'

const services = [
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'Streamline workflows and eliminate repetitive tasks',
    features: ['Workflow Design', 'API Integration', 'Custom Automations'],
  },
  {
    icon: Target,
    title: 'Strategic Consulting',
    description: 'Expert guidance on digital transformation and tech strategy',
    features: ['Technology Audit', 'Roadmap Planning', 'Implementation'],
  },
  {
    icon: TrendingUp,
    title: 'Scale & Optimize',
    description: 'Performance optimization and scalable architecture design',
    features: ['Performance Tuning', 'Cloud Architecture', 'DevOps'],
  },
]

export function AgencySection() {
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

    const element = document.getElementById('agency')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="agency" className="relative py-24 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              AI & Automation Agency
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Delivering <span className="text-foreground font-semibold">priceless solutions</span> that drive innovation and efficiency for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <ElectricCard 
                  key={service.title}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ElectricCard>
              )
            })}
          </div>

          <div className="text-center">
            <ElectricCard className="inline-block">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg">
                  Let's discuss how AI and automation can revolutionize your operations
                </p>
                <MagneticButton 
                  size="lg" 
                  className="group"
                  //to redirect to https://agency.abelo.tech
                  onClick={() => {
                    window.location.href = 'https://agency.abelo.tech'
                    window.open('https://agency.abelo.tech', '_blank')
                  }}
                >
                  Schedule a Consultation
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </MagneticButton>
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    </section>
  )
}