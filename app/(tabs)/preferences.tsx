// console.log('[PREFERENCES.TSX]');

import useLocalizationData from '@/app/data/data';
import DropdownComponent from '@/components/ui/DropdownComponent'; // DROPDOWN DURATA PONTI
// import DropdownFDOW from '@/components/ui/DropdownFDoW'; // DROPDOWN GIORNO SETTIMANA --- moment. disabled
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { getLocales,  } from 'expo-localization';
import { dataLabel as switchNames } from '@/components/dataLabel';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import * as Linking from 'expo-linking';

import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  } from 'react-native';

// GOOGLE ADMOB ///////////////////////////////////
import mobileAds, { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';

// INIZIALIZZA ADMOB
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('AdMob Initialized @ CalendarScreen'); // Initialization complete!
    
  });

// ADV: TEST ID FROM https://developers.google.com/admob/ios/test-ads?hl=it
// DA AGGIORNARE/RIMUOVERE CON ID CORRETTI
const adUnitId = Platform.OS === 'ios' ? "ca-app-pub-3940256099942544/2934735716" : "ca-app-pub-3940256099942544/6300978111";
// GOOGLE ADMOB ///////////////////////////////////

// NOMI GIORNI LOCALIZZATI
const { localizedDays } = useLocalizationData();

// LINGUA PER LE LABEL
const myLanguage = (getLocales()[0].languageTag).slice(0,2);

// COLORI
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
    //console.log('Variabile PRFERENCES saved successfully (scritta su local storage)');
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

  // ADMOB
  const bannerRef = useRef<BannerAd>(null);
  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  }); 
  
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
    setMyPreferences({...PREFERENCES});  // IDEM myPreferences
  }, []);

  const [dropdownSelected, setDropdownSelected] = useState<number>(Math.trunc(myPreferences.bridgeDuration)); 


  // GESTISCE PULSANTE 'MODIFICA LISTA FESTIVITA'
  const handleEditHolydays = () => { navigation.navigate('holydays') };

  // STILI PAGINA
  const styles = StyleSheet.create({
    scrollview: {
      width:'100%',
      backgroundColor: 'transparent',
      paddingTop: 90,
      maxWidth: 600,
    },
    pageTitle: {
      flex:1,
      width:'100%',
      height:60,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-start',
      // borderWidth: 1,
      pointerEvents: 'box-none',
      
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
      marginLeft:12,
      marginRight:12,
      marginBottom: 24,
      //width: '100%',
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
      marginTop:12,
      gap:8,
      borderWidth:2,
      borderStyle: 'dotted',
      borderColor: colors.blueBar,
      borderRadius:24,
      backgroundColor: 'rgba(255, 255, 255, .5)'
    }

  });

  // AGGIORNA CONTEXT A OGNI CAMBIAMENTO DI PREFERENCES
  useEffect( () => {
    setMyPreferences({...PREFERENCES});
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

    // STILI DELLO SWITCH
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
          <View style={styles.pageTitle}>
            <Text style={styles.sectionTitle}>{switchNames(myLanguage,12)}</Text>
          </View>

          {/* GOOGLE ADMOB ############################################################################# */}
          <View style={[styles.advContainer, {width:'100%', alignItems:'center',}]}>
            <Text style={{fontSize:10, color: colors.disabled, marginBottom:8}}>ADV</Text>
              <BannerAd 
                ref={bannerRef} 
                unitId={adUnitId} 
                size={BannerAdSize.MEDIUM_RECTANGLE}/>
          </View>

          {/* ==================== DROPDOWN DURATA PONTI ==================== */}

          <View style={styles.groupContainer}>
            <Text style={[styles.listTitle, {textAlign:'center'}]}>{switchNames(myLanguage, 11)}</Text>
            <DropdownComponent 
              language={myLanguage}
              selectedValue={dropdownSelected}
              onChange={ async (value) => {
                setDropdownSelected(value);           // POSIZIONA LA VOCE DELLA DROPDOWN
                PREFERENCES.bridgeDuration = value;   // AGGIORNA IL VALORE DI bridgeDuration
                setMyPreferences({ ...PREFERENCES }); // AGGIORNA LA VARIABILE myPreferences
                await savePreferences();              // SALVA LE PREFERENCES SU LOCAL STORAGE
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
                  <Text style={styles.editText}>{switchNames(myLanguage, 15)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Suspense>  
          {/* ==================== RICORRENZE CATTOLICHE  ==================== */}
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


          {/* GOOGLE ADMOB ############################################################################# */}
          <View style={[styles.advContainer, {width:'100%', alignItems:'center',}]}>
            <Text style={{fontSize:10, color: colors.disabled, marginBottom:8}}>ADV</Text>
              <BannerAd 
                ref={bannerRef} 
                unitId={adUnitId} 
                size={BannerAdSize.MEDIUM_RECTANGLE}/>
          </View>



        {/* INFO / PRIVACY  ############################################################################# */}
        <TouchableOpacity
            style={[styles.groupContainer, {
              flex:1,
              padding:16,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              gap:8,
            }]}
            onPress={ async () => {
              await Linking.openURL('https://pontivia-2025.web.app/')
              }}>
                <IconSymbol size={28} name="info.circle.fill" color={colors.blueBar}/>
                <Text style={{
                  fontSize:18,
                  fontWeight:600,
                  color: colors.blueBar,
                }}>{switchNames(myLanguage, 17)}</Text>
          </TouchableOpacity>


          {/* SPACER  ############################################################################# */}
          <View style={{ height: 240 }} />
        </ScrollView>
    </ImageBackground>
  );
}
