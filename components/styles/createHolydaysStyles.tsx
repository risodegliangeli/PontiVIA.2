import { Dimensions, Platform, StyleSheet, useColorScheme } from "react-native";
import { Colors } from '@/constants/Colors';

// GESTIONE COLORI
const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
};

const createHolydaysStyles = () => {

    const colors = useThemeColors();
    const colorScheme = useColorScheme();
    const isLight = colorScheme === 'light';

    // CALCOLO DINAMICO MARGINE ESTERNO DELLE CARD
    const width = Dimensions.get("window").width;
    const sideMargin = Math.trunc(width * .025); // MARGINE LATERALE

    const styles: any = StyleSheet.create({
        // SFONDO
        image: {
            flex: 1,
            justifyContent: 'center',
            width: '100%',
        },
        // CONTENITORE PRINCIPALE
        container: {
            width: '100%',
            backgroundColor: 'transparent',
            paddingTop: 90,
            maxWidth: 550,
        },
        // TITOLO PAGINA
        sectionTitle: {
            fontSize: 24,
            fontWeight: '600',
            textAlign: 'center',
            color: colors.text,
        },
        // WRAPPER TITOLO PAGINA
        sectionContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
        },
        // TITOLO CARD
        listTitle: {
            color: colors.text,
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 10,
            paddingBottom: 12,
        },
        // CARD
        listItem: {
            backgroundColor: colors.cardBackground,
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 24,
            marginBottom: 24,
            // marginLeft:12,
            // marginRight:12,
            marginHorizontal: sideMargin,
        },
        holidayRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
        },
        itemDate: {
            flexWrap: 'wrap',
            fontSize: 16,
            fontWeight: 'bold',
            paddingLeft: 8,
            color: colors.text,
        },
        itemDescription: {
            fontSize: 16,
            paddingLeft: 8,
            color: colors.text,
        },
        itemActions: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 8,
        },
        dot32: {
            position: 'absolute',
            top: 0,
            width: 44,
            height: 44,
            borderRadius: 24,
            backgroundColor: colors.dot32,
            borderWidth: 1,
            borderColor: colors.cardBackground,
        },
        dot32noshadow: {
            borderWidth: 1,
            borderColor: colors.cardBackground,
            width: 44,
            height: 44,
            borderRadius: 24,
            backgroundColor: colors.dot32
        },
        dot32text: {
            height: '100%',
            fontSize: 24,
            fontWeight: !isLight ? 200 : 300,
            color: colors.textNegative,
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 7 : 5,
            letterSpacing: -.5,
        },
        // MODAL
        modalOverlay: {
            flex: 1,
            margin: 0,
            backgroundColor: 'rgba(255, 0, 0, 0.75)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            maxWidth: 550,
            marginHorizontal: sideMargin,
            backgroundColor: isLight ? colors.white : colors.cardBackground,
            borderRadius: 32,
            flexDirection: 'column',
            gap: 32,
            alignItems: 'center', // HOR
            justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 24,
        },
        datePickerWrapper: {
            borderWidth: 1,
            borderColor: colors.textRed,
            borderRadius: 8,
            padding: 8,
            backgroundColor: 'transparent',
        },
        // PULSANTI ADD/CANCEL
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
        },
        addButton: {
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.blueBar,
            alignItems: 'center',
            flex: 1,
            marginLeft: 10,
        },
        addButtonText: {
            color: colors.blueBar,
            fontSize: 16,
            fontWeight: 'bold',
        },
        cancelButton: {
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.disabled,
            alignItems: 'center',
            flex: 1,
            marginRight: 10,
        },
        cancelButtonText: {
            color: colors.disabled,
            fontSize: 16,
            fontWeight: 'bold',
        },
        // DESCRIZIONE
        modalInput: {
            borderWidth: 1,
            borderColor: colors.textRed,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            fontSize: 16,
            marginBottom: 12,
            height: 50,
            color: colors.black,
        },
        errorText: {
            color: 'red',
            marginBottom: 16,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 600,
        },
        // PULSANTONE AGGIUNGI GIORNI SPECIALI
        specialDays: {
            //flex:1,
            minHeight: 68,
            borderRadius: 999,
            backgroundColor: colors.blueBar,
            marginBottom: 24,
            marginHorizontal: sideMargin * 2, //24,
            // flexDirection: 'row',
            //flexWrap:'wrap',
            // alignItems: 'center',
            // alignContent:'center',
            // justifyContent:'flex-start',
            padding: 20,
            elevation: 18,
            shadowColor: colors.black, // iOS shadow
            shadowOffset: { width: 2, height: 8, },
            shadowOpacity: 0.65,
            shadowRadius: 18 // Match elevation for iOS
        },
        specialDaysLabel: {
            fontSize: 20,
            fontWeight: 400,
            color: colors.textNegative,
        },
        // DROPDOWN FESTIVITA PER PAESE
        dropDownCountry: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
        },
        backgroundModal: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isLight ? 'rgba(0,0,0, 0.75)' : colors.black
        },
        advContainer: {
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 32,
            marginTop: 12,
            backgroundColor: 'rgba(0, 0, 0, .08)',
            borderRadius: 0,
            borderWidth: 0,
        },
        infoButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            marginHorizontal: 12,
            gap: 8,
            borderWidth: 2,
            borderStyle: 'dotted',
            borderColor: colors.blueBar,
            borderRadius: 24,
            backgroundColor: 'rgba(255, 255, 255, .5)'
        }
    });

    return styles;
}

export default createHolydaysStyles;