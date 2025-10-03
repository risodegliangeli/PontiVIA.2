import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import useLocalizationData from '@/app/data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';
import { PREFERENCES as DEFAULT_PREFERENCES } from '@/app/(tabs)/preferences';

/* ============================================================================= 
    STORAGE DATI
============================================================================= */
const loadData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Errore ${key} nella lettura da locale:`, e);
    return null;
  }
};

// old --> INTERFACCIA DI Holiday --> MORIRA' COL REFACTORING
interface Holiday {
  day: number;
  month: number;
  description: string;
}

// old --> INTERFACCIA DI VacationPeriod --> MORIRA' COL REFACTORING
// interface VacationPeriod {
//   startDay: number;
//   startMonth: number;
//   startYear: number;
//   endDay: number;
//   endMonth: number;
//   endYear: number;
//   description: string;
// }

// new --> INTERFACCIA DI NewHolyday ***
interface NewHolyday {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;  // RIPETE OGNI ANNO, IL 25 settembre 
  repeatOnDay: boolean;   // RIPETE OGNI ANNO, il primo martedì di settembre
}

// INTERFACCIA DEL CONTEXT ---------------------------------------------------------------------
interface HolydaysContextType {
  // VECCHI MA ANCORA USATI
  personalHolydays: Holiday[]; setPersonalHolydays: React.Dispatch< React.SetStateAction<Holiday[]> >; // OLD --> MORIRA' COL REFACTORING
  myCountry: string; setMyCountry: React.Dispatch<React.SetStateAction<string>>; // OK, RESTA
  nationalHolydays: Holiday[]; setNationalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>; // OK, RESTA
  // NUOVO ARRAY newPersonalHolydays
  newPersonalHolydays: NewHolyday[]; setNewPersonalHolydays: React.Dispatch< React.SetStateAction<NewHolyday[]> >; // NEW
  // PREFERENCES
  preferences: typeof DEFAULT_PREFERENCES;
  setPreferences: React.Dispatch<React.SetStateAction<typeof DEFAULT_PREFERENCES>>;

  // VECCHI TYPE - NON SARANNO PIU' USATI
  // regionalHolydays: Holiday[]; setRegionalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>; // --> MORIRA' COL REFACTORING
  // vacationPeriods: VacationPeriod[]; setVacationPeriods: React.Dispatch<React.SetStateAction<VacationPeriod[]>>; // --> MORIRA' COL REFACTORING
}

// CREAZIONE DEL CONTEXT VERO E PROPRIO PER PASSARE I DATI IN TUTTA L'APP ======================
export const HolydaysContext = createContext<HolydaysContextType | undefined>(undefined);

// INTERFACCIA DI HolydaysProviderProps
interface HolydaysProviderProps {
  children: ReactNode;
}

/* ###########################################################################################################

                                                  MAIN
                                      COMPONENTE "PROVIDER" DI HolydaysContext

########################################################################################################### */
export const HolydaysProvider: React.FC<HolydaysProviderProps> = ({ children }) => {

  // LINGUA
  const myLanguage = getLocales()[0].languageTag;

  // DEFINIZIONI COSTANTI
  // const [personalHolydays, setPersonalHolydays] = useState<Holiday[]>([]);            // OLD --> personalHolydays

  const [newPersonalHolydays, setNewPersonalHolydays] = useState<NewHolyday[]>([]);   // NEW --> newPersonalHolydays

  // const [ vacationdisabledHolydays, toggleHolydaysDisabled ] = useState();
  // const [vacationPeriods, setVacationPeriods] = useState<VacationPeriod[]>([]);
  const [nationalHolydays, setNationalHolydays] = useState<Holiday[]>([]); // NON LO INIZILIZZO ADESSO, LO FA holydays.tsx ALLA CHIAMATA
  const [myCountry, setMyCountry] = useState(myLanguage); // VALORE DELLA DROPDOWN (es: 'it-IT), INIZIALMENTE = locale
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  // CONVERTE I VALORI DI TIPO string IN VALORI TIPO Data PER startDate E endDate
  const convertDates = (holydaysArray: any) => {
  if (!holydaysArray || !Array.isArray(holydaysArray)) return holydaysArray;

  return holydaysArray.map(holiday => ({
    ...holiday,
    startDate: new Date(holiday.startDate), 
    endDate: holiday.endDate && new Date(holiday.endDate), // SOLO SE != null
  }));
};


  // INIZIALIZZAZIONE DATI DA LOCAL STORAGE ///////////////////////////
  useEffect(() => {
    const initializeData = async () => {
      // const storedPersonalHolydays = await loadData('personalHolydays');              
      //   if (storedPersonalHolydays) { setPersonalHolydays(storedPersonalHolydays); }  // OLD --> MORIRA' COL REFACTORING

      const newStoredPersonalHolydays = await loadData('newPersonalHolydays');        
        if (newStoredPersonalHolydays) { 
          const holydaysWithDates = convertDates(newStoredPersonalHolydays);
          setNewPersonalHolydays(holydaysWithDates); 
        }  // NEW

      const storedMyCountry = await loadData('myCountry');
        if (storedMyCountry) { setMyCountry(storedMyCountry); } // OK CONTINUA

      // const storedVacationPeriods = await loadData('vacationPeriods');
      //   if (storedVacationPeriods) { setVacationPeriods(storedVacationPeriods); } // OLD --> MORIRA' COL REFACTORING

      const storedPreferences = await loadData('PREFERENCES_KEY');
      if (storedPreferences) setPreferences(storedPreferences);
    };  
    initializeData(); // CHIAMATA FUNZ. LETTURA
  }, []);

  return (
    <HolydaysContext.Provider value={{
      newPersonalHolydays,  setNewPersonalHolydays, // --> NUOVO GIORNI PERSONALI ***
      // personalHolydays,     setPersonalHolydays,    // --> VECCHIO GIORNI PERSONALI --> MORIRA' COL REFACTORING
      // vacationPeriods,      setVacationPeriods,     // FERIE --> MORIRA' COL REFACTORING
      nationalHolydays,     setNationalHolydays,    // FSTIVITA NAZIONALI --- ok
      myCountry,            setMyCountry,           // DROPDOWN FESTIVITA PER PAESE
      preferences,          setPreferences,         // PREFERENZE
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
