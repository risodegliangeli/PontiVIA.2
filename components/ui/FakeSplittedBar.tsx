import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { getLocales,  } from 'expo-localization';
import { splittedBarLabel as splittedLabels } from '@/components/dataLabel';
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { easeGradient } from 'react-native-easing-gradient';

const w = Dimensions.get('window').width;

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

interface FakeSplittedBarInterface {
  index: number;
}

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
//  const SimpleToast: React.FC<SimpleToastInterface> = ({
const FakeSplittedBar: React.FC<FakeSplittedBarInterface> = ({
  index
  }) => {

  const [splittedTotalWidth, setSplittedTotalWidth] = useState<number>(0);
  const windowWidth: number = Dimensions.get('window').width;
  const splittedBarHeigth: number = 80;
  const doubleItemsSize: number = Math.trunc(splittedTotalWidth*.65);
  const singleItemImageSize: string = '70%';
  const doubleItemsImageSize: string = '50%';
  const splittedFromBottom: number = Platform.OS === 'ios' ? 68 : 104;
  const itemsInternalPadding: number = 3;

  useEffect( () => {
    if (windowWidth >= 320 && windowWidth <= 360) {
      setSplittedTotalWidth(windowWidth * 0.90);
    } else {
      setSplittedTotalWidth(350);
    }
  }, [windowWidth]);
  
  const colors = useThemeColors();  
  const styles = StyleSheet.create({
    splittedBase: {
      position: 'absolute',
      width: splittedTotalWidth, // LARGHEZZA SPLITTED BAR
      height: splittedBarHeigth, // ALTEZZA 
      bottom:splittedFromBottom,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center', 
      alignContent: 'center'
    },   
    singleItemTransparent: {
      width: splittedBarHeigth,
      height: splittedBarHeigth,
      alignItems:'center',
      alignContent:'center',
      justifyContent:'center'
    },
    singleItemTouchable: {
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems: 'center', 
    },
    singleItemIcon: {
      width: singleItemImageSize, 
      height: singleItemImageSize, 
      contentFit:'contain',
    },
    iosBlurView: {
      width:'100%', 
      height:'100%', 
      borderRadius: splittedBarHeigth,
      overflow:'hidden',
      backgroundColor: colors.tabBarBackgroundIos,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 2,
        height: 12, // Match elevation for iOS
      },
      shadowOpacity: 0.345,
      shadowRadius: 8// Match elevation for iOS             
    },
    androidBlurView: {
      width:'100%', 
      height:'100%', 
      borderRadius: splittedBarHeigth,
      overflow:'hidden',
      backgroundColor: useColorScheme() === 'light' ? colors.white : colors.disabled,
      elevation:12,         
    },
    doubleItemsTransparent: {
      width: doubleItemsSize,
      height: splittedBarHeigth*.90,
      flexDirection:'row',
      alignItems:'center'
    },
    doubleItemsTouchable: {
      flex:2, 
      flexDirection:'column',
      alignItems:'center', // HOR
      justifyContent:'center', // VERT
    },
    doubleItemsIcon: {
      width: doubleItemsImageSize, 
      height: doubleItemsImageSize, 
      contentFit:'contain',
    },
    doubleItemsLabel: {
      fontSize:12, 
      fontWeight:600, 
      color:'#0088ff'
    },
    labelNotSelected: {
      color: useColorScheme() === 'dark' ? colors.white : colors.black,
      fontSize:14,
      fontWeight:600,
    },
    labelSelected: {
      color:colors.tabBarActiveItem, // BLU
      fontSize:14,
      fontWeight:600,
    },
    bottomSpace: {
      width:'100%',
      position:'absolute',
      bottom: 0,
      flexDirection:'column',
      alignItems:'center',
    },
    // BINARIO SCORRIMENTO FOCUSED DOT - TUTTA LARGHEZZA
    railBeyond: {  
      position:'absolute',
      top:0,
      left:0,
      width: '100%',
      height:'100%',
      paddingVertical: 4,
      paddingHorizontal: 0,
      flexDirection:'column',
      justifyContent:'center',      
    },
    // FOCUSED DOT PLAIN (ANDROID)
    backgroundDotPlain: {
      height: splittedBarHeigth - itemsInternalPadding * 2,
      opacity:.75,
      borderRadius: 999, //splittedBarHeigth,
      backgroundColor: colors.tabBarFocusDotAndroid,
      borderWidth:1,
      borderColor: 'rgba(0, 0, 0, .08)'
    },
    // FOCUSED DOT LIQUID (IOS)
    backgroundDotLiquid: {
      height: splittedBarHeigth - itemsInternalPadding * 2,
      borderRadius: 999, 
      backgroundColor: colors.tabBarFocusDotIos,
      shadowColor: colors.black, 
      shadowOffset: {
        width: 0,
        height: 2, 
      },
      shadowOpacity: 0.55,
      shadowRadius: 4,
      borderWidth:1,
      borderColor: 'rgba(0, 0, 0, .06)'
           
    },
  });

  return (
    <View style={styles.bottomSpace}>
      {/* BASE GENERALE WIDTH 100% DEI CONTENITORI */}   

      <View style={styles.splittedBase}>      
        
        {/* BASE PULSANTE DOPPIO TRASPARENTE DENTRO AL QUALE WRAPPARE IL BLUR */}
        <View style={{
          width:doubleItemsSize,
          borderRadius: splittedBarHeigth,
          elevation:18,
          shadowColor: colors.black, 
          shadowOffset: { width: 0, height: 8, },
          shadowOpacity: 0.45,
          shadowRadius: 12,   
          marginVertical:8, 
          }}>
          <View style={styles.androidBlurView} />
        </View>

        {/* BASE PULSANTE SINGOLO TRASPARENTE DENTRO AL QUALE WRAPPARE IL BLUR */}
        <View style={{
          width:splittedBarHeigth,
          borderRadius: splittedBarHeigth,
          elevation:18,
          shadowColor: colors.black, 
          shadowOffset: {
            width: 2,
            height: 4, 
          },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          }}>
          {/* BLUR SINGOLO */}
          <View style={styles.androidBlurView} /> 
        </View>        
      </View>

      <View style={styles.splittedBase}> 

        {/* DOPPIO */}
        <View style={styles.doubleItemsTransparent}>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_calendar-off.png")} /> 
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_wand-off.png")} /> 
        </View>

        {/* SINGOLO */}
        <View style={styles.singleItemTransparent}>
          <Image style={styles.singleItemIcon} source={require("@/assets/images/icon_girl-off.png")} />       
        </View>
      </View>
      
    </View>
  );
}

export default (FakeSplittedBar);

