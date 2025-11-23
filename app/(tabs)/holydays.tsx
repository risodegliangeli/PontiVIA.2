import React, { useEffect, useState, Suspense, useRef, } from 'react';
import {
  Animated,
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform,
  Share,
  Easing,
  } from 'react-native';
import { useRoute } from '@react-navigation/native';            // SERVE PER LEGGERE I PARAMETRI
import { useNavigation } from '@react-navigation/native';       // SERVE PER GESTIRE LA NAVIGAZIONE
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT VARIABILI
import { getLocales,  } from 'expo-localization';
import { holydayLabels as dataLabel } from '@/constants/dataLabel';
import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import DropdownCountry from '@/components/ui/DropdownCountry';  // COUNTRY PICKER 
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewDatepicker from '@/components/NewDatepicker';         // MIO DATEPICKER ✌🏻
import SideLabel from '@/components/ui/SideLabel';
import Privacy from '@/components/Privacy';
//import { useSplashCarousel } from '@/context/SplashCarouselContext'; // CONTEXT VISIBILITA BOTTOMBAR
//import * as Linking from 'expo-linking';
//import { useSharedValue } from 'react-native-reanimated';

// GOOGLE ADMOB ///////////////////////////////////
import mobileAds, { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
// init ADMOB
// mobileAds()
//   .initialize()
//   .then(adapterStatuses => {
//     console.log('AdMob Initialized @ holydays.tsx'); // Initialization complete!
//   });


// TYPE Holiday
type Holiday = {          // DEFINIZIONE DI holiday
  day: number;            // GIORNO
  month: number;          // MESE
  description: string;    // DESCRIZIONE
};

// TYPE NewHoliday (nuovo)
type NewHolyday = {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;
  repeatOnDay: boolean;
};

// GESTIONE COLORI
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

// LEGGE NOMI DEI MESI LOCALIZZATI DA data.tsx
const { months } = useLocalizationData();

/* ---------------------------------------------------------------┐ 
FUNZIONE DI SCRITURA SU STORAGE DATI
└---------------------------------------------------------------- */
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
export default function HolydaysScreen() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // ADV: TEST ID FROM https://developers.google.com/admob/ios/test-ads?hl=it
  // DA AGGIORNARE/RIMUOVERE CON ID CORRETTI
  const adUnitId = Platform.OS === 'ios' ? "ca-app-pub-3940256099942544/2934735716" : "ca-app-pub-3940256099942544/6300978111";

  // SWITCH ADV PER TEST
  const isAdvertising: boolean = true; // SE ATTIVA CAMPAGNA AdMob

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob Initialized @ holydays.tsx');
      });
  }, []); 

  const navigation = useNavigation();

  // puntatatore ADMOB
  const bannerRef = useRef<BannerAd>(null);
  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground. Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  }); 

  // RICEVE VARIABILI DAL CONTEXT
  const { 
    newPersonalHolydays, setNewPersonalHolydays, // NUOVO
    nationalHolydays, setNationalHolydays,
    nationalExcluded, setNationalExcluded,
    myCountry, setMyCountry,
    goBack, setGoBack,
    myLanguage
    } = useHolydays();

  /* ---------------------------------------------------------------┐ 
  STYLESHEET
  └---------------------------------------------------------------- */
  const styles:any =StyleSheet.create({
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
      paddingTop: 90,
      maxWidth: 550,
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
      fontSize: 22,
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
      marginBottom: 24,
      marginLeft:12,
      marginRight:12,
    },
    holidayRow: { 
      //flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    itemDate: {
      flexWrap: 'wrap',
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 8,
      color: colors.text,
    },
    itemDescription: {
      fontSize: 16,
      paddingLeft: 8,
      color: colors.text,
      //borderWidth:1,
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight:8,
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
      fontWeight: !isLight ? 200 : 300,
      color: colors.textNegative,
      textAlign:'center',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      paddingTop: Platform.OS === 'ios' ? 7 : 5,
      letterSpacing:-.5,
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
      //width:'100%',
      maxWidth: 550,
      marginLeft:32,
      marginRight:32,
      backgroundColor: colors.cardBackground, //'rgba(255, 255, 255, .9)',
      borderRadius:32,
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
      minHeight:68,
      borderRadius: 99,
      backgroundColor: colors.blueBar,
      marginBottom:24,
      marginHorizontal:32,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft:16,
      elevation:8,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 4,
        height: 4, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 8 // Match elevation for iOS
    },
    specialDaysLabel: {
      fontSize:20,
      fontWeight:400,
      color: colors.textNegative,
    },
    // DROPDOWN FESTIVITA PER PAESE
    dropDownCountry: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:8,
    },
    backgroundModal: {
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: isLight ? 'rgba(0, 0, 0, 0.75)' : colors.black
    },     
    advContainer:{
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft:0,
      paddingRight:0,
      marginBottom:32,
      marginTop:12,
      backgroundColor: 'rgba(0, 0, 0, .08)',
      borderRadius: 0,
      borderWidth: 0,
    },
    infoButton: {
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      padding:20,
      marginHorizontal:12,
      //marginTop:12,
      gap:8,
      borderWidth:2,
      borderStyle: 'dotted',
      borderColor: colors.blueBar,
      borderRadius:24,
      backgroundColor: 'rgba(255, 255, 255, .5)'
    }

  });


  // RICEVE VISIBILITA BOTTOMBAR DAL SUPERCONTEXT
  // const {
  //   isCarouselVisible, setIsCarouselVisible,
  //   } = useSplashCarousel();
    
  /* ---------------------------------------------------------------┐ 
  // GESTISCE LE CHIAMATE 'newItem' DA UNA LONG PRESS SUL CALENDARIO 
  // E APRE LA DATEPICKER
  └---------------------------------------------------------------- */
  function handleExternalAddDate(receivedDate: Date, action: string) {
    setInitialIndex(null);                  // INDEX, SERVE PER L'EDIT
    setDpickerStartDate(receivedDate);      // START
    setDpickerEndDate(null);                // END
    setDpickerDescription('');              // DESCR
    setDpickerRepeatOnDate(false);          // REP ON DATE
    setDpickerRepeatOnDay(false);           // REP ON DAY
    showModalSingleDate();                  // APRE MODAL
  }

  /* ---------------------------------------------------------------┐ 
  // GESTISCE LE CHIAMATE 'newItemFromExternal' DA DEEP LINK E APRE LA DATEPICKER
  └---------------------------------------------------------------- */
  function handleDeepLinkAddDate(
      pStartDate?: string,
      pEndDate?: string | undefined,
      pDescription?: string | undefined,
      pRODate?: string,
      pRODay?: string
      ) {
        // If no start date is provided, bail out to avoid constructing an invalid Date
        if (!pStartDate) {
          console.warn('Missing pStartDate for deep link');
          return;
        }
  
        setInitialIndex(null);                          // INDEX, SERVE PER L'EDIT
        setDpickerStartDate(new Date(pStartDate));      // START
        pEndDate ? setDpickerEndDate(new Date(pEndDate)) : setDpickerEndDate(null);         // END
        pDescription ? setDpickerDescription(pDescription) : setDpickerDescription('');     // DESCR
        pRODate === 'true' ? setDpickerRepeatOnDate(true) : setDpickerRepeatOnDate(false);  // REP ON DATE
        pRODay === 'true' ? setDpickerRepeatOnDay(true) : setDpickerRepeatOnDay(false);     // REP ON DAY
        setGoBack('index');                             // IMPOSTA goBack = index PERCHE NON ESISTE PAGINA CHIAMANTE
        showModalSingleDate();                          // APRE MODAL
    }

  /* ---------------------------------------------------------------┐ 
   GESTIONE MODAL NEWDATEPICKER
  └---------------------------------------------------------------- */
  const [isModalSingleDateVisible, setIsModalSingleDateVisible] = useState<boolean>(false);

  /* VALORI NUOVA MODAL DATEPICKER */
  const [dpickerStartDate, setDpickerStartDate] = useState<Date>();
  const [dpickerEndDate, setDpickerEndDate] = useState<Date | null>(null);
  const [dpickerDescription, setDpickerDescription] = useState<string>('');
  const [dpickerRepeatOnDate, setDpickerRepeatOnDate] = useState<boolean | undefined>();
  const [dpickerRepeatOnDay, setDpickerRepeatOnDay] = useState<boolean | undefined>();
  
  // // SERVE PER EDIT/SOVRASCRITTURA DEL RECORD FESTIVITA' SINGOLA
  const [initialIndex, setInitialIndex] = useState<number | null>(null);

  // SERVE PER VISUALIZZARE IL TOAST DI ERRORE
  const [errorVisible, setErrorVisible] = useState(false);

  // All'inizio del componente HolydaysScreen, aggiungi:
  const [dpickerToastMessage, setDpickerToastMessage] = useState<string | null>(null);
  const [dpickerToastIsError, setDpickerToastIsError] = useState<boolean>(false);

  /* GESTIONE SHOW/HIDE MODAL */
  const showModalSingleDate = () => {
    setIsModalSingleDateVisible(true);
  };

  const hideModalSingleDate = () => {
    setIsModalSingleDateVisible(false);
  };

  /* ---------------------------------------------------------------┐ 
  // GESTISCE CHIAMATE ESTERNE 
  └---------------------------------------------------------------- */
  interface RouteParams {
    date?: string;    // Data passata internamente (e.g., '2024-09-23T00:00:00.000Z')
    action?: string;  // Azione passta acon deep link (es. 'addDate')

    // Parametri aggiuntivi del deep link:
    prmStartDate?: Date;       // DATA INIZIO EVENTO
    prmEndDate?: Date;         // DATA FINE EVENTO 
    prmDdescription?: string;  // DESCRIZIONE
    prmRODate?: string;        // REPEAT ON DATE
    prmRODay?: string;         // REPEAT ON DAY
  }

  const route = useRoute(); // PUNTA AL ROUTE

  const params = route.params as { 
    date?: string, 
    action?: string | undefined,
    pStartDate?: string,
    pEndDate?: string,
    pDescription?: string,
    pRODate?: string,
    pRODay?: string
  }; 
      
  // LEGGE PARAMETRI

  useEffect(() => {
    if (params === undefined) {
        return;
    }
    if (params.action === 'newItem') {
      if (!params.date) {
        console.warn('Missing date parameter for newItem action');
        return;
      }
      const receivedDate = new Date(params.date);
      const action = params.action;
      handleExternalAddDate(receivedDate, action); // GESTISCE GIORNO SINGOLO (DA LONG PRESS)
    }

    // se la chiamata (newItemFromExternal) arriva da un deep link esterno
    /* es.: 
      pontivia://holydays?action=newItemFromExternal&pStartDate=2025-11-18&pDescription=XXBeaujolais%20demand%20in%20Paris&pEndDate=2025-11-22&pRODate=true
    */
    if (params.action === 'newItemFromExternal') {
      handleDeepLinkAddDate(
        params.pStartDate,
        params.pEndDate,
        params.pDescription,
        params.pRODate,
        params.pRODay
      );
    }
  }, [params]);

  /* ---------------------------------------------------------------┐ 

      BLOCCO DI SCRIPTING PER AGGIUNTA EVENTO 

  └---------------------------------------------------------------- */
  // FUNZIONE PER NORMALIZZARE LE DATE ALLE 12:00:00 PER EVITARE PROBLEMI DI FUSO ORARIO
  const normalizeDate = (date: Date | null): Date | null => {
    if (!date) return null;
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0));
  };

  // MOSTRA MESSAGGIO ERRORE TEMPORIZZATO NEL DATEPICKER
  const showToast = (message: string, isError: boolean) => {
    setDpickerToastMessage(message);
    setDpickerToastIsError(isError);
    setErrorVisible(true);
    // setTimeout(() => {  // Nasconde il toast dopo 4 secondi
    //   setErrorVisible(false);
    //   setDpickerToastMessage(null);
    // }, 5000); 
  };

  /* VERIFICA SE UNA DATA E' COMPRESA IN UN PERIODO
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

  /* ---------------------------------------------------------------┐ 
            HANDLE ADD EVENT (nuovo)
  └---------------------------------------------------------------- */
  const handleAddEvent = async (
    myStartDate: Date, 
    myEndDate: Date | null, 
    myDescription: string, 
    upperRadioButtonActive: boolean, // Corrisponde a repeatOnDate
    lowerRadioButtonActive: boolean // Corrisponde a repeatOnDay
  ) => {

  // Normalizza le date
  const startDate = normalizeDate(myStartDate)!;  // COSTANTE
  let endDate = normalizeDate(myEndDate);         // VARIABILE
  
  // GIORNO SINGOLO O PERIODO?
  const isSingleDay = !endDate || startDate.getTime() === endDate.getTime();

  // GIORNO SINGOLO endDate = null
  if (isSingleDay) {
    endDate = null;
  }

  // Crea il nuovo oggetto NewHolyday
  const newEvent: NewHolyday = {
    startDate: startDate,
    endDate: endDate,
    description: myDescription.trim(),
    repeatOnDate: upperRadioButtonActive, 
    repeatOnDay: lowerRadioButtonActive,
  };

  // copia dell'array escludendo l'evento che stiamo modificando
  const eventsToCheck = initialIndex !== null
      ? newPersonalHolydays.filter((_, i) => i !== initialIndex)
      : newPersonalHolydays;

  // A) CONTROLLO SOVRAPPOSIZIONE con nationalHolydays 

    // A.1 e A.2.1) Controllo se la startDate coincide con una festività nazionale
    const nationalDay = startDate.getDate();
    const nationalMonth = startDate.getMonth(); // NIENTE +1, nationalHolydays è già 0 based
    // Cerca una ricorrenza annuale nell'array nationalHolydays
    const isNationalHolyday = nationalHolydays.find(h => h.day === nationalDay && h.month === nationalMonth);

    if (isNationalHolyday) {
      const msg = `${dataLabel(myLanguage, 13)} (${isNationalHolyday.description})`; // 'Esiste già una festività nazionale in questa data...'
      if (isSingleDay) {
        // A.1) Giorno singolo e data coincide: ERRORE
        showToast(msg, true); // MESSAGGIO DI ERRORE
        return;
        } else {
        // A.2.1) Periodo e startDate coincide: ERRORE
        showToast(dataLabel(myLanguage, 21), true); // Msg: Inizio periodo coincide con festività naz
        return;
      }
    } 
  
    // A.2.2) Se è un periodo, controllo se comprende altre date nazionali (solo SEGNALAZIONE)
    if (!isSingleDay && endDate) {
      // Genera un array di giorni compresi nel periodo
      const daysInPeriod: any[] = [];
      let currentDay = new Date(startDate);
      
      // Si ferma al giorno prima dell'endDate (che è il giorno successivo all'ultimo)
      while (currentDay.getTime() < endDate.getTime()) {
        daysInPeriod.push({
          day: currentDay.getDate(),
          month: currentDay.getMonth(),
        });
        currentDay.setDate(currentDay.getDate() + 1); // Passa al giorno successivo
      }

      const nationalOverlap = nationalHolydays.find(h => 
        daysInPeriod.some(day => day.day === h.day && day.month === h.month)
      );

      if (nationalOverlap) {
        // A.2.2) Periodo e include festività nazionale: SEGNALAZIONE
        const overlapMsg = `Attenzione, il periodo include la festività nazionale: ${nationalOverlap.description}.`;
        showToast(overlapMsg, false); // false = SEGNALAZIONE (Toast bianco)
        // Non fa 'return', procede all'aggiunta dopo la segnalazione
      }
    }


    /* ============================================================================= 
      B) CONTROLLO SOVRAPPOSIZIONE con newPersonalHolydays
    ============================================================================= */
    // Funzione per confrontare date (solo giorno e mese se entrambi sono 'repeatOnDate')
    const isDateDuplicate = (existingEvent: NewHolyday, newDate: Date): boolean => {
      const existingDate = normalizeDate(existingEvent.startDate)!;

      // Se entrambi ripetono annualmente, controlla solo giorno e mese
      if (existingEvent.repeatOnDate && newEvent.repeatOnDate) {
        return existingDate.getDate() === newDate.getDate() && 
              existingDate.getMonth() === newDate.getMonth();
      }
      // Altrimenti, controlla l'uguaglianza completa della data
      return existingDate.getTime() === newDate.getTime();
      //return isEqual(existingDate, newDate);
    };

  // B.1) Se giorno singolo (endDate = null)
  if (isSingleDay) {
    // B.1.1) Controllo duplicato: la startDate è già la startDate di un evento esistente?
    const startOverlap = eventsToCheck.find(h => isDateDuplicate(h, startDate));
    if (startOverlap) {
      // Msg: Questa data è già presente...
      showToast(`${dataLabel(myLanguage, 25)} (${startOverlap.description})`, true);
      return;
    }

    // B.1.2) Controllo periodo: la startDate è compresa in un periodo esistente?
    const periodOverlap = eventsToCheck.find(h => 
      h.endDate !== null && isDateInRange(startDate, h.startDate, h.endDate)
    );
    if (periodOverlap) { // SE SI SOVRAPPONE MA NON E' UN EDIT ALLORA -> ERRORE
      // Msg: Questa data fa parte di un periodo esistente:
      showToast(`${dataLabel(myLanguage,22)} "${periodOverlap.description}"`, true);
      return;
    }

  } else if (!isSingleDay && endDate) { 
    
    // B.2) Se periodo (endDate != null)
      // B.2.1) Controllo giorni singoli: 
      // un giorno del periodo corrisponde alla startDate di un evento singolo esistente?
      let currentDay = new Date(startDate);
      let singleOverlap: NewHolyday | undefined = undefined;
      while (currentDay.getTime() < endDate.getTime()) {
        singleOverlap = eventsToCheck.find(h => 
          h.endDate === null && isDateDuplicate(h, currentDay)
        );
        if (singleOverlap) break;
        currentDay.setDate(currentDay.getDate() + 1);
      }
      if (singleOverlap) { // SE SEI SOVRAPPONE MA NON E' UN EDIT ALLORA -> ERRORE
        // Msg: Attenzione, l'evento si sovrappone a...
        showToast(`${dataLabel(myLanguage, 23)} "${singleOverlap.description}"`, true);
        return;
      }

      // B.2.2) Controllo sovrapposizione periodo: il periodo si sovrappone a un periodo esistente?
      const periodOverlap = eventsToCheck.find(h => {
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
        // MSG: Il periodo è in conflitto con... 
        showToast(`${dataLabel(myLanguage,24)} "${periodOverlap.description}"`, true);
        return;
      }
  }

  // NESSUN ERRORE: AGGIUNGI/SOSTITUISCI L'EVENTO
  let tempNewPersonalHolydays: any[] = [];
  if (initialIndex === null) {
    tempNewPersonalHolydays = [...newPersonalHolydays, newEvent];
    setNewPersonalHolydays(tempNewPersonalHolydays);
  } else {
    tempNewPersonalHolydays = newPersonalHolydays.map((h, i) => i === initialIndex ? newEvent : h);
    setNewPersonalHolydays(tempNewPersonalHolydays);
  }
  await saveData(tempNewPersonalHolydays, 'newPersonalHolydays'); // SALVATAGGIO LOCAL STORAGE

  // AZZERA LE VARIABILI DI ERRORE E CHIUDE LA MODAL
  setInitialIndex(null);
  setDpickerToastMessage('');
  setDpickerToastIsError(false);
  //setIsModalSingleDateVisible(false);
  hideModalSingleDate();

  // CASO: OK LA DATA E STATA INSERITA
  if (goBack !== undefined) { // SE IL goBack != undefined SI TORNA ALLA PAGINA CHIAMANTE
    let tempGoBack: string = goBack;
    setGoBack(undefined);
    //navigation.goBack();
    navigation.navigate(tempGoBack as never);
  } 
  };

  /* ---------------------------------------------------------------┐ 
    EDIT ITEM (SINGOLO E PERIODO) - REFACTORED
  └---------------------------------------------------------------- */
  // LA FUNZIONE RICEVE SOLO L'INDICE 'index' DEL RECORD DA EDITARE DA newPersonalHolydays
  const handleEdit = (index: number) => {
    // Controlla se l'indice è valido
    if (index === null || index < 0 || index >= newPersonalHolydays.length) {
      console.warn('Indice non valido per la modifica:', index);
      return;
    }
    const itemToEdit: any = newPersonalHolydays[index];
    setInitialIndex(index);                         // INDEX, SERVE PER L'EDIT
    setDpickerStartDate(itemToEdit.startDate);      // START
    setDpickerEndDate(itemToEdit.endDate);          // END
    setDpickerDescription(itemToEdit.description);  // DESCR
    setDpickerRepeatOnDate(itemToEdit.repeatOnDate);// REP ON DATE
    setDpickerRepeatOnDay(itemToEdit.repeatOnDay);  // REP ON DAY
    setGoBack('holydays'); 
    showModalSingleDate();
  };

  /* ---------------------------------------------------------------┐ 
  SHARE
  └---------------------------------------------------------------- */
  async function handleShare (index: any) {
    const itemToShare: any = newPersonalHolydays[index];
      try {
        // Vorrei condividere questo evento ecc
        let msg = `${dataLabel(myLanguage, 28)}\n\n*${itemToShare.description ?? ''}*\n${ (itemToShare.startDate).toLocaleDateString(myLanguage, {day: 'numeric', month: 'long', year: 'numeric'}) }\n\n---\n\n`;
        
        // gestione link pontivia://
        msg += `📲\n`
        msg += `https://pontivia-2025.web.app/detect.html?action=newItemFromExternal`;
        if (itemToShare.startDate) {msg += `&pStartDate=${(itemToShare.startDate).getFullYear()}-${(itemToShare.startDate).getMonth() + 1}-${(itemToShare.startDate).getDate()}`};
        if (itemToShare.description) {msg += `&pDescription=${(itemToShare.description).replace(/ /g, "%20")}`;}
        if (itemToShare.endDate) {msg += `&pEndDate=${(itemToShare.endDate).getFullYear()}-${(itemToShare.endDate).getMonth() + 1}-${(itemToShare.endDate).getDate()}`}
        if (itemToShare.repeatOnDate) {msg += `&pRODate=true`}
        if (itemToShare.repeatOnDay) {msg += `&pRODay=true`}

        // link download
        msg += `\n\n${dataLabel(myLanguage, 29)} \nhttp://pontivia-2025.web.app`;
        const result = await Share.share({
          message: msg,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // OK -> shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // CANCEL -> dismissed
        }
      } catch (error) {
        console.error(error);
      }
  }

  /* ---------------------------------------------------------------┐ 
   DELETE ITEM --- Refactored
  └---------------------------------------------------------------- */
  const handleDelete = async (index: number) => {
    let itemDescription = `${newPersonalHolydays[index].startDate.getDate()} ${months[newPersonalHolydays[index].startDate.getMonth()]?.label} (${newPersonalHolydays[index].description})`;
    
    {/* VUOI ELIMINARE? */}
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

  // RESET DROPDOWN COUNTRY: RIPORTA LA SELEZIONE AL PAESE LOCALIZZATO
  const ResetCountryButton = () => {
    return(
      <TouchableOpacity
        onPress={ 
          async () => {
            setMyCountry(getLocales()[0].languageTag);
            await saveData(getLocales()[0].languageTag, 'myCountry');
            setNationalExcluded([]);
            await saveData([], 'nationalExcluded');
          }
        }>
        <IconSymbol size={20} name="gobackward" color={colors.blueBar} style={{marginBottom:10,}}/>
      </TouchableOpacity>
    )
  }

  /* ---------------------------------------------------------------┐ 
  * useEffect * AL CAMBIO DI myCountry
  Viene richiamato ogni volta che myCountry cambia, per aggiornare le festività nazionali
  └---------------------------------------------------------------- */
  useEffect( () => {
    setNationalHolydays(getLocalHolydas(myCountry));    // RICHIAMO LA FUNZIONE getLocalHolydas (DA data.tsx)
    async () => await saveData(myCountry, 'myCountry');
  }, [myCountry]);

  // EFFETTO GENIUS PER LA MODAL 
  const modalSize = useRef(new Animated.Value(1.8)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;  
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(modalSize, { 
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacity, { 
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }
  useEffect(() => {
    if (isModalSingleDateVisible) {
      modalSize.setValue(1.2);
      modalOpacity.setValue(0.25);
      startAnimation();
    }
  }, [isModalSingleDateVisible]);

  return (
    <ImageBackground 
      source= {isLight && require('@/assets/images/background-image_minified.jpg')}
      resizeMode="cover" 
      style={[styles.image, {alignItems:'center'}]}> 
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false} >

        {/* TITOLO PAGINA - LE MIE DATE */}
        <View style={{
          flexDirection:'column',
          alignItems:'center',
          marginBottom: 32
          }}>
          <Text style={[styles.sectionTitle, { flex:1, }]}>{dataLabel(myLanguage, 0)}</Text> 
        </View>

        {/* PULSANTONE + GIORNI SPECIALI ############################################################# */}
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
            setGoBack('holydays');          // RIENTRO IN CASO DI OK/CANCEL
            showModalSingleDate(); // --> APRE MODAL CON DATEPICKER
          }}
        >
          <IconSymbol 
            name="plus" size={36} 
            color={colors.textNegative} 
            style={{marginRight: 12}}/>
          <Text style={styles.specialDaysLabel}>{dataLabel(myLanguage, 1)}</Text>
        </TouchableOpacity>

        {/* GOOGLE ADMOB ############################################################################# */}

        {isAdvertising && 
        <View style={[styles.advContainer, {width:'100%', alignItems:'center',}]}>
          <Text style={{fontSize:10, color: colors.disabled, marginBottom:8}}>ADV</Text>
            <BannerAd 
              ref={bannerRef} 
              unitId={adUnitId} 
              size={BannerAdSize.MEDIUM_RECTANGLE}/>
        </View>
        }

        {/* CARD GIORNI SPECIALI ##################################################################### */}
        {newPersonalHolydays.length > 0 && (
          <Suspense>
            {/* CARD */}
            <View style={styles.listItem}>

              {/* LABEL SEZIONE CON PULSANTE CANCELLAZIONE */}
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{opacity:0}}>*</Text>
                <Text style={[styles.listTitle, { textAlign:'center' } ]}>{dataLabel(myLanguage, 4)}</Text>
                {newPersonalHolydays ?                
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

              {/* LISTA RIGHE */}
              {newPersonalHolydays.sort((a: any, b: any) => a.startDate - b.startDate).map((holiday, index) => (
                <React.Fragment key={index}>
                  <View style={{flexDirection:'column',}}>

                    {/* RIGA */}
                    <View style={{
                      width:'100%',
                      flexDirection:'row',
                      alignItems:'flex-start',
                      }}>

                      {/* DOT32 */}
                      <View>
                        {holiday.endDate ? 
                          <View style={[styles.dot32noshadow, {marginLeft:6}]} />
                            :
                          <View style={styles.dot32noshadow} />
                        }
                        <View style={styles.dot32}>
                          <Text style={styles.dot32text}>{holiday.startDate.getDate()}</Text>
                        </View>
                      </View>

                      {/* TESTO */}
                      <View style={{flex:1, flexDirection:'column', paddingRight:12}}>
                        {!holiday.endDate ? 
                          <>
                            <Text style={styles.itemDate}>{`${holiday.startDate.getDate()} ${months[holiday.startDate.getMonth()]?.label}`}</Text>
                            {/*  SCRIVE ANNO (SOLO SE DIVERSO DALL' ANNO CORRENTE) */}
                            {holiday.startDate.getFullYear() !== new Date().getFullYear() && <Text style={styles.itemDate}>{holiday.startDate.getFullYear()}</Text>}
                          </>
                          :
                          <Text style={styles.itemDate}>
                            {holiday.startDate.getDate()}
                            {' '}
                            {months[holiday.startDate.getMonth()]?.label.slice(0,3)}
                            {' '}
                            {holiday.repeatOnDate || holiday.repeatOnDay ? '' : holiday.startDate.getFullYear()} 
                            {'-'}
                            {holiday.endDate.getDate()}
                            {' '}
                            {months[holiday.endDate.getMonth()]?.label.slice(0,3)}
                            {' '}
                            {holiday.repeatOnDate || holiday.repeatOnDay ? null : holiday.endDate.getFullYear()}
                          </Text>
                        }

                        {/* DESCRIZIONE */}
                        <Text 
                          style={[
                            styles.itemDescription, 
                            {
                              flex:1,
                              flexWrap:'wrap',
                              marginTop:4,
                            }]}> 
                          {holiday.description}
                        </Text>

                        {/* REPEAT ON DATE/DAY */}
                        {(holiday.repeatOnDate || holiday.repeatOnDay) && 
                          <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                            <IconSymbol 
                              size={16} 
                              name="repeat" 
                              color={colors.text} 
                              style={{marginTop:8, marginLeft:10, marginRight:4, }}/>
                            <Text style={[
                              styles.itemDescription, 
                              {
                              paddingLeft: 0, 
                              maxWidth:240, 
                              fontStyle:'italic', 
                              fontWeight:400
                              }
                            ]}>
                              {(holiday.repeatOnDate || holiday.repeatOnDay) && dataLabel(myLanguage, 15)}
                            </Text>
                          </View>
                        }
                      </View>

                      {/* ICONE CONDIVISIONE */}
                      <View>
                        <View style={{
                          flexDirection:'row',
                          justifyContent:'flex-end',
                          //backgroundColor:'fuchsia', 
                          }}>
                          <View style={styles.itemActions}>
                            <TouchableOpacity onPress={() => handleShare(index)}>
                              <IconSymbol name="square.and.arrow.up" size={24} color={colors.blueBar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(index)} style={{marginLeft:10}}>
                              <IconSymbol name="pencil" size={20} color={colors.blueBar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginLeft: 10}}>
                              <IconSymbol name="trash" size={20} color={colors.blueBar} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                    </View>

                  </View>
                  {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
                  {index !== newPersonalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border, marginVertical:16}}></View>}
                </React.Fragment>
              ))}

            </View>
          </Suspense>
        )}
       
        {/* FESTIVITA NAZIONALI ###################################################################### */}
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
                setNationalExcluded([]);
                await saveData([], 'nationalExcluded');
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
                      <Text 
                        style={[
                          styles.itemDate,
                          {
                            color: nationalExcluded.indexOf(index) !== -1 ? colors.disabled : colors.text 
                          }
                        ]} >
                        {`${holiday.day} ${months[holiday.month]?.label}`}
                      </Text>
                      <Text
                        style={[
                          styles.itemDescription,
                          {
                            maxWidth: 240,
                            color: nationalExcluded.indexOf(index) !== -1 ? colors.disabled : colors.text
                          }
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {holiday.description}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={ async () => {                      
                      // RIGA DA NON CONTEGGIARE
                      // 1) SE NON ESISTE NELLA LISTA
                      if (nationalExcluded.indexOf(index) === -1) {                        
                        // AGGIUNGE A nationalExcluded
                        let tempNationalExcluded: number[] = [...nationalExcluded, index];
                          setNationalExcluded(tempNationalExcluded);
                          await saveData(tempNationalExcluded, 'nationalExcluded');
                      } else { 
                        // ALTRIMENTI ELIMINA DA nationalExcluded
                        let tempNationalExcluded: number[] = nationalExcluded.filter(i => i !== index);
                          setNationalExcluded(tempNationalExcluded);
                          await saveData(tempNationalExcluded, 'nationalExcluded');
                      }
                    }}>
                    {nationalExcluded.indexOf(index) === -1 ?
                      <IconSymbol 
                        style={{paddingBottom:8,}}
                        size={24} 
                        name={"checkmark.circle.fill"}
                        color={colors.blueBar} 
                        />
                      :
                      <IconSymbol 
                        style={{paddingBottom:8,}}
                        size={24} 
                        name={"xmark"}
                        color={colors.disabled} 
                        />
                    }
                  </TouchableOpacity>
              </View> 

              {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
              {index !== nationalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
            </React.Fragment>
          ))}
        </View>

        {/* GOOGLE ADMOB ############################################################################# */}
        {isAdvertising &&
        <View style={[styles.advContainer, {width:'100%', alignItems:'center',}]}>
          <Text style={{fontSize:10, color: colors.disabled, marginBottom:8}}>ADV</Text>
            <BannerAd 
              ref={bannerRef} 
              unitId={adUnitId} 
              size={BannerAdSize.MEDIUM_RECTANGLE}/>
        </View>
        }

        {/* PRIVACY */}
        <Suspense>
          <Privacy />
        </Suspense>

        {/* <View>
          <Text style={{alignSelf:'center', color: colors.text}}>
            {service}
          </Text>
        </View> */}

        {/* SPACER ################################################################################### */}
        <View style={{height:480}}></View>
      </ScrollView>

      {/* nuovo MODAL DATEPICKR ###################################################################### */}
      <Suspense>
        <Modal
          visible={isModalSingleDateVisible}  
          presentationStyle="fullScreen"
          transparent={false}
          // backdropColor={'rgba(0, 0, 0, .25)'} // NON FUNZIONA TRASPARENZA
          animationType="none"
          onRequestClose={hideModalSingleDate} 
          hardwareAccelerated={true}
          >
            <View style={styles.backgroundModal}>
              <Animated.View style={[
                styles.modalContainer, 
                {
                  transform: [{scale: modalSize.interpolate({inputRange: [0, 1], outputRange: [0, 1]})}],
                  opacity: modalOpacity,
                }
                ]}>
                  <NewDatepicker
                    language={myLanguage}                   // LINGUA
                    startDate={dpickerStartDate ? dpickerStartDate : new Date(0)}            // DATA INIZIO
                    endDate={dpickerEndDate}                // DATA FINE O null
                    description={dpickerDescription}        // DESCRIZIONE
                    isError={dpickerToastIsError}           // PASSA AL COMPONENT FLAG DI ERRORE
                    errorMsg={dpickerToastMessage}          // PASSA AL COMPONENT MSG DI ERRORE
                    repeatOnDate={dpickerRepeatOnDate ? dpickerRepeatOnDate : null}      // RIPETE IN QUELLA DATA
                    repeatOnDay={dpickerRepeatOnDay ? dpickerRepeatOnDay : null}        // RIPETE QUEL GIORNO DELL'ANNO
                    initialIndex={initialIndex}             // VALORIZZATO SE EDIT
                    onCancel={ () => {
                      setInitialIndex(null);                // SE ERA UN EDIT AZZERA IL FLAG
                      setDpickerToastMessage('');           // AZZERA MSG ERRORE
                      setDpickerToastIsError(false);        // AZZERA FLAG ERRORE
                      hideModalSingleDate();
                      if (goBack !== undefined) { 
                        // CASO CANCEL: DATA NON INSERITA
                        let tempGoBack: string = goBack;
                        setGoBack(undefined);       // AZZERA goBack
                        //navigation.goBack();    // TORNA INDIETRO
                        navigation.navigate(tempGoBack as never);
                      }} 
                    }
                    onConfirm={(
                      myStartDate, 
                      myEndDate, 
                      myDescription, 
                      upperRadioButtonActive, 
                      lowerRadioButtonActive) => 
                      handleAddEvent(
                        myStartDate, 
                        myEndDate, 
                        myDescription, 
                        upperRadioButtonActive, 
                        lowerRadioButtonActive, 
                      ) 
                  }/>      
              </Animated.View>
            </View>
        </Modal>
      </Suspense>

      {/* INFOPOINT */}
      <Suspense>
        <SideLabel />
      </Suspense>
    </ImageBackground>
  );
}
