import { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJs, FaHtml5, FaCss3Alt, FaDatabase,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiFramer, SiMongodb, SiExpress, SiVite, SiPostman, SiPostgresql,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

// Map skill names to icons & colors
const SKILL_META: Record<string, { icon: React.ElementType; color: string }> = {
  'React':          { icon: FaReact,      color: '#61DAFB' },
  'TypeScript':     { icon: SiTypescript, color: '#3178C6' },
  'JavaScript':     { icon: FaJs,         color: '#F7DF1E' },
  'Tailwind CSS':   { icon: SiTailwindcss,color: '#06B6D4' },
  'HTML/CSS':       { icon: FaHtml5,      color: '#E34F26' },
  'Framer Motion':  { icon: SiFramer,     color: '#BB87FC' },
  'Node.js':        { icon: FaNodeJs,     color: '#339933' },
  'Express':        { icon: SiExpress,    color: '#aaaaaa' },
  'MongoDB':        { icon: SiMongodb,    color: '#47A248' },
  'SQL':            { icon: FaDatabase,   color: '#F59E0B' },
  'Database Management': { icon: FaDatabase, color: '#F59E0B' },
  'Git':            { icon: FaGitAlt,     color: '#F05032' },
  'GitHub':         { icon: FaGithub,     color: '#ffffff' },
  'Vite':           { icon: SiVite,       color: '#646CFF' },
  'VS Code':        { icon: VscCode,      color: '#007ACC' },
  'Postman':        { icon: SiPostman,    color: '#FF6C37' },
  'PostgreSQL':     { icon: SiPostgresql, color: '#4169E1' },
  'CSS Modules':    { icon: FaCss3Alt,    color: '#264de4' },
};

const SkillCard = ({ name, index }: { name: string; index: number }) => {
  const meta = SKILL_META[name];
  const Icon = meta?.icon;
  const color = meta?.color ?? '#f2613f';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="relative group cursor-default"
    >
      {/* Card */}
      <div
        className="relative flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/5 bg-[#161B22] overflow-hidden transition-all duration-300"
        style={{
          boxShadow: '0 0 0 0 transparent',
        }}
      >
        {/* Glow blob on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${color}18 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--skill-color)] transition-all duration-300 pointer-events-none"
          style={{ '--skill-color': `${color}40` } as React.CSSProperties}
        />

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ background: `${color}15`, color }}
        >
          {Icon ? <Icon size={20} /> : (
            <span className="text-xs font-black" style={{ color }}>{name[0]}</span>
          )}
        </div>

        {/* Name */}
        <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors duration-300 tracking-wide">
          {name}
        </span>

        {/* Corner accent dot */}
        <div
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
};

const CategoryTab = ({
  label,
  isActive,
  onClick,
  color,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}) => (
  <button
    onClick={onClick}
    className="relative px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none"
    style={{
      color: isActive ? color : '#6B7280',
      background: isActive ? `${color}15` : 'transparent',
      border: `1px solid ${isActive ? `${color}50` : 'rgba(255,255,255,0.05)'}`,
    }}
  >
    {isActive && (
      <motion.div
        layoutId="active-tab"
        className="absolute inset-0 rounded-full"
        style={{ background: `${color}10`, border: `1px solid ${color}40` }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);

const CATEGORY_COLORS: Record<string, string> = {
  'Frontend': '#61DAFB',
  'Backend':  '#339933',
  'Tools':    '#F7DF1E',
};

export const Skills = () => {
  const categories = RESUME_DATA.skills;
  const [activeCategory, setActiveCategory] = useState(categories[0].category);

  const activeData = categories.find(c => c.category === activeCategory);

  return (
    <section id="skills" className="relative w-full py-32 overflow-hidden bg-[#1A202C]">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-accent/4 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-3">
            <h4 className="text-primary-accent font-black uppercase tracking-[0.3em] text-[10px]">
              Technical Stack
            </h4>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
              Skills & <span className="opacity-30">Expertise.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm md:text-right">
            A curated toolkit of technologies I use to architect and ship production-grade digital experiences.
          </p>
        </div>

        {/* Main Content: Bento Shell */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">

          {/* Left: Category Selector */}
          <div className="space-y-4">
            {categories.map(cat => {
              const color = CATEGORY_COLORS[cat.category] ?? '#f2613f';
              const isActive = activeCategory === cat.category;
              return (
                <motion.button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  whileHover={{ x: 6 }}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'border-white/10 bg-[#1C232B] shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
                      : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: isActive ? color : '#6B7280' }}>
                      {cat.category}
                    </div>
                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                      {cat.items.length} technologies
                    </div>
                  </div>
                  {/* Active indicator */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'scale-100' : 'scale-0'}`}
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                  />
                </motion.button>
              );
            })}

            {/* Summary stat card */}
            <div className="mt-8 p-6 rounded-2xl bg-[#1C232B] border border-white/5 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Proficiency Overview</p>
              {categories.map(cat => {
                const color = CATEGORY_COLORS[cat.category] ?? '#f2613f';
                const pct = Math.round((cat.items.length / 7) * 100);
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.category}</span>
                      <span className="text-[10px] font-black" style={{ color }}>{cat.items.length} skills</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(pct, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Skills Grid */}
          <div className="bg-[#1C232B] border border-white/5 rounded-[40px] p-8 md:p-10 relative overflow-hidden">
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none opacity-30 transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at 80% 20%, ${(CATEGORY_COLORS[activeCategory] ?? '#f2613f')}15 0%, transparent 60%)`
              }}
            />

            {/* Tab row */}
            <div className="flex gap-3 flex-wrap mb-8 relative z-10">
              {categories.map(cat => (
                <CategoryTab
                  key={cat.category}
                  label={cat.category}
                  isActive={activeCategory === cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  color={CATEGORY_COLORS[cat.category] ?? '#f2613f'}
                />
              ))}
            </div>

            {/* Animated skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10"
              >
                {activeData?.items.map((skill, idx) => (
                  <SkillCard key={skill} name={skill} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom count label */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                {activeData?.items.length} Technologies Listed
              </span>
              <div className="flex gap-1.5">
                {activeData?.items.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
