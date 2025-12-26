
import { Colors } from '@/constants/Colors';
import React, { useState, useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { dataLabel } from '@/constants/dataLabel';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT


const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
};

interface DropDownLookaheadProps {
    selectedValue: number;
    onChange: (value: number) => void;
}

const DropdownLookahead: React.FC<DropDownLookaheadProps> = ({ selectedValue, onChange }) => {

    const {
        myLanguage,
    } = useHolydays();

    const data = [
        { label: dataLabel(myLanguage, 22), value: 7 },
        { label: dataLabel(myLanguage, 23), value: 14 },
        { label: dataLabel(myLanguage, 24), value: 30 },
        { label: dataLabel(myLanguage, 25), value: 60 },
    ];

    const [value, setValue] = useState(selectedValue);
    const [isFocus, setIsFocus] = useState(false);
    const colors = useThemeColors();
    const styles: any = StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
            padding: 0,
        },
        dropdown: {
            height: 64,
            borderRadius: 16,
            paddingHorizontal: 16,
            color: colors.textRed,
            backgroundColor: 'rgba(255,255,255,.25)',
            marginBottom: 24,
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

    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue]);

    return (
        <Dropdown
            value={value}
            dropdownPosition={'auto'}
            style={[styles.dropdown, isFocus && { borderColor: colors.disabled }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Seleziona' : '...'}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
                onChange(item.value);
            }}
        />
    );
};

export default DropdownLookahead;
