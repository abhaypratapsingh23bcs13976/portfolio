import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact, Footer } from './components/Contact';
import { FloatingActions } from './components/FloatingActions';
import { motion } from 'framer-motion';

import { ProfileProvider } from './hooks/useProfile';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { AdminGateModal } from './components/AdminGateModal';

const MouseSpotlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="cursor-spotlight hidden lg:block"
      style={{ 
        left: mousePos.x - 250, 
        top: mousePos.y - 250,
      }}
    />
  );
};

const SectionReveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ProfileProvider>
      <div className="w-full min-h-screen font-sans selection:bg-primary-accent selection:text-white bg-[#1A202C] relative overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.03] pointer-events-none"></div>
        <MouseSpotlight />
        <Navbar />
        <main className="relative z-10">
          <SectionReveal><Hero /></SectionReveal>
          <SectionReveal><About /></SectionReveal>
          <SectionReveal><Skills /></SectionReveal>
          <SectionReveal><Experience /></SectionReveal>
          <SectionReveal><Projects /></SectionReveal>
          <SectionReveal><Contact /></SectionReveal>
        </main>
        <Footer />
        <FloatingActions />
        <ProfileSettingsModal />
        <AdminGateModal />
      </div>
    </ProfileProvider>
  );
}

export default App;
