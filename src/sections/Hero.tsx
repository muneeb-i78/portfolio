import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Linkedin, Mail, Phone } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: 90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05, ease: 'expo.out' },
          0.2
        );
      }

      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { width: 0, opacity: 1 },
          { width: '100%', duration: 0.8, ease: 'steps(20)' },
          0.8
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { rotateY: 45, opacity: 0, x: 100 },
          { rotateY: -5, opacity: 1, x: 0, duration: 1.2, ease: 'expo.out' },
          0.4
        );
      }

      // Animate button and socials with fade — clearProps ensures no leftover styles
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
          1.2
        );
      }

      if (socialRef.current) {
        tl.fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
          1.35
        );
      }

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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    border: '1px solid rgba(6,182,212,0.15)',
    background: 'rgba(10,10,10,0.75)',
    backdropFilter: 'blur(12px)',
    color: '#94a3b8',
    transition: 'color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
    flexShrink: 0,
    cursor: 'pointer',
    position: 'relative',
    zIndex: 20,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = '#06b6d4';
    el.style.borderColor = 'rgba(6,182,212,0.5)';
    el.style.boxShadow = '0 0 16px rgba(6,182,212,0.25)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = '#94a3b8';
    el.style.borderColor = 'rgba(6,182,212,0.15)';
    el.style.boxShadow = 'none';
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-cyan-400 text-lg mb-4 font-medium tracking-wide">
              Hello, I'm
            </p>

            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4"
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

            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              style={{ position: 'relative', zIndex: 20 }}
            >
              <button
                ref={btnRef}
                onClick={() => scrollToSection('#projects')}
                className="btn-primary flex items-center gap-2"
                style={{ position: 'relative', zIndex: 20 }}
              >
                View My Work
                <ArrowDown size={18} />
              </button>

              <div
                ref={socialRef}
                className="flex gap-3"
                style={{ position: 'relative', zIndex: 20 }}
              >
                <a
                  href="https://www.linkedin.com/in/muneeb-ijaz-6aa4303b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={socialLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="mailto:muneebijaz78@gmail.com"
                  style={socialLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Mail size={20} />
                </a>

                <a
                  href="tel:+923085097044"
                  style={socialLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />

              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 glow-cyan">
                <img
                  src="/profile.jpg"
                  alt="Muneeb Ijaz"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-4 -left-4 glass px-4 py-2 rounded-full text-sm text-cyan-400 animate-float">
                💻 Engineer
              </div>
              <div
                className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-full text-sm text-blue-400 animate-float"
                style={{ animationDelay: '1s' }}
              >
                🚀 Developer
              </div>
              <div
                className="absolute top-1/2 -right-8 glass px-4 py-2 rounded-full text-sm text-cyan-300 animate-float"
                style={{ animationDelay: '2s' }}
              >
                🌐 Network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
