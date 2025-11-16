'use client'

import { useEffect, useState } from 'react'
import { ElectricCard } from '@/components/electric-card'
import { Button } from '@/components/ui/button'

const projects = [
  {
    title: 'Enterprise Workflow Automation Platform',
    category: 'Automation',
    description: 'Streamlined business processes by automating repetitive tasks across 50+ departments, reducing manual work by 80% and saving 200+ hours weekly. Integrated with CRM, ERP, and communication tools.',
    image: '/automation-workflow-platform.jpg',
    tags: ['Python', 'n8n', 'Zapier', 'Make'],
  },
  {
    title: 'Data Pipeline Automation System',
    category: 'Automation',
    description: 'Automated ETL processes handling millions of records daily, reducing processing time from 8 hours to 15 minutes. Implemented error handling and auto-recovery mechanisms.',
    image: '/data-pipeline-automation.jpg',
    tags: ['Python', 'n8n', 'Make', 'Zapier'],
  },
  {
    title: 'Customer Support Ticket Automation',
    category: 'Automation',
    description: 'Intelligent ticket routing and response system that automatically categorizes, prioritizes, and responds to 1000+ tickets daily, improving response time by 90% and customer satisfaction by 45%.',
    image: '/support-automation-system.jpg',
    tags: ['Python', 'n8n', 'Zapier', 'Make'],
  },
  {
    title: 'Marketing Campaign Automation',
    category: 'Automation',
    description: 'End-to-end marketing automation platform that manages email campaigns, social media posting, and lead nurturing. Increased conversion rates by 60% and reduced campaign setup time by 75%.',
    image: '/marketing-automation.jpg',
    tags: ['Python', 'n8n', 'Zapier', 'Make'],
  },
  {
    title: 'Inventory Management Automation',
    category: 'Automation',
    description: 'Automated inventory tracking and reordering system that monitors stock levels, predicts demand, and automatically places orders. Reduced stockouts by 85% and optimized warehouse operations.',
    image: '/inventory-automation.jpg',
    tags: ['Python', 'n8n', 'Zapier', 'Make'],
  },
  {
    title: 'Financial Report Generation Automation',
    category: 'Automation',
    description: 'Automated financial reporting system that generates comprehensive reports from multiple data sources, reducing report generation time from days to minutes and eliminating human errors.',
    image: '/financial-automation.jpg',
    tags: ['Python', 'n8n', 'Zapier', 'Make'],
  },
  {
    title: 'Healthcare Management Mobile App',
    category: 'Mobile',
    description: 'Comprehensive healthcare app serving 50,000+ users with appointment booking, prescription management, and telemedicine features. Reduced patient wait times by 70% and improved appointment adherence by 55%.',
    image: '/healthcare-mobile-app.jpg',
    tags: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
  },
  {
    title: 'E-Commerce Mobile Platform',
    category: 'Mobile',
    description: 'Feature-rich e-commerce mobile app with 100,000+ downloads, implementing secure payment processing, real-time inventory, and personalized recommendations. Increased mobile sales by 150% and user retention by 65%.',
    image: '/ecommerce-mobile-app.jpg',
    tags: ['Flutter', 'Dart', 'State Management', 'APIs'],
  },
  {
    title: 'Enterprise SaaS Platform',
    category: 'Fullstack',
    description: 'Scalable full-stack SaaS platform serving 10,000+ businesses with real-time collaboration, advanced analytics, and multi-tenant architecture. Processed 5M+ API requests daily with 99.9% uptime.',
    image: '/saas-platform.jpg',
    tags: ['Next.js', 'Django', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Real-Time Collaboration Platform',
    category: 'Fullstack',
    description: 'Full-stack collaboration platform enabling real-time document editing, video conferencing, and project management for remote teams. Improved team productivity by 40% and reduced meeting overhead by 50%.',
    image: '/collaboration-platform.jpg',
    tags: ['Next.js', 'Django', 'FastAPI', 'WebSocket'],
  },
]

const categories = ['All', 'Automation', 'Mobile', 'Fullstack']

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

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

    const element = document.getElementById('projects')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="relative py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Showcasing innovation through code
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <div className="glass rounded-full p-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedCategory === category ? 'animate-morph' : ''
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ElectricCard 
                key={project.title}
                className="group overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        {project.category === 'Automation' && (
                          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                        {project.category === 'Mobile' && (
                          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {project.category === 'Fullstack' && (
                          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{project.category}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full animate-morph">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {tag}
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
