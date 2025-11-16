'use client'

import { useEffect, useState } from 'react'
import { ElectricCard } from '@/components/electric-card'
import { MagneticButton } from '@/components/magnetic-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Linkedin, Twitter, Instagram, Youtube, Send } from 'lucide-react'

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abelabekele?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbSfASUqKTZCtyTCjtCRGEA%3D%3D', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me/AbelBekele07', label: 'Telegram' },
  { icon: Twitter, href: 'https://x.com/abelbk007', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/abel.techh/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@abeltechs', label: 'YouTube' },
]

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })

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

    const element = document.getElementById('contact')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formState.name}`)
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    const mailtoLink = `mailto:abelbk06@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's create something amazing together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <ElectricCard>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full min-h-[150px]"
                      required
                    />
                  </div>

                  <MagneticButton type="submit" size="lg" className="w-full group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </MagneticButton>
                </form>
              </div>
            </ElectricCard>

            {/* Contact Info */}
            <div className="space-y-6">
              <ElectricCard>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg animate-pulse-glow">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:abelbk06@gmail.com" className="font-medium hover:text-primary transition-colors">
                          abelbk06@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ElectricCard>

              <ElectricCard>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </ElectricCard>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-12 border-t border-border">
            <p className="text-muted-foreground">
              © 2025 Abel. Built with passion and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
