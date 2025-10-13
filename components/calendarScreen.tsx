console.log('<CALENDARSCREEN>');

import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import useLocalizationData from '@/app/data/data';
import { createCalendarGrid, createUTCDate } from '@/components/calendarUtils';
import { IconSymbol } from '@/components/ui/IconSymbol';
import SimpleToast from '@/components/ui/SimpleToast';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { addMonths, isWithinInterval } from "date-fns";
import * as Calendar from 'expo-calendar'; // ACCESSO AL CALENDARIO DI SISTEMA
import { calendarScrenLabels as dataLabel } from '@/components/dataLabel';
import { useNavigation } from '@react-navigation/native';

const { localizedDays } = useLocalizationData(); // RICEVE I NOMI DEI GIORNI LOCALIZZATI
const { months: localizedMonths} = useLocalizationData(); // RICEVE I NOMI DEI MESI LOCALIZZATI


// INTERFACCIA DI NewHolyday 
interface NewHolyday {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;  // RIPETE OGNI ANNO, IL 25 settembre 
  repeatOnDay: boolean;   // RIPETE OGNI ANNO, il primo martedì di settembre
}

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const spaceAbove = Platform.OS === 'ios' ? 70 : 0;

/* ============================================================================= 
CALENDARSCREEN - print calendario
============================================================================= */
const CalendarScreen = ({callerPreferences}: any) => {

  const colors = useThemeColors();
  const isAdvertising: boolean = true; // SE ATTIVA CAMPAGNA AdMob
  const monthsToLoad = 3; // ADV OGNI x CARDS

  const { 
    newPersonalHolydays,
    nationalExcluded,
    myPreferences, 
    myCountry, 
    myLanguage
  } = useHolydays();

  // CONTROLLO PRIVILEGI ACCESSO AL CALENDARIO
  useEffect(() => {
  (async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    })();
  }, []);

  // PARAMETRI INTERFACCIA SIMPLETOAST (ST)
  const [visibleToast, setVisibleToast] = useState<boolean>(false);
  const [toastPosition, setToastPosition] = useState<'top' | 'center' | 'bottom'>('center');
  const [toastBackground, setToastBackground] = useState<string>('');
  const [overlayBackground, setOverlayBackground] = useState<string>('');
  const [toastRadius, setToastRadius] = useState<number | number[] | undefined>([0, 0, 0, 0]);
  const [paddingFromTop, setPaddingFromTop] = useState<number>(0);
  const [paddingFromBottom, setPaddingFromBottom] = useState<number>(0);
  const [toastBody, setToastBody] = useState<React.ReactNode>('');
  const [toastAnimation, setToastAnimation] = useState<'none' | 'slide' | 'fade'>('slide');
  const [toastOnClose, setToastOnClose] = useState();
  const [calendarData, setCalendarData] = useState([]);
  
  // SEGNA LA DATA DI PARTENZA PER IL PROSSIMO BLOCCO DI MESI DA CALCOLARE  
  const [currentLoadDate, setCurrentLoadDate] = useState(() => createUTCDate(new Date().getFullYear(), new Date().getMonth() , 1));

  // TOGGLE CARICAMENTO... --> OFF
  const [isLoading, setIsLoading] = useState(false); 
  
  // RIFERIMENTO UNIVOCO ALLA FLATLIST
  const flatListRef = useRef(null); 

  // C'E' ALTRO DA CARICARE? (default: true)
  const [hasMore, setHasMore] = useState(true); 
  
  // BACKGROUNDCOLOR (MESSO QUI = DIVENTA GLOBALE)
  const backgroundColor = useThemeColor({}, 'background');

  // STYLESHEET
  const styles = StyleSheet.create({
    fltList:{
      flex:1,
      backgroundColor: 'transparent', 
      maxWidth: 600, // CENTRATO SU TABLET
    },
    card: {
      flex:1,
      paddingTop: 24,
      paddingBottom: 16,
      paddingLeft:16,
      paddingRight:16,
      marginTop: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      borderWidth: 0,
    },
    monthTitle: {
      fontSize: 16,
      fontWeight: 600,
      paddingLeft:24,
      color: colors.headerText,
      marginBottom: 4,
      textAlign: 'left',
    },
    yearTitle: {
      fontSize: 20,
      paddingLeft:24,
      fontWeight: 300,
      color: colors.disabled,
      marginBottom: 24,
      textAlign: 'left',
    },
    weekDaysHeader: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      borderBottomColor: colors.disabled,
      paddingBottom: 12,
      marginBottom: 5,
    },
    weekDayText: {
      width: `${100 / 7}%`,
      textAlign: 'center',
      color: colors.disabled,
      fontSize: 12,
    },    
    // LABEL PONTI TROVATI
    bridgeYellowLabel: {
      marginRight:-16,
      paddingHorizontal:16,
      paddingVertical:4,
      borderTopLeftRadius:24,
      borderBottomLeftRadius:24,
      backgroundColor: colors.bridgeBackground,
      elevation:6,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 1,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 2 // Match elevation for iOS
    },
    cardLabelBridgeFound: {
      fontSize:13,
      fontWeight:600,
      color: colors.white,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'transparent',
    },
    dayCell: {
      width: `${parseInt(100 / 7)}%`,
      minHeight: 60, 
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative', // Importante per il positioning dei connettori
    },
    dayCellOutsideMonth: {
      backgroundColor: colors.outsideMonth,
      opacity: 0.25,
    },
    dayCellBridge: {
      backgroundColor: 'green',
      borderRadius: 0,
      borderWidth: 0,
      borderColor: colors.bridgeBackground,
    },
    dayNumber: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    dayNumberSunday: {
      color: colors.textRed,
    },
    dayNumberSaturday: {
      color: colors.textRed,
    },
    dayNumberHoliday: {
      color: colors.textRed,
    },
    dayNumberBridge: {
      color: colors.bridgeDay,
      fontWeight: 600,
      paddingHorizontal: 4,
      paddingVertical: 2,
    },
    dayNumberBold: {
      fontWeight: 800,
    },
    adBanner: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text,
      minHeight: 48,
      //marginTop: 48, marginBottom:36,
      //padding: 15,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 50,
    },
    loadingText: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
      color: colors.tint,
    },
    loadingIndicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      backgroundColor: colors.disabled,
      marginHorizontal: 10,
      borderRadius: 8,
      marginBottom: 0,
    },
    loadingIndicatorText: {
      marginLeft: 10,
      color: colors.text,
    },
    endOfContentText: {
      textAlign: 'center',
      paddingVertical: 20,
      color: colors.disabled,
      fontSize: 14,
      fontStyle: 'italic',
    },
    redCircle: {
      position:'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateY: '-50%' }, { translateX: '-50%' }],
      width:36,
      height:36,
      borderWidth:2,
      borderColor: colors.textRed,
      borderRadius: 36,
      },
    yellowCircle: { // NON E' PIU YELLOW MA BLUE... ;-)
      position:'absolute',
      width:36,
      height:36,
      left: '50%',
      top: '50%',
      transform: [{ translateY: '-50%' }, { translateX: '-50%' }],
      backgroundColor: colors.bridgeBackground,
      borderRadius: 48,
      elevation:6,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 1,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.25,
      shadowRadius: 4 // Match elevation for iOS
      },
    yellowBadge: {
      position:'absolute',
      top:'20%', 
      right:'20%',
      height:6, 
      width:6,
      borderRadius:'100%',
      backgroundColor: '#ffffff66',
    },
    squaredTouchable: {
      position: 'absolute',
      width:'99%', height:'100%', 
      borderRadius:999,
      backgroundColor:'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    yellowToast: {
      marginTop: spaceAbove,
      width:'90%',
      minHeight: 180,
      backgroundColor: colors.white, 
      padding: 24, 
      borderRadius: 12,
      elevation:12, 
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 0,
        height: 12, // Match elevation for iOS
      },
      shadowOpacity: 0.25,
      shadowRadius: 12 // Match elevation for iOS
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      paddingVertical: 10,
      paddingHorizontal:20,
      maxHeight:46,
      backgroundColor: colors.cancelButton,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent:'center',
      width:'auto',
      marginRight: 4,
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },    
    addButton: {
      flex: 1,
      flexDirection:'row',
      padding: 10,
      maxHeight:46,
      backgroundColor: colors.bridgeBackground,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent:'center',
      alignContent:'center',
      marginLeft: 4,
    },
    addButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const navigation = useNavigation();

  const handleGoToHolydays = (date: Date, typ: string) => {
    const dateString = date.toISOString(); 
    navigation.navigate(
      'holydays' as never, 
      {date: dateString, typ: typ} as never, 
      );
  };

  /* ============================================================================= 
  (CALLBACK) AGGIUNGE MESI AL CALENDARIO
  MEMORIZZA - E NON RICALCOLA - IL RISULTATO DELLA FUNZIONE FINCHE' NON CAMBIA 
  IL VALORE DI UNA DIPENDENZA: isLoading, hasMore, currentLoadDate, monthsToLoad, PREFERENCES.bridgeDuration
  ============================================================================= */
  const loadMoreCalendarData = useCallback( async (
    myCountry: string,
    newPersonalHolydays: NewHolyday[],
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
          newPersonalHolydays,
          myCountry,
          myPreferences, 
          nationalExcluded,
        );

        // AGGIUNGE LA GRID AL CALENDARIO
        setCalendarData( prevData => [...prevData, ...newMonthsData] );

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
  }, [ isLoading, hasMore, currentLoadDate, monthsToLoad, callerPreferences, myPreferences ]);

  /* ============================================================================= 
    (USEEFFECTS) GESTISCE GLI EFFETTI COLLATERALI DEL CAMBIO DI 'PREFERENCES'
  ============================================================================= */
  useEffect( () => {
    if (callerPreferences) {
      const startDate = createUTCDate(new Date().getFullYear(), new Date().getMonth(), 1); 
    
      setCalendarData([]); // SVUOTA calendarData

      setCurrentLoadDate(startDate); 

      setCalendarData(
        createCalendarGrid(
          startDate, 
          monthsToLoad,
          callerPreferences.bridgeDuration,
          newPersonalHolydays,
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

  /* ============================================================================= 
    (CALLBACK) RENDER DELLE CARD DELLA FLATLIST
        determina il tipo di giorno (festivo, sabato, domenica, ponte, feriale).
        1 (Festivo), -1 (Ponte), undefined (Feriale). 
        true o false se il giorno è interno al mese
        l'array finale sarà come questo esempio:
        day[0]                      day[1]    day[2]            day[3]
        2025-05-26T12:00:00.000Z,   1,        "Ferragosto",     false],
  ============================================================================= */
  const renderMonthCard = useCallback(({ item: month, index }) => {

    /* -----------------------------------------------------
    MODAL CHE MOSTRA UN GIORNO FESTIVO (usa SimpleToast.tsx)
    ----------------------------------------------------- */
    interface HolydayToastInterface {
      title: string;
      description: string;
    }
    const HolydayToast: React.FC<HolydayToastInterface> = ({title, description}) => {
      return (
      <View style={{
        width:'100%', 
        flexDirection:'row', 
        gap:8, 
        alignItems:'flex-start', 
        justifyContent:'space-between'
        }}>
        <View style={{flex:1, flexDirection:'row', gap:8, alignContent:'flex-start', }}>
          <IconSymbol name="calendar" size={28} color={colors.black} />
          <View style={{flex:1, }}>
            <Text style={[styles.monthTitle, {color: colors.black, textAlign:'left', paddingLeft:0} ]}>{title}</Text>
            <Text style={[styles.dayNumber, {color: colors.black, textAlign:'left', }]}>{description}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setVisibleToast(false)}>
          <IconSymbol name="multiply" size={28} color={colors.black} />
        </TouchableOpacity>
      </View>
      )
    }
    
    /* -----------------------------------------------------
    MODAL CHE MOSTRA UN POSSIBILE PONTE (usa SimpleToast.tsx)
    ------------------------------------------------------ */
    interface BridgeHolydayInterface {
      title: string;
      description: string;
      bridgeStart: Date;
      bridgeEnds: Date;
    }

    const BridgeToast: React.FC<BridgeHolydayInterface> = ({title, description, bridgeStart, bridgeEnds}) => {
      return (
        <View style={{width:'100%', flexDirection:'column', }}>
          <View style={{ width:'100%', flexDirection:'row', justifyContent:'flex-start', }}>
            <Image 
              source={require('@/assets/images/icon_girl-off.png')}
              style={{width:48, height:48, resizeMode:'contain', marginRight: 16}}
            />
            <View style={{ flex:1, }}>
              <Text style={[styles.monthTitle, {color: colors.black, paddingLeft:0}]}>{dataLabel(myLanguage, 9)}</Text> 
              { title && <Text style={[styles.dayNumber, { color: colors.black, lineHeight: 22, textAlign:'left'}]}>
                {description}
                </Text> }
            </View>
          </View>

          {/* PULSANTI ANNULLA/AGGIUNGI */}
          <View style={[styles.modalButtons, {marginTop:24}]}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setVisibleToast(false)}>
              <Text style={styles.cancelButtonText}>{dataLabel(myLanguage, 10)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton} 
                onPress={ async () => {
                  try {
                    const eventDetails = {
                      title: dataLabel(myLanguage, 0),    // Ponte!
                      startDate: bridgeStart,
                      endDate: bridgeEnds,
                      notes: dataLabel(myLanguage, 1),    // PontiVIA! ha trovato questo ponte ecc..
                      allDay: false,
                    };
                    await Calendar.createEventInCalendarAsync(eventDetails);
                    } catch (e) {
                      console.error('Errore durante l\'apertura del calendario:', e);
                    } finally {
                      setVisibleToast(false);
                    }
                }}
              >
              <Text style={styles.addButtonText}>{dataLabel(myLanguage, 11)} </Text><IconSymbol name="calendar.badge.plus" size={24} color={colors.white} />
            </TouchableOpacity>
          </View> 
        </View>
      )
    }

    return (    
      <React.Fragment key={`${month.y}-${month.m}-${index}`}>
        <View style={styles.card}>
          
          <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', }}>

            {/* BLOCCHETTO MESE/ANNO */}
            <View>
              <Text style={styles.monthTitle}>
                {localizedMonths[month.m - 1].label.charAt(0).toUpperCase() + localizedMonths[month.m - 1].label.slice(1)}
              </Text>
              <Text style={styles.yearTitle}>{month.y}</Text>
            </View>

            {/* LABEL PONTI TROVATI */}
            <View>
              {month.bridges.length > 0 ? 
                <View style={styles.bridgeYellowLabel}>
                  <Text style={styles.cardLabelBridgeFound}>{month.bridges.length} {month.bridges.length > 1 ? dataLabel(myLanguage, 2) : dataLabel(myLanguage, 3)}</Text>
                </View>
                :
                null
              }
            </View>
          </View>

          {/* INIZIALI GIORNI DELLA SETTIMANA */}
          <View style={styles.weekDaysHeader}>
            {localizedDays.map((dayName, i) => (
                <Text key={i} style={styles.weekDayText}>{dayName.substring(0,2).toUpperCase()}</Text>
            ))}
          </View>
          
          {/* DOPPIO FILETTO */}
          <View style={{width:'100%', height: 1, backgroundColor: 'rgba(0,0,0,.05)', marginBottom: 0, }}></View>
          <View style={{width:'100%', height: 1, backgroundColor: colors.white, marginBottom: 12, }}></View>
          
          {/* INTERNO DELLA CARD */}
          <View style={{borderBottomLeftRadius: 16, borderBottomRightRadius: 16, overflow: 'hidden'}}>
            <View style={styles.daysGrid}>
              {month.table.map((day: any, dayIndex: number) => {
                return (
                  <View key={`day-container-${day[0]}-${dayIndex}`} style={styles.dayCell}>
                    {/* 1) SE NON ESISTE day[3] E' GIORNO ESTERNO AL MESE E NON SI STAMPA */}
                    {/* 2) TUTTI I GIORNI SONO TOUCHABLEOPACITY MA... */}
                    {day[3] &&
                      <Pressable 
                        key={`key,${day[0]},${dayIndex}`}
                        android_ripple={{ color: colors.blueBar, borderless: false }}
                        style={({pressed}) => [
                          styles.squaredTouchable,
                          {backgroundColor: pressed ? colors.dot32 : 'transparent'}
                          ]}
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}

                        // ON PRESS
                        onPress={ () => {
                            console.log('--> onPressIn');
                              if (day[2] != undefined) {
                                if (day[1] > 0) {
                                  setToastPosition('center');
                                  setToastBackground('rgba(255, 255, 255, 1)'); // SFONDO TOAST
                                  setOverlayBackground('rgba(50, 50, 50, 0.05)') // COLORE OVERLAY
                                  setToastRadius([12,12,12,12]); // STONDATURA
                                  setPaddingFromTop(48); // MARGINE TOP
                                  setPaddingFromBottom(48); // MARGINE BOTTTOM
                                  setToastAnimation('fade');
                                  setToastBody( 
                                    <HolydayToast 
                                      title={day[2]} 
                                      description={day[0].toLocaleDateString(myLanguage, {day: "numeric", month: 'long', year: "numeric"})} />
                                  );
                                  setToastOnClose(undefined); 
                                  setVisibleToast(true); 
                                } else {
                                  /* MODAL/SimpleToast --> POSSIBILE PONTE */
                                  let bridgeDescription: string = '';
                                  let bridgeStartAt: Date;
                                  let bridgeEndsAt: Date;
                                  month.bridges.forEach( (interval: any, index: number) => {
                                    if (isWithinInterval(day[0], {start: interval.da, end: interval.a})) {
                                      if (interval.length > 1) {
                                        bridgeDescription += dataLabel(myLanguage, 4); // Dal
                                        bridgeDescription += interval.da.toLocaleDateString(myLanguage, {day: "numeric", month: 'long', year: "numeric"})
                                        bridgeDescription += dataLabel(myLanguage, 5); // fino al
                                        bridgeDescription += interval.a.toLocaleDateString(myLanguage, {day: "numeric", month: 'long', year: "numeric"})
                                        bridgeDescription += ' (' + interval.length + dataLabel(myLanguage, 6); // giorni
                                        // PRIMO E ULTIMO GIORNO DEL PONTE (DA PASSARE AL CALENDARIO)
                                        bridgeStartAt = month.bridges[index].da;
                                        bridgeEndsAt = month.bridges[index].a;
                                      } else {
                                        bridgeDescription += dataLabel(myLanguage, 7); // Il
                                        bridgeDescription += interval.da.toLocaleDateString(myLanguage, {day: "numeric", month: 'long', year: "numeric"})
                                        bridgeDescription += dataLabel(myLanguage, 8); // (1 giorno)
                                        // UNICO GIORNO DEL PONTE (DA PASSARE AL CALENDARIO)
                                        bridgeStartAt = bridgeEndsAt = interval.da;
                                      }
                                } 
                                });
                                setVisibleToast(true); 
                                setToastPosition('center');
                                setToastBackground('rgba(255, 255, 255, 1)'); // SFONDO TOAST
                                setOverlayBackground('rgba(50, 50, 50, 0.05)'); // COLORE OVERLAY
                                setToastRadius([12,12,12,12]); // STONDATURA
                                setPaddingFromTop(48); // MARGINE TOP
                                setPaddingFromBottom(48); // MARGINE BOTTTOM
                                setToastBody( 
                                <BridgeToast 
                                  title={day[2]}
                                  description={bridgeDescription}
                                  bridgeStart={bridgeStartAt}
                                  bridgeEnds={bridgeEndsAt}
                                />);
                                setToastAnimation('fade');
                                setToastOnClose(undefined); 
                              }
                            }
                          }
                        }

                        // ON LONG-PRESS
                        delayLongPress={900}
                        onLongPress={ () => {
                          if (day[1] === undefined) { // SOLO SE FERIALE
                            // console.log('--> onLongPress');
                            handleGoToHolydays(day[0], 'newItem');
                          } 
                        }}
                        >
                          {day[2] && day[1] !== -1 ? // se cell[2] non è vuota ma cell[1] != -1 : festivita
                            <View 
                            key={`redcircle.${day[0].toISOString()}.${dayIndex}`}
                            style={[ StyleSheet.absoluteFill, styles.redCircle ]} />
                          :
                            day[1] === -1 ? // se cell[2] non è vuota ma cell[1] = -1 : ponte
                              <View 
                              key={`yellowcircle.${day[0].toISOString()}.${dayIndex}`}
                              style={[ StyleSheet.absoluteFill, styles.yellowCircle ]} />
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
                                [styles.dayNumberHoliday, styles.dayNumberBold, {color: colors.textRed}]
                                :
                                // SE day[1] DIVERSO DA 1 (E SE day[2] ESISTE NON PUO' CHE ESSERE -1) = PONTE
                                [styles.dayNumberBridge, styles.dayNumberBold, {color: colors.white}]
                              :
                              // ALTRIMENTI SE NON ESISTE day[2] DESCRIZIONE
                              // day[1] =1 FESTIVO
                              day[1] === 1 ?
                                [styles.dayNumberHoliday, styles.dayNumberBold]
                                :
                                // day[1] != \ GIORNO NORMALE
                                [styles.dayNumber, ]
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
      
        {/* GOOGLE ADMOB SOLO SE isAdvertising = true*/}
        {isAdvertising && 
          ((index +1)  % monthsToLoad === 0) && (
            <View style={[styles.adBanner, {borderWidth:0}]} />
          )
        }
      </React.Fragment>
    );
    
  }, []);

  /* ============================================================================= 
    (CALLBACK) RENDER FOOTER
  ============================================================================= */
  const renderFooter = useCallback(() => {

    // NON MOSTRARE SE NON E' IN FASE DI CARICAMENTO E CI SONO ANCORA DATI
    if (!isLoading && hasMore) return null; 

    // SE E' IN FASE DI CARICAMENTO MOSTRA CARICAMENTO...
    if (isLoading && calendarData.length > 0) {
      return (
        <View style={[styles.loadingIndicatorContainer, {backgroundColor}]}>
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

  const keyExtractor = useCallback((item: any, index: number) => `${item.y}-${item.m}-${index}` ,[])

  // FLATLIST
  return (
    <>
      <FlatList
        style={[styles.fltList, {paddingTop:84,}]}
        data={calendarData}
        renderItem={renderMonthCard}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.25} // FA INTERVENIRE loadMoreCalendarData QUANDO SI ARRIVA AL 50% DELLA FINE
        onEndReached={ () => loadMoreCalendarData(
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
        initialNumToRender={monthsToLoad-1} // Render initial number of items
        maxToRenderPerBatch={monthsToLoad-1} // How many items to render in a batch
        windowSize={2} // QUANTI ELEM. RENDERIZZATI FUORI DALLA SCHERM. VISIBILE
        scrollEventThrottle={16}           // ← Migliora la fluidità dello scroll
        removeClippedSubviews={true}       // ← Ottimizza le performance // VA IN CONFLITTO CON IL TOAST
        // keyboardShouldPersistTaps="handled" // ← Migliora la gestione dei touch
        disableIntervalMomentum={true}     // ← Scroll più reattivo
        decelerationRate="normal"          // ← Decelerazione naturale
        bouncesZoom={false}               // ← Disabilita zoom accidentali
      />

      {/* SimpleToast ###################################################################### */}
      <Suspense>
        <SimpleToast
          isSTVisible={visibleToast}
          isSTPosition={toastPosition}
          isSTBackground={toastBackground}
          isOverlayBackground={overlayBackground}
          isSTRadius={toastRadius}
          isSTpaddingFromTop={paddingFromTop}
          isSTpaddingFromBottom={paddingFromBottom}
          isSTBody={toastBody}
          isSTAnimation={toastAnimation}
          onClose={ () => setVisibleToast(false) }
        />
      </Suspense>


    </>
  );
};

export { CalendarScreen };