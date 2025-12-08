import React, { useCallback, useEffect, useReducer, useRef, useState, Suspense } from 'react';
import {
  ActivityIndicator,
  Alert,
  //Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import { createCalendarGrid, createUTCDate } from '@/components/calendarUtils';
import { IconSymbol } from '@/components/ui/IconSymbol';
import SimpleToast from '@/components/ui/SimpleToast';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { addMonths, isWithinInterval, getDay, differenceInDays, startOfMonth } from "date-fns";
import * as Calendar from 'expo-calendar'; // ACCESSO AL CALENDARIO DI SISTEMA
import { dataLabel as chunkDataLabel, calendarScrenLabels as dataLabel, datepickerLabels } from '@/constants/dataLabel'; // LABEL LOCALIZZATE
import { useNavigation } from '@react-navigation/native';
import useShareMsgComposer from '@/components/useShareMsgComposer';
import { BannerAd, BannerAdSize, useForeground, } from 'react-native-google-mobile-ads';
import createCalendarStyles from '@/components/styles/createCalendarStyles';

// INTERFACCIA DI NewHolyday (local copy to avoid collision with external types)
interface LocalNewHolyday {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;  // RIPETE OGNI ANNO, IL 25 settembre 
  repeatOnDay: boolean;   // RIPETE OGNI ANNO, il primo martedì di settembre
}

/* ---------------------------------------------------------------┐ 
  TOAST STATE MANAGEMENT CON useReducer
└---------------------------------------------------------------- */
// Types per il toast state
type ToastState = {
  visible: boolean;
  position: 'top' | 'center' | 'bottom';
  background: string;
  overlayBackground: string;
  radius: number | number[] | undefined;
  paddingTop: number;
  paddingBottom: number;
  body: React.ReactNode;
  animation: 'none' | 'slide' | 'fade';
  onClose?: () => void;
};

// Actions disponibili
type ToastAction =
  | { type: 'SHOW_HOLYDAY_TOAST'; payload: { day: any; title: string; description: string; colors: any } }
  | { type: 'SHOW_BRIDGE_TOAST'; payload: { day: any; title: string; description: string; bridgeStart: Date; bridgeEnds: Date; colors: any } }
  | { type: 'HIDE_TOAST' }
  | { type: 'RESET' };

// State iniziale
const initialToastState: ToastState = {
  visible: false,
  position: 'center',
  background: '',
  overlayBackground: '',
  radius: [0, 0, 0, 0],
  paddingTop: 0,
  paddingBottom: 0,
  body: '',
  animation: 'slide',
  onClose: undefined,
};

// Reducer function
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'SHOW_HOLYDAY_TOAST':
      return {
        ...state,
        visible: true,
        position: 'center',
        background: action.payload.colors.toastBackground,
        overlayBackground: 'rgba(50, 50, 50, 0.15)',
        radius: [32, 32, 32, 32],
        paddingTop: 48,
        paddingBottom: 48,
        animation: 'fade',
        body: null, // Verrà impostato dopo nel componente
        onClose: undefined,
      };

    case 'SHOW_BRIDGE_TOAST':
      return {
        ...state,
        visible: true,
        position: 'center',
        background: action.payload.colors.toastBackground,
        overlayBackground: 'rgba(50, 50, 50, 0.05)',
        radius: [32, 32, 32, 32],
        paddingTop: 48,
        paddingBottom: 48,
        animation: 'fade',
        body: null, // Verrà impostato dopo nel componente
        onClose: undefined,
      };

    case 'HIDE_TOAST':
      return {
        ...state,
        visible: false,
      };

    case 'RESET':
      return initialToastState;

    default:
      return state;
  }
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ---------------------------------------------------------------┐ 
  CALCOLA LA RICORRENZA DI UNA DATA ALL'INTERNO DEL MESE
  (es. primo, secondo, terzo, quarto, quinto)
└---------------------------------------------------------------- */
function getWeekdayRecurrence(targetDate: Date) {
  const targetDayOfWeek = getDay(targetDate);
  const firstDayOfMonth = startOfMonth(targetDate);
  const startDayOfWeek = getDay(firstDayOfMonth);
  const daysToAdd = (targetDayOfWeek - startDayOfWeek + 7) % 7;
  const firstOccurrence = addMonths(firstDayOfMonth, 0);
  firstOccurrence.setDate(firstOccurrence.getDate() + daysToAdd);
  const daysDifference = differenceInDays(targetDate, firstOccurrence);
  const recurrenceNumber = (daysDifference / 7) + 1;
  return recurrenceNumber;
}

/* ---------------------------------------------------------------┐ 
  FORMATTA IL PATTERN DI RICORRENZA PER repeatOnDay
  (es. "Terzo giovedì di novembre")
└---------------------------------------------------------------- */
function formatRecurrencePattern(
  date: Date,
  language: string,
  localizedDays: string[],
  months: any[]
): string {
  const recurrence = getWeekdayRecurrence(date);
  const dayOfWeek = getDay(date);
  const monthIndex = date.getMonth();

  // Costruisce la stringa: "Ripete ogni anno, il" + "terzo" + "giovedì" + "di" + "novembre"
  const pattern = `${datepickerLabels(language, 9)} ${datepickerLabels(language, 9 + recurrence)} ${localizedDays[dayOfWeek === 0 ? 6 : dayOfWeek - 1]} ${datepickerLabels(language, 15)} ${months[monthIndex].label}`;

  return pattern;
}

/* ---------------------------------------------------------------┐ 
  HELPER PER NOME PAESE DA CODICE LOCALE
└---------------------------------------------------------------- */
const getCountryName = (code: string) => {
  const names: { [key: string]: string } = {
    'de-AT': 'Österreich 🇦🇹',
    'ch-CH': 'Switzerland 🇨🇭',
    'be-BE': 'Belgium 🇧🇪',
    'en-GB': 'UK 🇬🇧',
    'en-IE': 'Éire 🇮🇪',
    'fr-FR': 'France 🇫🇷',
    'de-DE': 'Deutschland 🇩🇪',
    'es-ES': 'España 🇪🇸',
    'nl-NL': 'Nederland 🇳🇱',
    'pt-PT': 'Portugal 🇵🇹',
    'si-SI': 'Slovenija 🇸🇮',
    'hr-HR': 'Hrvatska 🇵🇹',
    'gr-GR': 'Ελλάδα 🇬🇷',
    'it-IT': 'Italia 🇮🇹',
  };
  return names[code] || 'Italia';
};

/* ============================================================================= 


                MAIN CALENDARSCREEN - print calendario


============================================================================= */
const CalendarScreen = ({ callerPreferences }: any) => {

  // VALORI PASSATI DAL CONTEXT
  const {
    newPersonalHolydays,
    nationalExcluded,
    myPreferences,
    myCountry,
    myLanguage,
    goBack, setGoBack,
    sniffer,
    adUnitId,
  } = useHolydays();

  // HOOK PER COMPORRE I MESSAGGI DI CONDIVISIONE
  const composeShareMsg = useShareMsgComposer();

  // FLAG ADV PER TEST
  const isAdvertising: boolean = true; // SE ATTIVA CAMPAGNA AdMob

  // NOMI MESI E GIORNI
  const { localizedDays } = useLocalizationData(); // RICEVE I NOMI DEI GIORNI LOCALIZZATI
  const { months: localizedMonths } = useLocalizationData(); // RICEVE I NOMI DEI MESI LOCALIZZATI

  //const spaceAbove = Platform.OS === 'ios' ? 70 : 0;

  const colors = useThemeColors();
  //const colorScheme = useColorScheme();
  //const isLight = colorScheme === 'light';

  // ADMOB
  const bannerRef = useRef<BannerAd>(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  const monthsToLoad = 3;

  // CALCOLO DINAMICO MARGINE ESTERNO DELLE CARD
  //const width = Dimensions.get("window").width;
  //const sideMargin = Math.trunc(width * .025); // MARGINE LATERALE

  /* ---------------------------------------------------------------┐ 
  GESTIONE PERMESSI CALENDARIO CON RICHIESTA RIPETUTA
  └---------------------------------------------------------------- */
  const requestCalendarPermission = async (): Promise<boolean> => {
    try {
      // Verifica lo stato attuale dei permessi
      const { status: currentStatus } = await Calendar.getCalendarPermissionsAsync();

      if (currentStatus === 'granted') {
        return true;
      }

      // Richiedi i permessi (prima richiesta)
      const { status: newStatus } = await Calendar.requestCalendarPermissionsAsync();

      if (newStatus === 'granted') {
        return true;
      }

      // Permesso negato alla prima richiesta - mostra alert con opzione Riprova
      return new Promise((resolve) => {
        Alert.alert(
          dataLabel(myLanguage, 15) || 'Permesso Calendario Richiesto',
          dataLabel(myLanguage, 16) || 'Per salvare eventi nel calendario, PontiVIA ha bisogno del permesso di accesso al calendario. Senza questo permesso non potrai salvare i ponti trovati nel tuo calendario.',
          [
            {
              text: dataLabel(myLanguage, 10) || 'Annulla',
              style: 'cancel',
              onPress: () => resolve(false)
            },
            {
              text: dataLabel(myLanguage, 17) || 'Riprova',
              onPress: async () => {
                // Richiedi nuovamente i permessi (seconda richiesta)
                const { status: retryStatus } = await Calendar.requestCalendarPermissionsAsync();

                if (retryStatus === 'granted') {
                  // Permesso concesso al secondo tentativo
                  resolve(true);
                } else {
                  // Ancora negato - mostra messaggio finale
                  Alert.alert(
                    dataLabel(myLanguage, 18) || 'Permesso Negato',
                    dataLabel(myLanguage, 19) || 'Non potrai salvare eventi nel calendario finché non concedi il permesso nelle impostazioni del dispositivo.',
                    [{
                      text: 'OK',
                      style: 'default',
                      onPress: () => resolve(false)
                    }]
                  );
                }
              }
            }
          ]
        );
      });

    } catch (error) {
      console.error('[Calendar] Errore durante la richiesta permessi:', error);
      return false;
    }
  };

  /* ---------------------------------------------------------------┐ 
  SHARE

  in ingresso:
  - 'type' tipo di condivisione 'holyday' o 'bridge' 
    (cambia il tipo di condivisione)
  - 'id' record completo dell'array newPersonalHolydays 
    (servirà in futuro per edit/delete) ->
      id[0]: Mon Nov 17 2025 13:00:00 GMT+0100 
      id[1]: 1 
      id[2]: Giorno fortunato per me 
      id[3]: true
  └---------------------------------------------------------------- */
  async function handleShare(
    type: ('holyday' | 'bridge'),   // tipo di condivisione in ingresso 'holyday' o 'bridge'
    id: any,                        // id: il record completo (vedi sopra)
  ) {
    try {
      // APRE SHARE DEL DISPOSITIVO
      const result = await Share.share({
        message: composeShareMsg(type, id), // RICHIAMA HOOK CON FUNZIONE ESTERNA
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // OK -> shared with activity type of result.activityType
          dispatchToast({ type: 'HIDE_TOAST' });
        } else {
          // shared
          dispatchToast({ type: 'HIDE_TOAST' });
        }
      } else if (result.action === Share.dismissedAction) {
        // CANCEL -> dismissed
        dispatchToast({ type: 'HIDE_TOAST' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* ---------------------------------------------------------------┐ 
  CONTENUTO PER MODAL GIORNO FESTIVO (usa SimpleToast.tsx)
  └---------------------------------------------------------------- */
  interface HolydayToastInterface {
    id: any;              // INTERO CONTENUTO DEL RECORD
    title: string;        // TITOLO EVENTO (anche id[1])
    description: string;  // DESCRIZIONE EVENTO (anche id[2])
  }
  const HolydayToast: React.FC<HolydayToastInterface> = ({ id, title, description }) => {
    // CONTENUTO CHE STA _DENTRO_ AL TOAST
    return (
      <View style={{ width: '100%', flexDirection: 'column', gap: 12, }}>

        {/* PULS. SHARE + EDIT + DELETE */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>

          {/* SHARE */}
          <TouchableOpacity
            onPress={() => {
              handleShare('holyday', id,);
            }}>
            <IconSymbol name="square.and.arrow.up" size={24} color={colors.blueBar} />
          </TouchableOpacity>

          {/* EDIT da implementare ? */}
          {/* <TouchableOpacity onPress={() => null} style={{marginLeft:10}}>
          <IconSymbol name="pencil" size={24} color={colors.blueBar} />
        </TouchableOpacity> */}

          {/* DELETE da implementare ? */}
          {/* <TouchableOpacity onPress={() => null} style={{ marginLeft: 10}}>
          <IconSymbol name="trash" size={24} color={colors.blueBar} />
        </TouchableOpacity> */}
        </View>

        {/* ICONA E TESTI */}
        <View style={{
          width: '100%',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
          <IconSymbol name="calendar" size={28} color={colors.text} />
          <View style={{ flex: 1, flexDirection: 'column', }}>
            <Text style={styles.monthTitle}>{title}</Text>
            <Text style={styles.dayNumber}>{description}</Text>
          </View>
        </View>

        {/* SPAZIATORE */}
        <View style={{ width: '100%', height: 12 }} />

        {/* PULSANTe ANNULLA */}
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => dispatchToast({ type: 'HIDE_TOAST' })}>
            <Text style={styles.cancelButtonText}>{dataLabel(myLanguage, 10)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /* ---------------------------------------------------------------┐ 
  CONTENUTO PER MODAL POSSIBILE PONTE (usa SimpleToast.tsx)
  └---------------------------------------------------------------- */
  interface BridgeHolydayInterface {
    id: number;
    title: string;
    description: string;
    bridgeStart: Date;
    bridgeEnds: Date;
  }
  const BridgeToast: React.FC<BridgeHolydayInterface> = ({ id, title, description, bridgeStart, bridgeEnds }) => {
    // CONTENUTO CHE STA _DENTRO_ AL TOAST
    return (
      <View style={{ width: '100%', flexDirection: 'column', gap: 12 }}>

        {/* PULS. SHARE */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', }}>
          <TouchableOpacity
            onPress={() =>
              handleShare('bridge', id,)
            }>
            <IconSymbol name="square.and.arrow.up" size={24} color={colors.blueBar} />
          </TouchableOpacity>
        </View>

        {/* CORPO MESSAGGIO */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Image
            source={require('@/assets/images/icon_girl-on.png')}
            style={{ width: 48, height: 48, resizeMode: 'contain', marginRight: 16 }}
          />
          <View style={{ flex: 1, }}>
            <Text style={[styles.monthTitle, { color: colors.text }]}>{dataLabel(myLanguage, 9)}</Text>
            {title && <Text style={[styles.dayNumber, { color: colors.text, lineHeight: 22, textAlign: 'left' }]}>
              {description}
            </Text>}
          </View>
        </View>

        {/* SPAZIATORE */}
        <View style={{ width: '100%', height: 24 }} />

        {/* PULSANTI ANNULLA/AGGIUNGI */}
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => dispatchToast({ type: 'HIDE_TOAST' })}>
            <Text style={styles.cancelButtonText}>{dataLabel(myLanguage, 10)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={async () => {
              try {
                // Richiedi permessi calendario con gestione robusta
                const hasPermission = await requestCalendarPermission();

                if (!hasPermission) {
                  // Permesso negato - chiudi il toast
                  dispatchToast({ type: 'HIDE_TOAST' });
                  return;
                }

                // Permesso concesso - crea l'evento
                const eventDetails = {
                  title: dataLabel(myLanguage, 0),    // Ponte!
                  startDate: bridgeStart,
                  endDate: bridgeEnds,
                  notes: dataLabel(myLanguage, 1),    // PontiVIA! ha trovato questo ponte ecc..
                  allDay: true,
                };

                await Calendar.createEventInCalendarAsync(eventDetails);

                // Successo - mostra conferma
                // Alert.alert(
                //   dataLabel(myLanguage, 20) || 'Evento Aggiunto',
                //   dataLabel(myLanguage, 21) || 'Il ponte è stato aggiunto al tuo calendario!',
                //   [{ text: 'OK', style: 'default' }]
                // );

              } catch (e: any) {
                console.error('[Calendar] Errore durante la creazione evento:', e);

                // Gestisci errori specifici
                if (e.code === 'ERR_MISSING_PERMISSIONS') {
                  // Permesso mancante - richiedi nuovamente
                  await requestCalendarPermission();
                } else {
                  // Altro errore
                  Alert.alert(
                    dataLabel(myLanguage, 22) || 'Errore',
                    dataLabel(myLanguage, 23) || 'Si è verificato un errore durante il salvataggio dell\'evento nel calendario.',
                    [{ text: 'OK', style: 'default' }]
                  );
                }
              } finally {
                dispatchToast({ type: 'HIDE_TOAST' });
              }
            }}
          >
            <Text style={styles.addButtonText}>{dataLabel(myLanguage, 11)} </Text><IconSymbol name="calendar.badge.plus" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /* ---------------------------------------------------------------┐ 
  // CONTROLLO PRIVILEGI ACCESSO AL CALENDARIO
  └---------------------------------------------------------------- */
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    })();
  }, []);

  // PARAMETRI INTERFACCIA SIMPLETOAST - GESTITI CON useReducer
  const [toastState, dispatchToast] = useReducer(toastReducer, initialToastState);
  const [toastBody, setToastBody] = useState<React.ReactNode>('');

  const [calendarData, setCalendarData] = useState<any[]>([]);

  // SEGNA LA DATA DI PARTENZA PER IL PROSSIMO BLOCCO DI MESI DA CALCOLARE  
  const [currentLoadDate, setCurrentLoadDate] = useState(() => createUTCDate(new Date().getFullYear(), new Date().getMonth(), 1));

  // TOGGLE CARICAMENTO... --> OFF
  const [isLoading, setIsLoading] = useState(false);

  // RIFERIMENTO UNIVOCO ALLA FLATLIST
  const flatListRef = useRef(null);

  // C'E' ALTRO DA CARICARE? (default: true)
  const [hasMore, setHasMore] = useState(true);

  // BACKGROUNDCOLOR (MESSO QUI = DIVENTA GLOBALE)
  const backgroundColor = useThemeColor({}, 'black'); //'background');

  /* ---------------------------------------------------------------┐ 
 STYLESHEET
 └---------------------------------------------------------------- */
  const styles = createCalendarStyles();

  const navigation = useNavigation<any>();

  // LONG PRESS: CHIAMA LA PAGINA holydays COL DATEPICKER APERTO SULLA DATA DA INSERIRE ///////////////////
  const handleGoToHolydays = (date: Date, action: string | undefined) => {
    const dateString = date.toISOString();
    navigation.navigate('holydays', { date: dateString, action: action });
  };

  /* ---------------------------------------------------------------┐ 
  (CALLBACK) AGGIUNGE MESI AL CALENDARIO
  MEMORIZZA - E NON RICALCOLA - IL RISULTATO DELLA FUNZIONE FINCHE' 
  NON CAMBIA IL VALORE DI UNA DIPENDENZA: isLoading, hasMore, 
  currentLoadDate, monthsToLoad, PREFERENCES.bridgeDuration
  └---------------------------------------------------------------- */
  const loadMoreCalendarData = useCallback(async (
    myCountry: string,
    newPersonalHolydays: any[],
  ) => {

    // EXIT SE isLoading = true OPPURE hasMore = false
    if (isLoading || !hasMore) {
      return;
    } else {
      setIsLoading(true);
      try {
        // CALCOLA I PROSSIMI MESI
        const newMonthsData = createCalendarGrid(
          createUTCDate(
            addMonths(currentLoadDate, monthsToLoad).getFullYear(),
            addMonths(currentLoadDate, monthsToLoad).getMonth(),
            1),
          monthsToLoad,
          callerPreferences.bridgeDuration,
          newPersonalHolydays as any,
          myCountry,
          myPreferences,
          nationalExcluded,
        );

        // AGGIUNGE LA GRID AL CALENDARIO
        setCalendarData(prevData => [...prevData, ...newMonthsData]);

        // AGGIORNA LA DATA DI PARTENZA PER LA PROSSIMA CHIAMATA
        const nextLoadDate = createUTCDate(
          addMonths(currentLoadDate, monthsToLoad).getFullYear(),
          addMonths(currentLoadDate, monthsToLoad).getMonth(),
          1);
        setCurrentLoadDate(nextLoadDate);

      } catch (error) {
        console.error(error);
      } finally {
        // NASCONDE Caricamento...
        setIsLoading(false);
      }
    }
  }, [isLoading, hasMore, currentLoadDate, monthsToLoad, callerPreferences, myPreferences]);

  /* ---------------------------------------------------------------┐ 
    (USEEFFECTS) GESTISCE GLI EFFETTI DEL CAMBIO DI 'PREFERENCES'
  └---------------------------------------------------------------- */
  useEffect(() => {
    if (callerPreferences) {
      const startDate = createUTCDate(new Date().getFullYear(), new Date().getMonth(), 1);

      setCalendarData([]); // SVUOTA calendarData

      setCurrentLoadDate(startDate);

      setCalendarData(
        createCalendarGrid(
          startDate,
          monthsToLoad,
          callerPreferences.bridgeDuration,
          newPersonalHolydays as any,
          myCountry,
          myPreferences,
          nationalExcluded,
        )
      );
    }
  }, [
    //JSON.stringify(callerPreferences),
    JSON.stringify(myPreferences),
    newPersonalHolydays,
    nationalExcluded,
    myCountry
  ]);

  /* ---------------------------------------------------------------┐ 
    (CALLBACK) RENDER DELLE CARD DELLA FLATLIST
      determina il tipo di giorno (festivo, sabato, domenica, ponte, feriale).
      1 (Festivo), -1 (Ponte), undefined (Feriale). 
      true o false se il giorno è interno al mese
      l'array finale sarà come questo esempio:
      day[0]                      day[1]    day[2]            day[3]
      2025-05-26T12:00:00.000Z,   1,        "Ferragosto",     false],
  └---------------------------------------------------------------- */
  const renderMonthCard = useCallback(({ item: month, index }) => {


    return (
      <React.Fragment key={`${month.y}-${month.m}-${index}`}>
        <View style={styles.card}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>

            {/* BLOCCHETTO MESE/ANNO */}
            <View style={{ flex: 1, flexDirection: 'column', alignContent: 'flex-start', }}>
              <Text style={styles.monthTitle}>
                {localizedMonths[month.m - 1].label.charAt(0).toUpperCase() + localizedMonths[month.m - 1].label.slice(1)}
              </Text>
              <Text style={styles.yearTitle}>{month.y}</Text>
            </View>

            {/* LABEL PONTI TROVATI */}
            <View>
              {month.bridges.length > 0 ?
                <View style={styles.bridgeYellowLabel}>
                  <Text
                    style={styles.cardLabelBridgeFound}>{month.bridges.length} {month.bridges.length > 1 ? dataLabel(myLanguage, 2) : dataLabel(myLanguage, 3)}</Text>
                </View>
                :
                null
              }
            </View>
          </View>

          {/* INIZIALI GIORNI DELLA SETTIMANA */}
          <View style={styles.weekDaysHeader}>
            {localizedDays.map((dayName, i) => (
              <Text key={i} style={styles.weekDayText}>{dayName.substring(0, 2).toUpperCase()}</Text>
            ))}
          </View>

          {/* DOPPIO FILETTO */}
          <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,.05)', marginBottom: 0, }}></View>
          <View style={{ width: '100%', height: 1, backgroundColor: colors.white, marginBottom: 12, }}></View>

          {/* CONTENUTO DELLA CARD */}
          <View style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, overflow: 'hidden' }}>
            <View style={styles.daysGrid}>
              {month.table.map((day: any, dayIndex: number) => {
                return (
                  <View
                    key={`day-container-${day[0]}-${dayIndex}`}
                    style={styles.dayCell} >
                    {/* a) SE NON ESISTE day[3] E' GIORNO ESTERNO AL MESE E NON SI STAMPA 
                        b) TUTTI I GIORNI SONO TOUCHABLEOPACITY MA...
                         
                        */}
                    {day[3] &&
                      <Pressable
                        key={`key,${day[0]},${dayIndex}`}
                        android_ripple={{ color: colors.blueBar, borderless: false }}
                        style={({ pressed }) => [
                          styles.squaredTouchable,
                          // sfondo solo se area premuta, altrimenti sfondo trasparente
                          { backgroundColor: pressed ? colors.dot32 : 'transparent' }
                        ]}
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}


                        // ON PRESS
                        onPress={() => {
                          if (day[2] != undefined) {
                            if (day[1] > 0) {
                              // Check if this is a repeatOnDay event by matching description
                              const matchingEvent = newPersonalHolydays.find(
                                (event: any) => event.description === day[2] && event.repeatOnDay === true
                              );

                              // For repeatOnDay events, show recurrence pattern instead of specific date
                              let displayDescription = matchingEvent
                                ? formatRecurrencePattern(day[0], myLanguage, localizedDays, localizedMonths)
                                : day[0].toLocaleDateString(myLanguage, { day: "numeric", month: 'long', year: "numeric" });

                              // VERIFICA SE E' UNA FESTIVITA NAZIONALE FISSA
                              let isFixedNational = false;
                              if (myPreferences.festivitaNazionali.status) {
                                const fixedHolidays = getLocalHolydas(myCountry);
                                const matchIndex = fixedHolidays.findIndex((h: any) => h.day === day[0].getUTCDate() && h.month === day[0].getUTCMonth());

                                if (matchIndex !== -1 && !nationalExcluded.includes(matchIndex)) {
                                  isFixedNational = true;
                                }
                              }

                              if (isFixedNational) {
                                // Aggiunge la stringa "Festività nazionale: PAESE" 
                                displayDescription += `\n(${chunkDataLabel(myLanguage, 7)}: ${getCountryName(myCountry)})`;
                              }

                              // HOLYDAY TOAST - dispatch singola invece di 10 setState
                              dispatchToast({
                                type: 'SHOW_HOLYDAY_TOAST',
                                payload: {
                                  day,
                                  title: day[2],
                                  description: displayDescription,
                                  colors
                                }
                              });
                              setToastBody(
                                <HolydayToast
                                  id={day} // passo anche l'intero record -> day[0], day[1], day[2], day[3] 
                                  title={day[2]}
                                  description={displayDescription} />
                              );
                            } else {
                              /* MODAL/SimpleToast --> POSSIBILE PONTE */
                              let bridgeDescription: string = '';
                              // initialize with a safe default (the tapped day) so variables are always assigned
                              let bridgeStartAt: Date = day[0];
                              let bridgeEndsAt: Date = day[0];
                              month.bridges.forEach((interval: any, index: number) => {
                                if (isWithinInterval(day[0], { start: interval.da, end: interval.a })) {
                                  if (interval.length > 1) {
                                    bridgeDescription += dataLabel(myLanguage, 4); // Dal
                                    bridgeDescription += interval.da.toLocaleDateString(myLanguage, { day: "numeric", month: 'long', year: "numeric" })
                                    bridgeDescription += dataLabel(myLanguage, 5); // fino al
                                    bridgeDescription += interval.a.toLocaleDateString(myLanguage, { day: "numeric", month: 'long', year: "numeric" })
                                    bridgeDescription += ' (' + interval.length + dataLabel(myLanguage, 6); // giorni
                                    // PRIMO E ULTIMO GIORNO DEL PONTE (DA PASSARE AL CALENDARIO)
                                    bridgeStartAt = month.bridges[index].da;
                                    bridgeEndsAt = month.bridges[index].a;
                                  } else {
                                    bridgeDescription += dataLabel(myLanguage, 7); // Il
                                    bridgeDescription += interval.da.toLocaleDateString(myLanguage, { day: "numeric", month: 'long', year: "numeric" })
                                    bridgeDescription += dataLabel(myLanguage, 8); // (1 giorno)
                                    // UNICO GIORNO DEL PONTE (DA PASSARE AL CALENDARIO)
                                    bridgeStartAt = bridgeEndsAt = interval.da;
                                  }
                                }
                              });
                              // BRIDGE TOAST - dispatch singola invece di 9 setState
                              dispatchToast({
                                type: 'SHOW_BRIDGE_TOAST',
                                payload: {
                                  day,
                                  title: day[2],
                                  description: bridgeDescription,
                                  bridgeStart: bridgeStartAt,
                                  bridgeEnds: bridgeEndsAt,
                                  colors
                                }
                              });
                              setToastBody(
                                <BridgeToast
                                  id={day}
                                  title={day[2]}
                                  description={bridgeDescription}
                                  bridgeStart={bridgeStartAt}
                                  bridgeEnds={bridgeEndsAt}
                                />);
                            }
                          }
                        }
                        }

                        // ON LONG-PRESS
                        delayLongPress={500}
                        onLongPress={() => {
                          // LA CHIAMATA ALLA DROPDOWN VIENE FATTA SOLO SE:
                          // -> NON PONTE (day[1] = -1) E NON FESTIVO (day[2] vuoto) 
                          // NON PARTE LA CHIAMATA SE:
                          //  1) FESTIVO CON DESCRIZIONE (es. festivita nazionale o inserito da utente)
                          //  2) PONTE                          
                          if (day[1] !== -1 && day[2] === undefined) {
                            setGoBack('index'); // goBack == 'index': CHIAMATA PROVIENE DA CALENDAR
                            handleGoToHolydays(day[0], 'newItem');
                          }
                        }}
                      >
                        {day[2] && day[1] !== -1 ? // se cell[2] non è vuota ma cell[1] != -1 : festivita
                          <View
                            key={`redcircle.${day[0].toISOString()}.${dayIndex}`}
                            style={[StyleSheet.absoluteFill, styles.redCircle]} />
                          :
                          day[1] === -1 ? // se cell[2] non è vuota ma cell[1] = -1 : ponte
                            <View
                              key={`yellowcircle.${day[0].toISOString()}.${dayIndex}`}
                              style={[StyleSheet.absoluteFill, styles.yellowCircle]} />
                            :
                            null
                        }
                        <Text
                          style={[
                            styles.dayNumber,
                            // SE day[2] (ESISTE DESCRIZIONE) 
                            day[2] ?
                              // + SE day[1]>0 = SOLO FESTIVITA
                              day[1] === 1 ?
                                [styles.dayNumberHoliday, styles.dayNumberBold, { color: colors.textRed }]
                                :
                                // SE day[1] DIVERSO DA 1 (E SE day[2] ESISTE NON PUO' CHE ESSERE -1) = PONTE
                                [styles.dayNumberBridge, styles.dayNumberBold, { color: colors.white }]
                              :
                              // ALTRIMENTI SE NON ESISTE day[2] DESCRIZIONE
                              // day[1] =1 FESTIVO
                              day[1] === 1 ?
                                [styles.dayNumberHoliday, styles.dayNumberBold]
                                :
                                // day[1] != \ GIORNO NORMALE
                                [styles.dayNumber,]
                          ]}
                        >
                          {day[0].getUTCDate()}
                        </Text>
                      </Pressable>
                    }
                  </View>
                );
              })
              }
            </View>
          </View>
        </View>

        {/* GOOGLE ADMOB SOLO SE isAdvertising = true
            -----------------------------------------------------------
            OGNI 3 MESI SI ALTERNANO BANNER QUADRATI (MEDIUM_RECTANGLE)
        */}
        {isAdvertising && (adUnitId !== undefined) &&

          (index + 1) % monthsToLoad === 0 && (

            <View style={[styles.advContainer, { width: '100%', alignItems: 'center', }]}>
              <Text style={{ fontSize: 10, color: colors.disabled, marginBottom: 8 }}>ADV</Text>
              <BannerAd
                ref={bannerRef}
                unitId={adUnitId}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                onAdLoaded={() => console.log('Banner Ad caricato!')}
                onAdFailedToLoad={(error) => console.error('Errore caricamento Banner:', error)} />
            </View>

          )

        }
      </React.Fragment>
    );

  }, [
    localizedMonths,
    localizedDays,
    myLanguage,
    myCountry,
    myPreferences,
    nationalExcluded,
    newPersonalHolydays,
    colors
  ]);

  /* ---------------------------------------------------------------┐ 
    (CALLBACK) RENDER FOOTER
  └---------------------------------------------------------------- */
  const renderFooter = useCallback(() => {

    // NON MOSTRARE SE NON E' IN FASE DI CARICAMENTO E CI SONO ANCORA DATI
    if (!isLoading && hasMore) return null;

    // SE E' IN FASE DI CARICAMENTO MOSTRA CARICAMENTO...
    if (isLoading && calendarData.length > 0) {
      return (
        <View style={[styles.loadingIndicatorContainer, { backgroundColor }]}>
          <ActivityIndicator size="small" color={Colors.light.tint} />
          <Text style={styles.loadingIndicatorText}>Loading...</Text>
        </View>
      );
    } else if (!hasMore && !isLoading && calendarData.length > 0) {
      // SE NON STA CARICANDO E NON CI SONO ALTRI DATI
      return (
        <Text style={styles.endOfContentText}>End of list</Text>
      );
    }
    return null;
  }, [isLoading, hasMore, calendarData.length, backgroundColor]);

  const keyExtractor = useCallback((item: any, index: number) => `${item.y}-${item.m}-${index}`, [])

  // FLATLIST
  return (
    <>
      <FlatList
        style={[styles.fltList, { paddingTop: 84, }]}
        data={calendarData}
        renderItem={renderMonthCard}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.25} // FA INTERVENIRE loadMoreCalendarData QUANDO SI ARRIVA AL 50% DELLA FINE
        onEndReached={() => loadMoreCalendarData(
          myCountry,
          newPersonalHolydays,
        )}
        ListEmptyComponent={() => ( // DA VISUALIZZA CON LA LISTA VUOTA:
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
            <Text style={styles.loadingText}>...</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        initialNumToRender={monthsToLoad - 1} // Render initial number of items
        maxToRenderPerBatch={monthsToLoad - 1} // How many items to render in a batch
        windowSize={2} // QUANTI ELEM. RENDERIZZATI FUORI DALLA SCHERM. VISIBILE
        scrollEventThrottle={16}           // ← Migliora la fluidità dello scroll
        removeClippedSubviews={true}       // ← Ottimizza le performance // VA IN CONFLITTO CON IL TOAST
        // keyboardShouldPersistTaps="handled" // ← Migliora la gestione dei touch
        disableIntervalMomentum={true}     // ← Scroll più reattivo
        decelerationRate="normal"          // ← Decelerazione naturale
        bouncesZoom={false}               // ← Disabilita zoom accidentali
      />

      {/* SimpleToast */}
      <Suspense>
        <SimpleToast
          isSTVisible={toastState.visible}
          isSTPosition={toastState.position}
          isSTBackground={toastState.background}
          isOverlayBackground={toastState.overlayBackground}
          isSTRadius={toastState.radius}
          isSTpaddingFromTop={toastState.paddingTop}
          isSTpaddingFromBottom={toastState.paddingBottom}
          isSTBody={toastBody}
          isSTAnimation={toastState.animation}
          onClose={() => dispatchToast({ type: 'HIDE_TOAST' })}
        />
      </Suspense>
    </>
  );
};

export { CalendarScreen };