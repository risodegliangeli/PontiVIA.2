import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { Colors } from '@/constants/Colors';

// GESTIONE COLORI
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const createCalendarStyles = () => {

  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // CALCOLO DINAMICO MARGINE ESTERNO DELLE CARD
  const width = Dimensions.get("window").width;
  const sideMargin = Math.trunc(width * .025); // MARGINE LATERALE

  const styles: any = StyleSheet.create({
    fltList: {
      flex: 1,
      backgroundColor: 'transparent',
      maxWidth: 550, // CENTRATO SU TABLET
    },
    card: {
      flex: 1,
      paddingTop: 24,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 16,
      marginHorizontal: sideMargin,
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      borderWidth: 0,
    },
    advContainer: {
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 48,
      marginTop: 24,
      backgroundColor: 'rgba(0, 0, 0, .08)',
      borderRadius: 0,
      borderWidth: 0,
    },
    monthTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.headerText,
      marginBottom: 4,
      textAlign: 'left',
    },
    yearTitle: {
      fontSize: 20,
      fontWeight: 300,
      color: colors.disabled,
      marginBottom: 24,
      textAlign: 'left',
    },
    weekDaysHeader: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      borderBottomColor: colors.disabled,
      paddingBottom: 12,
      marginBottom: 5,
    },
    weekDayText: {
      width: '14%', //`${Math.trunc(100 / 7)}%`,
      textAlign: 'center',
      color: colors.disabled,
      fontSize: 12,
    },
    // LABEL PONTI TROVATI
    bridgeYellowLabel: {
      marginRight: -16,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
      backgroundColor: colors.bridgeBackground,
      elevation: 6,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 1,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 2 // Match elevation for iOS
    },
    cardLabelBridgeFound: {
      fontSize: 13,
      fontWeight: 600,
      color: isLight ? colors.white : colors.black,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'transparent',
    },
    dayCell: {
      width: '14%', //Math.trunc(width / 7),
      minHeight: 60,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative', // Importante per il positioning dei connettori
    },
    dayNumber: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'left',
    },
    dayNumberHoliday: {
      color: colors.textRed,
    },
    dayNumberBridge: {
      color: colors.bridgeDay,
      fontWeight: 600,
      paddingHorizontal: 4,
      paddingVertical: 2,
    },
    dayNumberBold: {
      fontWeight: 800,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 50,
    },
    loadingText: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
      color: colors.tint,
    },
    loadingIndicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      backgroundColor: colors.disabled,
      marginHorizontal: sideMargin, //10,
      borderRadius: 8,
      marginBottom: 0,
    },
    loadingIndicatorText: {
      marginLeft: 10,
      color: colors.text,
    },
    endOfContentText: {
      textAlign: 'center',
      paddingVertical: 20,
      color: colors.disabled,
      fontSize: 14,
      fontStyle: 'italic',
    },
    redCircle: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateY: '-50%' }, { translateX: '-50%' }],
      width: 36,
      height: 36,
      borderWidth: 2,
      borderColor: colors.textRed,
      borderRadius: 36,
    },
    yellowCircle: { // NON E' PIU YELLOW MA BLUE... ;-)
      position: 'absolute',
      width: 36,
      height: 36,
      left: '50%',
      top: '50%',
      transform: [{ translateY: '-50%' }, { translateX: '-50%' }],
      backgroundColor: colors.bridgeBackground,
      borderRadius: 48,
      elevation: 6,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 1,
        height: 2, // Match elevation for iOS
      },
      shadowOpacity: 0.25,
      shadowRadius: 4 // Match elevation for iOS
    },
    squaredTouchable: {
      position: 'absolute',
      width: '99%', height: '100%',
      borderRadius: 999,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButtons: {
      minWidth: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 12,
    },
    cancelButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      maxHeight: 44,
      backgroundColor: colors.cancelButton,
      borderRadius: 99,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 12,
      maxHeight: 44,
      backgroundColor: colors.bridgeBackground,
      borderRadius: 99,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    addButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return styles;
}

export default createCalendarStyles;