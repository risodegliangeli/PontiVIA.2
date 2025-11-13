import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet, Modal, Platform, useColorScheme, Animated, Easing } from 'react-native';
import Carousel, { ICarouselInstance, } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
//import { IconSymbol } from '@/components/ui/IconSymbol';
import Slide1 from '@/components/ui/Slide1';
import Slide2 from '@/components/ui/Slide2';
import Slide3 from '@/components/ui/Slide3';
import { Colors } from '@/constants/Colors';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';


const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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

  // GESTIONE COLORE
  const colors = useThemeColors();

  //const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(true);

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
  const progress = useSharedValue<number>(0);
  const styles = StyleSheet.create ({
    text: {
      fontSize: 28,
      fontStyle:'italic',
      color: '#ffffff',
      textAlign:'center',
      paddingHorizontal:24,
    },
    textItalic: {
      fontSize: 16,
      fontWeight:600,
      color: '#fff',
      textAlign:'right',
      fontStyle: 'italic',
    },
    button: {
      // paddingVertical:12,
      // borderRadius:48,
      backgroundColor: 'transparent',
      marginTop:24,
      borderWidth:0,
      borderColor:'transparent',
      paddingHorizontal:24
    },
    carouselView: {
      //flex:1,
      position:'absolute',
      top:0,
      left:0,
      //transform: [{translateY:'-50%'}],
      width: width,
      height: height,
      flexDirection:'column',
      //justifyContent: 'center',
      //alignContent:'center',
      //alignItems:'center',
      //textAlign:'center',
      paddingHorizontal:0,
      backgroundColor: '#E35527', 
      //zIndex: 999,     
      //borderWidth:8,
      //transform: [{translateY: '-25%'}],
      // alignItems:'center',
      // alignContent:'center',
      // flexDirection:'column',
      //paddingVertical:48,
    }
  })

  const frame = [
    {
      id:1, 
      action: <TouchableOpacity
                style={styles.button} 
                onPress={() => ref.current?.next({ animated: true })} >
                <Text style={styles.textItalic}>Next</Text>
              </TouchableOpacity>, 
      image:<Slide2/>,
      text: <Text style={styles.text}>
                È ora di staccare la spina...
              </Text>
    },
    {
      id:2, 
      action: <TouchableOpacity
                style={styles.button} 
                onPress={() => ref.current?.next({ animated: true })} >
                <Text style={styles.textItalic}>Next</Text>
              </TouchableOpacity>, 
      image: <Slide1/>,
      text: <Text style={styles.text}>
                aprire PontiVIA...
              </Text>
    },
    {
      id:3, 
      action: <TouchableOpacity
                style={[styles.button, {padding:12, borderWidth:1, borderRadius:99, borderColor: colors.white}]} 
                onPress={ splashClose } 
                >
                <Text style={[styles.textItalic, {textAlign: 'center'}]}>Go!</Text>
              </TouchableOpacity>, 
      image:<Slide3/>,
      text: <Text style={styles.text}>
                ... e partire per le vacanze!
              </Text>
    },
  ]

   return (
    <View style={styles.carouselView}>
      <Carousel
        ref={ref}
        autoPlay={false}
        autoPlayInterval={5000}
        loop={false}
        pagingEnabled
        width={width}
        height={height}
        data={frame}
        renderItem={({ index }) => (
          <Animated.View style={{ 
            alignItems: 'center', 
            position:'absolute', 
            top: '50%', 
            transform: [{translateY:'-50%'}, {scale: scaleValue}], 
            }}>
            {frame[index].image}
            <View style={{ height: 32 }} />
            {frame[index].text}
            <View style={{ height: 32 }} />
            {frame[index].action}
          </Animated.View>
        )}
      />
      {/* <TouchableOpacity
        style={{ position: 'absolute', top: 96, right: 20 }}
        onPress={splashClose}
      >
        <Text style={styles.textItalic}>Skip</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default SplashCarousel;
