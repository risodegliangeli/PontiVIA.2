const tintColorLight = 'rgba(240, 240, 240, .9)';
const tintColorDark = 'rgba(240, 240, 240, 1)';

export const Colors = {
  // /////////////////////
  //
  //        LIGHT
  //
  // /////////////////////
  light: {
    blueBar: '#0088ff',
    tabBarBackgroundIos: 'rgba(240, 240, 240, .8)', // iOS = FONDO SCURO
    tabBarBackgroundAndroid: 'rgba(243, 243, 244, 1)', // Android = FONDO BIANCO
    tabBarBorderIos: 'rgba(255, 255, 255, .65)',
    tabBarBorderAndroid: 'rgba(255, 255, 255, 0.65)',
    tabBarInactiveItem: 'rgba(99, 99, 99, 1)',
    tabBarFocusDotIos: 'rgba(0,0,0, 0.12)',
    tabBarFocusDotAndroid: 'rgba(184, 184, 184, 0.75)',
    tabBarActiveItem: 'rgba(0, 136, 255, 1)',
    text: 'rgba(51, 51, 51, 1)',            // TESTO NERO #333
    disabled: 'rgba(51, 51, 51, .5)',       // NERO 50%
    border: 'rgba(51, 51, 51, .12)',        // NERO 8%,  
    outsideMonth: 'rgba(51, 51, 51, .10)',  // NERO 12%,
    textNegative: 'rgba(255, 255, 255, 1)', // BIANCO
    headerText: '#434300',
    textRed: '#FF778F',     // GIORNI ROSSI
    cardBackground: 'rgba(252, 252, 249, .9)', // BAINCO 75%
    toastBackground: 'rgba(255, 255, 255, .94) ',
    dropdownBackground: 'rgba(51, 51, 51, 0.06)', // BACKGROUND DELLA DROPDOWN
    bridgeDay: 'rgba(51, 51, 51,1)',
    bridgeBackground: '#0088ff',  // PONTE EVIDENZIATO
    tint: tintColorLight,
    cancelButton: 'rgba(222, 222, 222, 1)',      // #dedede
    white: '#fff',
    black: '#333',
    modalBackground: 'rgba(255,255,255,1)',
    dot32: '#f79b84',
  },
  dark: {
  // /////////////////////
  //
  //        DARK
  //
  // /////////////////////
    blueBar: '#78beff', //'#0A7AE1',
    tabBarBackground: 'rgba(51, 51, 51, .55)',
    tabBarBackgroundIos: '#292929', //'rgba(134,103,133,1)',
    tabBarBackgroundAndroid: 'rgba(0, 0, 0, .9)', //'rgba(134,103,133,1)',
    tabBarBorderIos: 'rgba(141, 141, 141, 0.08)',
    tabBarBorderAndroid: 'rgba(255, 255, 255, 0.08)',
    tabBarInactiveItem: 'rgba(255, 255, 255, 1)',
    tabBarFocusDotIos: 'black', //'rgba(215,191,214,1)',
    tabBarFocusDotAndroid: 'rgba(64, 64, 64, 0.9)', //'rgba(215,191,214,.8)',
    tabBarActiveItem: 'rgba(0, 136, 255, 1)',
    text: 'rgba(255, 255, 255, 1)',         // BIANCO
    disabled: 'rgba(255, 255, 255, .6)',    // BIANCO 50%
    border: 'rgba(255, 255, 255, .08)',        // NERO 8%,  
    outsideMonth: 'rgba(255, 255, 255, .12)',  // NERO 12%,
    textNegative: 'rgba(0,0,0, 1)', // BIANCO
    headerText: 'rgba(255, 255, 255, 1)',   // BIANCO
    textRed: '#FF778F',
    cardBackground: '#474047', // SCURO 100% PER COPRIRE LO SFONDO
    toastBackground: 'rgba(0, 0, 0, 1) ',    
    dropdownBackground: 'rgba(255, 255, 255, 0.08)', // BACKGROUND DELLA DROPDOWN
    bridgeDay: 'rgba(255, 204, 51, 1)',
    bridgeBackground: '#43a7ff', //'rgba(255, 204, 51, 1)',  // PONTE EVIDENZIATO
    tint: tintColorDark,
    cancelButton: '#292929', //'#999',
    white: '#fff',
    black: '#333',
    modalBackground: 'rgba(239,234,239,1)',
    dot32: '#cf9dcd',

  },
};