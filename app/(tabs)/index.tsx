import { 
  Animated, 
  Easing, 
  ImageBackground, 
  StyleSheet, 
  useColorScheme, 
  Text, 
  TouchableOpacity,
  View,
  } from 'react-native';
import { CalendarScreen } from '@/components/calendarScreen';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT
import { useSplashCarousel } from '@/context/SplashCarouselContext';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useMemo, useRef, useState, } from 'react';
import { Colors } from '@/constants/Colors';
import { MovingHands } from '@/components/ui/MovingHands';      // MIO
import { indexLabels as dataLabel } from '@/constants/dataLabel';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import SideLabel from '@/components/ui/SideLabel';
import SplashCarousel from '@/components/ui/SplashCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import PagerCarousel from '@/components/ui/PagerCarousel';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                                  MAIN
                                      
########################################################################################################### */
export default function HomeScreen() {

  // GESTIONE COLORE
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // RICHIESTA PERMESSO PER TRACKING DI AdMob
  useEffect(() => {
  (async () => {
    const { status } = await requestTrackingPermissionsAsync();
    if (status === 'granted') {
      // console.log('ok permission to track data');
    }
  })();
  }, []);
 
  // VARIABILI DA CONTEXT
  const { 
    newPersonalHolydays,
    myPreferences, setMyPreferences,
    myCountry, 
    myLanguage,
  } = useHolydays();

  // SPLASHCAROUSEL SOLO AL PRIMO AVVIO
  const [splashChecked, setSplashChecked] = useState(true);
  const { isCarouselVisible, setIsCarouselVisible } = useSplashCarousel();

  useEffect(() => {
    const checkSplashCarousel = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('splashCarousel');
        if (!storedValue) {
          // Primo avvio → mostra e salva la voce
          setIsCarouselVisible(true);
          await AsyncStorage.setItem('splashCarousel', JSON.stringify(true));
        } else {
          // Avvii successivi → non mostrare
          setIsCarouselVisible(false);
        }
      } catch (e) {
        console.error('Errore lettura splashCarousel:', e);
        setIsCarouselVisible(false);
      } finally {
        setSplashChecked(true);
      }
    };
    checkSplashCarousel();
  }, []);

  /* ============================================================================= 
      LETTURA STORAGE DATI
  ============================================================================= */
  const loadData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };

  // LETTURA PREFERENCES DA LOCAL STORAGE
  useEffect(() => {
    const initializeData = async () => {
      const myStoredPreferences = await loadData('PREFERENCES_KEY');
      if (myStoredPreferences) setMyPreferences(myStoredPreferences);
    };  
    initializeData(); 
  }, []);

  // MEMORIZZA LA KEY DEL CALENDARIO
  // la key forza il ricaricamento del calendario quando i dati cambiano.
  const calendarKey = useMemo(() =>
    JSON.stringify({newPersonalHolydays, myPreferences, myCountry}),
    [
      newPersonalHolydays,
      myPreferences,
      myCountry
    ]
  );

  // ANIMAZIONI
  const logoMarginTop = useRef(new Animated.Value(0)).current; // logo starts at marginTop 92
  const logoSize = new Animated.Value(1); // TESTO E MANINA INIZIALM. VISIBILI
  const cardMarginTop = useRef(new Animated.Value(180)).current; // LE CARD PARTONO SPOSTATE VERSO IL BASSO
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cloud01Anim = new Animated.Value(0); // NUVOLETTA 1
  const cloud02Anim = new Animated.Value(0); // NUVOLETTA 2

  // ANIMAZIONE - 1 spostamento /////////////////////////////////////////////
  const startAnimation = () => {

      Animated.timing(logoSize, { // 1) TESTO E MANINA SI RIDUCONO (NON CAMBIA OPACITY)
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloud01Anim, { // 2) NUVOLETTA 01 APPARE E SCOMPARE
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }).start( () => { cloud01Anim.setValue(0);} );

      setTimeout(() => {
        Animated.timing(cloud02Anim, { // 3) NUVOLETTA 02 APPARTE E SCOMPARE RITARDATA
          toValue: 1,
          duration: 150,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }).start( () => { cloud02Anim.setValue(0); });
      }, 125);

      setTimeout(() => {
        Animated.timing( logoMarginTop, {
          toValue: -500,
          duration:300,
          useNativeDriver: true,
        }).start();
      }, 500);

      setTimeout(() => {
        Animated.timing(cardMarginTop, { // SPOSTA IN ALTO LE CARD
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }).start()
      }, 500);
  }

  // ANIMAZIONE - 2 opacita /////////////////////////////////////////////////
  const cardOpacity = useRef(new Animated.Value(1)).current;

  // ANIMAZIONE DITO AL BOOT, SPARISCE DOPO 8 SEC.
  useEffect(() => {
    animationTimeout.current = setTimeout(() => {
      startAnimation();
    }, 8000);
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [startAnimation]);

  // CLICCANDO SUL LOGO PARTE SUBITO L'ANIMAZIONE
  const handleLogoPress = () => {
    if (animationTimeout.current) clearTimeout(animationTimeout.current); // AZZERA IL TIMER
    startAnimation();
  };

  // FOGLI DI STILE
  const styles:any = StyleSheet.create({
    // CONTAINER CARDS CALENDARIO
    container: {
      transform: [
        { translateY: cardMarginTop } // ANIM. SPOSTAMENTO
      ],
      opacity: cardOpacity,           // ANIM. OPACITA
      flex: 1,
      width: '100%',
      maxWidth: 550,
      paddingHorizontal:0,      
      alignItems:'center',
    }, 
    // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center',
      
    },
    // CONTAINER ESTERNO DEL WRAPPER 
    wrapperContainer: {
      position:'absolute',
      top:92,
      width:'100%',
      alignContent:'flex-start',
      transform: [
        { translateY: logoMarginTop }
      ]      
    },
    // WRAPPER TESTO E MANINA
    welcome: {
      width:'100%',
      height: 180,
      alignItems:'center',      
      transform: [
        { scale: logoSize.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
    // TESTO DI WELCOME
    welcomeText: {
      fontSize:18, 
      fontWeight:600, 
      color: colors.blueBar, 
      textAlign:'center'
    },
    // NUVOLETTA 1
    cloud01: {            
      width: '35%',
      resizeMode: 'contain',
      position: 'absolute',
      opacity: cloud01Anim,
      transform: [
        { scale: cloud01Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
    // NUVOLETTA 2
    cloud02: {
      width: '35%',
      resizeMode: 'contain',
      position: 'absolute',
      opacity: cloud02Anim,
      transform: [
        {scale: cloud02Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
  });

  return ( 
    <ImageBackground 
      source={require('@/assets/images/background-image_minified.jpg')}
      resizeMode="cover" 
      style={styles.image} >

        {/* CARD CALENDARIO */}
        <Animated.View 
          key='card'
          style={styles.container} // MARGINTOP = ANIMATO
          >
          <CalendarScreen 
            key={calendarKey} 
            callerPreferences={myPreferences} /> 
        </Animated.View>

        {/* CONTAINER TESTO, MANINA E NUVOLETTE CHE A FINE ANIMAZIONE ESCE DALLA VIEW */}
        <Animated.View 
          key='logo'
          style={styles.wrapperContainer}>

          {/* PULSANTE TRASP PER FAR PARTIRE SUBITO L'ANIMAZIONE */}
          <TouchableOpacity 
            onPress={handleLogoPress} 
            style={{alignItems:'center'}}>

              {/* WRAPPER TESTO E MANINA */}
              <Animated.View style={styles.welcome}>
                
                {/* TESTO WELCOME */}
                <Text style={styles.welcomeText}>{dataLabel(myLanguage, 0)}</Text>
                
                {/* MANINA ANIMATA */}
                <MovingHands />

              </Animated.View>

            {/* NUVOLETTA 1 */}
            <Animated.Image
              source={require('@/assets/images/cloud_01.png')}
              style={styles.cloud01}
            />

            {/* NUVOLETTA 2 */}
            <Animated.Image
              source={require('@/assets/images/cloud_02.png')}
              style={styles.cloud02}
            />            
          </TouchableOpacity>
        </Animated.View>

        {/* INFO */}
        <Suspense>
          <SideLabel/>
        </Suspense>

      {/* SPLASH CAROUSEL SOLO AL PRIMO AVVIO */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: splashChecked && isCarouselVisible ? 'auto' : 'none',
        opacity: splashChecked && isCarouselVisible ? 1 : 0,
      }}>
        {splashChecked && <SplashCarousel splashClose={() => setIsCarouselVisible(false)} />}
      </View>

        {/* STATUSBAR */}
        <StatusBar style={!isLight ? 'light' : 'dark'} />

    </ImageBackground> 
  );
}