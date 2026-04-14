import { RESUME_DATA } from '../data/resumeData';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Trophy, GraduationCap } from 'lucide-react';

const TimelineItem = ({ data, index, type }: { data: any, index: number, type: 'work' | 'award' | 'edu' }) => {
  const isEven = index % 2 === 0;

  const icons = {
    work: Briefcase,
    award: Trophy,
    edu: GraduationCap
  };
  const Icon = icons[type];

  return (
    <div className="relative flex items-center justify-between mb-24 w-full group">
      {/* Central Connector Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#1A202C] border-4 border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-primary-accent group-hover:text-primary-accent group-hover:shadow-[0_0_20px_rgba(242,97,63,0.4)] transition-all duration-500">
         <Icon size={20} />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-[42%] ${isEven ? 'text-right' : 'text-left ml-auto'} space-y-3`}
      >
        <div className="inline-block px-3 py-1 rounded-full bg-primary-accent/10 text-primary-accent text-[10px] font-black uppercase tracking-widest border border-primary-accent/20">
          {data.duration || '2024'}
        </div>
        
        <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary-accent transition-colors">
          {data.company || data.institution || data}
        </h3>
        
        <p className="text-gray-400 font-bold text-sm tracking-wide lowercase">
          {data.role || (typeof data === 'string' ? 'Achievement' : 'Certification')}
        </p>
        
        {data.description && (
          <p className="text-gray-500 text-sm leading-relaxed font-medium pt-2">
            {data.description}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="relative w-full py-32 overflow-hidden bg-[#1A202C]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 text-center space-y-4">
           <h4 className="text-primary-accent font-black uppercase tracking-[0.3em] text-[10px]">Professional Journey</h4>
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Growth & <span className="opacity-30">Milestones.</span></h2>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-col items-center w-full">
           
           {/* The Central Vertical Line */}
           <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-gray-800"></div>
           
           {/* Animated Progress Line */}
           <motion.div 
             style={{ scaleY, originY: 0 }}
             className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-primary-accent z-10"
           ></motion.div>

           {/* Timeline Items - Experience */}
           {RESUME_DATA.experience.map((exp, i) => (
             <TimelineItem key={i} index={i} data={exp} type="work" />
           ))}

           {/* Timeline Items - Education */}
           {RESUME_DATA.education.map((edu, i) => (
             <TimelineItem key={i} index={RESUME_DATA.experience.length + i} data={edu} type="edu" />
           ))}

           {/* Timeline Items - Achievements (Simplified for Timeline) */}
           {RESUME_DATA.achievements.map((ach, i) => (
             <TimelineItem key={i} index={RESUME_DATA.experience.length + RESUME_DATA.education.length + i} data={ach} type="award" />
           ))}

        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-primary-accent/5 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};
