import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  title: string;
  issuer: string;
  description: string;
  skills: string[];
}

const certifications: Certification[] = [
  {
    title: 'Programming with JavaScript',
    issuer: 'META',
    description: 'Professional certification covering modern JavaScript programming concepts and best practices.',
    skills: ['ES6+', 'Async Programming', 'DOM Manipulation', 'Error Handling'],
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'META',
    description: 'Comprehensive introduction to front-end technologies and responsive web design.',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Web Accessibility'],
  },
  {
    title: 'Provincial Level Certificate',
    issuer: 'NIB',
    description: 'Recognized certification demonstrating expertise in technical and professional skills.',
    skills: ['Technical Skills', 'Professional Development'],
  },
];

const CertificationCard = ({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Drop in animation with bounce
      gsap.fromTo(
        card,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative glass-card rounded-2xl p-6 hover:border-cyan-400/50 
                 transition-all duration-300 cursor-pointer"
    >
      {/* Pulse ring on hover */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 
                    group-hover:border-cyan-400/50 group-hover:animate-ping
                    pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl 
                      text-white group-hover:scale-110 transition-transform duration-300"
        >
          <Award size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            {cert.title}
          </h3>
          <p className="text-cyan-400 text-sm font-medium">{cert.issuer}</p>
        </div>
        <button
          className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4">{cert.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-800 
                       text-slate-300 rounded-md"
          >
            <CheckCircle2 size={12} className="text-cyan-400" />
            {skill}
          </span>
        ))}
      </div>

      {/* Badge decoration */}
      <div
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 
                    rounded-full flex items-center justify-center text-slate-900 text-xs font-bold
                    opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 
                    transition-all duration-300"
      >
        ✓
      </div>
    </div>
  );
};

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            Achievements
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
