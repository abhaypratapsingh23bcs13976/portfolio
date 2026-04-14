import { useState, useRef } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, SquareArrowOutUpRight, Rocket, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

// ─── Project Detail Modal ───────────────────────────────────────────────────

const ProjectModal = ({ project, isOpen, onClose }: any) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative w-full max-w-5xl bg-[#1C232B] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary-accent transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <div className="flex-1 h-1/2 md:h-full overflow-hidden bg-gray-900 border-r border-white/5">
              <img
                src={project.imageUrl || '/projects/placeholder.png'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-8 md:p-16 overflow-y-auto space-y-10 custom-scrollbar">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary-accent font-black uppercase tracking-[0.2em] text-xs">
                  <Rocket size={14} /> Production Ready
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                  {project.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-400 font-bold text-xs uppercase">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Project Overview</h4>
                <p className="text-gray-400 leading-relaxed text-lg font-medium">{project.description}</p>
                <p className="text-gray-500 leading-relaxed">
                  This implementation focuses on high performance, scalable architecture and pixel-perfect responsiveness.
                  I utilized modern design patterns to ensure a seamless user journey and robust state management.
                </p>
              </div>

              <div className="flex gap-6 pt-6">
                {project.liveUrl && project.liveUrl !== '#' ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    View Live <SquareArrowOutUpRight size={14} />
                  </a>
                ) : (
                  <div
                    title="Live URL not set yet — update liveUrl in resumeData.ts"
                    className="flex-1 bg-white/5 border border-dashed border-white/10 text-gray-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none"
                  >
                    Live Soon <SquareArrowOutUpRight size={14} />
                  </div>
                )}

                {project.githubUrl && project.githubUrl !== '#' ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    Source <FaGithub size={14} />
                  </a>
                ) : (
                  <div
                    title="GitHub URL not set yet — update githubUrl in resumeData.ts"
                    className="flex-1 bg-white/5 border border-dashed border-white/10 text-gray-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none"
                  >
                    Source <FaGithub size={14} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Premium Tilt Card ──────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  idx,
  onClick,
}: {
  project: (typeof RESUME_DATA.projects)[0];
  idx: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse-relative motion values for tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-60, 60], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-60, 60], [-6, 6]), { stiffness: 200, damping: 25 });

  // Subtle inner "light" that follows cursor
  const glowX = useSpring(useTransform(rawX, [-60, 60], [20, 80]), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useTransform(rawY, [-60, 60], [20, 80]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.09 }}
      style={{ perspective: 800 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[36px] bg-[#161B22] border border-white/5 overflow-hidden aspect-[4/5] flex flex-col transition-shadow duration-500"
        animate={{
          boxShadow: hovered
            ? '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(242,97,63,0.18)'
            : '0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* ── Cursor-following inner glow ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-[36px] opacity-0 transition-opacity duration-300"
          style={{
            background: hovered
              ? `radial-gradient(220px circle at ${glowX.get()}% ${glowY.get()}%, rgba(242,97,63,0.10) 0%, transparent 70%)`
              : 'none',
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Image Zone ── */}
        <div className="relative w-full h-[60%] overflow-hidden flex-shrink-0">
          <motion.img
            src={project.imageUrl || '/projects/placeholder.png'}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: hovered ? 0.5 : 0.15 }}
            transition={{ duration: 0.35 }}
          />

          {/* Index badge */}
          <div className="absolute top-4 left-5 z-20">
            <motion.span
              className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40"
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              0{idx + 1}
            </motion.span>
          </div>

          {/* ── Hover Action Buttons ── */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-6 px-6 gap-3 pointer-events-none">
            <AnimatePresence>
              {hovered && (
                <>
                  {/* View Project button */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.28, delay: 0.05 }}
                    className="w-full pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); onClick(); }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary-accent/90 backdrop-blur-sm text-white font-black uppercase tracking-[0.18em] text-[10px] shadow-[0_0_24px_rgba(242,97,63,0.35)] hover:bg-primary-accent transition-colors"
                    >
                      View Project <ArrowUpRight size={13} />
                    </button>
                  </motion.div>

                  {/* GitHub button */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.28, delay: 0.0 }}
                    className="w-full pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.githubUrl && project.githubUrl !== '#' ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-white font-black uppercase tracking-[0.18em] text-[10px] hover:bg-white/20 transition-colors"
                      >
                        GitHub <FaGithub size={12} />
                      </a>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-dashed border-white/10 text-white/30 font-black uppercase tracking-[0.18em] text-[10px] cursor-not-allowed select-none">
                        GitHub <FaGithub size={12} />
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Content Footer ── */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Category label */}
            <motion.p
              className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-accent mb-2"
              animate={{ opacity: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              {project.techStack[0]} · Studio Case
            </motion.p>

            {/* Title lifts up on hover */}
            <motion.h3
              className="text-xl font-black text-white tracking-tight leading-tight"
              animate={{ y: hovered ? -3 : 0, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)' }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-5">
            {/* Tech dots */}
            <div className="flex gap-1.5 items-center">
              {project.techStack.slice(0, 4).map((tech: string) => (
                <motion.span
                  key={tech}
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                  animate={{
                    color: hovered ? 'rgba(242,97,63,0.9)' : 'rgba(107,114,128,1)',
                    borderColor: hovered ? 'rgba(242,97,63,0.25)' : 'rgba(255,255,255,0.06)',
                    backgroundColor: hovered ? 'rgba(242,97,63,0.08)' : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Arrow indicator */}
            <motion.div
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              animate={{
                borderColor: hovered ? 'rgba(242,97,63,0.5)' : 'rgba(255,255,255,0.06)',
                color: hovered ? '#f2613f' : 'rgba(107,114,128,1)',
                rotate: hovered ? 45 : 0,
                scale: hovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.35 }}
            >
              <ArrowUpRight size={15} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Projects Section ───────────────────────────────────────────────────────

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="relative w-full py-32 overflow-hidden bg-[#1e2532]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col mb-24 space-y-4">
          <h4 className="text-primary-accent font-black uppercase tracking-[0.3em] text-[10px]">Selected Works</h4>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter max-w-2xl leading-[0.9]">
              Transforming ideas into{' '}
              <span className="opacity-30">digital reality.</span>
            </h2>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-4 text-gray-500 font-bold text-xs tracking-widest uppercase pb-2 underline decoration-primary-accent cursor-pointer hover:text-white transition-all duration-300"
            >
              Show all archives
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {RESUME_DATA.projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              idx={idx}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
