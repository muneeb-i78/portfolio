import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Navigation from './sections/Navigation';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Subtle radial glow at top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(6,182,212,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <div className="section-divider mx-8 sm:mx-16" />
        <About />
        <div className="section-divider mx-8 sm:mx-16" />
        <Experience />
        <div className="section-divider mx-8 sm:mx-16" />
        <Education />
        <div className="section-divider mx-8 sm:mx-16" />
        <Skills />
        <div className="section-divider mx-8 sm:mx-16" />
        <Projects />
        <div className="section-divider mx-8 sm:mx-16" />
        <Certifications />
        <div className="section-divider mx-8 sm:mx-16" />
        <Contact />
      </main>
    </div>
  );
}

export default App;
