import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Linkedin, Mail, Phone } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Name animation - split characters
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
          },
          0.2
        );
      }

      // Role typewriter effect
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { width: 0, opacity: 1 },
          { width: '100%', duration: 0.8, ease: 'steps(20)' },
          0.8
        );
      }

      // Description fade in
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1
        );
      }

      // Image 3D swing in
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { rotateY: 45, opacity: 0, x: 100 },
          { rotateY: -5, opacity: 1, x: 0, duration: 1.2, ease: 'expo.out' },
          0.4
        );
      }

      // CTA buttons pop in
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          1.2
        );
      }

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split name into characters
  const name = 'Muneeb Ijaz';
  const nameChars = name.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left" style={{ transform: 'translateZ(100px)' }}>
            <p className="text-cyan-400 text-lg mb-4 font-medium tracking-wide">
              Hello, I'm
            </p>

            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4"
              style={{ perspective: '500px' }}
            >
              {nameChars}
            </h1>

            <div className="overflow-hidden mb-6">
              <p
                ref={roleRef}
                className="text-2xl sm:text-3xl gradient-text font-semibold inline-block whitespace-nowrap overflow-hidden"
              >
                Computer Engineer
              </p>
            </div>

            <p
              ref={descRef}
              className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Transforming complex problems into elegant digital solutions.
              Specializing in networking, software development, and hardware design.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary flex items-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>

              <div className="flex gap-3">
                <a
                  href="https://pk.linkedin.com/in/muneeb-ijaz-7205b0288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:muneebijaz78@gmail.com"
                  className="p-3 glass rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="tel:+923085097044"
                  className="p-3 glass rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
            style={{ transform: 'translateZ(50px) rotateY(-5deg)', transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />

              {/* Image container */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 glow-cyan">
                <img
                  src="/profile.jpg"
                  alt="Muneeb Ijaz"
                  className="w-full h-full object-cover"
                />

                {/* Scanline effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{
                    backgroundSize: '100% 4px',
                    animation: 'scanline 2s linear infinite'
                  }}
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 glass px-4 py-2 rounded-full text-sm text-cyan-400 animate-float">
                💻 Engineer
              </div>
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-full text-sm text-purple-400 animate-float" style={{ animationDelay: '1s' }}>
                🚀 Developer
              </div>
              <div className="absolute top-1/2 -right-8 glass px-4 py-2 rounded-full text-sm text-pink-400 animate-float" style={{ animationDelay: '2s' }}>
                🌐 Network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
