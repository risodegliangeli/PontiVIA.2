import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SplashCarouselContextType {
  isCarouselVisible: boolean;
  setIsCarouselVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SplashCarouselContext = createContext<SplashCarouselContextType | undefined>(undefined);

interface SplashCarouselProviderProps {
  children: ReactNode;
}

export const SplashCarouselProvider: React.FC<SplashCarouselProviderProps> = ({ children }) => {
  const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(true);

  return (
    <SplashCarouselContext.Provider value={{ isCarouselVisible, setIsCarouselVisible }}>
      {children}
    </SplashCarouselContext.Provider>
  );
};

export const useSplashCarousel = () => {
  const context = useContext(SplashCarouselContext);
  if (context === undefined) {
    throw new Error('useSplashCarousel must be used within a SplashCarouselProvider');
  }
  return context;
};
