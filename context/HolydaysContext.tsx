import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
//import useLocalizationData from '@/app/data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';
import { PREFERENCES as SAVED_PREFERENCES } from '@/app/(tabs)/preferences'; // NON COMMENTARE!

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

/* ============================================================================= 
FUNZIONE LETTURA STORAGE DATI
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

// INTERFACCIA DEL CONTEXT
interface HolydaysContextType {
  newPersonalHolydays: NewHolyday[]; 
    setNewPersonalHolydays: React.Dispatch< React.SetStateAction<NewHolyday[]> >; // FESTIVITA PERSONALI
  nationalHolydays: Holiday[]; 
    setNationalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>; // FESTIVITA NAZIONALI
  myPreferences: typeof SAVED_PREFERENCES; // * * * new * * * 
    setMyPreferences: React.Dispatch<React.SetStateAction<typeof SAVED_PREFERENCES>>; // PREFERENZE/FILTRI
  myCountry: string; 
    setMyCountry: React.Dispatch<React.SetStateAction<string>>; // GESTISCE LA DROPDOWN FESTIVITA PER PAESE
  myLanguage: string;
    setMyLanguage: React.Dispatch<React.SetStateAction<string>>; // GESTISCE LA LINGUA DELL'APP
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
  const systemLanguage = getLocales()[0].languageTag;

  // VARIABILI GLOBALI
  const [newPersonalHolydays, setNewPersonalHolydays] = useState<NewHolyday[]>([]);   // NEW --> newPersonalHolydays
  const [nationalHolydays, setNationalHolydays] = useState<Holiday[]>([]); // NON LO INIZILIZZO ADESSO, LO FA holydays.tsx ALLA CHIAMATA
  const [myCountry, setMyCountry] = useState(systemLanguage); // es: 'it-IT' --> DROPDOWN
  const [myLanguage, setMyLanguage] = useState(systemLanguage.slice(0,2)); // es 'it' --> LINGUA SISTEMA
  const [myPreferences, setMyPreferences] = useState(SAVED_PREFERENCES);  // <--- NUOVO

  // CONVERTE I VALORI DI TIPO string DEI JSON IN VALORI TIPO Data PER startDate E endDate
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

      const myStoredPreferences = await loadData('PREFERENCES_KEY');
        if (myStoredPreferences) setMyPreferences(myStoredPreferences);
    };  
    initializeData(); // CHIAMA LA FUNZ. LETTURA
  }, []);

  return (
    <HolydaysContext.Provider value={{
      newPersonalHolydays,  setNewPersonalHolydays, // NUOVO GIORNI PERSONALI
      nationalHolydays,     setNationalHolydays,    // FESTIVITA NAZIONALI
      myCountry,            setMyCountry,           // DROPDOWN FESTIVITA PER PAESE
      myPreferences,        setMyPreferences,        // preferences 'nuovo' (distribuito da Context)
      myLanguage,           setMyLanguage
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
