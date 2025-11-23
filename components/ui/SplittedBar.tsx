import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
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
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT VARIABILI
// import { easeGradient } from 'react-native-easing-gradient';
//import { getLocales,  } from 'expo-localization';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
export default function CustomTabBar(props: any) {
  const { route, focused: isFocused, event, state, descriptors, navigation } = props;

  // RICEVE VARIABILI DAL CONTEXT
  const { 
    myLanguage
  } = useHolydays();

  // AGGIORNA QND CAMBIA LINGUA
  useEffect( () => {
    setLabel([splittedLabels(myLanguage,0), splittedLabels(myLanguage,1)]);
  }, [myLanguage]);
    
  // GESTIONE DIMENSIONI PAGINA + TABBAR
  const [splittedTotalWidth, setSplittedTotalWidth] = useState<number>(350);
  useEffect(() => {
    const updateWidth = () => {
      const { width } = Dimensions.get('window');
      if (width >= 320 && width <= 360) {
        setSplittedTotalWidth(Math.trunc(width * 0.90));
      } else {
        setSplittedTotalWidth(350);
      }
    };
  updateWidth(); // chiama subito
  const subscription = Dimensions.addEventListener('change', updateWidth);
  return () => subscription?.remove();
  }, []); 

  // const windowWidth: number = Dimensions.get('window').width;
  // useEffect( () => {
  //   if (windowWidth >= 320 && windowWidth <= 360) {
  //     setSplittedTotalWidth(windowWidth * 0.90);
  //   } else {
  //     setSplittedTotalWidth(350);
  //   }
  // }, [windowWidth]);
      
  const splittedBarHeigth: number = 80; // ALTEZZA DI TUTTA LA BAR (E LARGHEZZA DELL'ITEM SINGOLO)
  const doubleItemsSize: number = Math.trunc(splittedTotalWidth * .65);   // LARGHEZZA DEL DOPPIO ITEM
  
  const singleItemImageSize: number = Math.trunc(splittedBarHeigth * .6);   // IMMAGINE SINGOLO ITEM
  const doubleItemsImageSize: number = Math.trunc(splittedBarHeigth * .35); // IMMAGINE DOPPIO ITEM
  
  const splittedFromBottom: number = Platform.OS === 'ios' ? 28 : 64;
  const itemsInternalPadding: number = 3;

  // LABEL PULSANTI
  const [label, setLabel] = useState([splittedLabels(myLanguage,0), splittedLabels(myLanguage,1)]);

  // AGGIORNA QND CAMBIA LINGUA
  useEffect( () => {
    setLabel([splittedLabels(myLanguage,0), splittedLabels(myLanguage,1)]);
  }, [myLanguage]);

  // GESTIONE COLORI
  const colors = useThemeColors();  
  const colorScheme = useColorScheme();   // ← UNA SOLA VOLTA QUI, FUORI DA TUTTO
  const isLight = colorScheme === 'light';

  // ASSEGNA LE SCHEDE ALLE COSTANTI
  const holydaysRouteIndex = state.routes.findIndex(route => route.name === 'holydays');
  const indexRouteIndex = state.routes.findIndex(route => route.name === 'index');
  const preferencesRouteIndex = state.routes.findIndex(route => route.name === 'preferences');

  // DETERMINA SE CIASCUNA SCHEDA E' ATTIVA
  const isHolydaysFocused = state.index === holydaysRouteIndex;
  const isIndexFocused = state.index === indexRouteIndex;
  const isPreferencesFocused = state.index === preferencesRouteIndex;

  // A SECONDA DELLA TAB ATTIVA GENERA LA ROW COI PULSANTI
  const IndexIcon = () => (
    <Image
      style={styles.singleItemIcon}
      source={
        isIndexFocused
          ? isLight
            ? require("@/assets/images/icon_girl-on.png")
            : require("@/assets/images/icon_girl-on-dark.png")
          : isLight
            ? require("@/assets/images/icon_girl-off.png")
            : require("@/assets/images/icon_girl-off-dark.png")
      }
    />
  );

  const CalendarIcon = () => (
    <>
      <Image
        style={styles.doubleItemsIcon}
        source={
          isHolydaysFocused
            ? isLight
              ? require("@/assets/images/icon_calendar-on.png")
              : require("@/assets/images/icon_calendar-on-dark.png")
            : isLight
              ? require("@/assets/images/icon_calendar-off.png")
              : require("@/assets/images/icon_calendar-off-dark.png")
        }
      />
      <Text style={isHolydaysFocused ? styles.labelSelected : styles.labelNotSelected}>
        {splittedLabels(myLanguage, 0)}
      </Text>
    </>
  );

  const PrefIcon = () => (
    <>
      <Image
        style={styles.doubleItemsIcon}
        source={
          isPreferencesFocused
            ? isLight
              ? require("@/assets/images/icon_wand-on.png")
              : require("@/assets/images/icon_wand-on-dark.png")
            : isLight
              ? require("@/assets/images/icon_wand-off.png")
              : require("@/assets/images/icon_wand-off-dark.png")
        }
      />
      <Text style={isPreferencesFocused ? styles.labelSelected : styles.labelNotSelected}>
        {splittedLabels(myLanguage, 1)}
      </Text>
    </>
  );

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
    },
    iosBlurView: {
      width:'100%', 
      height:'100%', 
      borderRadius: 999, //splittedBarHeigth,
      overflow:'hidden',
      borderWidth: 1,
      borderColor: 'rgba(210, 210, 210, .5)',
      backgroundColor: colors.tabBarBackgroundIos,
      shadowColor: colors.black, 
      shadowOffset: {width: 0, height: 8, }, 
      shadowOpacity: 0.35,
      shadowRadius: 8,             
    },
    androidBlurView: {
      width:'100%', 
      height:'100%', 
      borderRadius: 999, //splittedBarHeigth,
      overflow:'hidden',
      backgroundColor: colors.tabBarBackgroundAndroid,
      elevation:18,         
    },
    doubleItemsTransparent: {
      width: doubleItemsSize,
      height: splittedBarHeigth*.90,
      flexDirection:'row',
    },
    doubleItemsTouchable: {
      flex:2, 
      flexDirection:'column',
      alignItems:'center',      // HOR
      justifyContent:'center',  // VERT
    },
    doubleItemsIcon: {
      width: doubleItemsImageSize, 
      height: doubleItemsImageSize, 
    },
    doubleItemsLabel: {
      fontSize:12, 
      fontWeight:600, 
      color:'#0088ff'
    },
    labelNotSelected: {
      color: !isLight ? colors.white : colors.black,
      fontSize:14,
      fontWeight:600,
    },
    labelSelected: {
      color: colors.blueBar, // BLU
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
      shadowOffset: { width: 0, height: 8, },
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
      
      if (isHolydaysFocused) {              // posizione sinistra
        targetValue = -1; 
        } else if (isPreferencesFocused) {  // posizione centro
          targetValue = 0;  
        } else if (isIndexFocused) {        // posizione destra
          targetValue = 1;  
      }

      Animated.timing(animatedValue, {
        toValue: targetValue,
        duration: 750,
        easing: Easing.elastic(1.2),        // effetto elastico
        useNativeDriver: false,
      }).start();

    }, [isIndexFocused, isHolydaysFocused, isPreferencesFocused]);

    // POSIZIONE FOCUSED DOT
    const translateX = animatedValue.interpolate({ // POSIZIONE IN BASE AI TAB
      inputRange: [-1, 0, 1],
      outputRange: [
        (splittedBarHeigth/8) * -1,                     // INDEX        
        splittedTotalWidth/4 + itemsInternalPadding*2,  // HOLYDAYS
        splittedTotalWidth - splittedBarHeigth + 4      // PREFERENCES
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
        doubleItemsSize*.64, 
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

  // const gradient = easeGradient({
  //   colorStops: {
  //     0: {color: 'rgba(0,0,0, .01)'},
  //     0.5: {color: 'rgba(0,0,0, .5)'},
  //     1: {color: 'rgba(0,0,0, 1)'}
  //   },
  // });
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
              isLight ?
                <View style={[styles.androidBlurView, { backgroundColor: 'rgba(255,255,255,0.65)' }]} />
                :
                <View style={[styles.androidBlurView, { backgroundColor: 'rgba(0,0,0,0.8)' }]} /> 
            }
        </View>

        {/* BASE PULSANTE SINGOLO (CON BLUR SOVRAPPOSTO) */}
        <View style={{
          width:splittedBarHeigth,
          borderRadius: splittedBarHeigth,
          elevation:18,
          shadowColor: colors.black, 
          shadowOffset: { width: 0, height: 8, },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          borderWidth: 1, 
          borderColor: Platform.OS === 'ios' ? colors.tabBarBorderIos : colors.tabBarBorderAndroid,
          }}>

            {/* BLUR SINGOLO */}
            {Platform.OS === 'ios' ? 
              <BlurView style={styles.iosBlurView} intensity={24} />               
            :
              isLight ?
                <View style={[styles.androidBlurView, { backgroundColor: 'rgba(255,255,255,0.65)' }]} />
                :
                <View style={[styles.androidBlurView, { backgroundColor: 'rgba(0,0,0,0.8)' }]} /> 
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


