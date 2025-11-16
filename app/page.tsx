import { ShaderHero } from '@/components/shader-hero'
import { FloatingNavbar } from '@/components/floating-navbar'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { AgencySection } from '@/components/agency-section'
import { ContactSection } from '@/components/contact-section'
import { BallpitBackground } from '@/components/ballpit-background'
import { ParticleField } from '@/components/particle-field'
import { FloatingSocials } from '@/components/floating-socials'
import { FloatingCVButton } from '@/components/floating-cv-button'

export default function Home() {
  return (
    <>
      <BallpitBackground />
      <ParticleField />
      <FloatingNavbar />
      <FloatingSocials />
      <FloatingCVButton />
      <main className="relative page-transition">
        <ShaderHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AgencySection />
        <ContactSection />
      </main>
    </>
  )
}
