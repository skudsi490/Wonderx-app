import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInterface } from "../types/index"; // <-- Importing UserInterface

interface UserContextType {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  setActiveUser: (user: UserInterface) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const setActiveUser = (user: UserInterface) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
