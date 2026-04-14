import { useState, useEffect } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { motion } from 'framer-motion';
import { Code, Server, Smartphone, Layout, Database, Terminal, Sparkles } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
};

const SkillIcon = ({ name, icon: Icon }: any) => (
  <motion.div 
    whileHover={{ scale: 1.1, y: -5 }}
    className="flex flex-col items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary-accent/10 hover:border-primary-accent/30 transition-all duration-300 group cursor-default"
  >
    <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-primary-accent transition-colors">
       <Icon size={24} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{name}</span>
  </motion.div>
);

export const About = () => {
  const stats = [
    { label: "Completed Projects", value: RESUME_DATA.projects.length, suffix: "+" },
    { label: "Client Satisfaction", value: 95, suffix: "%" },
    { label: "Years Experience", value: 1, suffix: "+" }
  ];

  const skillIcons = [
    { name: "React", icon: Code },
    { name: "Node.js", icon: Server },
    { name: "App Dev", icon: Smartphone },
    { name: "UI Design", icon: Layout },
    { name: "Database", icon: Database },
    { name: "DevOps", icon: Terminal }
  ];

  return (
    <section id="about" className="relative w-full py-32 overflow-hidden bg-[#161B22]">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-accent/5 rounded-full blur-[160px] transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Left Side: Services & Skills */}
        <div className="space-y-12">
          <div className="space-y-3">
             <h4 className="text-primary-accent font-black uppercase tracking-[0.3em] text-[10px]">What I Offer</h4>
             <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Solving complex problems with <span className="text-gray-500">elegant solutions.</span></h2>
          </div>

          {/* Skill Grid */}
          <div className="grid grid-cols-3 gap-6">
             {skillIcons.map(skill => (
               <SkillIcon key={skill.name} {...skill} />
             ))}
          </div>

          {/* Experience Highlights */}
          <div className="space-y-6">
             {[
               { title: "Frontend Architecture", desc: "Crafting modular, high-performance UI using React & Next.js." },
               { title: "Scalable Backends", desc: "Building resilient microservices and RESTful APIs." },
               { title: "Creative Branding", desc: "Ensuring every pixel aligns with your product's core identity." }
             ].map((service, i) => (
               <div key={i} className="flex gap-6 group">
                  <div className="text-primary-accent font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                  <div className="space-y-1">
                     <h4 className="text-white font-bold text-lg">{service.title}</h4>
                     <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Side: Identity & Stats */}
        <div className="bg-[#1C232B] border border-white/5 rounded-[48px] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative">
            <div className="absolute top-10 right-10 opacity-10">
               <Sparkles size={100} className="text-primary-accent" />
            </div>

            <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                   <h3 className="text-3xl font-black text-white tracking-tighter">Beyond the code.</h3>
                   <p className="text-base text-gray-400 leading-relaxed font-medium">
                      {RESUME_DATA.about} I believe technology should weave seamlessly into human lives, making the complex feel effortless.
                   </p>
                </div>

                {/* Animated Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                   {stats.map((stat, i) => (
                     <div key={i} className="space-y-1">
                        <div className="text-4xl font-black text-white tracking-tighter">
                           <AnimatedCounter value={stat.value} />
                           <span className="text-primary-accent">{stat.suffix}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 leading-tight">
                           {stat.label.split(' ').join('\n')}
                        </p>
                     </div>
                   ))}
                </div>

                <div className="pt-10">
                   <motion.button 
                     whileHover={{ x: 10 }}
                     className="flex items-center gap-4 text-primary-accent font-black uppercase tracking-widest text-[10px]"
                   >
                     More about my philosophy <span className="w-12 h-[1px] bg-primary-accent"></span>
                   </motion.button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
