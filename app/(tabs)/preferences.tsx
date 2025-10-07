console.log('[PREFERENCES.TSX]');

import useLocalizationData from '@/app/data/data';
import DropdownComponent from '@/components/ui/DropdownComponent'; // DROPDOWN DURATA PONTI
// import DropdownFDOW from '@/components/ui/DropdownFDoW'; // DROPDOWN GIORNO SETTIMANA --- moment. disabled
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Suspense, useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { getLocales,  } from 'expo-localization';
import { dataLabel as switchNames } from '@/components/dataLabel';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  } from 'react-native';

const { localizedDays } = useLocalizationData();
const myLanguage = (getLocales()[0].languageTag).slice(0,2);
// const dataLabel: any = {
//   'it': [
//     'Imposta i tuoi filtri',
//     'Durata del ponte',
//     'Primo giorno della settimana',
//     'Giorni della settimana festivi',
//     'Altri giorni festivi',
//     'Modifica lista',
//     'Festività religiose',
//   ],
//   'fr': [
//     'Configurez vos filtres',                    // 0
//     'Durée du pont',                             // 1
//     'Premier jour de la semaine',                // 2
//     'Jours fériés de la semaine',                // 3
//     'Autres jours fériés',                       // 4
//     'Modifier la liste',                         // 5
//     'Fêtes religieuses',                         // 6
//   ],
//   'es': [
//     'Configura tus filtros',                     // 0
//     'Duración del puente',                       // 1
//     'Primer día de la semana',                   // 2
//     'Días festivos de la semana',                // 3
//     'Otros días festivos',                       // 4
//     'Editar lista',                              // 5
//     'Festividades religiosas',                   // 6
//   ],
//   'de': [
//     'Stellen Sie Ihre Filter ein',               // 0
//     'Dauer der Brücke',                          // 1
//     'Erster Tag der Woche',                      // 2
//     'Feiertage der Woche',                       // 3
//     'Andere Feiertage',                          // 4
//     'Liste bearbeiten',                          // 5
//     'Religiöse Feiertage',                       // 6
//   ],
//   'en': [
//     'Set your filters',                          // 0
//     'Bridge duration',                           // 1
//     'First day of the week',                     // 2
//     'Weekly holidays',                           // 3
//     'Other holidays',                            // 4
//     'Edit list',                                 // 5
//     'Religious holidays',                        // 6
//   ],
//   'nl': [
//     'Stel je filters in',                        // 0
//     'Duur van de brug',                          // 1
//     'Eerste dag van de week',                    // 2
//     'Weekdagen feestdagen',                      // 3
//     'Andere feestdagen',                         // 4
//     'Lijst bewerken',                            // 5
//     'Religieuze feestdagen',                     // 6
//   ],
//   'pt': [
//     'Configure seus filtros',                    // 0
//     'Duração da ponte',                          // 1
//     'Primeiro dia da semana',                    // 2
//     'Dias feriados da semana',                   // 3
//     'Outros feriados',                           // 4
//     'Editar lista',                              // 5
//     'Feriados religiosos',                       // 6
//   ],
//   'hr': [
//     'Postavi svoje filtrove',                    // 0
//     'Trajanje mosta',                            // 1
//     'Prvi dan u tjednu',                         // 2
//     'Praznici u tjednu',                         // 3
//     'Ostali praznici',                           // 4
//     'Uredi listu',                               // 5
//     'Vjerski praznici',                          // 6
//   ],
//   'si': [
//     'Nastavi svoje filtre',                      // 0
//     'Trajanje mosta',                            // 1
//     'Prvi dan v tednu',                          // 2
//     'Tedni prazniki',                            // 3
//     'Ostali prazniki',                           // 4
//     'Uredi seznam',                              // 5
//     'Verski prazniki',                           // 6
//   ],
//   'gr': [
//     'Ρύθμισε τα φίλτρα σου',                     // 0
//     'Διάρκεια γέφυρας',                          // 1
//     'Πρώτη μέρα της εβδομάδας',                  // 2
//     'Αργίες της εβδομάδας',                      // 3
//     'Άλλες αργίες',                              // 4
//     'Επεξεργασία λίστας',                        // 5
//     'Θρησκευτικές γιορτές',                      // 6
//   ]
// };
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

export const PREFERENCES = {
  domenica:           { status: true, label: localizedDays[6].charAt(0).toUpperCase() + localizedDays[6].slice(1) },
  sabato:             { status: true, label: localizedDays[5].charAt(0).toUpperCase() + localizedDays[5].slice(1) },
  venerdi:            { status: false, label: localizedDays[4].charAt(0).toUpperCase() + localizedDays[4].slice(1) },
  giovedi:            { status: false, label: localizedDays[3].charAt(0).toUpperCase() + localizedDays[3].slice(1) },
  mercoledi:          { status: false, label: localizedDays[2].charAt(0).toUpperCase() + localizedDays[2].slice(1) },
  martedi:            { status: false, label: localizedDays[1].charAt(0).toUpperCase() + localizedDays[1].slice(1) },
  lunedi:             { status: false, label: localizedDays[0].charAt(0).toUpperCase() + localizedDays[0].slice(1) },
  pasqua:             { status: true, label: switchNames(myLanguage,0) },
  lunediDellAngelo:   { status: true, label: switchNames(myLanguage,1) },
  ascensione:         { status: false, label: switchNames(myLanguage,2) },
  pentecoste:         { status: false, label: switchNames(myLanguage,3) },
  lunediPentecoste:   { status: false, label: switchNames(myLanguage,4) },
  corpusDomini:       {status: false, label: switchNames(myLanguage,5)}, 
  festivitaNazionali: { status: true, label: switchNames(myLanguage,7)}, 
  festivitaLocali:    { status: true, label: switchNames(myLanguage,8)}, 
  festivitaPersonali: { status: true, label: switchNames(myLanguage,9)}, 
  feriePersonali:     { status: true, label: switchNames(myLanguage,10)}, 
  bridgeDuration:     3, 
  firstDayOfWeek:     1,
};

/* ===================================================
   SALVA VARIABILE 'PREFERENCES' SUL LOCAL STORAGE 
=================================================== */
const savePreferences = async () => {
  try {
    const jsonValue = JSON.stringify(PREFERENCES);
    await AsyncStorage.setItem('PREFERENCES_KEY', jsonValue);
    console.log('Variabile PRFERENCES saved successfully (scritta su local storage)');
  } catch (e) {
    console.error('Failed to save preferences:', e);
  }
};



/* ============================================================================= 

                          MAIN EXPORT - Preferences

============================================================================= */
export default function Preferences() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  // AGGANCIA LE VARIABILI myPreferences E preferences DAL CONTEXT
  const { 
    //preferences, setPreferences, // CONTEXT PREFERENCES
    myPreferences, setMyPreferences,
    //myLanguage
    } = useHolydays();
    //console.log(`[PREFERENCES]> myPreferences ricevute dal Context: ${JSON.stringify(myPreferences)}`);

  // CARICA VARIABILE 'PREFERENCES' DAL LOCAL STORAGE
  const loadPreferences = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('PREFERENCES_KEY');
      if (jsonValue != null) {
        const storedPreferences = JSON.parse(jsonValue);
        Object.assign(PREFERENCES, storedPreferences);
      }
    } catch (e) {
      console.error('Failed to load preferences:', e);
    }
  };

  // CARICA VARIABILE 'PREFERENCES' DAL LOCAL STORAGE AL BOOT
  useEffect(() => {
    const initializePreferences = async () => {
      await loadPreferences();
      setPreferencesLoaded(true);
    };
    initializePreferences();
    //setPreferences(PREFERENCES);    // INIZIALIZZA VARIABILE prferences LETTE DALLO STORAGE
    setMyPreferences({...PREFERENCES});  // IDEM myPreferences

    //console.log(`[PREFERENCES}\n- - myPreferences inizializzato al boot: ${JSON.stringify(myPreferences)}`);
  }, []);

  // GESTISCE PULSANTE 'MODIFICA LISTA FESTIVITA'
  const handleEditHolydays = () => { navigation.navigate('holydays') };

  // STILI PAGINA
  const styles = StyleSheet.create({
    scrollview: {
      width:'100%',
      backgroundColor: 'transparent',
      paddingHorizontal:12, 
      paddingTop: 80,
      maxWidth: 600,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
      paddingBottom:16,
    },
    // CONTAINER TITOLO PAGINA
    sectionContainer: {
      width: '100%',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      marginBottom:8,
    },
    // TITOLO ESTERNO BLOCCHETTI
    listTitle: {
      color: colors.headerText,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      paddingBottom: 8,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
    },
    // CARD
    groupContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal:18,
      marginBottom: 20,
      width: '100%',
    },
    preferenceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    editLinkContainer: {
      width: '100%',
      alignItems: 'flex-end',
      paddingTop: 16,
      paddingRight:12,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editText: {
      marginLeft: 8,
      marginTop:12, 
      marginBottom:12, 
      color: colors.text,
      fontSize: 14,
      fontWeight: 400,
    },
    creditsView: {
      flex:1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    credits: {
      fontSize: 11,
      color: colors.disabled,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  // AGGIORNA CONTEXT A OGNI CAMBAIMENTO DI PREFERENCES
  useEffect( () => {
    //setPreferences(PREFERENCES);
    setMyPreferences({...PREFERENCES});
    // console.log('[]PREFERENCES]> useEffect: aggiorna myPreferences');
  }, [PREFERENCES]);




  /* ===================================================
    SWITCH DINAMICO 
  =================================================== */
  function PreferenceSwitch ({ preferenceKey }: { preferenceKey: keyof typeof PREFERENCES }) {
    const colors = useThemeColors();
    const [isEnabled, setIsEnabled] = useState((PREFERENCES[preferenceKey] as { status: boolean }).status);
    
    // Sincronizza lo stato locale con la costante globale
    useEffect(() => {
      setIsEnabled((PREFERENCES[preferenceKey] as { status: boolean }).status);
    }, [PREFERENCES[preferenceKey].status]);

    // cambia stato dello swiwtch
    const toggleSwitch = async () => {
      const newStatus = !isEnabled;
      setIsEnabled(newStatus);
      (PREFERENCES[preferenceKey] as { status: boolean }).status = newStatus;
      await savePreferences();
      setMyPreferences( { ...PREFERENCES });
    };

    // STILE DELLO SWITCH
    const styles = StyleSheet.create({
      image: {      
        flex: 1,
        justifyContent: 'center',
        width: '100%',
      },
      preferenceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      },
      text: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '400',
      }
    });

    return (
      <View style={styles.preferenceRow as ViewStyle}>
        <Text style={styles.text}>{(PREFERENCES[preferenceKey] as { label: string }).label}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }} 
          thumbColor={isEnabled ? colors.textRed : '#f4f3f4'} 
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  };







  return (
    <ImageBackground 
      source= {useColorScheme() === 'light' ? 
        require('@/assets/images/background-image_minified.jpg') 
        : 
        null // SFONDO NERO
        }
      resizeMode="cover" 
      style={[styles.image, {alignItems:'center'}]}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
          {/* ==================== TITOLO PAGINA + PULSANTE RESET ==================== */}
          <View style={{
            flex:1,
            width:'100%',
            height:48,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderWidth: 0,
            pointerEvents: 'box-none',
          }}>
            <Text style={styles.sectionTitle}>{switchNames(myLanguage,12)}</Text>
          </View>

          {/* ==================== DROPDOWN DURATA PONTI ==================== */}

          <View style={styles.groupContainer}>
            <Text style={[styles.listTitle, {textAlign:'center'}]}>{switchNames(myLanguage, 11)}</Text>
            <DropdownComponent 
              language={myLanguage}
              selectedValue={parseInt(myPreferences.bridgeDuration)}
              onChange={ async (value) => {
                PREFERENCES.bridgeDuration = value;
                savePreferences();
                setMyPreferences({ ...PREFERENCES });
              }}
            />
          </View>                   

          {/* ==================== DROPDOWN GIORNO SETTIMANA ==================== */}
          {/* <Text style={[styles.listTitle, {textAlign:'center'}]}>{dataLabel[2]}</Text>
          <DropdownFDOW 
            selectedValue={PREFERENCES.firstDayOfWeek}
            onChange={async (value) => {
              PREFERENCES.firstDayOfWeek= value;
              await savePreferences();
            }}
          /> */}
          {/* ==================== SETTIMANA ==================== */}
          <View style={styles.groupContainer}>
            <View style={{width:'100%'}}>
              <Text style={[styles.listTitle, {textAlign:'center'}]}>{switchNames(myLanguage, 13)}</Text>
            </View>
            <PreferenceSwitch preferenceKey="domenica"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="sabato"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="venerdi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="giovedi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="mercoledi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="martedi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="lunedi"  />
          </View>
          {/* ==================== FESTIVITA NAZIONALI ==================== */}   
          <Suspense> 

            <View style={styles.groupContainer}>
              <View style={{width:'100%'}}>
                <Text style={[styles.listTitle, {textAlign:'center'}]}>{switchNames(myLanguage, 10)}</Text>
              </View>
              <PreferenceSwitch preferenceKey="festivitaNazionali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
                  {/*<PreferenceSwitch preferenceKey="festivitaLocali" />
                  <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>*/}
              <PreferenceSwitch preferenceKey="festivitaPersonali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
                  {/* <PreferenceSwitch preferenceKey="feriePersonali" />
                  <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View> */}
              <View style={styles.editLinkContainer}>
                <TouchableOpacity onPress={handleEditHolydays} style={styles.editButton}>
                  <IconSymbol size={20} name="pencil" color={colors.text} />
                  <Text style={styles.editText}>{switchNames(myLanguage, 5)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Suspense>  
          {/* ==================== RICORRENZE CATTLICHE  ==================== */}
          <Suspense>

            <View style={styles.groupContainer}>
              <View style={{width:'100%'}}>
                <Text style={[styles.listTitle, {textAlign:'center'}]}>{switchNames(myLanguage, 14)}</Text>
              </View>
              <PreferenceSwitch preferenceKey="pasqua" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="lunediDellAngelo" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="ascensione"/>
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="pentecoste" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="lunediPentecoste" /> 
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="corpusDomini" /> 
            </View>
          </Suspense>
          <View style={{ height: 240 }} />
        </ScrollView>
    </ImageBackground>
  );
}
