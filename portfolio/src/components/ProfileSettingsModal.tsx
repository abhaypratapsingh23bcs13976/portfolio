import { useState, useCallback } from 'react';
import { useProfile } from '../hooks/useProfile';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { X, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileSettingsModal = () => {
  const { profile, updateProfile, isSettingsOpen, setIsSettingsOpen, isAdmin } = useProfile();
  
  if (!isAdmin && isSettingsOpen) {
    return null; // Safety gate
  }
  
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobile);
  
  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    let newPhotoUrl = profile.photo;
    
    // If user uploaded and cropped a new image
    if (imageSrc && croppedAreaPixels) {
      try {
        newPhotoUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      } catch (e) {
        console.error("Failed to crop image", e);
      }
    }

    updateProfile({ name, email, mobile, photo: newPhotoUrl });
    setIsSettingsOpen(false);
  };

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSettingsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          ></motion.div>

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#1E2532] to-[#161B22] border border-gray-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#1A202C]/50">
              <h2 className="text-2xl font-bold text-white tracking-wide">Edit Profile</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex flex-col gap-8">
              
              {/* Photo Section */}
              <div className="flex flex-col gap-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Profile Picture</label>
                
                {imageSrc ? (
                  <div className="relative w-full h-[300px] bg-black rounded-xl overflow-hidden border border-gray-700">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape="round"
                      showGrid={false}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-6">
                    <img src={profile.photo} alt="Current" className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 shadow-xl" />
                    <label className="cursor-pointer px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg">
                      <Upload size={18} />
                      Upload New Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                )}
                
                {imageSrc && (
                   <div className="flex flex-col gap-2">
                     <label className="text-xs text-gray-400">Zoom</label>
                     <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                          setZoom(Number(e.target.value))
                        }}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-accent"
                      />
                   </div>
                )}
              </div>

              <div className="h-[1px] w-full bg-gray-800"></div>

              {/* Text Fields */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Display Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#11151C] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Contact Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#11151C] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="text" 
                    value={mobile} 
                    onChange={e => setMobile(e.target.value)}
                    className="w-full bg-[#11151C] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 bg-[#1A202C]/50 flex justify-end gap-4">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-6 py-2.5 rounded-full text-white font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 bg-gradient-to-r from-primary-accent to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-full font-bold shadow-[0_0_15px_rgba(242,97,63,0.4)] flex items-center gap-2 transition-all"
              >
                <Check size={18} />
                Save Changes
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
