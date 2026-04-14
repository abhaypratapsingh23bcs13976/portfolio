import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[index % texts.length];
    const delay = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        if (displayedText.length === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex(prev => prev + 1);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index, texts]);

  return (
    <span className="text-primary-accent border-r-4 border-primary-accent animate-pulse px-1">
      {displayedText}
    </span>
  );
};

export const Hero = () => {
  const { profile } = useProfile();

  // 3D Tilt & Mouse Light
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseLightX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseLightY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-32 pb-20 overflow-hidden bg-[#1A202C]"
    >
      {/* Dynamic Mouse Light Background */}
      <motion.div
        style={{ x: mouseLightX, y: mouseLightY, translateX: "-50%", translateY: "-50%" }}
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary-accent/5 rounded-full blur-[150px] pointer-events-none opacity-50"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent font-bold text-xs uppercase tracking-[0.2em] animate-pulse">
            <Sparkles size={14} /> Available for full-time roles
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
            Software<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-orange-400 to-purple-500 animate-gradient">Developer<span className="text-white">.</span></span>
          </h1>

          <div className="text-xl md:text-2xl font-medium text-gray-300">
            Expertise in <TypingText texts={["Building intelligent systems", "Turning ideas into products", "Designing performance UX"]} />
          </div>

          <p className="text-lg text-gray-400 leading-relaxed max-w-lg font-medium">
            I architect and build high-performance, real-world digital products that bridge the gap between complex logic and human-centric design.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <motion.a
              href="#contacts"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(242,97,63,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-accent text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300"
            >
              Start a Project
            </motion.a>
            {/* Download CV — place your PDF at: public/Abhay_Pratap_Singh_CV.pdf */}
            <motion.a
              href="/Abhay_Pratap_Singh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", y: -5 }}
              className="border-2 border-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 group"
            >
              Download CV
              <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side: 3D Tilt Portrait */}
        <div className="flex justify-center lg:justify-end items-center perspective-1000">
          <motion.div
            style={{
              rotateX: springX,
              rotateY: springY,
              transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-80 h-80 md:w-[380px] md:h-[380px]"
          >
            {/* Pulsing Outer Glow Ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-x-0 -inset-y-4 rounded-full bg-primary-accent/30 blur-[100px] -z-10"
            />
            <div className="absolute inset-0 rounded-[60px] border-[16px] border-primary-accent/20 shadow-[0_0_80px_rgba(242,97,63,0.2)]"></div>

            {/* Inner Portrait Card */}
            <div
              className="absolute inset-4 rounded-[40px] overflow-hidden bg-gradient-to-br from-gray-800 to-[#161B22] border-4 border-white/10 shadow-2xl group"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161B22]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </motion.div>
        </div>

      </div>


    </section>
  );
};
