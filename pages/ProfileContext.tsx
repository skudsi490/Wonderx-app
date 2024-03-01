import React, { createContext, useContext, useState, ReactNode } from "react";

interface Profile {
  id: string;
  name: string;
  image: string;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  setActiveProfile: (profile: Profile) => void; // New method to set the active profile
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const setActiveProfile = (profile: Profile) => {
    setProfile(profile);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, setActiveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
