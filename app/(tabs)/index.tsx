import { PREFERENCES } from '@/app/(tabs)/preferences';
import { CalendarScreen } from '@/components/calendarScreen';
import { useHolydays } from '@/context/HolydaysContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { Animated, ImageBackground, StyleSheet, useColorScheme, Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MovingHands } from '@/components/ui/MovingHands'; // MIO
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                                  MAIN
                                      
########################################################################################################### */
export default function HomeScreen() {

  const colors = useThemeColors();

  const dataLabel: any = {
    'it': ['Nessun ponte in vista?\nScorri il calendario e imposta\ni filtri e i tuoi giorni'],
    'fr': ['Pas de pont en vue?\nFaites défiler le calendrier\net définissez les filtres et vos dates'],
    'es': ['¿Ningún puente a la vista?\nDesliza el calendario y configura\nlos filtros y tus días'],
    'de': ['Keine Brücke in Sicht?\nBlättern Sie im Kalender vorwärts\nund stellen Sie die Filter und Ihre Daten ein'],
    'en': ['No bridge in sight?\nScroll the calendar and set\nfilters and your days'],
    'nl': ['Geen brug in zicht?\nScroll door de kalender en stel\nfilters en je dagen in'],
    'pt': ['Nenhuma ponte à vista?\nDeslize o calendário e configure\nos filtros e seus dias'],
    'hr': ['Nema mosta na vidiku?\nSkrolaj kalendar i postavi\nfiltere i svoje dane'],
    'si': ['Ni mosta na vidiku?\nDrsaj po koledarju in nastavi\nfiltre in svoje dni'],
    'gr': ['Καμία γέφυρα στον ορίζοντα;\nΚύλισε το ημερολόγιο και όρισε\nφίλτρα και τις μέρες σου']
  };
 
  const { 
    personalHolydays, setPersonalHolydays,
    vacationPeriods, setVacationPeriods,
    //regionalHolydays,
    myCountry, setMyCountry
  } = useHolydays();

  // const loadData = async (key: string) => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(key);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.error(`Errore ${key} nella lettura da locale:`, e);
  //     return null;
  //   }
  // };

  // // INIZIALIZZAZIONE DATI DA LOCAL STORAGE ///////////////////////////
  // // 1) personalHolydays
  // // 2) vacationPeriods
  // // 3) myCountry
  // useEffect(() => {
  //   // FUNZIONE DI LETTURA DA LOCAL STORAGE
  //   const initializeData = async () => {
  //     const storedPersonalHolydays = await loadData('personalHolydays');
  //     // console.log('storedPersonalHolydays:', JSON.stringify(storedPersonalHolydays));
  //       if (storedPersonalHolydays) {
  //         setPersonalHolydays(storedPersonalHolydays);
  //       }
  //     const storedVacationPeriods = await loadData('vacationPeriods');
  //     // console.log('storedVacationPeriods:', JSON.stringify(storedVacationPeriods));
  //       if (storedVacationPeriods) {
  //         setVacationPeriods(storedVacationPeriods);
  //       }
  //     const storedMyCountry = await loadData('myCountry');
  //       if (storedMyCountry) {
  //         setMyCountry(storedMyCountry);
  //       }
  //   };  
  //   // CHIAMATA FUNZ. LETTURA
  //   initializeData();
  // }, []);

  const myLanguage = (getLocales()[0].languageTag).slice(0,2); // 'it', 'fr', ecc

  // MEMORIZZA IL KEY DEL CALENDARIO
  // e forza il ricaricamento del calendario quando i dati cambiano.
  const calendarKey = useMemo(() =>
    JSON.stringify({
      PREFERENCES,
      personalHolydays,
      //regionalHolydays,
      vacationPeriods,
      myCountry
    }),
    [PREFERENCES,
      personalHolydays, 
      //regionalHolydays, 
      vacationPeriods,
    myCountry]
  );

  const styles = StyleSheet.create({
    // CALENDARIO
    container: {
      flex: 1,
      width: '100%',
      maxWidth:600,
      paddingHorizontal:12,      
      marginTop: 0,
      alignItems:'center'
    }, 
    // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center'
    },
  });

  // Animations
  const logoMarginTop = useRef(new Animated.Value(0)).current; // logo starts at marginTop 92
  const cardMarginTop = useRef(new Animated.Value(180)).current; // card starts at marginTop 300
  const logoOpacity = useRef(new Animated.Value(1)).current; // logo visible
  const animationStarted = useRef(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // ANIMAZIONE PARALLELA: DITO CHE SCOMPARE E CARDS CHE SI ALZANO
  const startAnimation = useCallback(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    Animated.parallel([
      Animated.timing(logoMarginTop, {
        toValue: -999, // move logo up out of the screen
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(cardMarginTop, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
    ]).start();
  }, [logoMarginTop, cardMarginTop, logoOpacity]);

  // ANIMAZIONE DITO AL BOOT, SPARISCE DOPO 8 SEC.
  useEffect(() => {
    animationTimeout.current = setTimeout(() => {
      startAnimation();
    }, 8000);
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [startAnimation]);

  // Handler for logo press
  const handleLogoPress = () => {
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    startAnimation();
  };

  return (  
      <ImageBackground 
        source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
        resizeMode="cover" 
        style={styles.image} >
          <Animated.View 
            key='card'
            style={[ styles.container, { top:0, marginTop: cardMarginTop } ]}
          >
            <CalendarScreen 
              key={calendarKey} 
              PREFERENCES={PREFERENCES}
            /> 
          </Animated.View>
          <Animated.View 
            key='logo'
            style={{
              position:'absolute',
              top:92,
              marginTop: logoMarginTop,
              width:'100%',
              alignContent:'flex-start',
              opacity: logoOpacity,
              zIndex: 10,
            }}>
            <Pressable 
              onPress={handleLogoPress} 
              style={{width: '100%', alignItems: 'center'}}>
              <Text style={{fontSize:18, fontWeight:600, color: colors.blueBar, textAlign:'center'}}>{dataLabel[myLanguage][0]}</Text>
              <MovingHands />
            </Pressable>
          </Animated.View>

          {/* STATUSBAR */}
          <StatusBar style={ useColorScheme() === 'dark' ? 'light' : 'dark' } />
      </ImageBackground> 
  );
}