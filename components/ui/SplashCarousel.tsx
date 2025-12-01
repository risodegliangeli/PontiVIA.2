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
  Easing,
} from 'react-native';
import Carousel, { ICarouselInstance, } from 'react-native-reanimated-carousel';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import { Colors } from '@/constants/Colors';
import { splashCarousel as splashCarouselLabel } from '@/constants/dataLabel';
import Slide1 from '@/components/ui/Slide1';
import Slide2 from '@/components/ui/Slide2';
import Slide3 from '@/components/ui/Slide3';
import Pagination from '@/components/ui/Pagination';

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

  const splittedFromBottom: number = Platform.OS === 'ios' ? 28 : 64;
  

  let { height, width } = Dimensions.get('window');

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

  // ANIMAZIONE INGRESSO CAROUSEL (solo iOS)
  const scaleValue = useRef(new Animated.Value(2)).current;
  useEffect(() => {
    Animated.timing(scaleValue, { // RIDUCI/ESPANDI
      toValue: 1,
      duration: 750,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start();
  }, [])

  const ref = useRef<ICarouselInstance>(null);

  const [dots, setDots] = useState<number>(0);

  const styles: any = StyleSheet.create({
    text: {
      fontSize: 26,
      fontWeight: 800,
      fontStyle: 'italic',
      color: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 24,
    },
    textSecondLine: {
      fontSize: 20,
      fontWeight: 400,
      fontStyle: 'italic',
      color: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 24,
      paddingVertical: 8,
    },
    textItalic: {
      fontSize: 18,
      fontWeight: 600,
      color: '#fff',
      textAlign: 'right',
      fontStyle: 'italic',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, .08)',
      padding: 12,
      borderRadius: 99,
      paddingHorizontal: 24
    },
    carouselView: {
      position: 'absolute',
      top: 0, bottom: 0,
      left: 0, right: 0,
      //borderWidth:8, borderColor:'red',
      backgroundColor: '#E35527',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    innerContent: {
      // flex: 1,
      justifyContent: 'center',
      //borderWidth:1,
    }
  })

  const frame = [
    {
      id: 1,
      action: null,
      image: <Slide2 />,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 0)}</Text>
        {splashCarouselLabel(myLanguage, 1) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 1)}</Text>}
        <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 2)}</Text></>
    },
    {
      id: 2,
      action: null,
      image: <Slide1 />,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 3)}</Text>
        {splashCarouselLabel(myLanguage, 4) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 4)}</Text>}
        <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 5)}</Text></>
    },
    {
      id: 3,
      action: null,
      image: <Slide3 />,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 6)}</Text>
        {splashCarouselLabel(myLanguage, 7) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 7)}</Text>}
        <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 8)}</Text></>
    },
  ];


  return (
    
    <View style={styles.carouselView}>
      <Carousel
        // style={{borderWidth:1}}
        ref={ref}
        autoPlay={true}
        autoPlayInterval={4000}
        autoPlayReverse={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset:  5,
        }}
        //onProgressChange={ () => ref.current && setDots(ref.current.getCurrentIndex)}
        onSnapToItem={(index) => setDots(index)}
        loop={false}
        pagingEnabled
        width={myWidth}
        height={myHeight * .65} // 3/4 di altezza schermo
        data={frame}
        renderItem={({ index }) => (
          Platform.OS === 'ios' ?
            <Animated.View style={[
              styles.innerContent,
              { transform: [{ scale: scaleValue }] }
            ]}>
              {frame[index].image}
              {frame[index].text}
              {frame[index].action}
            </Animated.View>
            :
            <View style={[
              styles.innerContent,
              { transform: [{ scale: 1 }] }
            ]}>
              {frame[index].image}
              {frame[index].text}
              {frame[index].action}
            </View>
        )}
      />

      <View style={{
        position:'absolute',
        bottom: splittedFromBottom,
        flexDirection:'column',
        gap:24,
      }}>
        {/* DOTS */}
        <Pagination
          dotsLength={frame.length}
          activeDotIndex={dots}
          containerStyle={{
            // position: 'absolute',
            // bottom: 100,
            // alignSelf: 'center',
            // borderWidth: 1,
            // maxHeight: 12,
          }}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        {/* SKIP */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderWidth: 2,
              borderColor: colors.white,
              marginHorizontal: 96,
              elevation: 18,
              shadowColor: colors.black, // iOS shadow
              shadowOffset: {
                width: 4,
                height: 18, // Match elevation for iOS
              },
              shadowOpacity: 0.45,
              shadowRadius: 16 // Match elevation for iOS
            }]}
          onPress={splashClose}>
        <Text style={[
          styles.textItalic, 
          { textAlign: 'center' }]
          }>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
