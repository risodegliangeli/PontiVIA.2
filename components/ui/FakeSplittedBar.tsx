import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';
import { PulseWand } from '@/components/ui/PulseWand';
import { PulseGirl } from '@/components/ui/PulseGirl';
import {PulseCalendar} from '@/components/ui/PulseCalendar';

const w = Dimensions.get('window').width;

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

interface FakeSplittedBarInterface {
  index: number;
  action: (x: number) => void;
}

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
//  const SimpleToast: React.FC<SimpleToastInterface> = ({
const FakeSplittedBar: React.FC<FakeSplittedBarInterface> = ({
  index,
  action
  }) => {

  const [splittedTotalWidth, setSplittedTotalWidth] = useState<number>(0);
  const windowWidth: number = Dimensions.get('window').width;
  const splittedBarHeigth: number = 80;
  const doubleItemsSize: number = Math.trunc(splittedTotalWidth*.65);
  const singleItemImageSize: string = '70%';
  const doubleItemsImageSize: string = '50%';
  const splittedFromBottom: number = Platform.OS === 'ios' ? 28 : 44;
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
      backgroundColor: colors.white,
      elevation:12,         
    },
    doubleItemsTransparent: {
      flex:2,
      width: doubleItemsSize,
      height: splittedBarHeigth*.90,
      flexDirection:'row',
      alignItems:'center',
      // borderWidth:1,
      // borderColor:'red'
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
        <View style={{
          //width: Math.trunc(doubleItemsSize*.65),
          width: '65%',
          height: splittedBarHeigth*.90,
          flexDirection:'row'
          }}>
          
            {/* PULSE CALENDAR */}
            <Pressable 
              onPress = { () => action(1) }
              style={{
                width:'50%', 
                justifyContent:'center',
                alignContent: 'center',
                alignItems: 'center'
              }}>
              {index === 1 ?
              <PulseCalendar />
              :
              <Image 
                source={require("@/assets/images/icon_calendar-off.png")} 
                style={{width:'50%', height:'50%', resizeMode:'contain', opacity: .25}}  /> 
              }
            </Pressable>

            {/* PULSE MAGIC WAND */}
            <Pressable
              onPress = { () => action(2) }
              style={{
              width:'50%', 
              justifyContent:'center',
              alignContent: 'center',
              alignItems: 'center'
              }}>
                {index === 2 ?
                  <PulseWand />
                  :
                  <Image 
                    source={require("@/assets/images/icon_wand-off.png")}
                    style={{width:'50%', height:'50%', resizeMode:'contain', opacity: .25}} /> 
                }
            </Pressable>
        </View>

        {/* SINGOLO */}
        <Pressable 
          onPress = { () => action(3) }
          style={styles.singleItemTransparent}>
          {index === 3 ?
            <PulseGirl />
            :
            <Image 
              source={require("@/assets/images/icon_girl-off.png")}
              style={[styles.singleItemIcon, {opacity: .25}]} />       
          }
        </Pressable>
      </View>
    </View>
  );
}

export default (FakeSplittedBar);

