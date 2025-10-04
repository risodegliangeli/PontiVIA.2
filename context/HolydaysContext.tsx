import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import useLocalizationData from '@/app/data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';
import { PREFERENCES as SAVED_PREFERENCES } from '@/app/(tabs)/preferences';

/* ============================================================================= 
    LETTURA STORAGE DATI
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

// INTERFACCIA DI Holiday
interface Holiday {
  day: number;
  month: number;
  description: string;
}

// INTERFACCIA DI NewHolyday 
interface NewHolyday {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;  // RIPETE OGNI ANNO, IL 25 settembre 
  repeatOnDay: boolean;   // RIPETE OGNI ANNO, il primo martedì di settembre
}

// INTERFACCIA DEL CONTEXT ---------------------------------------------------------------------
interface HolydaysContextType {
  personalHolydays: Holiday[]; 
    setPersonalHolydays: React.Dispatch< React.SetStateAction<Holiday[]> >; // OLD --> MORIRA' COL REFACTORING
  myCountry: string; 
    setMyCountry: React.Dispatch<React.SetStateAction<string>>; // OK, RESTA
  nationalHolydays: Holiday[]; 
    setNationalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>; // OK, RESTA
  newPersonalHolydays: NewHolyday[]; 
    setNewPersonalHolydays: React.Dispatch< React.SetStateAction<NewHolyday[]> >; // NEW
  preferences: typeof SAVED_PREFERENCES;
    setPreferences: React.Dispatch<React.SetStateAction<typeof SAVED_PREFERENCES>>;
  myPreferences: typeof SAVED_PREFERENCES; // * * * new * * * 
    setMyPreferences: React.Dispatch<React.SetStateAction<typeof SAVED_PREFERENCES>>;

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

  // VARIABILI GLOBALI
  const [newPersonalHolydays, setNewPersonalHolydays] = useState<NewHolyday[]>([]);   // NEW --> newPersonalHolydays
  const [nationalHolydays, setNationalHolydays] = useState<Holiday[]>([]); // NON LO INIZILIZZO ADESSO, LO FA holydays.tsx ALLA CHIAMATA
  const [myCountry, setMyCountry] = useState(myLanguage); // VALORE DELLA DROPDOWN (es: 'it-IT), INIZIALMENTE = locale
  const [preferences, setPreferences] = useState(SAVED_PREFERENCES);      // <--- DA ELIMINARE COL REFACTORING
  const [myPreferences, setMyPreferences] = useState(SAVED_PREFERENCES);  // <--- NUOVO

  //console.log(`[CONTEXT] myPreferences dopo dichiarazione: ${JSON.stringify(myPreferences)}`);

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
      const newStoredPersonalHolydays = await loadData('newPersonalHolydays');        
        if (newStoredPersonalHolydays) { 
          const holydaysWithDates = convertDates(newStoredPersonalHolydays);
          setNewPersonalHolydays(holydaysWithDates); 
        }

      const storedMyCountry = await loadData('myCountry');
        if (storedMyCountry) { setMyCountry(storedMyCountry); } // OK CONTINUA

      const storedPreferences = await loadData('PREFERENCES_KEY');
      if (storedPreferences) setPreferences(storedPreferences);

      const myStoredPreferences = await loadData('PREFERENCES_KEY');
      if (myStoredPreferences) setMyPreferences(myStoredPreferences);

        //console.log(`[CONTEXT] myPreferences dopo lettura da local storage: ${JSON.stringify(myPreferences)}`);

    };  
    initializeData(); // CHIAMATA FUNZ. LETTURA
  }, []);

  return (
    <HolydaysContext.Provider value={{
      newPersonalHolydays,  setNewPersonalHolydays, // NUOVO GIORNI PERSONALI
      nationalHolydays,     setNationalHolydays,    // FESTIVITA NAZIONALI
      myCountry,            setMyCountry,           // DROPDOWN FESTIVITA PER PAESE
      preferences,          setPreferences,         // PREFERENZE
      myPreferences,        setMyPreferences        // preferences 'nuovo' (distribuito da Context)
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
