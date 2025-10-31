import { 
  Animated, 
  Easing, 
  ImageBackground, 
  StyleSheet, 
  useColorScheme, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  Platform,
  // Pressable,
  // Dimensions
  } from 'react-native';
import { CalendarScreen } from '@/components/calendarScreen';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useMemo, useRef, useState,  } from 'react';
import { Colors } from '@/constants/Colors';
import { MovingHands } from '@/components/ui/MovingHands';      // MIO
import { indexLabels as dataLabel } from '@/components/dataLabel';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FakeSplittedBar  from '@/components/ui/FakeSplittedBar';
import Svg, {Path} from 'react-native-svg';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                                  MAIN
                                      
########################################################################################################### */
export default function HomeScreen() {

  // GESTIONE COLORE
  const colors = useThemeColors();
 
  // VARIABILI DA CONTEXT
  const { 
    newPersonalHolydays,
    myPreferences, setMyPreferences,
    myCountry, 
    myLanguage
  } = useHolydays();

  const SVG_VIEWBOX = "0 0 1024 850";

  // const {width, height} = Dimensions.get("screen" );

  /* ============================================================================= 
      LETTURA STORAGE DATI
  ============================================================================= */
  const loadData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };

  // LETTURA PREFERENCES DA LOCAL STORAGE
  useEffect(() => {
    const initializeData = async () => {
      const myStoredPreferences = await loadData('PREFERENCES_KEY');
      if (myStoredPreferences) setMyPreferences(myStoredPreferences);
    };  
    initializeData(); 
  }, [myPreferences]);

  // MEMORIZZA LA KEY DEL CALENDARIO
  // la key forza il ricaricamento del calendario quando i dati cambiano.
  const calendarKey = useMemo(() =>
    JSON.stringify({newPersonalHolydays, myPreferences, myCountry}),
    [
      newPersonalHolydays,
      myPreferences,
      myCountry
    ]
  );

  // ANIMAZIONI
  const logoMarginTop = useRef(new Animated.Value(0)).current; // logo starts at marginTop 92
  const logoSize = new Animated.Value(1); // TESTO E MANINA INIZIALM. VISIBILI
  const cardMarginTop = useRef(new Animated.Value(180)).current; // LE CARD PARTONO SPOSTATE VERSO IL BASSO
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);
  const cloud01Anim = new Animated.Value(0); // NUVOLETTA 1
  const cloud02Anim = new Animated.Value(0); // NUVOLETTA 2

  // ANIMAZIONE - 1 spostamento /////////////////////////////////////////////
  const startAnimation = () => {

      Animated.timing(logoSize, { // 1) TESTO E MANINA SI RIDUCONO (NON CAMBIA OPACITY)
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloud01Anim, { // 2) NUVOLETTA 01 APPARE E SCOMPARE
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }).start( () => { cloud01Anim.setValue(0);} );

      setTimeout(() => {
        Animated.timing(cloud02Anim, { // 3) NUVOLETTA 02 APPARTE E SCOMPARE RITARDATA
          toValue: 1,
          duration: 150,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }).start( () => { cloud02Anim.setValue(0); });
      }, 125);

      setTimeout(() => {
        Animated.timing( logoMarginTop, {
          toValue: -500,
          duration:300,
          useNativeDriver: true,
        }).start();
      }, 500);

      setTimeout(() => {
        Animated.timing(cardMarginTop, { // SPOSTA IN ALTO LE CARD
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }).start()
      }, 500);
  }
  // VISIBILITA INFO ANIMATE
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  // const infoModalPosition = useRef(new Animated.Value(-100)).current;
  const [infoStep, setInfoStep] = useState<number>(1);

  // ANIMAZIONE - 2 opacita /////////////////////////////////////////////////
  const cardOpacity = useRef(new Animated.Value(1)).current;

  // ANIMAZIONE DITO AL BOOT, SPARISCE DOPO 8 SEC.
  useEffect(() => {
    animationTimeout.current = setTimeout(() => {
      startAnimation();
    }, 8000);
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [startAnimation]);

  // CLICCANDO SUL LOGO PARTE SUBITO L'ANIMAZIONE
  const handleLogoPress = () => {
    if (animationTimeout.current) clearTimeout(animationTimeout.current); // AZZERA IL TIMER
    startAnimation();
  };

  // INFOPOINT BUTTON //////////////////////////////////////////////////////
  const InfoPoint = () => {
      return (    
        <View style={styles.label}>
            <TouchableOpacity
                onPress={ () => setInfoModalVisible(!infoModalVisible)}>
                <IconSymbol name="info.circle.fill" size={24} color={colors.white} />
            </TouchableOpacity>
        </View>  
      )
  }

  // FOGLI DI STILE
  const styles = StyleSheet.create({
    // CONTAINER CARDS CALENDARIO
    container: {
      transform: [
        { translateY: cardMarginTop } // ANIM. SPOSTAMENTO
      ],
      opacity: cardOpacity,           // ANIM. OPACITA
      flex: 1,
      width: '100%',
      maxWidth:600,
      paddingHorizontal:0,      
      alignItems:'center',
    }, 
    // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center',
      
    },
    // CONTAINER ESTERNO DEL WRAPPER 
    wrapperContainer: {
      position:'absolute',
      top:92,
      width:'100%',
      alignContent:'flex-start',
      transform: [
        { translateY: logoMarginTop }
      ]      
    },
    // WRAPPER TESTO E MANINA
    welcome: {
      width:'100%',
      height: 180,
      alignItems:'center',      
      transform: [
        { scale: logoSize.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
    // TESTO DI WELCOME
    welcomeText: {
      fontSize:18, 
      fontWeight:600, 
      color: colors.blueBar, 
      textAlign:'center'
    },
    // NUVOLETTA 1
    cloud01: {            
      width: '35%',
      resizeMode: 'contain',
      position: 'absolute',
      opacity: cloud01Anim,
      transform: [
        { scale: cloud01Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
    // NUVOLETTA 2
    cloud02: {
      width: '35%',
      resizeMode: 'contain',
      position: 'absolute',
      opacity: cloud02Anim,
      transform: [
        {scale: cloud02Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], }), },
      ],
    },
    // INFOPOINT
    label: {
      position:'absolute',
      top:72,
      left:-56,
      zIndex:999999,
      width:90,
      height:28,
      borderRadius:24,
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end',
      padding:2,
      backgroundColor:colors.blueBar,
      elevation:12,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
      width: 4,
      height: 6, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 8 // Match elevation for iOS
      },
    infoBalloon: {
      width:'100%',
      minHeight:350,
      //backgroundColor: colors.cardBackground,
      //borderRadius:24,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems:'center',
      padding:24,
    },
        // TITOLO PAGINA
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    dot32: {
      width:44, 
      height:44, 
      borderRadius:24, 
      backgroundColor: '#dedede',
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },
    dot32text:{
      position:'absolute',
      top:0, left:0,
      width: '100%',
      height:'100%',
      fontSize:28,
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 1)',
      textAlign:'center',
      paddingTop: Platform.OS === 'ios' ? 6 : 3,
    },
    svg: {
      position: 'absolute',
      top:0, left:'-10%',
      width: '130%',
      height: 400,
      resizeMode: 'contain',
      opacity: .9,

      elevation:12,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
      width: 4,
      height: 6, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 8 // Match elevation for iOS
    }
  });

  return (  
      <ImageBackground 
        source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
        resizeMode="cover" 
        style={styles.image} >

          {/* CARD CALENDARIO */}
          <Animated.View 
            key='card'
            style={styles.container} // MARGINTOP = ANIMATO
            >
            <CalendarScreen 
              key={calendarKey} 
              callerPreferences={myPreferences} /> 
          </Animated.View>

          {/* CONTAINER TESTO, MANINA E NUVOLETTE CHE A FINE ANIMAZIONE ESCE DALLA VIEW */}
          <Animated.View 
            key='logo'
            style={styles.wrapperContainer}>

            {/* PULSANTE TRASP PER FAR PARTIRE SUBITO L'ANIMAZIONE */}
            <TouchableOpacity 
              onPress={handleLogoPress} 
              style={{alignItems:'center'}}>

                {/* WRAPPER TESTO E MANINA */}
                <Animated.View style={styles.welcome}>
                  
                  {/* TESTO WELCOME */}
                  <Text style={styles.welcomeText}>{dataLabel(myLanguage, 0)}</Text>
                  
                  {/* MANINA ANIMATA */}
                  <MovingHands />

                </Animated.View>

              {/* NUVOLETTA 1 */}
              <Animated.Image
                source={require('@/assets/images/cloud_01.png')}
                style={styles.cloud01}
              />

              {/* NUVOLETTA 2 */}
              <Animated.Image
                source={require('@/assets/images/cloud_02.png')}
                style={styles.cloud02}
              />            
            </TouchableOpacity>

          </Animated.View>

          {/* INFO */}
          <InfoPoint />

          {/* ISTRUZIONI ANIMATE //////////////////////////////////////////////////////////// */}
          <Suspense>
            <Modal
              visible={infoModalVisible}
              transparent={false}           // false: così sormonta la bottom bar
              backdropColor={'#333'}      // colore sempre pieno: altrimenti si vede la bar
              animationType={'fade'}
              hardwareAccelerated={true}
              >
              <ImageBackground 
                source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
                resizeMode="cover" 
                style={styles.image} >

                  {/* <Pressable 
                    style={StyleSheet.absoluteFill}
                    onPress={ () => setInfoModalVisible(!infoModalVisible)}>
                  */}
                    <View
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems:'center',
                        }]}>

                      <Animated.View
                        style={styles.infoBalloon}>
                        <Svg 
                          viewBox={SVG_VIEWBOX} 
                          preserveAspectRatio="xMidYMid meet" 
                          fill="none"
                          style={styles.svg}>
                            {infoStep === 1 ?                           
                            <Path d="M227.819 23.9698C2.35535 77.5555 -17.1372 274.062 8.8884 376.058C-30.6492 555.397 79.7243 679.167 210.254 726.497C210.254 726.497 247 740.285 274 743.272C281 781 274 850.5 274 850.5C274 850.5 324 823 351 747.275C363.879 746.468 379.256 744.602 394.696 740.285C503.395 769.618 725.386 732.673 752.945 726.497C789.5 733.5 820.5 732.5 843.272 720.322C881.547 735.245 1059.14 632.327 1017.8 376.058C1051.48 54.845 830.513 14.8125 707.014 39.5131C631.996 39.5131 488.086 -37.8874 227.819 23.9698Z" fill={colors.cardBackground} />
                            :
                            infoStep === 2 ?
                            <Path d="M227.819 23.9698C2.35535 77.5555 -17.1372 274.062 8.8884 376.058C-30.6492 555.397 79.7243 679.167 210.254 726.497C210.254 726.497 247 740.285 274 743.272C291.78 746.24 309.548 747.795 327 747.889C340.5 747.889 367.5 747.889 394.696 740.285C415.01 745.767 439.281 748.934 465.5 750.42C465.5 750.42 472 795 511.5 849C523 790.5 542 750.715 542 750.715C638.177 746.98 735.321 730.447 752.945 726.497C789.5 733.5 820.5 732.5 843.272 720.322C881.547 735.245 1059.14 632.327 1017.8 376.058C1051.48 54.845 830.513 14.8125 707.014 39.5131C631.996 39.5131 488.086 -37.8874 227.819 23.9698Z" fill={colors.cardBackground}/>
                            :
                            <Path d="M227.819 23.9698C2.35535 77.5555 -17.1372 274.062 8.8884 376.058C-49.2877 639.939 217.101 783.511 394.696 740.285C503.395 769.618 725.386 732.673 752.945 726.497C763.5 801.5 816 849.5 816 849.5C816 849.5 823.5 777.5 843.272 720.322C881.547 735.245 1059.14 632.327 1017.8 376.058C1051.48 54.845 830.513 14.8125 707.014 39.5131C631.996 39.5131 488.086 -37.8874 227.819 23.9698Z" fill={colors.cardBackground}/>
                          }
                        </Svg>

                          <View style={{ // CONTENITORE TESTI DENTRO BALLOON
                            flex:1,
                            flexDirection:'column',
                            justifyContent:'space-around', // VER
                            alignItems:'center', // HOR
                            paddingHorizontal:12,
                            paddingTop:32,
                            paddingBottom:12,
                            }}>

                            {/* TITOLO + CHIUSURA */}
                            <View style={{
                              width:'100%', 
                              flexDirection:'row', 
                              justifyContent:'space-between',
                              }}>
                              <View style={{
                                width:28, 
                                }}/>
                              <Text style={styles.sectionTitle}>Come funziona?</Text>
                              <TouchableOpacity
                                onPress={ () => {
                                  setInfoModalVisible(!infoModalVisible);
                                  setInfoStep(1)}}>
                                  <IconSymbol name='xmark' size={Platform.OS === 'ios' ? 20 : 28} color={colors.blueBar} />
                              </TouchableOpacity>
                            </View>

                            {/* NUMERI */}
                            <View style={{
                              width:'100%', 
                              // borderWidth:1,
                              flexDirection:'row', 
                              justifyContent:'space-between', 
                              alignItems: 'center',
                              }}>
                              <TouchableOpacity onPress={ () => setInfoStep(1)}>
                                <View style={[styles.dot32, {backgroundColor:colors.blueBar}]}>
                                  <Text style={styles.dot32text}>1</Text>
                                </View>
                              </TouchableOpacity>

                              <View style={{
                                width: 50, 
                                height:4, 
                                backgroundColor: infoStep >=2 ? colors.blueBar : '#666'
                                }}/>

                              <TouchableOpacity onPress={ () => setInfoStep(2)}>
                                <View style={[
                                  styles.dot32, 
                                    {backgroundColor: infoStep >=2 ? colors.blueBar : '#666'}
                                  ]}>
                                  <Text style={styles.dot32text}>2</Text>
                                </View>
                              </TouchableOpacity>

                              <View style={{
                                width: 50, 
                                height:4, 
                                backgroundColor: infoStep >=3 ? colors.blueBar : '#666'
                                }}/>

                              <TouchableOpacity onPress={ () => setInfoStep(3)}>
                                <View style={[
                                  styles.dot32, 
                                    {backgroundColor: infoStep >=3 ? colors.blueBar : '#666'}
                                  ]}>                                
                                  <Text style={styles.dot32text}>3</Text>
                                </View>
                              </TouchableOpacity>
                            </View>

                            {/* DIDASCALIA */}
                            <View style={{width:'100%', }}>
                              <Text style={{
                                fontSize:20, 
                                lineHeight:28, 
                                color: colors.text, 
                                textAlign: 'center'}}>
                                {dataLabel(myLanguage, infoStep)}
                              </Text>
                            </View>

                            {/* FRECCETTE NAVIGAZIONE */}
                            <View style={{
                            width:'45%', 
                            flexDirection:'row', 
                            justifyContent:'space-between', 
                            // position:'absolute',
                            
                            // bottom:24,
                            }}>
                              <TouchableOpacity
                                onPress={ () => {
                                  if (infoStep > 1) setInfoStep( infoStep - 1 )
                                  }}>                              
                                <IconSymbol name='chevron.left.circle' size={28} color={colors.disabled} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={ () => {
                                  if (infoStep < 3) setInfoStep( infoStep + 1 )
                                  }}>
                                <IconSymbol name='chevron.right.circle' size={28} color={colors.disabled} />
                              </TouchableOpacity>
                            </View>
                        </View>

                      </Animated.View>
                    </View>

                  {/* </Pressable> */}
                  <FakeSplittedBar 
                    index={infoStep}/>
                
              </ImageBackground>

            </Modal>
          </Suspense>

          {/* STATUSBAR */}
          <StatusBar style={ useColorScheme() === 'dark' ? 'light' : 'dark' } />

      </ImageBackground> 
  );
}