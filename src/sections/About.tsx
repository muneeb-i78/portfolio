import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, FolderGit2, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatCard = ({ value, label, icon, delay }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        card,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation
      const numericValue = parseInt(value.replace(/\D/g, ''));
      const suffix = value.replace(/[0-9]/g, '');

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setDisplayValue(Math.floor(this.targets()[0].val) + suffix);
              },
            }
          );
        },
      });
    }, card);

    return () => ctx.revert();
  }, [delay, value]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="text-cyan-400 mb-3 flex justify-center">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{displayValue}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading mask reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio fade up
      gsap.fromTo(
        bioRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '16', label: 'Years Education', icon: <GraduationCap size={28} /> },
    { value: '2+', label: 'Years Experience', icon: <Briefcase size={28} /> },
    { value: '10+', label: 'Projects', icon: <FolderGit2 size={28} /> },
    { value: '5+', label: 'Certifications', icon: <Award size={28} /> },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            Get To Know Me
          </p>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Highly motivated <span className="text-cyan-400 font-semibold">Computer Engineering graduate</span> from{' '}
          <span className="text-cyan-400 font-semibold">National University of Technology (Nutech)</span> with a solid
          foundation in programming languages like C, C++, Java, and Python. Skilled in hardware design,
          software development methodologies, and networking principles. Proven ability to tackle complex
          problems with a logical and analytical approach. Strong team player with excellent communication skills.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
