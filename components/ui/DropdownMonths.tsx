import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
//import { IconSymbol } from '@/components/ui/IconSymbol';
// import { PREFERENCES } from '@/app/(tabs)/preferences';
import useLocalizationData from '@/app/data/data';
  const { months } = useLocalizationData();

// GESTIONE COLORI
const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
  };
  
interface DropdownMonthsProps {
  selectedValue: string; // Il valore selezionato arriva come una stringa
  onChange: (value: string) => void;
}

//const label = 'Primo giorno della settimana';

/* ================================================================ 
COMPLICATISSIMO: A QUESTO COMPONENT E' STATA AGGIUNTA LA CAPACITA' 
DI ESPORTARE IL VALORE DEL MESE SELEZIONATO (React.FC) */
const DropdownMonths: React.FC<DropdownMonthsProps> = ({ selectedValue, onChange }) => {

  const [value, setValue] = useState( parseInt(selectedValue) || 0 ); // DEFAULT: O IL VAL. INTERO DI selectedValue OPPURE 0
  const [isFocus, setIsFocus] = useState(false);
  const colors = useThemeColors();
  const styles:any = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    dropdown: {
      //height: 84,
      minWidth: 200,
      // borderColor: colors.disabled,
      borderWidth: 0,
      // borderRadius: 24,
      // paddingHorizontal: 16,
      // paddingVertical:16,
      color: 'rgba(51, 51, 51, .5)', // NERO 50%',
      backgroundColor: colors.white,
      marginBottom: 4,
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
    // label: {
    //   position: 'absolute',
    //   color: colors.black,
    //   backgroundColor: colors.cardBackground,
    //   left: 22,
    //   top: 6,
    //   zIndex: 999,
    //   paddingHorizontal: 8,
    //   fontSize: 12,
    // },
    placeholderStyle: {
      fontSize: 16,
      color: 'rgba(51,51, 51, .25)', // NERO 25%
    },
    selectedTextStyle: {
      fontSize: 16,
      color: colors.black,
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
      <Dropdown
        value={value} // VALORE DI DEFAULT
        mode={'modal'}
        // search   // BUCA DI RICERCA
        dropdownPosition={'auto'}
        style={[styles.dropdown, isFocus && { borderColor: colors.disabled }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={ months.map((month, index) => ({
                label: month.label.charAt(0).toUpperCase() + month.label.slice(1),
                value: index,
              })) }
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Mese' : '...'}
        // searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={ item => {
          setValue(item.value);
          setIsFocus(false);
          onChange(item.value.toString()); // Passa il valore selezionato come stringa
          // console.log('Selected month:', item.value); // Restituisce il valore selezionato
        }}
      />
    </View>
  );
};

export default DropdownMonths;

