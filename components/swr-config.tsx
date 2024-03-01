// components/swr-config.tsx

import { ReactNode } from "react"; // <-- Import ReactNode
import { SWRConfig } from "swr";
import fetcher from "../lib/fetcher";

interface SWRConfigProviderProps {
  children: ReactNode; // <-- Add type for children
}

const SWRConfigProvider: React.FC<SWRConfigProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        // ... any other global configurations
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
