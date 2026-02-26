import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  achievements?: string[];
}

const educationData: EducationItem[] = [
  {
    degree: 'Bachelors in Computer Engineering',
    institution: 'National University of Technology Islamabad',
    location: 'Pakistan (NUTech)',
    period: '2020 - 2024',
    achievements: [
      'Strong foundation in programming languages',
      'Hardware design and networking principles',
      'Software development methodologies',
    ],
  },
  {
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'Govt. Gordon College Rawalpindi',
    location: 'Pakistan',
    period: '2017 - Oct 2019',
    achievements: ['Pre-Engineering focus', 'Strong mathematical foundation'],
  },
];

const EducationCard = ({
  edu,
  index,
}: {
  edu: EducationItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out',
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

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-300">
          <GraduationCap size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
            {edu.degree}
          </h3>
          <p className="text-slate-400">{edu.institution}</p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Calendar size={16} />
          <span>{edu.period}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin size={16} />
          <span>{edu.location}</span>
        </div>
      </div>

      {/* Achievements */}
      {edu.achievements && (
        <div className="space-y-2 pt-4 border-t border-slate-700/50">
          {edu.achievements.map((achievement, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <Award size={14} className="text-cyan-400 flex-shrink-0" />
              <span>{achievement}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            Academic Background
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.degree} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
