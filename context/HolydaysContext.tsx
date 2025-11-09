import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';
import { getLocalizedWeekdays } from '@/app/data/data';
import { dataLabel } from '@/components/dataLabel';

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

interface HolydaysContextType {
  // NUOVE FESTIVITA PERSONALI
  newPersonalHolydays: NewHolyday[]; 
    setNewPersonalHolydays: React.Dispatch< React.SetStateAction<NewHolyday[]> >; 
  // FESTIVITA NAZIONALI
  nationalHolydays: Holiday[]; 
    setNationalHolydays: React.Dispatch<React.SetStateAction<Holiday[]>>; 
  // FESTIVITA NAZIONALI DA NON CONTEGGIARE 
  // nb. va azzerato ogni volta che si modifica la dorpdown ES: [1, 3, ...]
  nationalExcluded: number[];
    setNationalExcluded: React.Dispatch<React.SetStateAction<number[]>>;
  // NUOVE PREREFENCES
  myPreferences: any;  
    setMyPreferences: React.Dispatch<React.SetStateAction<any>>; 
// GESTISCE LA DROPDOWN FESTIVITA PER PAESE
  myCountry: string; 
    setMyCountry: React.Dispatch<React.SetStateAction<string>>; 
// GESTISCE LA LINGUA DELL'APP
  myLanguage: string;
    setMyLanguage: React.Dispatch<React.SetStateAction<string>>; 
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
  const [nationalExcluded, setNationalExcluded] = useState<number[]>([]); // FEST. NAZ. DA IGNORARE
  const [myCountry, setMyCountry] = useState(systemLanguage); // es: 'it-IT' --> DROPDOWN
  const [myLanguage, setMyLanguage] = useState(systemLanguage.slice(0,2)); // es 'it' --> LINGUA SISTEMA
  
  // CREA LE PREFERENCES DI DEFAULT (stesse chiavi che c'erano in app/(tabs)/preferences.tsx)
  const createDefaultPreferences = (languageTag: string) => {
    const localizedDays = getLocalizedWeekdays(languageTag);
    const myLanguageShort = languageTag.slice(0,2);
    return {
      domenica:           { status: true, label: localizedDays[6].charAt(0).toUpperCase() + localizedDays[6].slice(1) },
      sabato:             { status: true, label: localizedDays[5].charAt(0).toUpperCase() + localizedDays[5].slice(1) },
      venerdi:            { status: false, label: localizedDays[4].charAt(0).toUpperCase() + localizedDays[4].slice(1) },
      giovedi:            { status: false, label: localizedDays[3].charAt(0).toUpperCase() + localizedDays[3].slice(1) },
      mercoledi:          { status: false, label: localizedDays[2].charAt(0).toUpperCase() + localizedDays[2].slice(1) },
      martedi:            { status: false, label: localizedDays[1].charAt(0).toUpperCase() + localizedDays[1].slice(1) },
      lunedi:             { status: false, label: localizedDays[0].charAt(0).toUpperCase() + localizedDays[0].slice(1) },
      pasqua:             { status: true, label: dataLabel(myLanguageShort,0) },
      lunediDellAngelo:   { status: true, label: dataLabel(myLanguageShort,1) },
      ascensione:         { status: false, label: dataLabel(myLanguageShort,2) },
      pentecoste:         { status: false, label: dataLabel(myLanguageShort,3) },
      lunediPentecoste:   { status: false, label: dataLabel(myLanguageShort,4) },
      corpusDomini:       {status: false, label: dataLabel(myLanguageShort,5)}, 
      festivitaNazionali: { status: true, label: dataLabel(myLanguageShort,7)}, 
      festivitaLocali:    { status: true, label: dataLabel(myLanguageShort,8)}, 
      festivitaPersonali: { status: true, label: dataLabel(myLanguageShort,9)}, 
      feriePersonali:     { status: true, label: dataLabel(myLanguageShort,10)}, 
      bridgeDuration:     3, 
      firstDayOfWeek:     1,
    };
  };

  const [myPreferences, setMyPreferences] = useState<any>(createDefaultPreferences(systemLanguage));  // <--- NUOVO

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
          setNewPersonalHolydays(holydaysWithDates); }

      const storedNationalExcluded = await loadData('nationalExcluded');
        if (storedNationalExcluded) { setNationalExcluded(storedNationalExcluded); }

      const storedMyCountry = await loadData('myCountry');
        if (storedMyCountry) { setMyCountry(storedMyCountry); } 

      const myStoredPreferences = await loadData('PREFERENCES_KEY');
        if (myStoredPreferences) setMyPreferences(myStoredPreferences);
    };  

    initializeData(); // CHIAMA SE STESSA
  }, []);

  return (
    <HolydaysContext.Provider value={{
      newPersonalHolydays,  setNewPersonalHolydays, // NUOVO GIORNI PERSONALI
      nationalHolydays,     setNationalHolydays,    // FESTIVITA NAZIONALI
      nationalExcluded,     setNationalExcluded,    // FEST. NAZ. DA IGNORARE
      myCountry,            setMyCountry,           // DROPDOWN FESTIVITA PER PAESE
      myPreferences,        setMyPreferences,       // preferences 'nuovo' (distribuito da Context)
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
