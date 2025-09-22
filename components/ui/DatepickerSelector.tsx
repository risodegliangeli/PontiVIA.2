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
  sliderTargetValue
  }) => {

  const colors = useThemeColors();
  const animatedValue = useRef(new Animated.Value(1)).current;
  const sliderHeigth = 48;

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

  return (
      <View
        style={{
          //marginTop: 100,
          width: windowWidth,
          height: sliderHeigth,
          backgroundColor: colors.white,
          borderWidth:1,
          borderBottomWidth:0,
          borderColor:colors.textRed,
          borderTopLeftRadius: sliderHeigth/8,
          borderTopRightRadius: sliderHeigth/8,
        }}>
        {/* FOCUSED SLIDE */}
        <Animated.View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            height: '100%',
            backgroundColor: colors.textRed,
            borderTopLeftRadius: sliderHeigth/8,
            borderTopRightRadius: sliderHeigth/8,
            transform: [{ translateX }],
            elevation:6,
            shadowColor: colors.black, // iOS shadow
            shadowOffset: {
              width: 1,
              height: 2, // Match elevation for iOS
            },
            shadowOpacity: 0.25,
            shadowRadius: 4 // Match elevation for iOS
          }}>
        </Animated.View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: sliderHeigth,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={buttonLeftAction}>
            <Text style={sliderTargetValue === 0 ? styles.buttonOn : styles.buttonOff}>
              {buttonLeft}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={buttonRightAction}>
            <Text style={sliderTargetValue === 1 ? styles.buttonOn : styles.buttonOff}>
              {buttonRight}
            </Text>
          </TouchableOpacity>        
        </View>
      </View>
  );
}

export default DatepicketSelector;

