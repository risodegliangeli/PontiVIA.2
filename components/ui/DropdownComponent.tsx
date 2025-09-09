import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
  };
  
const data = [
  { label: '1 giorno', value: 1 },
  { label: '2 giorni', value: 2 },
  { label: '3 giorni', value: 3 },
];

interface DropDownComponentProps{
  selectedValue: number; // Il valore selezionato arriva come stringa (es. '2')
  onChange: (value: number) => void;
}

/* ================================================================ */
const DropdownComponent: React.FC<DropDownComponentProps> = ({selectedValue, onChange}) => {
  const [value, setValue] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);
  const colors = useThemeColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    dropdown: {
      height: 64,
      // borderColor: colors.disabled,
      borderWidth: 0,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical:16,
      color: colors.textRed,
      backgroundColor: colors.cardBackground,
      marginBottom: 24,
      // elevation: 2,

      // shadowColor: colors.text, // iOS shadow
      // shadowOffset: {
      //   width: 0,
      //   height: 2, // Match elevation for iOS
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 2, // Match elevation for iOS
    },
    icon: {
      marginRight: 5,
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
  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        value={value} // VALORE DI DEFAULT
        // mode={'modal'}
        // search   // BUCA DI RICERCA
        dropdownPosition={'auto'}
        style={[styles.dropdown, isFocus && { borderColor: colors.disabled }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
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
          console.log('(DropdownComponent) utente sceglie durata:', item.value);
          onChange( item.value );
        }}
      />
    </View>
  );
};

export default DropdownComponent;

