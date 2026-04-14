import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldAlert, KeyRound, ArrowRight, X } from 'lucide-react';

export const AdminGateModal = () => {
  const { isGateOpen, setIsGateOpen, setIsSettingsOpen, unlock } = useProfile();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlock(pin);
    if (success) {
      setIsGateOpen(false);
      setIsSettingsOpen(true);
      setPin('');
      setError(false);
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isGateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGateOpen(false)}
            className="absolute inset-0 bg-dark-bg/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#1C232B] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Close Button */}
            <button 
                onClick={() => setIsGateOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                title="Cancel"
            >
                <X size={20} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center space-y-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${error ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-primary-accent/30 bg-primary-accent/10 text-primary-accent'}`}>
                {error ? <ShieldAlert size={32} /> : <Lock size={32} />}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase tracking-widest">Access Restricted</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-[240px]">This area is reserved for the site owner. Please enter your secret key.</p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-accent transition-colors">
                      <KeyRound size={20} />
                   </div>
                   <input
                     type="password"
                     value={pin}
                     onChange={(e) => setPin(e.target.value)}
                     placeholder="Enter Secret Key..."
                     className={`w-full bg-white/5 border-2 ${error ? 'border-red-500/50' : 'border-white/10 focus:border-primary-accent'} rounded-[20px] py-4 pl-12 pr-4 outline-none text-white font-bold tracking-[0.5em] transition-all text-center placeholder:tracking-normal placeholder:font-medium placeholder:text-gray-600`}
                     autoFocus
                   />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary-accent text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(242,97,63,0.3)]"
                >
                  Verify Identity <ArrowRight size={16} />
                </motion.button>
              </form>

              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.1em]">Identity Log System v4.0</p>
            </div>
            
            {/* Background Glow */}
            <div className={`absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-80 h-80 blur-[80px] -z-10 opacity-30 transition-colors duration-500 ${error ? 'bg-red-500' : 'bg-primary-accent'}`}></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
