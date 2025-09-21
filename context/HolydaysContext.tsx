console.log('[Context]');


import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import useLocalizationData from '@/app/data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';

/* ============================================================================= 
    STORAGE DATI
    ============================================================================= */
const saveData = async (data: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Errore ${key} nel salvataggio locale: `, e);
  }
};
const loadData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Errore ${key} nella lettura da locale:`, e);
    return null;
  }
};

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

const myLanguage = getLocales()[0].languageTag;

/* ###########################################################################################################

                                                  MAIN
                                      COMPONENTE "PROVIDER" DI HolydaysContext

########################################################################################################### */
export const HolydaysProvider: React.FC<HolydaysProviderProps> = ({ children }) => {

  // DEFINIZIONI COSTANTI
  const [personalHolydays, setPersonalHolydays] = useState<Holiday[]>([]);
  const [ vacationdisabledHolydays, toggleHolydaysDisabled ] = useState();
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriod[]>([]);
  const [nationalHolydays, setNationalHolydays] = useState<Holiday[]>([]); // NON LO INIZILIZZO ADESSO, LO FA holydays.tsx ALLA CHIAMATA
  const [myCountry, setMyCountry] = useState(myLanguage); // VALORE DELLA DROPDOWN, INIZIALMENTE = locale

  //const { localHolydas } = useLocalizationData();

  
  // INIZIALIZZAZIONE DATI DA LOCAL STORAGE ///////////////////////////
  useEffect(() => {
    // FUNZIONE DI LETTURA DA LOCAL STORAGE
    const initializeData = async () => {
      const storedPersonalHolydays = await loadData('personalHolydays');
      // console.log('storedPersonalHolydays:', JSON.stringify(storedPersonalHolydays));
        if (storedPersonalHolydays) {
          setPersonalHolydays(storedPersonalHolydays);
        }
      const storedVacationPeriods = await loadData('vacationPeriods');
      // console.log('storedVacationPeriods:', JSON.stringify(storedVacationPeriods));
        if (storedVacationPeriods) {
          setVacationPeriods(storedVacationPeriods);
        }
      const storedMyCountry = await loadData('myCountry');
        if (storedMyCountry) {
          setMyCountry(storedMyCountry);
        }
    };  
    // CHIAMATA FUNZ. LETTURA
    initializeData();
  }, []);

  return (
    <HolydaysContext.Provider value={{
      personalHolydays, setPersonalHolydays,    // GIORNI PERSONALI
      //regionalHolydays, setRegionalHolydays,
      vacationPeriods, setVacationPeriods,      // FERIE
      nationalHolydays, setNationalHolydays,    // FSTIVITA NAZIONALI
      myCountry, setMyCountry,                  // DROPDOWN FESTIVITA PER PAESE
      }}>
      {children}
    </HolydaysContext.Provider>
  );
};

// HOOK PERSONALIZZATO: 'useHolydays()' =========================================================
export const useHolydays = () => {
  const context = useContext(HolydaysContext);
  if (context === undefined) {
    throw new Error('Context useHolydays must be used within a HolydaysProvider');
  }
  return context;
};
