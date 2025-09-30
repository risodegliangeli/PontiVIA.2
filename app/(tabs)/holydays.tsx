import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import DropdownCountry from '@/components/ui/DropdownCountry'; // COUNTRY PICKER 
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import React, { useEffect, useState, Suspense,  } from 'react';
import DateTimePicker, { useDefaultStyles, } from 'react-native-ui-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales,  } from 'expo-localization';
import DatepicketSelector from '@/components/ui/DatepickerSelector'; // --> MUORE COL REFACTORING
import NewDatepicker from '@/components/NewDatepicker'; // MIO DATEPICKER
import { holydayLabels as dataLabel } from '@/components/dataLabel';
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform
} from 'react-native';

// GESTIONE COLORI
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

// LEGGE LINGUA DI SISTEMA
const myLanguage: string = (getLocales()[0].languageTag).slice(0,2); // 'it', 'fr', 'de', ecc

// LEGGE NOMI DEI MESI LOCALIZZATI DA data.tsx
const { months } = useLocalizationData();

// TYPE HOLYDAY (vecchio)--> MUORE COL REFACTORING
type Holiday = {  // DEFINIZIONE DI holiday
  day: number;            // GIORNO
  month: number;          // MESE
  description: string;    // DESCRIZIONE
};
type HolidayType = 'personal' | 'regional' | 'national';
type ItemType = HolidayType | 'vacation';

// TYPE NewHoliday (nuovo)
type NewHolyday = {
  startDate: Date;
  endDate: Date | null;
  description: string;
  repeatOnDate: boolean;
  repeatOnDay: boolean;
};

// INTERFACCIA VacationPeriod --> MUORE COL REFACTORING
interface VacationPeriod {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  description: string;
}

// FUNZIONE DI SCRITURA SU STORAGE DATI
const saveData = async (data: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Errore ${key} nel salvataggio locale: `, e);
  }
};

/* ###########################################################################################################

                                      MAIN - HolydaysScreen
                                      
########################################################################################################### */
export default function HolydaysScreen({}: any) {

  const colors = useThemeColors();

  /* ============================================================================= 
  STYLESHEET
  ============================================================================= */
  const styles =StyleSheet.create({
    // SFONDO
    image: {      
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      },
    // CONTENITORE PRINCIPALE
    container: {
      width:'100%',
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingTop: 80,
      maxWidth:600,
    },
    // TITOLO PAGINA
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    // WRAPPER TITOLO PAGINA
    sectionContainer: {
      width: '100%',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
    },
    // TITOLO CARD
    listTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      paddingBottom: 12,
    },
    // CARD
    listItem: { 
      backgroundColor: colors.cardBackground,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft:16,
      paddingRight:16,
      borderRadius: 24,
      marginBottom: 10,
    },
    holidayRow: { 
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    itemDate: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft:12,
      color: colors.text,
    },
    itemDescription: {
      fontSize: 16,
      paddingLeft:12,
      color: colors.text,
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight:12,
    },
    dot32: {
      position:'absolute', 
      top:0, 
      width:44, 
      height:44, 
      borderRadius:24, 
      backgroundColor: colors.dot32, 
      borderWidth:1, 
      borderColor: colors.cardBackground,
      // elevation:6,
      // shadowColor: colors.black, // iOS shadow
      // shadowOffset: {
      //   width: 1,
      //   height: 2, // Match elevation for iOS
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 2 // Match elevation for iOS
    },
    dot32noshadow: {
      borderWidth:1, 
      borderColor: colors.cardBackground,
      width:44, 
      height:44, 
      borderRadius:24, 
      backgroundColor: colors.dot32
    },
    dot32text:{
      height:'100%',
      fontSize:24,
      fontWeight: useColorScheme() === 'dark' ? 200 : 300,
      color: 'rgba(255,255,255,1)',
      textAlign:'center',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      paddingTop: Platform.OS === 'ios' ? 6:5,
      letterSpacing:-.5,
      // borderWidth:1    
    },
    // MODAL
    modalOverlay: {
      flex: 1,
      margin: 0,
      backgroundColor: 'rgba(255, 0, 0, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width:'95%',
      //minHeight:400,
      backgroundColor:'white',
      borderRadius:24,
      flexDirection:'column',
      gap:24,
      alignItems:'center', // HOR
      justifyContent:'center',
      alignContent:'center',
      paddingHorizontal:20,
      paddingVertical:24,
    }, 
    datePickerWrapper: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 8,
      // borderBottomLeftRadius: 6,
      // borderBottomRightRadius: 6,
      padding:8,
      backgroundColor:'transparent',
    },
    // PULSANTI ADD/CANCEL
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
      addButton: {
        //backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.blueBar,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
      },
      addButtonText: {
        color: colors.blueBar,
        fontSize: 16,
        fontWeight: 'bold',
      },
      cancelButton: {
        //backgroundColor: colors.cancelButton,
        padding: 16,
        borderRadius: 8,
        borderWidth:1,
        borderColor: colors.disabled,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
      },
      cancelButtonText: {
        color: colors.disabled,
        fontSize: 16,
        fontWeight: 'bold',
      },
    // DESCRIZIONE
    modalInput: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 16,
      marginBottom: 12,
      height:50,
      color: colors.black,
    },

    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
      fontSize:16,
      fontWeight:600,
    },
    // PULSANTONE AGGIUNGI GIORNI SPECIALI
    specialDays: {
      flex:1,
      minHeight:80,
      borderWidth: 2,
      borderColor: '#0088ff',
      borderStyle: 'dotted',
      borderRadius: 24,
      backgroundColor: useColorScheme() === 'dark' ? colors.tabBarFocusDotAndroid : 'transparent',
      marginBottom:24,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft:16
    },
    specialDaysLabel: {
      fontSize:20,
      fontWeight:400,
      color: '#0088ff',
    },
    // DROPDOWN FESTIVITA PER PAESE
    dropDownCountry: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:8,
    }
  });

  // RICEVE DAL CONTEXT
  const { 
    newPersonalHolydays, setNewPersonalHolydays, // NUOVO
    personalHolydays, setPersonalHolydays, // --> MUORE COL REFACTORING
    nationalHolydays, setNationalHolydays,
    vacationPeriods, setVacationPeriods, // --> MUORE COL REFACTORING
    myCountry, setMyCountry,
    } = useHolydays();
  
  /* ============================================================================= 
   GESTIONE MODAL NEWDATEPICKER
   ============================================================================= */
  const [isModalSingleDateVisible, setIsModalSingleDateVisible] = useState(false);

  /*  VALORI VECCHIA MODAL */
  // const [singleDateDay, setSingleDateDay] = useState<string | null>(null); // SERVE PER handleAddSingleDate
  // const [singleDateMonth, setSingleDateMonth] = useState<string | null>(null); // idem
  // const [singleDateDescription, setSingleDateDescription] = useState<string>('');
  // const [singleDateError, setSingleDateError] = useState<string | null>(null);  

  /* VALORI NUOVA MODAL DATEPICKER */
  const [dpickerStartDate, setDpickerStartDate] = useState<Date>();
  const [dpickerEndDate, setDpickerEndDate] = useState<Date | null>(null);
  const [dpickerDescription, setDpickerDescription] = useState<string>('');
  const [dpickerRepeatOnDate, setDpickerRepeatOnDate] = useState<boolean | undefined>();
  const [dpickerRepeatOnDay, setDpickerRepeatOnDay] = useState<boolean | undefined>();
  
  /*  VALORI NUOVA MODAL  */
  const [datePickerSelected, setDatePickerSelected] = useState<Date | null>(null); // DATA SELEZIONATA SU PICKER SINGLE DAY
  
  const [startDate, setStartdate] = useState<Date | null>(null); // DATA INIZIO SELEZIONATA SU PICKER PERIOD
  const [endDate, setEndDate] = useState<Date | null>(null);     // DATA FINE SELEZIONATA SU PICKER PERIOD

  const defaultStyles = useDefaultStyles();
  const minDate = new Date( new Date().getFullYear() + '-01-01'); // MIN E MAX SONO IMPOSTATI NELL'ANNO 2020 (BISESTILE)
  const maxDate = new Date( new Date().getFullYear() + '-12-31'); // PER POTR VISUALIZZARE IL GIORNO 29 FEBBRAIO

  // MODAL PERIODO: STATUS DEI DATI DEL FORM
  const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
  const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

  // SERVE PER EDIT/SOVRASCRITTURA DEL RECORD FESTIVITA' SINGOLA
  const [initialType, setInitialType] = useState<HolidayType>();
  const [initialIndex, setInitialIndex] = useState<number | null>(null);

  // SERVE PER EDIT/SOVRASCRITTURA DEL RECORD PERIODO VACANZA
  const [initialPeriodIndex, setInitialPeriodIndex] = useState<number | null>(null);

  // SERVE PER VISUALIZZARE IL TOAST DI ERRORE
  const [errorVisible, setErrorVisible] = useState(false);

  // All'inizio del componente HolydaysScreen, aggiungi:
  const [dpickerToastMessage, setDpickerToastMessage] = useState<string | null>(null);
  const [dpickerToastIsError, setDpickerToastIsError] = useState<boolean>(false);

  // MSG SERVIZIO, CANCELLARE
  // const [msgServizio, setMsgServizio] = useState<string>('****');

  /* GESTIONE SHOW/HIDE MODAL */
  const showModalSingleDate = () => {
    // setSingleDateDay('');
    // setSingleDateMonth('');
    setIsModalSingleDateVisible(true);
  };

  const hideModalSingleDate = () => {
    setIsModalSingleDateVisible(false);
  };

  /* RESET MODAL GIORNO SINGOLO avviene sempre alla chiusura della modal */
  // const resetSingleDateForm = () => {
  //   hideModalSingleDate();        // CHIUDE MODAL
  //   setPeriodStartDate(null);     // AZZERA VARIABILI PERIOD
  //   setPeriodEndDate(null);       //
  //   setSingleDateDay(null);       // AZZERA VARIABILI GIORNO SINGOLO
  //   setSingleDateMonth(null);
  //   setSingleDateDescription(undefined); // AZZERA CAMPO DESCRIZIONE
  //   setSingleDateError(null);     // AZZER ERRORE
  //   setInitialIndex(null);        // VARIABILE USATA (SE DIVERSA DA null) PER L'EDIT DI UN RECORD
  // };

  // AZZERAMENTO STATUS, CHIUSURA MODAL E RETURN
  // const clearData = () => {
  //   hideModalSingleDate();        // CHIUDE MODAL
  //   setInitialType(undefined);
  //   setInitialIndex(null);
  //   setPeriodStartDate(null);     // AZZERA VARIABILI PERIOD
  //   setPeriodEndDate(null);       //
  //   setSingleDateDay(null);       // AZZERA VARIABILI GIORNO SINGOLO
  //   setSingleDateMonth(null);
  //   setSingleDateDescription(undefined); // AZZERA CAMPO DESCRIZIONE
  //   setSingleDateError(null);     // AZZER ERRORE
  //   setInitialIndex(null);  // VARIABILE USATA (SE DIVERSA DA null) PER L'EDIT DI UN RECORD
  //   setLeftRadioButtonActive(true); // SERVONO PER POSIZIONARE IL DATEPICKERSLIDER IN CASO DI EDIT
  //   setRightRadioButtonActive(true); // SI RIPORTANO ENTRAMBI A TRUE ( = SLIEDR LIBERO DI MUOVERSI)
  // }
  
  /* ============================================================================= 
    AGGIUNGI GIORNO SINGOLO --> MUORE COL REFACTORING
  ============================================================================= */
  // const handleAddSingleDate = async () => {

  //   // CONTROLLA COMPILAZIONE DELLA DESCRIZIONE NELLA FORM
  //   if (!singleDateDescription) {
  //     setSingleDateError(dataLabel(myLanguage, 12)); // MSG ERRORE 'Inserisci una descrizione ecc...'
  //     return;
  //   }

  //   // CONTROLLA SE ESISTE GIA' QUEL GIORNO TRA LE FESTIVITA NAZIONALI
  //   const nationalIndex = nationalHolydays.findIndex(h => h.day === day && h.month === month);
  //   if (nationalIndex !== -1) {
  //     setSingleDateError(dataLabel(myLanguage, 13)); // MSG ERRORE: 'Esiste già una festività nazionale in questa data...'
  //     return;
  //   }    
    
  //   // SE DESCRIZIONE = OK E DATA NON PRESENTE TRA LE FEST. NAZIONALI -->    
    
  //   // PRELEVA I VALORI DALLE VARIABILI DALLA FORM
  //   const day = parseInt(singleDateDay);
  //   const month = parseInt(singleDateMonth);
  //   // E ASSEGNA I VALORI ALLA COSTANTE newHolyday
  //   const newHoliday: Holiday = { day, month, description: singleDateDescription.trim() };

  //   // CONTROLLO: E' UN NUOVO ITEM O SI EDITA UN ITEM ESISTENTE? -->

  //   // NUOVO ITEM 
  //   if (initialIndex === null) {
  //     //console.log('\t- nuovo item');

  //     // CERCA SE ESISTE GIA' ITEM CON STESSO GIORNO E MESE
  //     let sameCategoryDuplicate = 0;
  //     sameCategoryDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month);
  //     //console.log('\t- item stessa data/mese?', sameCategoryDuplicate);
        
  //       // TROVATO = ERRORE E RETURN 
  //     if (sameCategoryDuplicate > -1) {
  //       setSingleDateError(dataLabel(myLanguage, 17)); // MSG ERRORE: 'Questa data esiste già ecc.'
  //       return;
  //     } else {
  //       // NON TROVATO = SCRITTURA NUOVO ITEM E RETURN
  //       //console.log('\t- scrittura su personalHolydays');
  //       let tempPersonalHolydays = [...personalHolydays, newHoliday];
  //         setPersonalHolydays(tempPersonalHolydays);
  //         await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
  //       setSingleDateError(null); // RESETTA EVENTUALI MSG DI ERRORE
  //     }

  //   } else {

  //     // EDIT //
  //     // SE GIORNO O MESE INIZIALI SONO DIVERSI DA QUELLI DELL'initialIndex
  //     let presentDay = personalHolydays[initialIndex].day;
  //     let presentMonth = personalHolydays[initialIndex].month;

  //     if (presentDay != day || presentMonth != month) {
  //       // ATTENZIONE: L'UTENTE HA MODIFICATO LA DATA
  //       // SI CERCA SE LA NUOVA DATA ESISTE
  //       let sameCategoryDuplicate = 0;
  //       sameCategoryDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month);
  //       if (sameCategoryDuplicate > -1) {
  //         // SE QUELLA DATA ESISTE GIA' = ERRORE
  //         setSingleDateError(dataLabel(myLanguage, 17)); // MSG ERRORE: 'Questa data esiste già ecc.'
  //         return;
  //       } else {
  //         // SE QUELLA DATA E' LIBERA = SOVRASCRITTURA
  //         let tempPersonalHolydays = personalHolydays.map((h, i) => i === initialIndex ? newHoliday : h);
  //           setPersonalHolydays(tempPersonalHolydays);
  //           await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
  //       }
  //     } else {
  //       // L'UTENTE NON HA MODIFICATO LA DATA
  //       // SI SOVRASCRIVE
  //       let tempPersonalHolydays = personalHolydays.map((h, i) => i === initialIndex ? newHoliday : h);
  //         setPersonalHolydays(tempPersonalHolydays);
  //         await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
  //     }
  //   }

  //   // AZZERAMENTO VARIABILI E CHIUSURA MODAL
  //   clearData();

  //   return;
  // }

  /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW 

      AGGIUNGI EVENTO (refactored)

  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */

  // FUNZIONE PER NORMALIZZARE LE DATE ALLE 12:00:00 PER EVITARE PROBLEMI DI FUSO ORARIO
  const normalizeDate = (date: Date | null): Date | null => {
    console.log('NORMALIZE DATE');
    if (!date) return null;
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0));
    // const normalized = new Date(date);
    // normalized.setHours(12, 0, 0, 0);
    // return normalized;
  };

  // Funzione per mostrare il messaggio di errore nel componente DatePicker
  const showToast = (message: string, isError: boolean) => {
    setDpickerToastMessage(message);
    setDpickerToastIsError(isError);
    setErrorVisible(true);
    // setTimeout(() => {  // Nasconde il toast dopo 4 secondi
    //   setErrorVisible(false);
    //   setDpickerToastMessage(null);
    // }, 4000); 
  };

  /* Funzione per verificare se una data è compresa in un periodo
   L'endDate è normalizzata e rappresenta il giorno successivo 
  all'ultimo giorno del periodo (per come viene calcolata)
  Per i periodi, il date picker imposta l'endDate al giorno successivo, 
  quindi togliamo 1ms per includere l'ultimo giorno */
  const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    const normDate = normalizeDate(date)!.getTime();
    const normStart = normalizeDate(start)!.getTime();
    const normEnd = normalizeDate(end)!.getTime() - 1; 
    return normDate >= normStart && normDate <= normEnd;
  };

  /* ============================================================================= 
            HANDLE ADD EVENT (nuovo)
  ============================================================================= */
  const handleAddEvent = async (
      myStartDate: Date, 
      myEndDate: Date | null, 
      myDescription: string, 
      upperRadioButtonActive: boolean, // Corrisponde a repeatOnDate
      lowerRadioButtonActive: boolean // Corrisponde a repeatOnDay
    ) => {

        // Normalizza le date
    const startDate = normalizeDate(myStartDate)!;
    let endDate = normalizeDate(myEndDate);
    
    // GIORNO SINGOLO O PERIODO?
    const isSingleDay = !endDate || startDate.getTime() === endDate.getTime();
    // GIORNO SINGOLO endDate = null
    if (isSingleDay) {
      endDate = null;
    }
    // console.log(`isSingleDay: ${isSingleDay}`);

    // Crea il nuovo oggetto NewHolyday
    const newEvent: NewHolyday = {
      startDate: startDate,
      endDate: endDate,
      description: myDescription.trim(),
      repeatOnDate: upperRadioButtonActive, 
      repeatOnDay: lowerRadioButtonActive,
    };

  // A) CONTROLLO SOVRAPPOSIZIONE con nationalHolydays 
  // A.1 e A.2.1) Controllo se la startDate coincide con una festività nazionale
  // Estrai Giorno e Mese dall'evento inserito
  const nationalDay = startDate.getDate();
  const nationalMonth = startDate.getMonth(); // NIENTE +1, nationalHolydays è già 0 based

  // Cerca una ricorrenza annuale nell'array nationalHolydays
  const isNationalHolyday = nationalHolydays.find(h => h.day === nationalDay && h.month === nationalMonth);
    //console.log(`duplicato in nationalHolydays: ${JSON.stringify(isNationalHolyday)}`);

  if (isNationalHolyday) {
    const msg = `${dataLabel(myLanguage, 13)} (${isNationalHolyday.description})`; // 'Esiste già una festività nazionale in questa data...'
    if (isSingleDay) {
      // A.1) Giorno singolo e data coincide: ERRORE
      showToast(msg, true); // APRE MESSAGGIO DI ERRORE NEL COMPONENTE DATEPICKER
      return;
    } else {
      // A.2.1) Periodo e startDate coincide: ERRORE
      // Il requisito era "generare un errore nel caso in cui startDate sia uguale a una data di 'nationalHolydays'"
      showToast(`La data di inizio del periodo coincide con una festività nazionale: ${isNationalHolyday.description}`, true);
      return;
    }
  } 
    
    // // A.2.2) Se è un periodo, controllo se comprende altre date nazionali (solo SEGNALAZIONE)

    // if (!isSingleDay && endDate) {
    //   // Genera un array di giorni compresi nel periodo
    //   const daysInPeriod: any[] = [];
    //   let currentDay = new Date(startDate);
      
    //   // Si ferma al giorno prima dell'endDate (che è il giorno successivo all'ultimo)
    //   while (currentDay.getTime() < endDate.getTime()) {
    //     daysInPeriod.push({
    //       day: currentDay.getDate(),
    //       month: currentDay.getMonth(),
    //     });
    //     currentDay.setDate(currentDay.getDate() + 1); // Passa al giorno successivo
    //   }

    //   const nationalOverlap = nationalHolydays.find(h => 
    //     daysInPeriod.some(day => day.day === h.day && day.month === h.month)
    //   );

    //   if (nationalOverlap) {
    //     // A.2.2) Periodo e include festività nazionale: SEGNALAZIONE
    //     const overlapMsg = `Attenzione, il periodo include la festività nazionale: ${nationalOverlap.description}.`;
    //     showToast(overlapMsg, false); // false = SEGNALAZIONE (Toast bianco)
    //     // Non fa 'return', procede all'aggiunta dopo la segnalazione
    //   }
    // }


    /* ============================================================================= 
      B) CONTROLLO SOVRAPPOSIZIONE con newPersonalHolydays
    ============================================================================= */
    // Funzione helper per confrontare date (solo giorno e mese se entrambi sono 'repeatOnDate')
    const isDateDuplicate = (existingEvent: NewHolyday, newDate: Date): boolean => {
      const existingDate = normalizeDate(existingEvent.startDate)!;

      // Se entrambi ripetono annualmente, controlla solo giorno e mese
      if (existingEvent.repeatOnDate && newEvent.repeatOnDate) {
        return existingDate.getDate() === newDate.getDate() && 
              existingDate.getMonth() === newDate.getMonth();
      }
      // Altrimenti, controlla l'uguaglianza completa della data
      return existingDate.getTime() === newDate.getTime();
    };

    // B.1) Se giorno singolo (endDate = null)
    if (isSingleDay) {
      // B.1.1) Controllo duplicato: la startDate è già la startDate di un evento esistente?
      const startOverlap = newPersonalHolydays.find(h => isDateDuplicate(h, startDate));
      if (startOverlap) {
        showToast(`Questa data è già presente: ${startOverlap.description}`, true);
        return;
      }

      // B.1.2) Controllo periodo: la startDate è compresa in un periodo esistente?
      const periodOverlap = newPersonalHolydays.find(h => 
        h.endDate !== null && isDateInRange(startDate, h.startDate, h.endDate)
      );
      if (periodOverlap) {
        showToast(`Questa data fa parte di un periodo esistente: ${periodOverlap.description}`, true);
        return;
      }

    } else if (!isSingleDay && endDate) { 
      
      // B.2) Se periodo (endDate != null)
      
      // B.2.1) Controllo giorni singoli: un giorno del periodo corrisponde alla startDate di un evento singolo esistente?
      let currentDay = new Date(startDate);
      let singleOverlap: NewHolyday | undefined = undefined;

      while (currentDay.getTime() < endDate.getTime()) {
        singleOverlap = newPersonalHolydays.find(h => 
          h.endDate === null && isDateDuplicate(h, currentDay)
        );
        if (singleOverlap) break;
        currentDay.setDate(currentDay.getDate() + 1);
      }

      if (singleOverlap) {
        showToast(`Attenzione, l'evento si sovrappone a ${singleOverlap.description}`, true);
        return;
      }

      // B.2.2) Controllo sovrapposizione periodo: il periodo si sovrappone a un periodo esistente?
      const periodOverlap = newPersonalHolydays.find(h => {
        // Cerca periodi esistenti
        if (h.endDate) {
          // Un periodo si sovrappone se:
          // 1. L'inizio del nuovo periodo è compreso nel vecchio periodo
          const startOverlap = isDateInRange(startDate, h.startDate, h.endDate);
          // 2. La fine del nuovo periodo è compresa nel vecchio periodo
          const endOverlap = isDateInRange(endDate, h.startDate, h.endDate);
          // 3. Il vecchio periodo è interamente compreso nel nuovo periodo (il nuovo inizia prima e finisce dopo)
          const engulfing = startDate.getTime() <= h.startDate.getTime() && endDate.getTime() >= h.endDate.getTime();

          return startOverlap || endOverlap || engulfing;
        }
        return false;
      });

      if (periodOverlap) {
        showToast(`L'evento si sovrappone a un evento esistente: ${periodOverlap.description}`, true);
        return;
      }
    }

    // NESSUN ERRORE: AGGIUNGI L'EVENTO
    let tempNewPersonalHolydays = [...newPersonalHolydays, newEvent];
    setNewPersonalHolydays(tempNewPersonalHolydays);
    await saveData(tempNewPersonalHolydays, 'newPersonalHolydays'); // SALVATAGGIO LOCAL STORAGE

    console.log('Nuovo evento aggiunto:', newEvent);
    console.log('tempNewPersonalHolydays:', JSON.stringify(tempNewPersonalHolydays));

    // AZZERA LE VARIABILI DI ERRORE E CHIUDE LA MODAL
    setDpickerToastMessage('');
    setDpickerToastIsError(false);
    setIsModalSingleDateVisible(false);
  };

  /* ============================================================================= 
    AGGIUNGI PERIODO FESTIVI. --> MUORE COL REFACTORING
   ============================================================================= */
  // const handleAddPeriod = async () => {
  
  //   // CONTROLLA COMPILAZIONE DELLA DESCRIZIONE NELLA FORM
  //   if (!singleDateDescription) {
  //     setSingleDateError(dataLabel(myLanguage, 12)); // MSG ERRORE 'Inserisci una descrizione'
  //     return;
  //   }

  //   // PRELEVA DATI DALLA FORM
  //   const startDay = periodStartDate?.getDate();
  //   const startMonth = periodStartDate?.getMonth() + 1;
  //   const startYear = periodStartDate?.getFullYear(); 

  //   const adjustedEndDate = new Date(periodEndDate);
  //   if (periodEndDate?.getHours() === 0 && periodEndDate.getMinutes() === 0 && periodEndDate.getSeconds() === 0) {
  //     adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
  //   }

  //   const endDay = periodEndDate?.getDate();
  //   const endMonth = periodEndDate?.getMonth() + 1;
  //   const endYear = periodEndDate?.getFullYear();   
  
  //   const newPeriod: VacationPeriod = { startDay, startMonth, startYear, endDay, endMonth, endYear, description: singleDateDescription.trim() };

  //   // MODIFICA ITEM = SOVRASCRITTURA
  //   if (initialPeriodIndex !== null) {
  //     let tempVacationPeriods = vacationPeriods.map((period, index) => index === initialPeriodIndex ? newPeriod : period);
  //       setVacationPeriods(tempVacationPeriods);
  //       await saveData(tempVacationPeriods, 'vacationPeriods'); 
  //   } else {
  //     // NUOVO ITEM = AGGIUNTA ALL'ARRAY
  //     let tempVacationPeriods = [...vacationPeriods, newPeriod];
  //       setVacationPeriods(tempVacationPeriods);
  //       await saveData(tempVacationPeriods, 'vacationPeriods'); 
  //   }

  //   setInitialPeriodIndex(null); // Resetta l'indice dopo il salvataggio

  //   // AZZERA VARIABILI E CHIUDE MODAL
  //   clearData();
  // };

  /* ============================================================================= 
   EDIT ITEM (SINGOLO E PERIODO)
   ============================================================================= */
  // LA FUNZIONE RICEVE CATEGORIA 'type' E INDICE 'index' DEL RECORD DA EDITARE
  // const handleEdit = (type: ItemType, index: number) => {

  //   // DEFINISCE E AZZERA I CONTENITORI COI VALORI DA EDITARE, GIORNO SINGOLO E PERIODO
  //   let itemToEdit: { 
  //     day: number; 
  //     month: number; 
  //     description: string | undefined } | null = null; // singolo
  //   let periodToEdit: {
  //     startDay: number; 
  //     startMonth: number; 
  //     startYear: number; 
  //     endDay: number; 
  //     endMonth: number; 
  //     endYear: number; 
  //     description: string | undefined} | null = null; // periodo
  
  //   // SI COPIANO I VALORI DAL RECORD N. index IN itemToEdit O IN periodToEdit
  //   switch (type) {
  //     case 'personal':
  //       if (personalHolydays[index]) {
  //         itemToEdit = {
  //           day: personalHolydays[index].day,
  //           month: personalHolydays[index].month,
  //           description: personalHolydays[index].description
  //         };
  //       }
  //       // SET RADIOBUTTON PERIOD = INACTIVE (E RADIOBUTTON SINGLE ATTIVO)
  //       // -- così si carica da solo il datepicker 'single'
  //       setLeftRadioButtonActive(true);
  //       setRightRadioButtonActive(false);
  //     break;

  //     // VACATION -> SI COPIANO I VALORI DAL RECORD DELL'ARRAY E SI APRE LA MODAL 'periodo'
  //     case 'vacation':
  //       setInitialPeriodIndex(index);

  //       if (JSON.stringify(vacationPeriods[index])) {
  //         periodToEdit = {
  //           startDay: vacationPeriods[index].startDay,
  //           startMonth: vacationPeriods[index].startMonth,
  //           startYear: vacationPeriods[index].startYear,
  //           endDay: vacationPeriods[index].endDay,
  //           endMonth: vacationPeriods[index].endMonth,
  //           endYear: vacationPeriods[index].endYear,
  //           description: vacationPeriods[index].description
  //         };
  //       }
  //       // VISUALIZZA MODAL PERIODO
  //       //showModalSingleDate();
  //     break;

  //     default:
  //       console.warn('Impossibile modificare l\'elemento:', type);
  //     return;
  //   }

  //   // CASO 1) ITEM SINGOLO (itemToEdit != null)
  //   if (itemToEdit) {
  //     setDatePickerSelected(
  //       new Date(
  //         new Date().getFullYear(),
  //         itemToEdit.month ,
  //         itemToEdit.day
  //       )
  //     );
  //     setSingleDateDay(itemToEdit.day.toString());
  //     setSingleDateMonth((itemToEdit.month).toString());
  //     setSingleDateDescription(itemToEdit.description);
  //     setSelectedRadioOption('single');

  //     // SI INIZIALIZZANO initialType E initialIndex CON CATEGORIA E POSIZIONE DI PROVENIENZA
  //     // SERVIRANNO ALLA FUNZIONE handleAddSingleDate PER I CONFRONTI
  //     setInitialType(type as HolidayType);
  //     setInitialIndex(index);

  //     setIsModalSingleDateVisible(true);

  //   } else if (periodToEdit) {
  //   // CASO 2) PERIODO (periodToEdit != null)
  //     let sd: Date = new Date(
  //         periodToEdit.startYear, 
  //         periodToEdit.startMonth - 1, 
  //         periodToEdit.startDay
  //       )
  //     setStartdate(sd);
  //     setPeriodStartDate(sd);

  //     let ed: Date = new Date(
  //         periodToEdit.endYear, 
  //         periodToEdit.endMonth - 1, 
  //         periodToEdit.endDay
  //       )
  //     setEndDate(ed);
  //     setPeriodEndDate(ed);
      
  //     setSingleDateDescription(periodToEdit?.description);
  //     setSelectedRadioOption('period');
  //                 // AGGIUNGERE:
  //                 // RADIOBUTTON SINGLE = INACTIVE
  //                 // -- quindi si carica da solo il datepicker 'single'
  //                 setLeftRadioButtonActive(false);
  //                 setRightRadioButtonActive(true);
  //     setIsModalSingleDateVisible(true);
  //   }
  // };


  /* ============================================================================= 
   EDIT ITEM (SINGOLO E PERIODO) - REFACTORED
   ============================================================================= */
// LA FUNZIONE RICEVE SOLO L'INDICE 'index' DEL RECORD DA EDITARE DA newPersonalHolydays
const handleEdit = (index: number) => {
  // Controlla se l'indice è valido
  if (index === null || index < 0 || index >= newPersonalHolydays.length) {
    console.warn('Indice non valido per la modifica:', index);
    return;
  }
  setInitialIndex(index);
  const itemToEdit: NewHolyday = newPersonalHolydays[index];
  const isPeriod = itemToEdit.endDate !== null;
  
  setDpickerStartDate(itemToEdit.startDate);
  setDpickerEndDate(itemToEdit.endDate);
  setDpickerDescription(itemToEdit.description);
  setDpickerRepeatOnDate(itemToEdit.repeatOnDate);
  setDpickerRepeatOnDay(itemToEdit.repeatOnDay);
  setIsModalSingleDateVisible(true);
};

  /* ============================================================================= 
   DELETE ITEM --- Refactored
   ============================================================================= */
  const handleDelete = async (index: number) => {
    let itemDescription = `${newPersonalHolydays[index].startDate.getDate()} ${months[newPersonalHolydays[index].startDate.getMonth()]?.label} (${newPersonalHolydays[index].description})`;
    Alert.alert(
        dataLabel(myLanguage, 7),
        `${dataLabel(myLanguage, 8)} ${itemDescription}?`,
        [
          {
            text: dataLabel(myLanguage, 9),
            style: "cancel"
          },
          { 
            text: dataLabel(myLanguage, 10), 
            onPress: async () => {
              let tempPersonalHolydays = newPersonalHolydays.filter((_, i) => i !== index);
                setNewPersonalHolydays(tempPersonalHolydays);
                await saveData(tempPersonalHolydays, 'newPersonalHolydays');
            }
          }
        ]
      );
    };

  // BOTTONE RESET DROPDOWN COUNTRY: RIPORTA LA SELEZIONE AL PAESE LOCALIZZATO
  const ResetCountryButton = () => {
    return(
      <TouchableOpacity
        onPress={ 
          async () => {
            setMyCountry(getLocales()[0].languageTag);
            await saveData(getLocales()[0].languageTag, 'myCountry');
            //console.log('dropDown ripristinato a:', getLocales()[0].languageTag);
          }
        }>
        <IconSymbol size={20} name="gobackward" color={colors.blueBar} style={{paddingBottom:8,}}/>
      </TouchableOpacity>
    )
  }
  
  // GESTIONE STATI DELLE RADIOBUTTON DELLA MODAL, ATTIVO, FOCUSED E DISABILITATO
  const [selectedRadioOption, setSelectedRadioOption] = useState<'single' | 'period'>('single'); // STATO INIZIALE DEL RADIOBUTTON
  const [leftRadioButtonActive, setLeftRadioButtonActive] = useState<boolean>(true);    // FLAG PER DISATTIVARE IL RADIOBUTTON SINISTRO (da resettare a ogni [+ Aggiungi] )
  const [rightRadioButtonActive, setRightRadioButtonActive] = useState<boolean>(true);  // FLAG PER DISATTIVARE IL RADIOBUTTON DESTRO (da resettare a ogni [+ Aggiungi] )

  // GESTIONE SLIDER PER SELEZIONARE GIORNO/PERIODO NEL DATEPICKER
  const [sliderTargetValue, setSliderTargetValue] = useState(0);
  const buttonLeftAction = () => {
    sliderTargetValue === 1 && setSliderTargetValue(0);
    sliderTargetValue === 1 && setSelectedRadioOption('single');
    };
  const buttonRightAction = () => {
    sliderTargetValue === 0 && setSliderTargetValue(1);
    sliderTargetValue === 0 && setSelectedRadioOption('period');
    };

  /* ============================================================================= 
  * useEffect * AL CAMBIO DI myCountry
  Viene richiamato ogni volta che myCountry cambia, per aggiornare le festività nazionali
  ============================================================================= */
  useEffect( () => {
    setNationalHolydays(getLocalHolydas(myCountry));    // RICHIAMO LA FUNZIONE getLocalHolydas (DA data.tsx)
    async () => await saveData(myCountry, 'myCountry');
  }, [myCountry]);

  return (
    <ImageBackground 
      source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg')}
      resizeMode="cover" 
      style={[styles.image, {alignItems:'center'}]}> 

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false} >

        {/* TITOLO PAGINA  */}{/* LE MIE DATE */}
        <Text style={[styles.sectionTitle, { flex:1, marginBottom:32, }]}>{dataLabel(myLanguage, 0)}</Text> 

        {/* PULSANTONE + GIORNI SPECIALI ########################################################################## */}
        <TouchableOpacity 
          style={styles.specialDays}
          onPress={ () => { 
            setDpickerStartDate(new Date());
            setDpickerEndDate(null);
            setDpickerDescription('');
            setDpickerRepeatOnDate(false);
            setDpickerRepeatOnDay(false);
            setDpickerToastMessage('');
            setDpickerToastIsError(false);
            showModalSingleDate(); // --> APRE MODAL CON DATEPICKER
          }}
        >
          <IconSymbol name="plus" size={36} color={'#0088ff'}/>
          <Text style={styles.specialDaysLabel}>{dataLabel(myLanguage, 1)}</Text>
        </TouchableOpacity>

        {/* CARD GIORNI SPECIALI ############################################################################# */}
        {newPersonalHolydays.length > 0 && (
          <Suspense>
            <View style={styles.listItem}>

              {/* LABEL SEZIONE CON PULSANTE CANCELLAZIONE */}
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{opacity:0}}>*</Text>
                <Text style={[styles.listTitle, { textAlign:'center' } ]}>{dataLabel(myLanguage, 4)}</Text>
                {personalHolydays ?                
                  <TouchableOpacity
                    onPress={ async () => {
                      Alert.alert(
                          dataLabel(myLanguage, 7),  // Attenzione
                          dataLabel(myLanguage, 18),// Vuoi eliminare tutte le date ecc.?
                          [
                            {
                              text: dataLabel(myLanguage, 9), // Annulla
                              style: "cancel"
                            },
                            { 
                              text: dataLabel(myLanguage, 10), // Elimina
                              onPress: async () => {
                                setNewPersonalHolydays([]);
                                await saveData([], 'newPersonalHolydays');
                              }
                            }
                          ]
                        );
                    }}>
                    <IconSymbol size={Platform.OS === 'ios' ? 20 : 26}  name="plus" color={colors.blueBar} style={{marginRight:8, transform: [{rotate: '45deg'}]}}/>
                  </TouchableOpacity>
                :
                  <Text style={{opacity:0}}>*</Text>
                }
              </View>

              {newPersonalHolydays.sort((a: any, b: any) => a.startDate - b.startDate).map((holiday, index) => (
                <React.Fragment key={index}>
                  <View style={styles.holidayRow }>
                    <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                      
                      {holiday.endDate ? // STAMPA CERCHIETTO SOTTO IN OGNI CASO, SE = PERIODO SPOSTATTO VERSO DX
                        <View style={[styles.dot32noshadow, {marginLeft:6}]} />
                          :
                        <View style={styles.dot32noshadow} />
                      }
                      
                      <View style={styles.dot32}>
                        <Text style={styles.dot32text}>{holiday.startDate.getDate()}</Text>
                      </View>
                      <View style={{flexDirection:'column'}} >
                        {!holiday.endDate ? // GIORNO SINGOLO = DATA SINGOLA, PERIODO 0 DOPPIA DATA
                          <Text style={styles.itemDate}>{`${holiday.startDate.getDate()} ${months[holiday.startDate.getMonth()]?.label}`}</Text>
                        :
                        <Text style={styles.itemDate}>
                          {`${holiday.startDate.getDate()} ${months[holiday.startDate.getMonth()]?.label.slice(0,3)} ${holiday.startDate.getFullYear()} - `}
                          {`${holiday.endDate.getDate()} ${months[holiday.endDate.getMonth()]?.label.slice(0,3)} ${holiday.endDate.getFullYear()}`}
                        </Text>
                        }
                        
                        <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                          {(holiday.repeatOnDate || holiday.repeatOnDay) && <IconSymbol size={16} name="repeat" color={colors.text} style={{marginTop:8, marginLeft:10, marginRight:4, }}/>}
                          <Text style={[styles.itemDescription, {paddingLeft: 0, maxWidth:240, fontStyle:'italic', fontWeight:400}]}>{holiday.repeatOnDate && 'ripete ogni anno'}{holiday.repeatOnDay && 'ripete 2'}</Text>
                        </View>
                      </View>
                    </View>
                    <View>
                    <View style={styles.itemActions}>
                      <TouchableOpacity onPress={() => handleEdit(index)}>
                        <IconSymbol name="pencil" size={20} color={colors.blueBar} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginLeft: 12 }}>
                        <IconSymbol name="trash" size={20} color={colors.blueBar} />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                  {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
                  {index !== personalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
                </React.Fragment>
              ))}
            </View>
          </Suspense>
        )}
       
        {/* FESTIVITA NAZIONALI ############################################################################# */}
        <View style={styles.listItem}>
          
          {/* TITOLO */}
          <Text style={[ styles.listTitle, { textAlign:'center' } ]}>{dataLabel(myLanguage, 2)}</Text>

          {/* DROPDOWN PAESE */}
          <View style={styles.dropDownCountry}>
            <DropdownCountry 
              selectedValue={myCountry}
              onChange={ async (item) => {
                setMyCountry(item);
                await saveData(item, 'myCountry');
              }}
            />
            { myCountry.slice(0,2) === myLanguage  ? null : <ResetCountryButton/> }
          </View>

          {nationalHolydays.map((holiday, index) => (
            <React.Fragment key={index} >
              <View 
                key={index} 
                style={[styles.holidayRow, {justifyContent:'space-between', alignItems:'center'}]}>

                  <View style={[styles.holidayRow, {justifyContent:'flex-start', alignItems:'flex-start'}]}>
                    <View style={{width:44, height:44, borderRadius:24, backgroundColor: colors.dot32}}>
                      <Text style={styles.dot32text}>{holiday.day}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                      {/* <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label}`}</Text> */}
                      <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label}`}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={ () => 
                      // RENDE DISABLED LA RIGA DELLA FESTIVITA' CHE NON SARA' CONTEGGIATA
                      null
                    } >
                    <IconSymbol size={24} name="checkmark.circle.fill" color={colors.blueBar} style={{paddingBottom:8,}}/>
                    {/* <IconSymbol size={24} name="xmark.circle" color={colors.disabled} style={{paddingBottom:8,}}/> */}
                  </TouchableOpacity>

              </View> 


              {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
              {index !== nationalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
            </React.Fragment>
          ))}
        </View>
      
        {/* SPACER */}
        <View style={{height:500}}></View>
      </ScrollView>

      {/* nuovo MODAL DATEPICKR ###################################################################### */}
      <Suspense>
          <Modal
            visible={isModalSingleDateVisible}  
            presentationStyle="fullScreen"
            transparent={false}
            //backdropColor={'rgba(0, 0, 0, .25)'} // NON FUNZIONA TRASPARENZA
            animationType="none"
            onRequestClose={hideModalSingleDate} 
            hardwareAccelerated={true}
            >
            <View style={{
              flex:1,
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }}>
                <View style={styles.modalContainer}>
                  <NewDatepicker
                    language={myCountry}
                    startDate={dpickerStartDate}
                    endDate={dpickerEndDate}
                    description={dpickerDescription}
                    isError={dpickerToastIsError}
                    errorMsg={dpickerToastMessage}
                    repeatOnDate={dpickerRepeatOnDate}
                    repeatOnDay={dpickerRepeatOnDay}
                    onCancel={ () => {
                        setDpickerToastMessage('');
                        setDpickerToastIsError(false);
                        setIsModalSingleDateVisible(false);
                    }} 
                    onConfirm={(
                        myStartDate, 
                        myEndDate, 
                        myDescription, 
                        upperRadioButtonActive, 
                        lowerRadioButtonActive) => 
                      handleAddEvent(myStartDate, myEndDate, myDescription, upperRadioButtonActive, lowerRadioButtonActive) 
                    } />      
                </View>
            </View>
          </Modal>
      </Suspense>

    </ImageBackground>
  );
}



