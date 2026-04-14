import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { RESUME_DATA } from '../data/resumeData';

interface ProfileData {
  name: string;
  photo: string;
  email: string;
  mobile: string;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (v: boolean) => void;
  isAdmin: boolean;
  isGateOpen: boolean;
  setIsGateOpen: (v: boolean) => void;
  unlock: (pin: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: RESUME_DATA.name,
    photo: '/abhay.png',
    email: RESUME_DATA.email,
    mobile: (RESUME_DATA as any).mobile || ""
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolioProfileSavedUser');
    if (saved) {
      setProfile(JSON.parse(saved));
    }

    const savedAdmin = localStorage.getItem('portfolioAdminUnlocked');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const updateProfile = (data: Partial<ProfileData>) => {
    if (!isAdmin) return; // Client-side check
    const newProfile = { ...profile, ...data };
    setProfile(newProfile);
    localStorage.setItem('portfolioProfileSavedUser', JSON.stringify(newProfile));
  };

  const unlock = (pin: string) => {
    // Hardcoded secret for this portfolio
    if (pin === '2026') {
      setIsAdmin(true);
      localStorage.setItem('portfolioAdminUnlocked', 'true');
      return true;
    }
    return false;
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile, 
      isSettingsOpen, 
      setIsSettingsOpen, 
      isAdmin, 
      isGateOpen, 
      setIsGateOpen,
      unlock 
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};
