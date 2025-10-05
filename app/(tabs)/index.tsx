console.log('[INDEX.TSX]');
//import { PREFERENCES } from '@/app/(tabs)/preferences';
import { CalendarScreen } from '@/components/calendarScreen';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef,  } from 'react';
import { Animated, Easing, ImageBackground, StyleSheet, useColorScheme, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MovingHands } from '@/components/ui/MovingHands'; // MIO
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales, } from 'expo-localization';
import { indexLabels as dataLabel } from '@/components/dataLabel';

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
 
  const { 
    newPersonalHolydays,
    myPreferences, setMyPreferences,
    myCountry, 
  } = useHolydays();
  console.log(`- - [INDEX]: myPreferences riceuto dal Context`);

  /* ============================================================================= 
      LETTURA STORAGE DATI
  ============================================================================= */
  const loadData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      //console.error(`Errore ${key} nella lettura da locale:`, e);
      return null;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const myStoredPreferences = await loadData('PREFERENCES_KEY');
      if (myStoredPreferences) setMyPreferences(myStoredPreferences);
      console.log(`[INDEX]: lettura myPreferencs al boot`);
    };  
    initializeData(); 
  }, [myPreferences]);

  const myLanguage = (getLocales()[0].languageTag).slice(0,2); // 'it', 'fr', ecc

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
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);
  const cloud01Anim = new Animated.Value(0); // NUVOLETTA 1
  const cloud02Anim = new Animated.Value(0); // NUVOLETTA 2

  // ANIMAZIONE //////////////////////////////////////////////////////
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
  const styles = StyleSheet.create({
    // CONTAINER CARDS CALENDARIO
    container: {
      transform: [
        { translateY: cardMarginTop }
      ],
      flex: 1,
      width: '100%',
      maxWidth:600,
      paddingHorizontal:12,      
      alignItems:'center',
    }, 
    // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center'
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
    }
  });

  return (  
      <ImageBackground 
        source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
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

          {/* STATUSBAR */}
          <StatusBar style={ useColorScheme() === 'dark' ? 'light' : 'dark' } />
      </ImageBackground> 
  );
}