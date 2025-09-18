import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// GESTIONE COLORI
const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
  };
  
// VALORI DROPDOWN DURATA PONTE
const countryNames = [
  { label: 'Italia', value: 'it-IT', flag: '🇮🇹' },
  { label: 'Switzerland', value: 'ch-CH', flag: '🇨🇭'},
  { label: 'Österreich', value: 'de-AT', flag: '🇦🇹' },
  { label: 'France', value: 'fr-FR', flag: '🇫🇷' },
  { label: 'España', value: 'es-ES', flag: '🇪🇸'},
  { label: 'Portugal', value: 'pt-PT', flag: '🇵🇹' },
  { label: 'Deutschland', value: 'de-DE', flag: '🇩🇪' },
  { label: 'UK', value: 'en-GB', flag: '🇬🇧' },
  { label: 'Éire', value: 'en-IE', flag: '🇮🇪' },
  { label: 'Belgium', value: 'be-BE', flag: '🇧🇪' },
  { label: 'Nederland', value: 'nl-NL', flag: '🇳🇱' },
  { label: 'Hrvatska', value: 'hr-HR', flag: '🇵🇹', disable: true },
  { label: 'Ελλάδα', value: 'gr-GR', flag: '🇬🇷', disable: true },
];

interface DropdownCountryProps {
  selectedValue: string; // Il valore selezionato arriva come stringa (es. 'it-IT')
  onChange: (value: string) => void;
}

/* ================================================================ */
const DropdownCountry: React.FC<DropdownCountryProps> = ({selectedValue, onChange}) => {




  const renderItem = (item) => {
    return (
      <View style={[
        styles.item, 
        item.disable && styles.disabledItem
      ]}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={[
          styles.countryName, 
          item.disable && styles.disabledText
        ]}>
          {item.label}
        </Text>
      </View>
    );
  };



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

      item: {
    paddingHorizontal: 17,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  disabledItem: {
    opacity: 0.5,
    backgroundColor: '#f8f8f8',
  },
  disabledText: {
    color: '#999',
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
        data={countryNames}  //{countryNames}
        maxHeight={300}
        labelField="label"
        valueField="value"
        renderItem={renderItem}
        placeholder={!isFocus ? 'Select' : '...'}
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

