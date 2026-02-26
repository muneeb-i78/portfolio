import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Car, Heart, Gamepad2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Data the New Soil',
    description:
      'Agricultural and Environmental Monitoring System - Final Year Project. Smart IoT-based solution for real-time soil and environmental data collection and analysis.',
    icon: <Cpu size={32} />,
    tags: ['IoT', 'Sensors', 'Data Analysis', 'Agriculture'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Gesture Based Control Car',
    description:
      'Raspberry-Pi based car controlled by hand gestures using computer vision and motion detection algorithms.',
    icon: <Car size={32} />,
    tags: ['Raspberry Pi', 'Computer Vision', 'Python', 'Hardware'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'ECG Heart Rate Monitoring',
    description:
      'Real-time ECG signal processing system for heart rate monitoring with anomaly detection capabilities.',
    icon: <Heart size={32} />,
    tags: ['Signal Processing', 'MATLAB', 'Healthcare', 'Electronics'],
    color: 'from-red-500 to-pink-500',
  },
  {
    title: 'Guess Game Using OOP',
    description:
      'Interactive guessing game built with Object-Oriented Programming principles in Java.',
    icon: <Gamepad2 size={32} />,
    tags: ['Java', 'OOP', 'Game Development', 'GUI'],
    color: 'from-purple-500 to-violet-500',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { rotateX: 90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glossy sheen effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 45%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 55%,
            transparent 60%
          )`,
          transform: `translateX(${(tilt.y + 10) * 5}%)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} 
                      flex items-center justify-center text-white mb-4
                      group-hover:scale-110 transition-transform duration-300`}
        >
          {project.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tags only - no buttons */}
      </div>

      {/* Border glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
        style={{ padding: '2px' }}
      />
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            My Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
