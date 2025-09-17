import React, { createContext, ReactNode, useContext, useState } from 'react';
import useLocalizationData from '@/app/data/data';

const { localHolydas } = useLocalizationData();

// INTERFACCIA DI Holiday
interface Holiday {
  day: number;
  month: number;
  description: string;
}

// INTERFACCIA DI VacationPeriod
interface VacationPeriod {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  description: string;
}

// INTERFACCIA DEL CONTEXT
interface HolydaysContextType {
  personalHolydays: Holiday[]; 
  setPersonalHolydays: React.Dispatch< React.SetStateAction<Holiday[]> >;
  regionalHolydays: Holiday[]; 
  setRegionalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>;
  vacationPeriods: VacationPeriod[]; 
  setVacationPeriods: React.Dispatch<React.SetStateAction<VacationPeriod[]>>;
  nationalHolydays: Holiday[]; 
  setNationalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>;
  myCountry: string; 
  setMyCountry: React.Dispatch<React.SetStateAction<string>>;
}

// CREAZIONE DEL CONTEXT VERO E PROPRIO PER PASSARE I DATI IN TUTTA L'APP ======================
export const HolydaysContext = createContext<HolydaysContextType | undefined>(undefined);

// INTERFACCIA DI HolydaysProviderProps
interface HolydaysProviderProps {
  children: ReactNode;
}

// COMPONENTE "PROVIDER" DI HolydaysContext ====================================================
export const HolydaysProvider: React.FC<HolydaysProviderProps> = ({ children }) => {
  const [personalHolydays, setPersonalHolydays] = useState<Holiday[]>([]);
  const [regionalHolydays, setRegionalHolydays] = useState<Holiday[]>([]);
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriod[]>([]);
  const [nationalHolydays, setNationalHolydays] = useState<Holiday[]>(localHolydas); 
  const [myCountry, setMyCountry] = useState( (new Intl.NumberFormat().resolvedOptions().locale).toString().slice(0,5) );
  // console.log('(Context) inizializzo myCountry:', myCountry);
  return (
    <HolydaysContext.Provider value={{
      personalHolydays, setPersonalHolydays,
      regionalHolydays, setRegionalHolydays,
      vacationPeriods, setVacationPeriods,
      nationalHolydays, setNationalHolydays,
      myCountry, setMyCountry,
      }}>
      {children}
    </HolydaysContext.Provider>
  );
};

// HOOK PERSONALIZZATO: 'useHolydays()' =========================================================
export const useHolydays = () => {
  const context = useContext(HolydaysContext);
  if (context === undefined) {
    throw new Error('useHolydays must be used within a HolydaysProvider');
  }
  return context;
};