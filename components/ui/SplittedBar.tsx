import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { getLocales,  } from 'expo-localization';
import { splittedBarLabel as splittedLabels } from '@/constants/dataLabel';
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

  const myLanguage = (getLocales()[0].languageTag).slice(0,2);
  const [splittedTotalWidth, setSplittedTotalWidth] = useState<number>(0);
  const windowWidth: number = Dimensions.get('window').width;
  
  useEffect( () => {
    if (windowWidth >= 320 && windowWidth <= 360) {
      setSplittedTotalWidth(windowWidth * 0.90);
    } else {
      setSplittedTotalWidth(350);
    }
  }, [windowWidth]);
      
  const splittedBarHeigth: number = 80; // ALTEZZA & LARGHEZZA DELL'ITEM SINGOLO E DI TUTTA LA BAR
  const doubleItemsSize: number = Math.trunc(splittedTotalWidth*.65); // LARGHEZZA DEL DOPPIO ITEM
  //const doubleItemsHeigth: number = Math.trunc(splittedBarHeigth * .8)

  const singleItemImageSize: string = '60%';
  const doubleItemsImageSize: string = '35%';
  const splittedFromBottom: number = Platform.OS === 'ios' ? 28 : 64;
  const itemsInternalPadding: number = 3;

  const [label, setLabel] = useState([splittedLabels(myLanguage,0), splittedLabels(myLanguage,1)]);

  // AGGIORNA QND CAMBIA LINGUA
  useEffect( () => {
    setLabel([splittedLabels(myLanguage,0), splittedLabels(myLanguage,1)]);
  }, [myLanguage]);

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
          <Text style={styles.labelSelected}>{label[0]}</Text> 
        </>
      )
    } else {
        return (
        <>
          <Image 
            style={styles.doubleItemsIcon} 
            source={ useColorScheme() === 'dark' ?
              require("@/assets/images/icon_calendar-off-dark.png") // ICONA BIANCA
              :
              require("@/assets/images/icon_calendar-off.png") // ICONA NERA
            }
          />
          <Text style={styles.labelNotSelected}>{splittedLabels(myLanguage,0)}</Text> 
        </>
        ) 
    }
  }
  const PrefIcon = () => { // PREFERENCES
    if (isPreferencesFocused) { 
      return (
        <>
          <Image style={styles.doubleItemsIcon} source={require("@/assets/images/icon_wand-on.png")} />
          <Text style={styles.labelSelected}>{splittedLabels(myLanguage,1)}</Text> 
        </>
      )
    } else {
        return (
        <>
          <Image 
            style={styles.doubleItemsIcon} 
            source={ useColorScheme() === 'dark' ?
              require("@/assets/images/icon_wand-off-dark.png")
              :
              require("@/assets/images/icon_wand-off.png")
            }
          />
          <Text style={styles.labelNotSelected}>{splittedLabels(myLanguage,1)}</Text> 
        </>
        ) 

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
    splittedBase: {
      position: 'absolute',
      width: splittedTotalWidth, // LARGHEZZA SPLITTED BAR
      height: splittedBarHeigth, // ALTEZZA 
      bottom:splittedFromBottom,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center', 
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
      backgroundColor: colors.tabBarBackgroundAndroid,
      elevation:12,         
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

    // POSIZIONE FOCUSED DOT
    const translateX = animatedValue.interpolate({ // POSIZIONE IN BASE AI TAB
      inputRange: [-1, 0, 1],
      outputRange: [
        (splittedBarHeigth/8) * -1,                 // INDEX        
        splittedTotalWidth/4 + itemsInternalPadding*2,       // HOLYDAYS
        splittedTotalWidth - splittedBarHeigth + 4  // PREFERENCES
      ], 
    });
    // PARAMETRI ALLUNGAMENTO ORIZZONTALE
    const scaleX = animatedValue.interpolate({ // VALORE ORIZZONTALE
      inputRange: [-1, -0.5, 0, 0.5, 1],
      outputRange: [.8, 1.3, .8, 1.3, 1], // si allunga durante il movimento
    });
    // PARAMETRI ALLUNGAMENTO VERTICALE
    const scaleY = animatedValue.interpolate({ // VALORE VERTICALE
      inputRange: [-1, -0.5, 0, 0.5,  1],
      outputRange: [.8, 1.2, .8, 1.2, 1], // si schiaccia durante il movimento
    });

    // EFFETTO ALLUNGAMENTO IN BASE AI PARAMETRI SOPRA
    const animatedWidth = animatedValue.interpolate({
      inputRange: [-1, -0.25, 0, 0.75, 1],
      outputRange: [
        doubleItemsSize*.64,
        doubleItemsSize*.5,
        doubleItemsSize*.64, // - itemsInternalPadding,
        doubleItemsSize*.5,
        splittedBarHeigth - itemsInternalPadding * 2 - 2
      ],
    });

    return (
      <View style={styles.railBeyond}>
        {Platform.OS === 'ios' ?
          <Animated.View
            style={[ styles.backgroundDotLiquid, {transform: [{translateX}, {scaleX}, {scaleY}], width: animatedWidth}, ]} />   
          :
          <Animated.View 
            style={[ styles.backgroundDotPlain, { transform: [{translateX}, {scaleX}, {scaleY}], width: animatedWidth }, ]} /> 
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
  // const gradientColors = gradient.colors;
  // const locations = gradient.locations;

  return (
    <View style={styles.bottomSpace}>

      {/*  ===== SPLITTED TABBAR ===== */}
      {/* z-index   0: base che definisce le misure di tutto (splittedBase)
                    1: tondo opaco di sfondo doppio e singolo (doubleItems/singleItem)
                    2: binario di scorrimento del focused dot (RailBeyond)
                    3: contenitore trasparente identico a #0
                    4: touchables icons
      */}     

      {/* 1) SFONDO GRIGIO SDOPPIATO PER I PULSANTI */}   
      <View style={styles.splittedBase}>      
        {/* BASE PULSANTE DOPPIO (CON BLUR SOVRAPPOSTO) */}
        <View style={{
          width:doubleItemsSize,
          borderRadius: splittedBarHeigth,
          elevation:18,
          shadowColor: colors.black, 
          shadowOffset: { width: 0, height: 8, },
          shadowOpacity: 0.45,
          shadowRadius: 12,   
          marginVertical:8, 
          borderWidth: 1, 
          borderColor: Platform.OS === 'ios' ? colors.tabBarBorderIos : colors.tabBarBorderAndroid,     
          }}>
            {/* BLUR DOPPIO 
                se iOS = blur
                se Android & light Theme = blur
                altrimenti no blur */}
            {Platform.OS === 'ios' ? 
              <BlurView style={styles.iosBlurView} intensity={24} /> 
            :
              useColorScheme() === 'light' ?
                <BlurView style={styles.iosBlurView} intensity={14} experimentalBlurMethod="dimezisBlurView" />
                :
                <View style={styles.androidBlurView} />
            }
        </View>

        {/* BASE PULSANTE SINGOLO (CON BLUR SOVRAPPOSTO) */}
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
          borderWidth: 1, 
          borderColor: colors.tabBarBorderIos,     
          }}>

            {/* BLUR SINGOLO */}
            {Platform.OS === 'ios' ? 
              <BlurView style={styles.iosBlurView} intensity={16} />               
            :
              useColorScheme() === 'light' ?
                <BlurView style={styles.iosBlurView} intensity={14} experimentalBlurMethod="dimezisBlurView" />
                :
                <View style={styles.androidBlurView} /> 
            }
        </View>        

        {/* 2) LIVELLO CON FOCUSED DOT ANIMATO */}
        <RailBeyond />  

      </View>
      
      {/* 3) WRAPPER SOVRAPPOSTO AI FONDINI CON DENTRO I PULSANTI */}
      <View style={styles.splittedBase}>{/* index 3 */}  
        {/* CONTENITORE DOPPIO */}
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

        {/* CONTENITORE SINGOLO */}
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


