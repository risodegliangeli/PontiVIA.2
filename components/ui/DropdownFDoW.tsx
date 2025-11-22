import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
//import { PREFERENCES } from '@/app/(tabs)/preferences';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};
  
const countryNames = [
  { label: 'Lunedì', value: 1 },
  { label: 'Domenica', value: 6 },
];

interface DropDownFDOWProps{
  selectedValue: number; // Il valore selezionato arriva come stringa (es. '2')
  onChange: (value: number) => void;
}

/* ================================================================ */
const DropdownFDOW: React.FC<DropDownFDOWProps> = ({selectedValue, onChange}) => {
  const [value, setValue] = useState(selectedValue );
  const [isFocus, setIsFocus] = useState(false);
  const colors = useThemeColors();
  const styles:any = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    dropdown: {
      height: 64,
      width: '100%',
      // borderColor: colors.disabled,
      borderWidth: 0,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical:16,
      color: colors.text,
      backgroundColor: colors.cardBackground,
      marginBottom: 24,
      // elevation:2,
      // shadowColor: colors.text,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.22,
      // shadowRadius: 2.22,
    },
    // icon: {
    //   marginRight: 5,
    // },
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
        //disable={true}
        value={value} // VALORE DI DEFAULT
        // mode={'modal'}
        // search   // BUCA DI RICERCA
        dropdownPosition={'auto'}
        style={[styles.dropdown, isFocus && { borderColor: colors.disabled }]}
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
          console.log('(DropdownFDOW) utente sceglie primo giorno della settimana:', item.value);
          onChange(item.value);
        }}
      />
    </View>
  );
};

export default DropdownFDOW;

