import { Dimensions, Platform, StyleSheet, useColorScheme } from "react-native";
import { Colors } from '@/constants/Colors';

// GESTIONE COLORI
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const createPreferencesStyles = () => {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // CALCOLO DINAMICO MARGINE ESTERNO DELLE CARD
  const width = Dimensions.get("window").width;
  const sideMargin = Math.trunc(width * .025); // MARGINE LATERALE

  const styles = StyleSheet.create({
    scrollview: {
      width: '100%',
      backgroundColor: 'transparent',
      paddingTop: 90,
      maxWidth: 550,
    },
    pageTitle: {
      flex: 1,
      width: '100%',
      height: 54,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      // borderWidth: 1,
      pointerEvents: 'box-none',

    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    // CONTAINER TITOLO PAGINA
    sectionContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginBottom: 8,
    },
    // TITOLO ESTERNO BLOCCHETTI
    listTitle: {
      color: colors.headerText,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      paddingBottom: 8,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
    },
    // CARD
    groupContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal: 18,
      // marginLeft:12,
      // marginRight:12,
      marginHorizontal: sideMargin,
      marginBottom: 24,
      //width: '100%',
    },
    preferenceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    editLinkContainer: {
      width: '100%',
      alignItems: 'flex-end',
      paddingTop: 16,
      paddingRight: 12,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editText: {
      marginLeft: 8,
      marginTop: 12,
      marginBottom: 12,
      color: colors.text,
      fontSize: 14,
      fontWeight: 400,
    },
    creditsView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    credits: {
      fontSize: 11,
      color: colors.disabled,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
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
      marginHorizontal: sideMargin, //12,
      marginTop: 12,
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

export default createPreferencesStyles;