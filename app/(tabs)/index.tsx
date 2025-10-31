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

  const SVG_VIEWBOX = "0 0 654 506";

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
      top:0, left:'-30%',
      width: '175%',
      height: 400,
      resizeMode: 'contain',
      opacity: 1,

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

                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems:'center',
                    }]}>

                  <View style={{
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    paddingRight: 24,
                  }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:colors.cardBackground,
                        padding:12,
                        borderRadius:'100%'
                      }}
                      onPress={ () => {
                        setInfoModalVisible(!infoModalVisible);
                        setInfoStep(1)}}>
                        <IconSymbol name='xmark' size={Platform.OS === 'ios' ? 20 : 28} color={colors.blueBar} />
                    </TouchableOpacity>
                  </View>

                  <Animated.View
                    style={styles.infoBalloon}>
                    <Svg 
                      viewBox={SVG_VIEWBOX} 
                      preserveAspectRatio="xMidYMid meet" 
                      fill="none"
                      style={styles.svg}>
                        {infoStep === 1 ?                           
                          <Path d="M617.22 176.741C635.246 9.14016 303.827 -59.7463 135.345 60.9828C-23.1991 98.3852 -49.0849 287.527 93.0509 353.573C74.3808 404.773 141.112 440.836 228.946 455.77L214.386 505.549C244.199 487.795 260.146 460.091 260.146 460.091C369.17 471.925 497.454 453.015 537.485 393.343C590.178 393.343 714.287 305.281 617.22 176.741Z" fill={colors.cardBackground}/>
                          :
                            infoStep === 2 ?
                            <Path d="M617.22 176.553C635.246 9.13045 303.827 -59.6828 135.345 60.9181C-23.1991 98.2806 -49.0849 287.222 93.0509 353.197C69.5904 417.466 180.978 457.859 299.637 462.498C299.637 462.498 306.738 489.883 330.879 505.503V462.887C419.48 461.613 505.919 439.928 537.485 392.925C590.178 392.925 714.287 304.957 617.22 176.553Z" fill={colors.cardBackground}/>
                            :
                            <Path d="M617.22 176.553C635.246 9.13045 303.827 -59.6828 135.345 60.9181C-23.1991 98.2806 -49.0849 287.222 93.0509 353.197C62.6179 436.567 259.098 479.759 404.013 456.849C404.013 456.849 408.274 489.173 449.456 505.503L428.155 452.301C477.305 441.45 517.927 422.047 537.485 392.925C590.178 392.925 714.287 304.957 617.22 176.553Z" fill={colors.cardBackground}/>
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
                          justifyContent:'center',
                          }}>
                          {/* <View style={{
                            width:28, 
                            }}/> */}
                          <Text style={[styles.sectionTitle, {flex:1, textAlign: 'center'}]}>Come funziona?</Text>
                          {/* <TouchableOpacity
                            onPress={ () => {
                              setInfoModalVisible(!infoModalVisible);
                              setInfoStep(1)}}>
                              <IconSymbol name='xmark' size={Platform.OS === 'ios' ? 20 : 28} color={colors.blueBar} />
                          </TouchableOpacity> */}
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
                            fontWeight:600, 
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