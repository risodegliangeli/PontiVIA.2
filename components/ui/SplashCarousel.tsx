import React, { useEffect, useRef, useState } from 'react';
import { 
  Dimensions, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  useColorScheme, 
  Animated, 
  Easing, } from 'react-native';
import Carousel, { ICarouselInstance,  } from 'react-native-reanimated-carousel';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import { Colors } from '@/constants/Colors';
import { splashCarousel as splashCarouselLabel } from '@/constants/dataLabel';
import Slide1 from '@/components/ui/Slide1';
import Slide2 from '@/components/ui/Slide2';
import Slide3 from '@/components/ui/Slide3';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ------------------------------------------------------------- 

SplashCarousel

------------------------------------------------------------- */
export default function SplashCarousel(props: any) {
  const { splashClose } = props;

  // GESTIONE COLORE
  const colors = useThemeColors();

  let {height, width} = Dimensions.get('window');

  // CALCOLA LARGH./ALT. E 1/4 DEI VALORI PER LA CENTRATURA
  const [myHeight, setMyHeight] = useState<number>(height);
  const [myWidth, setMyWidth] = useState<number>(width);

  // GESTISCE RIDIMENSIONAMENTO DELLA FINESTRA SU TABLET
useEffect(() => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    setMyHeight(window.height);
    setMyWidth(window.width);
  });
  return () => subscription?.remove();
}, []);

  // RICEVE VARIABILI DAL CONTEXT
  const { 
    myLanguage
    } = useHolydays();

  const scaleValue  = useRef(new Animated.Value(2)).current;
  useEffect(() => {
    Animated.timing(scaleValue, { // RIDUCI/ESPANDI
      toValue: 1,
      duration: 750,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start();
  }, [])

  const ref = useRef<ICarouselInstance>(null);
  const [dots, setDots] = useState<number>(1);

  const styles:any = StyleSheet.create ({
    text: {
      fontSize: 26,
      fontWeight:800,
      fontStyle:'italic',
      color: '#ffffff',
      textAlign:'center',
      paddingHorizontal:24,
    },
    textSecondLine: {
      fontSize: 20,
      fontWeight:400,
      fontStyle:'italic',
      color: '#ffffff',
      textAlign:'center',
      paddingHorizontal:24,
      paddingVertical:8,
    },
    textItalic: {
      fontSize: 18,
      fontWeight:600,
      color: '#fff',
      textAlign:'right',
      fontStyle: 'italic',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, .08)',
      padding:12,
      borderRadius:99,
      paddingHorizontal:24
    },
    carouselView: {
      position:'absolute',
      top:0,
      left:0,
      backgroundColor: '#E35527',
      height:'100%',
      flexDirection:'column',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'

    },
    innerContent: {
      flex:1,
      justifyContent:'center',
      //borderWidth:1,
    }
  })

  const frame = [
    {
      id:1, 
      action: null,
      image:<Slide2/>,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 0)}</Text>
            {splashCarouselLabel(myLanguage, 1) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 1)}</Text>}
            <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 2)}</Text></>
    },
    {
      id:2, 
      action: null,
      image: <Slide1/>,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 3)}</Text>
            {splashCarouselLabel(myLanguage, 4) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 4)}</Text>}
            <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 5)}</Text></>
    },
    {
      id:3, 
      action: <TouchableOpacity
                style={[
                  styles.button, 
                  { 
                    borderWidth:2, 
                    borderColor: colors.white,
                    marginHorizontal:96,
                    elevation:18,
                    shadowColor: colors.black, // iOS shadow
                    shadowOffset: {
                    width: 4,
                    height: 18, // Match elevation for iOS
                    },
                    shadowOpacity: 0.45,
                    shadowRadius: 16 // Match elevation for iOS
                  }]} 
                onPress={ splashClose } 
                >
                <Text style={[styles.textItalic, {textAlign: 'center'}]}>Go!</Text>
              </TouchableOpacity>, 
      image:<Slide3/>,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 6)}</Text>
            {splashCarouselLabel(myLanguage, 7) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 7)}</Text>}
            <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 8)}</Text></>
    },
  ];

  const ThreeDots = () => {
    return (
      <View style={{
        position:'absolute',
        bottom: 100,
        width: 60, 
        alignSelf:'center',
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
        }}>
        <View 
            style={{width:8, height:8, borderRadius:12,
            backgroundColor: dots === 0 ? colors.white : 'rgba(255, 255, 255, .5)' }}/>
        <View 
            style={{width:8, height:8, borderRadius:12,
            backgroundColor: dots === 1 ? colors.white : 'rgba(255, 255, 255, .5)' }}/>
        <View 
            style={{width:8, height:8, borderRadius:12,
            backgroundColor: dots === 2 ? colors.white : 'rgba(255, 255, 255, .5)' }}/>
      </View> 
    )
  }

  return (
    <View style={styles.carouselView}>
      <Carousel
        ref={ref}
        autoPlay={false}
        //autoPlayInterval={5000}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.99,
					parallaxScrollingOffset: 5,
				}}
        //onProgressChange={ () => ref.current && setDots(ref.current.getCurrentIndex)}
        onSnapToItem={ (index) => setDots(index) }
        loop={false}
        pagingEnabled
        width={myWidth}
        height={myHeight}
        data={frame}
        renderItem={({ index }) => (
          Platform.OS === 'ios' ?
              <Animated.View style={[
                styles.innerContent, 
                { transform: [{ scale: scaleValue }]}
              ]}>
              {frame[index].image}
              <View style={{ height: 32 }} />
              {frame[index].text}
              <View style={{ height: 32 }} />
              {frame[index].action}
            </Animated.View>
          :
            <View style={[
              styles.innerContent,
              { transform: [{ scale: 1 }]}
              ]}>
              {frame[index].image}
              <View style={{ height: 32 }} />
              {frame[index].text}
              <View style={{ height: 32 }} />
              {frame[index].action}
            </View>
        )}
      />

      {dots < 2 && <ThreeDots/>}

      {/* Chiudi automaticamente dopo la terza slide (index 2) */}
      {
        // Quando l'utente arriva all'ultima slide, richiamiamo splashClose dopo una breve pausa
      }
      {/*dots === 2 && (
        (() => {
          // effettuiamo la chiusura con un piccolo timeout per lasciare il tempo all'utente
          setTimeout(() => {
            splashClose();
          }, 2000);
          return null;
        })()
      )*/}

      {/* TASTO SKIP */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 96, right: 20, zIndex: 99 }}
        onPress={splashClose}
        >
        <Text style={styles.textItalic}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
