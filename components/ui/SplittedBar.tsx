import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
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

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
export default function CustomTabBar({ route, focused: isFocused, event, state, descriptors, navigation}) {

  // DIMENSIONI WINDOW
  const windowWidth: number = Dimensions.get('window').width;

  const [splittedTotalWidth, setSplittedTotalWidth] = useState<number>(0);
  
  useEffect( () => {
    if (windowWidth >= 320 && windowWidth <= 360) {
      setSplittedTotalWidth(windowWidth * 0.95);
    } else {
      setSplittedTotalWidth(350);
    }
  }, [windowWidth]);
      
  const splittedBarHeigth: number = 80; // ALTEZZA/LARGHEZZA DELL'ITEM SINGOLO E  DI TUTTA LA BAR
  const doubleItemsSize: number = Math.trunc(splittedTotalWidth*.65); // LARGHEZZA DEL DOPPIO ITEM

  const singleItemImageSize: string = '60%';
  const doubleItemsImageSize: string = '35%';

  const splittedFromBottom: number = 28;
  const itemsInternalPadding: number = 3;
  const splittedLabels =  [
    '', 
    'Le mie date', 
    'Filtri'];

  // GESTIONE COLORI
  const colors = useThemeColors();  

  // ASSEGNA LE SCHEDE ALLE COSTANTI
  const holydaysRouteIndex = state.routes.findIndex(route => route.name === 'holydays');
  const indexRouteIndex = state.routes.findIndex(route => route.name === 'index');
  const preferencesRouteIndex = state.routes.findIndex(route => route.name === 'preferences');

  // DETERMINA SE CIASCUNA SCHEDA E' ATTIVA
  const isHolydaysFocused = state.index === holydaysRouteIndex;
  const isIndexFocused = state.index === indexRouteIndex;
  const isPreferencesFocused = state.index === preferencesRouteIndex;

  // A SECONDA DELLA TAB ATTIVA GENERA LA ROW COI PULSANTI
  
  const IndexIcon = () => { // INDEX
    if (isIndexFocused) { 
      return <Image style={styles.singleItemIcon} source={require("@/assets/images/icon_girl-on.png")} />  
    } else {
      if (useColorScheme() === 'light') {
        return <Image style={styles.singleItemIcon} source={require("@/assets/images/icon_girl-off.png")} />  
      } else {
        return <Image style={styles.singleItemIcon} source={require("@/assets/images/icon_girl-off-dark.png")} /> 
      }
    }
  }
  const CalendarIcon = () => {
    if (isHolydaysFocused) {
      return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_calendar-on.png")} />
          <Text style={styles.labelSelected}>{splittedLabels[1]}</Text> 
        </>
      )
        } else {
      if (useColorScheme() === 'light') {
        return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_calendar-off.png")} />
          <Text style={styles.labelNotSelected}>{splittedLabels[1]}</Text> 
        </>
        )  

      } else {
        return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_calendar-off-dark.png")} />
          <Text style={styles.doubleItemsLabel}>{splittedLabels[1]}</Text> 
        </>
        )
      }
    }
  }
  const PrefIcon = () => { // PREFERENCES
    if (isPreferencesFocused) { 
      return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_wand-on.png")} />
          <Text style={styles.labelSelected}>{splittedLabels[2]}</Text> 
        </>
      )
    } else {
      if (useColorScheme() === 'light') {
        return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_wand-off.png")} />
          <Text style={styles.labelNotSelected}>{splittedLabels[2]}</Text> 
        </>
        )  

      } else {
        return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_wand-off-dark.png")} />
          <Text style={styles.doubleItemsLabel}>{splittedLabels[2]}</Text> 
        </>
        )
      }
    }
  }

  // onPress SPECIFICI PER CIASCUN BUTTON
  const onHolydaysPress = () => {
    const event = navigation.emit({ type: 'tabPress', target: 'holydays' });
    if (!event.defaultPrevented) {
      navigation.navigate('holydays');
    }
  };
  const onIndexPress = () => {
    const event = navigation.emit({ type: 'tabPress', target: 'index' });
    if (!event.defaultPrevented) {
      navigation.navigate('index');
    }
  };
  const onPreferencesPress = () => {
    const event = navigation.emit({ type: 'tabPress', target: 'preferences' });
    if (!event.defaultPrevented) {
      navigation.navigate('preferences');
    }
  };

  const styles = StyleSheet.create({
    // NUOVA SPLITTEDBAR
    splittedBase: {
      position: 'absolute',
      width: splittedTotalWidth, // LARGHEZZA SPLITTED BAR
      height: splittedBarHeigth, // ALTEZZA 
      bottom:splittedFromBottom,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center', 
    },    
      // SINGLE ITEM
      singleItem: {
        width: splittedBarHeigth, // LARGHEZZA FISSA
        height: splittedBarHeigth,
        borderWidth: 2,
        borderColor: Platform.OS === 'ios' ? colors.tabBarBorderIos : colors.tabBarBorderAndroid,
        borderRadius: '100%',
        backgroundColor: Platform.OS === 'ios' ? colors.tabBarBackgroundIos : colors.tabBarBackgroundAndroid,
        elevation:8,
        shadowColor: 'black', 
        shadowOffset: { 
          width: 2, 
          height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      singleItemTransparent: {
        width: splittedBarHeigth,
        height: splittedBarHeigth,
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
      // DOUBLE ITEMS
      doubleItems: {
        width: doubleItemsSize,
        height: splittedBarHeigth,
        borderWidth: 2,
        // borderColor: Platform.OS === 'ios' ? colors.tabBarBorderIos : colors.tabBarBorderAndroid,
        borderRadius: splittedBarHeigth,
        // backgroundColor: Platform.OS === 'ios' ? colors.tabBarBackgroundIos : colors.tabBarBackgroundAndroid,
        elevation:4,
        shadowColor: 'black', 
        shadowOffset: { 
          width: 2, 
          height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        flexDirection:'row',
      },
      doubleItemsTransparent: {
        width: doubleItemsSize,
        height: splittedBarHeigth*.90,
        flexDirection:'row',
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
        color: colors.black,
        fontSize:14,
        fontWeight:600,
      },
      labelSelected: {
        color:colors.tabBarActiveItem,
        fontSize:14,
        fontWeight:600,
      },

    bottomSpace: {
      width:'100%',
      position:'absolute',
      bottom: 0,
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
      width: doubleItemsSize/2 - itemsInternalPadding,
      height: splittedBarHeigth - itemsInternalPadding * 2,

      borderRadius: 999, //splittedBarHeigth,
      borderWidth:1,
      borderColor: 'rgba(0,0,0, .07)',

      backgroundColor: colors.tabBarFocusDotAndroid,

      elevation:0,
      shadowColor: colors.black, 
      shadowOffset: {
        width: 2,
        height: 4, 
      },
      shadowOpacity: 0.35,
      shadowRadius: 8            

    },
    // FOCUSED DOT LIQUID (IOS)
    backgroundDotLiquid: {
      width: doubleItemsSize/2 - itemsInternalPadding,
      height: splittedBarHeigth - itemsInternalPadding * 2,

      borderRadius: 999, //splittedBarHeigth,
      borderWidth:.5,
      borderColor: 'rgba(255, 255, 255, .75)',
 
      backgroundColor: colors.tabBarFocusDotIos,

      elevation:4,
      shadowColor: colors.black, 
      shadowOffset: {
        width: 1,
        height: 2, 
      },
      shadowOpacity: 0.25,
      shadowRadius: 2            

    },
  });

  // BINARIO SCORRIMENTO DEL FOCUSED DOT
  const RailBeyond = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => { 
      let targetValue = 0;
      
      if (isHolydaysFocused) { // posizione sinistra
        targetValue = -1; 
        } else if (isPreferencesFocused) { // posizione centro
          targetValue = 0;  
        } else if (isIndexFocused) { // posizione destra
          targetValue = 1;  
      }

      Animated.timing(animatedValue, {
        toValue: targetValue,
        duration: 750,
        easing: Easing.elastic(1.2), // effetto elastico
        useNativeDriver: false,
      }).start();

    }, [isIndexFocused, isHolydaysFocused, isPreferencesFocused]);

    const translateX = animatedValue.interpolate({ // POSIZIONE IN BASE AI TAB
      inputRange: [-1, 0, 1],
      outputRange: [
        4, 
        doubleItemsSize/2 , // 48,
        splittedTotalWidth - splittedBarHeigth + 4 
      ], 
    });
    const scaleX = animatedValue.interpolate({ // VALORE ORIZZONTALE
      inputRange: [-1, -0.5, 0, 0.5, 1],
      outputRange: [1, 1.3, 1, 1.3, 1], // si allunga durante il movimento
    });
    const scaleY = animatedValue.interpolate({ // VALORE VERTICALE
      inputRange: [-1, -0.5, 0, 0.5,  1],
      outputRange: [1, 0.6, 1, 0.6, 1], // si schiaccia durante il movimento
    });
    const animatedWidth = animatedValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        doubleItemsSize/2 - itemsInternalPadding,
        doubleItemsSize/2 - itemsInternalPadding,
        splittedBarHeigth - itemsInternalPadding *2
      ],
    });

    return (
      <View style={styles.railBeyond}>
        {Platform.OS === 'ios' ?
          <Animated.View
        style={[ 
          styles.backgroundDotLiquid, 
          {transform: [{translateX}, {scaleX}, {scaleY}], width: animatedWidth}, 
        ]} />   
          :
          <Animated.View 
        style={[ 
          styles.backgroundDotPlain, 
          { transform: [{translateX}, {scaleX}, {scaleY}], width: animatedWidth },
        ]} /> 
        }
      </View>  
    );
  };

  const gradient = easeGradient({
    colorStops: {
      0: {color: 'rgba(0,0,0, .01)'},
      0.5: {color: 'rgba(0,0,0, .5)'},
      1: {color: 'rgba(0,0,0, 1)'}
    },
  });
  const gradientColors = gradient.colors;
  const locations = gradient.locations;

  return (
    <View style={styles.bottomSpace}>
      {/*  ===== SPLITTED TABBAR ===== */}
      {/* index   0: base che definisce le misure di tutto (splittedBase)
                  1: tondo opaco di sfondo doppio e singolo (doubleItems/singleItem)
                  2: binario di scorrimento del focused dot (RailBeyond)
                  3: contenitore trasparente identico a #0
                  4: touchables icons
                    */}     

      {/* BASE GENERALE WIDTH 100% DEI CONTENITORI */}   
      <View style={styles.splittedBase}>{/* index 0 */}       
        
        {/* BASE PULSANTE DOPPIO TRASPARENTE DENTRO AL QUALE WRAPPARE IL BLUR */}
        <View style={{
          width:doubleItemsSize,
          borderRadius: splittedBarHeigth,
          elevation:4,
          shadowColor: colors.black, 
          shadowOffset: {
            width: 2,
            height: 4, 
          },
          shadowOpacity: 0.35,
          shadowRadius: 8            
          }}>

            {/* BLUR DOPPIO */}
            <BlurView
              style={{ 
                width:'100%', 
                height:'100%', 
                borderRadius: splittedBarHeigth,
                overflow:'hidden',
                backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.60)',
                elevation:4,
                shadowColor: colors.black, // iOS shadow
                shadowOffset: {
                  width: 2,
                  height: 4, // Match elevation for iOS
                },
                shadowOpacity: 0.35,
                shadowRadius: 8// Match elevation for iOS             

              }}
              intensity={Platform.OS === 'ios' ? 16 : 6}
              experimentalBlurMethod="dimezisBlurView"
            /> 
        </View>
        
        {/* BASE PULSANTE SINGOLO TRASPARENTE DENTRO AL QUALE WRAPPARE IL BLUR */}
        <View style={{
          width:splittedBarHeigth,
          borderRadius: splittedBarHeigth,
          elevation:4,
          shadowColor: colors.black, 
          shadowOffset: {
            width: 2,
            height: 4, 
          },
          shadowOpacity: 0.35,
          shadowRadius: 8            
          }}>

            {/* BLUR SINGOLO */}
            <BlurView
              style={{ 
                width:'100%', 
                height:'100%', 
                borderRadius: splittedBarHeigth,
                overflow:'hidden',
                backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.60)',
                elevation:4,
                shadowColor: colors.black, 
                shadowOffset: {
                  width: 2,
                  height: 4, // Match elevation for iOS
                },
                shadowOpacity: 0.35,
                shadowRadius: 8// Match elevation for iOS             

              }}
              intensity={Platform.OS === 'ios' ? 16 : 6}
              experimentalBlurMethod="dimezisBlurView"
            /> 
        </View>

        {/* FOCUSED DOT ANIMATO */}
        <RailBeyond />  

      </View>

      <View style={styles.splittedBase}>{/* index 3 */}  
        <View style={styles.doubleItemsTransparent}>
          <TouchableOpacity 
            style={[styles.doubleItemsTouchable, {paddingLeft:12}]}
            key={'holydays'}
            onPress={onHolydaysPress}
            >
            <CalendarIcon />  
          </TouchableOpacity>
          <TouchableOpacity 
            key={'preferences'}
            onPress={onPreferencesPress}
            style={[styles.doubleItemsTouchable, {paddingRight:12}]}
            >
            <PrefIcon />  
          </TouchableOpacity>
        </View>
        <View style={styles.singleItemTransparent}>
          <TouchableOpacity style={[styles.singleItemTouchable, styles.singleItemTransparent]}
            key={'index'}
            onPress={onIndexPress} >
            <IndexIcon />        
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


