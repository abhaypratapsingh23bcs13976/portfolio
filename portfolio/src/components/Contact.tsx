import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { RESUME_DATA } from '../data/resumeData';
import { Mail, Phone, Copy, Check, Loader2 } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Sub-components & Hooks ---

const FloatingInput = ({ label, type = "text", value, onChange, isTextArea = false, required = true }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputId = label.toLowerCase().replace(' ', '-');

  // Simple real-time validation
  useEffect(() => {
    if (value.length === 0) {
      setIsValid(null);
    } else if (type === 'email') {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    } else {
      setIsValid(value.length > 2);
    }
  }, [value, type]);

  const isActive = isFocused || value.length > 0;

  return (
    <motion.div 
      className="relative w-full pt-8"
      animate={isValid === false && isFocused ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.2 }}
    >
      <label
        htmlFor={inputId}
        className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest pointer-events-none z-10 ${
          isActive 
            ? 'top-0 text-[10px] text-primary-accent' 
            : 'top-10 text-sm text-gray-500'
        }`}
      >
        {label}
      </label>

      {isTextArea ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-white/5 border-b-2 transition-all duration-300 px-0 py-4 outline-none text-white font-medium min-h-[120px] resize-none ${
            isFocused ? 'border-primary-accent' : 'border-white/10'
          }`}
          required={required}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-white/5 border-b-2 transition-all duration-300 px-0 py-4 outline-none text-white font-medium ${
            isFocused ? 'border-primary-accent' : 'border-white/10'
          }`}
          required={required}
        />
      )}

      {/* Focus Glow Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-primary-accent shadow-[0_0_15px_rgba(242,97,63,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Validation Icon */}
      <AnimatePresence>
        {isValid !== null && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`absolute right-0 top-10 ${isValid ? 'text-green-500' : 'text-red-500'}`}
          >
            {isValid ? <Check size={16} /> : <span className="text-sm font-black">!</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Components ---

export const Contact = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax for blobs
  const blob1X = useTransform(mouseX, [-500, 500], [50, -50]);
  const blob1Y = useTransform(mouseY, [-500, 500], [50, -50]);
  const blob2X = useTransform(mouseX, [-500, 500], [-30, 30]);
  const blob2Y = useTransform(mouseY, [-500, 500], [30, -30]);

  // Subtle card glow offset on mouse (2D only — no 3D to avoid click misalignment)
  const cardGlowX = useSpring(useTransform(mouseX, [-600, 600], [-12, 12]), { stiffness: 80, damping: 25 });
  const cardGlowY = useSpring(useTransform(mouseY, [-600, 600], [-8, 8]), { stiffness: 80, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 2000);
  };

  return (
    <section 
      id="contacts" 
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 overflow-hidden bg-[#161B22]"
    >
      
      {/* Background Animated Parallax Blobs (Strictly pointer-events-none) */}
      <motion.div 
        style={{ x: blob1X, y: blob1Y }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-accent/10 rounded-full blur-[140px] pointer-events-none opacity-40 select-none z-0"
      ></motion.div>
      <motion.div 
        style={{ x: blob2X, y: blob2Y }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none opacity-30 select-none z-0"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Engagement Content */}
          <div className="flex flex-col space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Available for New Projects
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-white tracking-tighter">
                Let’s Build <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-orange-400 to-purple-500 animate-gradient">Something Real.</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md pt-4 font-medium">
                I translate ambiguous ideas into high-performance, interactive digital products.
              </p>
            </motion.div>

            {/* Quick Contact Links */}
            <div className="space-y-6">
              <motion.div 
                className="relative group w-fit"
                onMouseEnter={() => setIsHoveringEmail(true)}
                onMouseLeave={() => setIsHoveringEmail(false)}
              >
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-5 p-5 pr-8 rounded-[24px] bg-white/5 border border-white/10 active:scale-95 transition-all hover:bg-white/10 hover:border-primary-accent/40 shadow-xl group/btn overflow-hidden"
                >
                  <div className="p-4 bg-primary-accent/20 rounded-2xl text-primary-accent group-hover/btn:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">Direct Message</p>
                    <p className="text-white font-bold text-lg">{profile.email}</p>
                  </div>
                  <div className={`ml-4 transition-all duration-300 ${copied ? 'text-green-400' : 'text-gray-600 group-hover/btn:text-white'}`}>
                    {copied ? <Check size={20} className="animate-bounce" /> : <Copy size={20} />}
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHoveringEmail && !copied && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-black rounded-lg uppercase tracking-widest pointer-events-none shadow-2xl"
                      >
                        Click to Copy
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.a
                href={RESUME_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-5 p-5 pr-8 rounded-[24px] bg-white/5 border border-white/10 w-fit hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 active:scale-95 transition-all shadow-xl group/linkedin"
              >
                <div className="p-4 bg-[#0A66C2]/20 rounded-2xl text-[#0A66C2] group-hover/linkedin:scale-110 transition-transform">
                  <FaLinkedinIn size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">Connect on LinkedIn</p>
                  <p className="text-white font-bold text-lg">Abhay Pratap Singh</p>
                </div>
                <div className="ml-4 text-gray-600 group-hover/linkedin:text-[#0A66C2] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </motion.a>

              <div className="flex items-center gap-8 text-gray-500 text-xs font-black uppercase tracking-widest pl-2">
                 <div className="flex items-center gap-3">
                    Typical Response Time &lt; 24h
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                 <div className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                    <Phone size={14} className="text-primary-accent" /> {profile.mobile}
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card — 2D transforms only for correct click targeting */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
             {/* Animated glow that follows mouse — decorative only */}
             <motion.div 
               style={{ x: cardGlowX, y: cardGlowY }}
               className="absolute inset-0 bg-primary-accent/10 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none"
             />
             
             <motion.div 
               whileHover={{ scale: 1.01, boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 60px rgba(242,97,63,0.12)" }}
               transition={{ duration: 0.3 }}
               className="bg-[#1C232B]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-11 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
             >
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                    >
                      <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                         <motion.div
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                         >
                            <Check size={48} strokeWidth={3} />
                         </motion.div>
                      </div>
                      <div className="space-y-3">
                         <h3 className="text-4xl font-black text-white tracking-tighter">Transmission Successful!</h3>
                         <p className="text-gray-400 font-medium text-lg leading-relaxed">System log updated. I'll review your brief <br/> and get back to you within 24 hours.</p>
                      </div>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary-accent font-black uppercase tracking-widest text-xs hover:text-white transition-colors border-b border-primary-accent/30 hover:border-white pb-1"
                      >
                        Initiate New Broadcast
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                    >
                      <FloatingInput 
                        label="Identity / Full Name" 
                        value={formData.name} 
                        onChange={(e: any) => setFormData({...formData, name: e.target.value})} 
                      />
                      <FloatingInput 
                        label="Communication Email" 
                        type="email"
                        value={formData.email} 
                        onChange={(e: any) => setFormData({...formData, email: e.target.value})} 
                      />
                      <FloatingInput 
                        label="Project Brief / Message" 
                        isTextArea={true}
                        value={formData.message} 
                        onChange={(e: any) => setFormData({...formData, message: e.target.value})} 
                      />
                      
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={isSending}
                        className={`w-full relative overflow-hidden py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_20px_40px_rgba(242,97,63,0.25)] hover:shadow-[0_25px_50px_rgba(242,97,63,0.35)] z-30 ${isSending ? 'bg-orange-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-primary-accent via-orange-400 to-primary-accent animate-gradient text-white'}`}
                      >
                        <AnimatePresence mode="wait">
                          {isSending ? (
                            <motion.div 
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <Loader2 className="animate-spin" size={18} />
                              Encrypting...
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="idle"
                              className="flex items-center gap-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              Send Message 🚀
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full py-8 bg-[#1A202C] border-t border-white/5 flex items-center justify-center">
      <p className="text-[11px] font-medium text-gray-500 opacity-40 tracking-widest uppercase">
        © 2026 Abhay Pratap Singh
      </p>
    </footer>
  );
};
