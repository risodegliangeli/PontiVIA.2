import { Colors } from '@/constants/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
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
  const ListItemStyle = () => {
    // SELECTED = BLUE
    if (isHolydaysFocused) {
      return (
        <TouchableOpacity 
          key={'holydays'}
          onPress={onHolydaysPress}
          style={styles.barItem} >
          <Image 
            source={require('@/assets/images/icon_calendar-on.png')} 
            style={{width:25, height:22, marginTop: 8,}} />
          <Text style={styles.labelSelected}>Le mie date</Text>
        </TouchableOpacity>
      );
    } else {
      // NOT SELECTED
      return (
        <TouchableOpacity
          key={'holydays'}
          onPress={onHolydaysPress}
          style={styles.barItem} >
          {useColorScheme() === 'light' ?
            <Image 
            source={require('@/assets/images/icon_calendar-off.png')} 
            style={{width:25, height:22, marginTop: 8,}} />
            :
            <Image 
            source={require('@/assets/images/icon_calendar-off-dark.png')} 
            style={{width:25, height:22, marginTop: 8,}} />
          }
          <Text style={styles.labelNotSelected}>Le mie date</Text>
        </TouchableOpacity>
      );
    }
  }
  const GirlItemStyle = () => {
    if (isIndexFocused) {
      // SELECTED = BLUE
      return (
        <TouchableOpacity 
          key={'index'}
          onPress={onIndexPress}
          style={styles.barItem} >
          <Image 
            source={require('@/assets/images/icon_girl-on.png')} 
            style={{width:40, height:40, }}
          />          
        </TouchableOpacity>
      );
    } else {
      // NOT SELECTED
      return (
        <TouchableOpacity
          key={'holydays'}
          onPress={onIndexPress}
          style={styles.barItem} >
          {useColorScheme() === 'light' ?
            <Image 
            source={require('@/assets/images/icon_girl-off.png')} 
            style={{width:40, height:40,}} />
            :
            <Image 
            source={require('@/assets/images/icon_girl-off-dark.png')} 
            style={{width:40, height:40,}} />
          }          
        </TouchableOpacity>
      );
    }
  }
  const PrefsItemStyle = () => {
    if (isPreferencesFocused) {
      // SELECTED = BLUE
      return (
        <TouchableOpacity 
          key={'holydays'}
          onPress={onPreferencesPress}
          style={styles.barItem} >
          <Image 
            source={require('@/assets/images/icon_wand-on.png')} 
            style={{width:24, height:24, marginTop: 4,}} />
          <Text style={styles.labelSelected}>Filtri</Text>
        </TouchableOpacity>
      );
    } else {
      // NOT SELECTED
      return (
        <TouchableOpacity
          key={'holydays'}
          onPress={onPreferencesPress}
          style={styles.barItem} >

          {useColorScheme() === 'light' ?
            <Image 
            source={require('@/assets/images/icon_wand-off.png')} 
            style={{width:24, height:24, marginTop:4,}} />
            :
            <Image 
            source={require('@/assets/images/icon_wand-off-dark.png')} 
            style={{width:24, height:24, marginTop:4,}} />
          }          




          {/* <Image 
          source={require('@/assets/images/icon_wand-off.png')} 
          style={{width:24, height:24,}} /> */}
          <Text style={styles.labelNotSelected}>Filtri</Text>
        </TouchableOpacity>
      );
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
    bottomSpace: {
      flex:1,
      width:'100%',
      position:'absolute',
      bottom: 28,
      alignItems:'center',
      backgroundColor:'transparent',
    },
    base: {
      width: 300,
      height:64,
      borderRadius:16,
      backgroundColor: Platform.OS === 'ios' ? colors.tabBarBackgroundIos : colors.tabBarBackgroundAndroid,
      opacity: 1,
      borderWidth: 2,
      borderColor: Platform.OS === 'ios' ? colors.tabBarBorderIos : colors.tabBarBorderAndroid,
      elevation:6,
      // OMBRA IOS
      shadowColor: colors.black, 
      shadowOffset: { 
      width: 2, 
      height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
    barItem: {
      flex:1,
      minWidth:100,
      height:'100%',
      alignItems:'center',
      justifyContent:'space-evenly',
    },
    labelNotSelected: {
      color: colors.tabBarInactiveItem,
      fontSize:14,
      fontWeight:600,
    },
    labelSelected: {
      color:colors.tabBarActiveItem,
      fontSize:14,
      fontWeight:600,
    },
    railBeyond: {
      position:'absolute',
      top:0,
      left:0,
      width: '100%',
      height:'100%',
      paddingVertical: 3,
      paddingHorizontal: 4,
      flex:1,
    },
    railOver: {
      position: 'absolute',
      zIndex:9,
      top:0,
      left:0,
      flex:1,
      width: '100%',
      height: '100%',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 0,
    },
    alignRight:{
      flexDirection:'row',
      justifyContent:'flex-end',
    },
    alignCenter:{
      flexDirection:'row',
      justifyContent:'center',
    },
    alignLeft:{
      flexDirection:'row',
      justifyContent:'flex-start',
    },
    // SLIDER SEMPLICE
    backgroundDotPlain: {
      width: 95,
      height: '100%',
      borderRadius: 12,
      backgroundColor: colors.tabBarFocusDotAndroid,
    },
    // // SLIDER LIQUID
    backgroundDotLiquid: {
      width: 95,
      height: '100%',
      borderRadius: 12,
      borderWidth:.25,
      backgroundColor: colors.tabBarFocusDotIos,
      borderColor: 'rgba(255, 255, 255, 1)',
      //elevation:12, 
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.15,
      shadowRadius: 8// Match elevation for iOS 
    },
  });

  const RailBeyond = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => { 
      let targetValue = 0;
      
      if (isHolydaysFocused) {
        targetValue = -1; // posizione sinistra
      } else if (isIndexFocused) {
        targetValue = 0;  // posizione centro
      } else if (isPreferencesFocused) {
        targetValue = 1;  // posizione destra
      }

      Animated.timing(animatedValue, {
        toValue: targetValue,
        duration: 500,
        easing: Easing.elastic(1.2), // effetto mercurio elastico
        useNativeDriver: true,
      }).start();
    }, [isHolydaysFocused, isIndexFocused, isPreferencesFocused]);

    const translateX = animatedValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 97, 194], // adattata in base ai tab
    });
    const scaleX = animatedValue.interpolate({
      inputRange: [-1, -0.5, 0, 0.5, 1],
      outputRange: [1, 1.3, 1, 1.3, 1], // si allunga durante il movimento
    });
    const scaleY = animatedValue.interpolate({
      inputRange: [-1, -0.5, 0, 0.5,  1],
      outputRange: [1, 0.75, 1, 0.75, 1], // si schiaccia durante il movimento
    });
    
    return (
      <View style={[styles.railBeyond, {borderWidth:0}]}>
        {Platform.OS === 'ios' ? 
          <Animated.View 
            style={[ styles.backgroundDotLiquid, {transform: [{translateX}, {scaleX}, {scaleY}]} ]} /> 
          :
          <Animated.View 
            style={[ styles.backgroundDotPlain, {transform: [{translateX}, {scaleX}, {scaleY}]} ]} /> 
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
      {/* GRADIENT-BLUR AL BOTTOM DELLO SCHERMO */}
      <MaskedView
        maskElement={
          <LinearGradient
            locations={locations as [number, number, ...number[]]}
            colors={gradientColors as [string, string, ...string[]]}
            style={[StyleSheet.absoluteFill, {height:64}]} />
          }
        style={{
          position: 'absolute', 
          left:0, 
          bottom:-48, 
          width:'100%', 
          height:64, 
          }} >
        <BlurView 
          experimentalBlurMethod="dimezisBlurView"
          intensity={60}
          tint={useColorScheme() === 'light' ? 'light' : 'dark'}
          style={{
            position:'absolute', 
            top:0, bottom:0, 
            height:128, 
            width:'100%', 
          }} />
      </MaskedView>       

      {/* BOTTOMBAR CON LIVELLO DI BLUR SOTTOSTANTE */}
      
      
      {/* BLUR (SOLO PER ios) */}
      <View style={{
        flex:1,
        width:'100%',
        height:64,
        alignItems:'center',
      }}>

        {/* BLUR SOLO PER ios */}
        {Platform.OS === 'ios' ?
          <View style={{
            width:300,
            height:64,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            <BlurView
              style={{ 
                position: 'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%',
              }}
              experimentalBlurMethod="dimezisBlurView"
              intensity={30}
            /> 
          </View>
        : 
          null
        }

        {/* NAVIGAZIONE */}
        <View style={[styles.base, {position:'absolute'}]}>
          <RailBeyond/> 
          <View style={styles.railOver}>
            <ListItemStyle/>
            <GirlItemStyle/>
            <PrefsItemStyle/>
          </View>
        </View>


      </View>
    </View>
  );
}


