import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Download, MessageSquare } from 'lucide-react';

export const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const actions: {
    icon: React.ElementType;
    label: string;
    href: string | null;
    download?: boolean;
    onClick?: () => void;
    color: string;
  }[] = [
    {
      icon: MessageSquare,
      label: "Hire Me",
      href: "#contacts",
      color: '#f2613f',
    },
    {
      icon: Download,
      label: "Download CV",
      href: "/Abhay_Pratap_Singh_CV.pdf",
      download: true,
      color: '#61DAFB',
    },
    {
      icon: ArrowUp,
      label: "Back to Top",
      href: null,
      onClick: scrollToTop,
      color: '#BB87FC',
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3"
        >
          {/* Sub-actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                {actions.map((action, i) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="flex items-center gap-3 group"
                  >
                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className="px-3 py-1.5 rounded-lg bg-[#1C232B] border border-white/10 text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap shadow-lg"
                    >
                      {action.label}
                    </motion.div>

                    {/* Button */}
                    {action.href ? (
                      <a
                        href={action.href}
                        target={action.download ? '_blank' : undefined}
                        rel={action.download ? 'noopener noreferrer' : undefined}
                        download={action.download || undefined}
                        onClick={() => setIsExpanded(false)}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-[#1C232B] shadow-lg transition-all duration-300 hover:scale-110"
                        style={{ color: action.color, boxShadow: `0 0 20px ${action.color}20` }}
                        title={action.label}
                      >
                        <action.icon size={18} />
                      </a>
                    ) : (
                      <button
                        onClick={action.onClick}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-[#1C232B] shadow-lg transition-all duration-300 hover:scale-110"
                        style={{ color: action.color, boxShadow: `0 0 20px ${action.color}20` }}
                        title={action.label}
                      >
                        <action.icon size={18} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB toggle */}
          <motion.button
            onClick={() => setIsExpanded(v => !v)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
            title="Quick Actions"
          >
            {/* Spinning gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent via-orange-500 to-purple-600" />
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: isExpanded ? 0 : 1 }}
            />
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
