import { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  useColorScheme
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { holydayLabels as dataLabel,  } from '@/constants/dataLabel';
import { getLocales } from 'expo-localization';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

interface DatepickerSelectorInterface {
  windowWidth: number;
  buttonLeft: string; 
  buttonRight: string;
  buttonLeftAction: () => void;
  buttonRightAction: () => void; 
  sliderTargetValue: number;
  leftRadioButtonActive: boolean;
  rightRadioButtonActive: boolean;
}

/* ===========================================

                    MAIN

=========================================== */
const DatepicketSelector: React.FC<DatepickerSelectorInterface> = ({
  windowWidth,
  buttonLeft, 
  buttonRight,
  buttonLeftAction,
  buttonRightAction,
  sliderTargetValue,
  leftRadioButtonActive,
  rightRadioButtonActive,
  }) => {

  const colors = useThemeColors();
  const sliderHeigth = 48;
  const myLanguage: string = (getLocales()[0].languageTag).slice(0,2); // 'it', 'fr', 'de', ecc
  const animatedValue = useRef(new Animated.Value(1)).current; // VALORE INIZIALE, POI CAMBIA IN BASE AL TIPO DI CHIAMATA

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: sliderTargetValue,
      duration: 350,
      easing: Easing.elastic(1.5),
      useNativeDriver: false,
    }).start();
  }, [sliderTargetValue, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth / 2],
  });

  const styles = StyleSheet.create({
    container: {
      width: windowWidth,
      height: sliderHeigth,
      backgroundColor: colors.white,
      borderWidth:1,
      //borderBottomWidth:0,
      borderColor:colors.textRed,
      borderRadius: sliderHeigth,
      // borderTopLeftRadius: sliderHeigth/8,
      // borderTopRightRadius: sliderHeigth/8,
    },
    focusedDot: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      height: '100%',
      backgroundColor: colors.textRed,
      borderRadius: sliderHeigth,
      // borderTopLeftRadius: sliderHeigth/8,
      // borderTopRightRadius: sliderHeigth/8,
      transform: [{ translateX }],
      elevation:6,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 1,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.25,
      shadowRadius: 4 // Match elevation for iOS
    },
    touchables: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: sliderHeigth,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonOn: {
      fontSize:16,
      fontWeight: 600,
      color: colors.white,
    },
    buttonOff: {
      fontSize:16,
      fontWeight: 600,
      color: colors.blueBar,
    },
  });

  /* LOGICA DEI leftRadioButtonActive E rightRadioButtonActive IN ARRIVO
  true && true : nuovo item
  true - false ? edit giorno singolo 
  false - true : edit periodo
*/

// CAMBIO DIREZIONE DELL'ANIMAZIONE DEL FOCUSED 
if (leftRadioButtonActive && rightRadioButtonActive) { // CASO NUOVO ITEM
  
  console.log(`${leftRadioButtonActive}/${rightRadioButtonActive} = nuovo item: animazione sin <-- dx`);
  
} else if (leftRadioButtonActive && !rightRadioButtonActive) { // CASO EDIT GIORNO
  
  console.log(`${leftRadioButtonActive}/${rightRadioButtonActive} = edit giorno singolo: animazione sin <-- dx e disabilita puls dx`);
  animatedValue.setValue(1);
  sliderTargetValue = 0;
  
} else { // CASO EDIT PERIOD
  
  console.log(`${leftRadioButtonActive}/${rightRadioButtonActive} = edit periodo: animazione sin --> dx e disabilita puls sin`);
  animatedValue.setValue(0);
  sliderTargetValue = 1;
  
}


  return (
    <View style={{width:'100%', flexDirection:'column', alignItems:'center'}}>
      <View
        style={styles.container}>

        {/* FOCUSED SLIDE */}
        <Animated.View style={styles.focusedDot} />

        {/* WRAPPER PULSANTI */}
        <View style={styles.touchables}>
          <TouchableOpacity 
            disabled={!leftRadioButtonActive} // DISABILITATO SE VALORE = false (PRENDE L'INVERSO = true)
            onPress={buttonLeftAction}>
            <Text
              style={[
              !leftRadioButtonActive
                ? { color: colors.disabled }
                : sliderTargetValue === 0
                ? styles.buttonOn
                : styles.buttonOff
              ]}
            >
              {buttonLeft}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={!rightRadioButtonActive} // DISABILITATO SE VALORE = false (PRENDE L'INVERSO = true)
            onPress={buttonRightAction}>
            <Text 
              style={[
              !rightRadioButtonActive
                ? { color: colors.disabled }
                : sliderTargetValue === 1
                ? styles.buttonOn
                : styles.buttonOff
              ]}
            >
              {buttonRight}
            </Text>
          </TouchableOpacity>        
        </View>
      </View>
      <View style={{width:'100%', paddingVertical: 8, }}>                  
        <Text style={{textAlign:'center', color: colors.disabled}}>
          {sliderTargetValue === 0 ? dataLabel(myLanguage, 19) : dataLabel(myLanguage, 20)}
          </Text>
      </View>  
    </View>
  );
}

export default DatepicketSelector;

