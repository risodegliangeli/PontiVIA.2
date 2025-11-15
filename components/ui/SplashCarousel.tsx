import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet, Modal, Platform, useColorScheme, Animated, Easing, Pressable} from 'react-native';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import Slide1 from '@/components/ui/Slide1';
import Slide2 from '@/components/ui/Slide2';
import Slide3 from '@/components/ui/Slide3';
import { Colors } from '@/constants/Colors';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { splashCarousel as splashCarouselLabel } from '@/constants/dataLabel';


const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

interface SplashInterface {
  visible: boolean;
  splashClose: () => void;
}

/* ------------------------------------------------------------- 

SplashCarousel

------------------------------------------------------------- */
const SplashCarousel: React.FC<SplashInterface> = ({
  visible,
  splashClose,
  }) => {

  let {height, width} = Dimensions.get('window');

  const [myHeight, setMyHeight] = useState<number>(height);
  const [myWidth, setMyWidth] = useState<number>(width);

  // GESTISCE RIDIMENSIONAMENTO DELLA FINESTRA SU TABLET
  useEffect( () => {
    setMyHeight(Dimensions.get('window').height);
    setMyWidth(Dimensions.get('window').width)
    }, [Dimensions.get('window')]);

  // RICEVE VARIABILI DAL CONTEXT
  const { 
    myLanguage
    } = useHolydays();

  // GESTIONE COLORE
  const colors = useThemeColors();

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

  const styles = StyleSheet.create ({
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
      //maxWidth:600,
    },
    innerContent: {
      justifyContent:'center',
      alignItems: 'center', 
      position:'absolute', 
      top: '50%',
      left: '50%', 
    }
  })

  const frame = [
    {
      id:1, 
      // action: <TouchableOpacity
      //           style={styles.button} 
      //           onPress={() => ref.current?.next({ animated: true })} >
      //           <Text style={styles.textItalic}>Next</Text>
      //         </TouchableOpacity>, 
      action: <></>,
      image:<Slide2/>,
      text: <><Text style={styles.text}>{splashCarouselLabel(myLanguage, 0)}</Text>
            {splashCarouselLabel(myLanguage, 1) && <Text style={styles.text}>{splashCarouselLabel(myLanguage, 1)}</Text>}
            <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 2)}</Text></>
    },
    {
      id:2, 
      // action: <TouchableOpacity
      //           style={styles.button} 
      //           onPress={() => ref.current?.next({ animated: true })} >
      //           <Text style={styles.textItalic}>Next</Text>
      //         </TouchableOpacity>, 
      action: <></>,
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
            backgroundColor: dots === 0 ? colors.white : 'rgba(255, 255, 255, .35)' }}/>
        <View 
            style={{width:8, height:8, borderRadius:12,
            backgroundColor: dots === 1 ? colors.white : 'rgba(255, 255, 255, .35)' }}/>
        <View 
            style={{width:8, height:8, borderRadius:12,
            backgroundColor: dots === 2 ? colors.white : 'rgba(255, 255, 255, .35)' }}/>
      </View> 
    )
  }

  return (
    <View style={styles.carouselView}>
      <Carousel
        ref={ref}
        autoPlay={false}
        autoPlayInterval={5000}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.99,
					parallaxScrollingOffset: 5,
				}}
        onProgressChange={ () => ref.current && setDots(ref.current.getCurrentIndex)}
        loop={false}
        pagingEnabled
        width={myWidth}
        height={myHeight}
        data={frame}
        renderItem={({ index }) => (
          Platform.OS === 'ios' ?
            <Animated.View style={[
              styles.innerContent, 
              { 
                transform: [{translateY:'-50%'}, {translateX: '-50%'}, {scale: scaleValue}], 
              }]}>
              {frame[index].image}
              <View style={{ height: 32 }} />
              {frame[index].text}
              <View style={{ height: 32 }} />
              {frame[index].action}
            </Animated.View>
          :
            <View style={[
              styles.innerContent,
              { 
                transform: [{translateY:'-50%'}, {translateX: '-50%'}, {scale: 1}], 
              }]}>
              {frame[index].image}
              <View style={{ height: 32 }} />
              {frame[index].text}
              <View style={{ height: 32 }} />
              {frame[index].action}
            </View>
        )}
      />

      {dots < 2 && <ThreeDots/>}

      <TouchableOpacity
        style={{ position: 'absolute', top: 96, right: 20, zIndex: 99 }}
        onPress={splashClose}
      >
        <Text style={styles.textItalic}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SplashCarousel;
