import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// GESTIONE COLORI
const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
  };
  
// VALORI DROPDOWN DURATA PONTE
const countryNames = [
  { label: 'Italia', value: 'it-IT' },
  { label: 'Svizzera', value: 'ch-CH' },
  { label: 'Austria', value: 'de-AT' },
  { label: 'Francia', value: 'fr-FR' },
  { label: 'Spagna', value: 'es-ES' },
  { label: 'Portogallo', value: 'pt-PT' },
  { label: 'Germania', value: 'de-DE' },
  { label: 'Regno Unito', value: 'en-GB' },
  { label: 'Irlanda', value: 'en-IE' },
  { label: 'Belgio', value: 'be-BE' },
  { label: 'Olanda', value: 'nl-NL' },
];

interface DropdownCountryProps {
  selectedValue: string; // Il valore selezionato arriva come stringa (es. 'it-IT')
  onChange: (value: string) => void;
}

/* ================================================================ */
const DropdownCountry: React.FC<DropdownCountryProps> = ({selectedValue, onChange}) => {

  const { 
        myCountry, 
        } = useHolydays();

  const [value, setValue] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);
  const colors = useThemeColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    dropdown: {
      height: 36,
      minWidth: 180,
      // borderColor: colors.disabled,
      borderWidth: 0,
      borderRadius: 24,
      paddingHorizontal: 16,
      //paddingVertical:16,
      color: colors.text,
      backgroundColor: colors.dropdownBackground,
      marginBottom: 9,
      // elevation:2,
      // shadowColor: colors.text,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.22,
      // shadowRadius: 2.22,
    },
    icon: {
      marginRight: 8,
    },
    label: {
      position: 'absolute',
      color: colors.text,
      backgroundColor: colors.cardBackground,
      left: 22,
      top: 6,
      zIndex: 9,
      paddingHorizontal: 8,
      fontSize: 12,
      
    },
    placeholderStyle: {
      fontSize: 16,
      color: colors.text,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: colors.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  useEffect ( () => {
    setValue(myCountry);
    // console.log('(DropdownCountry.tsx) *useEffect* --> è cambiato myCountry');
  }, [myCountry]);

  return (
    <View style={styles.container}>
      {/*renderLabel()*/}
      <Dropdown
        value={value}       // <-- VALORE DI DEFAULT
        mode={'modal'}
        // search           // <-- BUCA DI RICERCA
        dropdownPosition={'auto'}
        style={[styles.dropdown, isFocus && {borderColor: colors.disabled}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countryNames}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Seleziona' : '...'}
        // searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChange(item.value); // --> PASSA IL VALORE A holydays.tsx
        }}
      />
    </View>
  );
};

export default DropdownCountry;

