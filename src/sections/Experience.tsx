import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Pakistan Telecommunications Limited (PTCL)',
    role: 'Internship (IP Core and Edge Operations)',
    period: 'Sep 2023',
    description: [
      'Gained hands-on experience in networking systems',
      'Involved in routing configuration and management',
      'Worked with optical fiber systems and technologies',
    ],
  },
  {
    company: 'Hustler Networks',
    role: 'IT Expert and CSR',
    period: '2021 - 2023',
    description: [
      'Provided Feedback and Coaching',
      'Quality Assurance and Compliance',
      'Process Optimization',
    ],
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          x: isLeft ? -100 : 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
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
  }, [isLeft]);

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } flex-col lg:gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900 z-10 hidden lg:block glow-cyan" />

      {/* Card */}
      <div
        className={`w-full lg:w-5/12 ${
          isLeft ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'
        }`}
      >
        <div className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 group">
          {/* Header */}
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
              <Building2 size={20} />
            </div>
            <div className={isLeft ? 'lg:text-right' : ''}>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {experience.company}
              </h3>
              <p className="text-slate-400 text-sm">{experience.role}</p>
            </div>
          </div>

          {/* Period */}
          <div className={`flex items-center gap-2 mb-4 text-cyan-400 ${isLeft ? 'lg:justify-end' : ''}`}>
            <Calendar size={16} />
            <span className="text-sm font-medium">{experience.period}</span>
          </div>

          {/* Description */}
          <ul className={`space-y-2 ${isLeft ? 'lg:text-right' : ''}`}>
            {experience.description.map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 text-slate-300 text-sm ${
                  isLeft ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer for timeline */}
      <div className="hidden lg:block lg:w-5/12" />
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline fill animation
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            My Journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-700 rounded-full hidden lg:block"
          >
            <div
              ref={lineFillRef}
              className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 rounded-full origin-top"
            />
          </div>

          {/* Experience cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div key={exp.company} className="lg:py-8">
                <ExperienceCard experience={exp} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
