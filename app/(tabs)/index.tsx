import { PREFERENCES } from '@/app/(tabs)/preferences';
import { CalendarScreen } from '@/components/calendarScreen';
import { useHolydays } from '@/context/HolydaysContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, useColorScheme, useWindowDimensions, View, Text, Pressable } from 'react-native';
import { MovingHands } from '@/components/ui/MovingHands';

/* ###########################################################################################################

                                                  MAIN
                                      
########################################################################################################### */
export default function HomeScreen() {

  const indexLabels =[
    'Nessun ponte in vista?\nScorri verso il basso il calendario\ne imposta i filtri e le tue date',
  ];
 
  const { 
    personalHolydays, 
    regionalHolydays, 
    vacationPeriods, 
    myCountry
    } = useHolydays();

  // MEMORIZZA IL KEY DEL CALENDARIO
  // e forza il ricaricamento del calendario quando i dati cambiano.
  const calendarKey = useMemo(() =>
    JSON.stringify({
      PREFERENCES,
      personalHolydays,
      regionalHolydays,
      vacationPeriods,
      myCountry
    }),
    [PREFERENCES,
      personalHolydays, 
      regionalHolydays, 
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

  // Animation function
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

  // Start animation after 3500ms
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
        source= {useColorScheme() === 'light' && 
          require('@/assets/images/background-image_minified.jpg') 

          }
        resizeMode="cover" 
        style={styles.image}>
          
          <Animated.View 
            key='card'
            style={[
              styles.container,
              { top:0,
                marginTop: cardMarginTop }
            ]}
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
              <Text style={{fontSize:18, fontWeight:600, color: '#0088FF', textAlign:'center'}}>{indexLabels[0]}</Text>
              <MovingHands />
            </Pressable>
          </Animated.View>

          {/* STATUSBAR */}
          <StatusBar style={ useColorScheme() === 'dark' ? 'light' : 'dark' } />
      </ImageBackground> 
  );
}