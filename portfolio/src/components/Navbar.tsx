import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contacts' }
];

export const Navbar = () => {
  const { profile, setIsSettingsOpen, isAdmin, setIsGateOpen } = useProfile();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    if (isAdmin) {
      setIsSettingsOpen(true);
    } else {
      setIsGateOpen(true);
    }
  };

  // Handle Scroll behavior for shrinking + glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Super simple scroll spy based on standard section positions
      const sections = [
        { id: 'contacts', name: 'Contact' },
        { id: 'projects', name: 'Projects' },
        { id: 'experience', name: 'Experience' },
        { id: 'skills', name: 'Skills' },
        { id: 'about', name: 'About' }
      ];
      
      let currentSection = 'Home';
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the offset (200px) based on typical header height and desired trigger point
          if (rect.top <= 200) {
            currentSection = section.name;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? 'py-4 bg-[#1A202C]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.06)]' 
            : 'py-10 bg-transparent shadow-[0_0_0_rgba(0,0,0,0),0_1px_0_rgba(255,255,255,0)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between">
          
          {/* Logo Section - Interactive Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={handleProfileClick}
            className="flex items-center gap-3 group cursor-pointer relative z-50"
            title="Edit Profile Settings"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary-accent transition-all duration-300 shadow-md">
               <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block text-xl font-bold text-white transition-all duration-300 group-hover:text-gray-300">
              {profile.name}
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.name ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-400 hover:text-white'
                } group py-2`}
              >
                {link.name}
                {/* Animated under-glow line */}
                <span className={`absolute left-0 bottom-0 h-[2px] bg-primary-accent transition-all duration-300 shadow-[0_0_8px_rgba(242,97,63,0.8)] ${
                  activeSection === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <a 
              href="#contacts"
              className="hidden md:flex relative overflow-hidden rounded-full p-[1px] group"
            >
              {/* Spinning gradient border illusion */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary-accent via-orange-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity duration-300"></span>
              {/* Actual button surface */}
              <div className="relative px-6 py-2 bg-[#1A202C] rounded-full flex items-center gap-2 text-sm font-semibold text-white group-hover:bg-transparent transition-all duration-300">
                Let's Talk
              </div>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-white hover:text-primary-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#161B22]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center space-y-8"
          >
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-extrabold tracking-tight ${activeSection === link.name ? 'text-primary-accent' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            
            <a 
              href="#contacts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-10 py-4 bg-primary-accent text-white rounded-full text-xl font-bold tracking-wide shadow-[0_0_20px_rgba(242,97,63,0.5)]"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
