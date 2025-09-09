const tintColorLight = 'rgba(240, 240, 240, .9)';
const tintColorDark = 'rgba(240, 240, 240, 1)';

export const Colors = {
  // /////////////////////
  //
  //        LIGHT
  //
  // /////////////////////
  light: {

    // NUOVI
    buttonsText: 'rgba(99, 99, 99, 1)',
    fabBase: '#f0f0f0ff',
    // barBase: 'rgba(240, 240, 240, .85)',
    // mobileDot: 'rgba(224, 225, 226, 1)',
    blueBar: '#0088ff',

    // BOTTOMBAR
    tabBarBackgroundIos: 'rgba(240, 240, 240, .45)', // iOS = FONDO SCURO
    tabBarBackgroundAndroid: 'rgba(240, 240, 240, .9)', // Android = FONDO BIANCO

    tabBarBorderIos: 'rgba(255, 255, 255, .65)',
    tabBarBorderAndroid: 'rgba(255, 255, 255, 0.65)',

    tabBarInactiveItem: 'rgba(99, 99, 99, 1)',

    tabBarFocusDotIos: 'rgba(255, 255, 255, 0.55)',
    tabBarFocusDotAndroid: 'rgba(255, 255, 255, .55)',

    tabBarActiveItem: 'rgba(0, 136, 255, 1)',

    // VECCHI
    text: 'rgba(51, 51, 51, 1)',            // TESTO NERO #333
    disabled: 'rgba(51, 51, 51, .5)',       // NERO 50%
    border: 'rgba(51, 51, 51, .12)',        // NERO 8%,  
    outsideMonth: 'rgba(51, 51, 51, .10)',  // NERO 12%,
    textNegative: 'rgba(255, 255, 255, 1)', // BIANCO
    headerText: '#434300',
    textRed: '#FF778F',     // GIORNI ROSSI
    background: '#FFFFC5',  // APP LIGHT
    cardBackground: 'rgba(252, 252, 249, .8)', // BAINCO 75%
    dropdownBackground: 'rgba(51, 51, 51, 0.06)', // BACKGROUND DELLA DROPDOWN
    bridgeDay: 'rgba(51, 51, 51,1)',
    bridgeBackground: '#FFCC33',  // PONTE EVIDENZIATO
    tint: tintColorLight,
    logoColour: '',
    tabIconDefault: 'rgba(165, 83, 0, 1)', // ICONA PICCOLA NON SELEZIONATA MARRONE 50%
    tabIconSelected: 'rgba(255, 255, 255, 1)', // ICONA PICCOLA SELEZIONATA BIANCO 100%
    tabCentralIconDefault: 'rgba(165, 83, 0, .3)', // ICONA CENTRALE NON SELEZIONATA
    tabCentralIconSelected: 'rgba(254, 127, 0, 1)', // ICONA CENTRALE SELEZIONATA
    confirmButton: tintColorLight,
    cancelButton: 'rgba(222, 222, 222, 1)',      // #dedede
    white: '#fff',
    black: '#333',
  },
  dark: {
  // /////////////////////
  //
  //        DARK
  //
  // /////////////////////
    buttonsText: 'rgba(221, 221, 221, 1)', // BOTTONI FAB
    fabBase: 'rgba(21, 21, 21, 1)',
    //barBase: '#1f1f1fff',
    // mobileDot: 'rgba(224, 225, 226, 1)',
    blueBar: '#0088ff',

    // BOTTOMBAR
    tabBarBackground: 'rgba(51, 51, 51, .55)',
    tabBarBackgroundIos: 'rgba(21, 21, 21, 0.35)',
    tabBarBackgroundAndroid: 'rgba(21, 21, 21, 0.85)',


    // tabBarBorder: 'rgba(170, 170, 170, .55)',
    tabBarBorderIos: 'rgba(255, 255, 255, .08)',
    tabBarBorderAndroid: 'rgba(255, 255, 255, 0.08)',

    tabBarInactiveItem: 'rgba(255, 255, 255, 1)',
    //tabBarFocusDot: 'rgba(221, 221, 221, 1)',
    tabBarFocusDotIos: 'rgba(155, 43, 43, 0.9)',
    tabBarFocusDotAndroid: 'rgba(73, 73, 73, .7)',


    tabBarActiveItem: 'rgba(0, 136, 255, 1)',

    // VECCHI
    text: 'rgba(255, 255, 255, 1)',         // BIANCO
    disabled: 'rgba(255, 255, 255, .6)',    // BIANCO 50%
    border: 'rgba(255, 255, 255, .08)',        // NERO 8%,  
    outsideMonth: 'rgba(255, 255, 255, .12)',  // NERO 12%,
    textNegative: 'rgba(255, 255, 255, 1)', // BIANCO
    headerText: 'rgba(255, 255, 255, 1)',   // BIANCO
    textRed: '#FF778F',
    background: '#222220',
    cardBackground: 'rgba(65, 65, 62, 1)', // SCURO 100% PER COPRIRE LO SFONDO
    dropdownBackground: 'rgba(255, 255, 255, 0.08)', // BACKGROUND DELLA DROPDOWN
    bridgeDay: 'rgba(255, 204, 51, 1)',
    bridgeBackground: 'rgba(255, 204, 51, 1)',  // PONTE EVIDENZIATO
    tint: tintColorDark,
    logoColour: '',
    tabIconDefault: 'rgba(102, 51, 0, 1)', // ICONA PICCOLA NON SELEZIONATA (MARRONE)
    tabIconSelected: 'rgba(255, 255, 255, 1)',  // ICONA PICCOLA SELEZIONATA (BIANCO)
    tabCentralIconDefault: 'rgba(102, 51, 0, .5)',  // ICONA CENTRALE NON SELEZIONATA
    tabCentralIconSelected: 'rgba(185, 93, 0, 1)',  // ICONA CENTRALE SELEZIONATA
    confirmButton: tintColorDark,
    cancelButton: '#999',
    white: '#fff',
    black: '#333',
  },
};