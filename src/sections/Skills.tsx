import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Network,
  FolderKanban,
  Brain,
  Code2,
  Terminal,
  FileCode,
  Cpu,
  Coffee,
  MessageSquare,
  Presentation,
  Lightbulb,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Technical Skills',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Networking', icon: <Network size={18} />, level: 85 },
      { name: 'Project Management', icon: <FolderKanban size={18} />, level: 80 },
      { name: 'Machine Learning', icon: <Brain size={18} />, level: 70 },
    ],
  },
  {
    title: 'Software Skills',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'MATLAB', icon: <Code2 size={18} />, level: 85 },
      { name: 'LabVIEW', icon: <Terminal size={18} />, level: 75 },
      { name: 'Vivado', icon: <Cpu size={18} />, level: 70 },
      { name: 'Cisco Packet Tracer', icon: <Network size={18} />, level: 90 },
      { name: 'Win-Ladder Pro', icon: <FileCode size={18} />, level: 75 },
      { name: 'Unity 3D', icon: <Code2 size={18} />, level: 65 },
    ],
  },
  {
    title: 'Programming',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'C++', icon: <FileCode size={18} />, level: 90 },
      { name: 'Python', icon: <Terminal size={18} />, level: 85 },
      { name: 'C', icon: <Code2 size={18} />, level: 88 },
      { name: 'Java', icon: <Coffee size={18} />, level: 75 },
    ],
  },
  {
    title: 'Soft Skills',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Communication', icon: <MessageSquare size={18} />, level: 90 },
      { name: 'Presentation', icon: <Presentation size={18} />, level: 85 },
      { name: 'Problem Solving', icon: <Lightbulb size={18} />, level: 88 },
      { name: 'Teamwork', icon: <Users size={18} />, level: 92 },
    ],
  },
];

const SkillTag = ({
  skill,
  color,
  index,
}: {
  skill: Skill;
  color: string;
  index: number;
}) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tag,
        {
          scale: 0,
          opacity: 0,
          rotation: (Math.random() - 0.5) * 30,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: tag,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, tag);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={tagRef}
      className="group relative"
    >
      <div
        className="flex items-center gap-2 px-4 py-2 glass rounded-full cursor-pointer
                   hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300
                   skill-tag"
      >
        <span className="text-cyan-400 group-hover:text-slate-900 transition-colors">
          {skill.icon}
        </span>
        <span className="text-sm font-medium text-slate-300 group-hover:text-slate-900">
          {skill.name}
        </span>
      </div>

      {/* Progress tooltip */}
      <div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   pointer-events-none z-20"
      >
        <div className="glass-card px-3 py-2 rounded-lg whitespace-nowrap">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden`}>
              <div
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span className="text-xs text-cyan-400">{skill.level}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillCategorySection = ({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={sectionRef} className="glass-card rounded-2xl p-6">
      <h3
        className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
      >
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <SkillTag key={skill.name} skill={skill} color={category.color} index={i} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            What I Bring
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategorySection
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
