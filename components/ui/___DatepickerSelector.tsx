import { useRef, useEffect } from 'react';
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
import { holydayLabels as dataLabel } from '@/constants/dataLabel';
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
  const myLanguage: string = (getLocales()[0].languageTag).slice(0, 2);
  const initialPosition = leftRadioButtonActive ? 0 : 1; // 0=sinistra, 1=destra

  // VARIABILE PER DEETERMINARE MODALITA' DI EDITING
  const isEditingMode = !leftRadioButtonActive || !rightRadioButtonActive;

  // Inizializza il valore animato
  const animatedValue = useRef(new Animated.Value(initialPosition)).current;

  useEffect(() => {
    // L'animazione parte solo se NON siamo in modalità di modifica
    if (!isEditingMode) {
      Animated.timing(animatedValue, {
        toValue: sliderTargetValue,
        duration: 350,
        easing: Easing.elastic(1.5),
        useNativeDriver: false,
      }).start();
    }
  }, [sliderTargetValue, animatedValue, isEditingMode]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth / 2],
  });

  const styles = StyleSheet.create({
    container: {
      width: windowWidth,
      height: sliderHeigth,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: sliderHeigth,
    },
    focusedDot: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      height: '100%',
      backgroundColor: colors.textRed,
      borderRadius: sliderHeigth,
      transform: [{ translateX }],
      elevation: 6,
      shadowColor: colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      // Nascondi la focusedDot in modalità di modifica
      opacity: isEditingMode ? 0 : 1,
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
      fontSize: 16,
      fontWeight: '600',
      color: colors.white,
    },
    buttonOff: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.blueBar,
    },
  });

  // DIDASCALIA SOTTO LO SWITCH
  let labelText = '';
  if (isEditingMode) {
    if (leftRadioButtonActive) {
      labelText = dataLabel(myLanguage, 19);
    } else {
      labelText = dataLabel(myLanguage, 20);
    }
  } else {
    labelText = sliderTargetValue === 0 ? dataLabel(myLanguage, 19) : dataLabel(myLanguage, 20);
  }

  return (
    <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.container}>
        <Animated.View style={styles.focusedDot} />
        <View style={styles.touchables}>
          {/* PULSANTE SIN */}
          <TouchableOpacity
            disabled={!leftRadioButtonActive}
            onPress={buttonLeftAction}>
            <Text
              style={[
                isEditingMode ?
                  { color: leftRadioButtonActive ? colors.blueBar : colors.disabled }
                  : 
                  sliderTargetValue === 0 ? styles.buttonOn : styles.buttonOff
                ]}
                >
              {buttonLeft}
            </Text>
          </TouchableOpacity>
          {/* PULSANTE DX */}
          <TouchableOpacity
            disabled={!rightRadioButtonActive}
            onPress={buttonRightAction}>
            <Text
              style={[
                isEditingMode
                  ? { color: rightRadioButtonActive ? colors.blueBar : colors.disabled }
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
      <View style={{ width: '100%', paddingVertical: 8 }}>
        <Text style={{ textAlign: 'center', color: colors.disabled }}>
          {labelText}
        </Text>
      </View>
    </View>
  );
};

export default DatepicketSelector;