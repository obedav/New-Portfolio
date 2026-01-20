'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface IntroContextType {
  isIntroActive: boolean;
  setIsIntroActive: (value: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroActive, setIsIntroActive] = useState(false);

  return (
    <IntroContext.Provider value={{ isIntroActive, setIsIntroActive }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
}
