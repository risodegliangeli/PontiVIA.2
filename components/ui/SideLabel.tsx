import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  Dimensions,
} from "react-native";
import { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { indexLabels as dataLabel, datepickerLabels } from '@/constants/dataLabel';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT
import FakeSplittedBar from '@/components/ui/FakeSplittedBar';
import Privacy from '@/components/Privacy';
import Faq from '@/components/Faq';
import { Portal } from '@rn-primitives/portal';
import Carousel, { ICarouselInstance, } from 'react-native-reanimated-carousel';
import Pagination from '@/components/ui/Pagination';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ======================================================================
                                  MAIN
====================================================================== */
const UseSideLabel = () => {

  // VARIABILI DA CONTEXT (chiamate al top level)
  const {
    myLanguage
  } = useHolydays();

  // CALCOLA LARGH./ALT. E 1/4 DEI VALORI PER LA CENTRATURA
  let { height, width } = Dimensions.get('window');

  // GESTIONE COLORE (chiamate al top level)
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';
  const isIos = Platform.OS === 'ios';
  const xcrossSize = isIos ? 24 : 32;


  // STYLES
  const styles: any = StyleSheet.create({
    // INFOPOINT
    label: {
      position: 'absolute',
      top: 80,
      left: -58,
      zIndex: 999,
      width: 90,
      height: 32,
      borderRadius: 24,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 2,
      backgroundColor: colors.dot32,
      elevation: 18,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
        width: 4,
        height: 18, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 16 // Match elevation for iOS
    },
    infoBalloon: {
      width: '100%',
      minHeight: 120,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    // TITOLO PAGINA
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.white,
    },
    dot32: {
      width: 44,
      height: 44,
      borderRadius: 24,
      backgroundColor: '#dedede',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    dot32text: {
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      fontSize: 28,
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 1)',
      textAlign: 'center',
      paddingTop: isIos ? 6 : 3,
    },
    // IMMAGINE DI SFONDO
    image: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    dida: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 28,
      letterSpacing: .6,
      color: colors.text,
      textAlign: 'center'
    }
  })

  /* ---------------------------------------------------------------┐ 
  FUNZIONE DENTRO L'HOOK
  └---------------------------------------------------------------- */
  const sideLabel = () => {

    // const [myHeight, setMyHeight] = useState<number>(Dimensions.get('window').height);
    const [myWidth, setMyWidth] = useState<number>(Dimensions.get('window').width);
    myWidth > 550 && setMyWidth(550);

    const ref = useRef<ICarouselInstance>(null);

    //const viewBox = "0 0 360 557";
    //const fill = isLight ? 'rgba(255, 255, 255, .85)' : 'rgba(255, 255, 255, .15)'
    // const { width, height } = Dimensions.get("window");

    // VISIBILITA INFO ANIMATE
    const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
    const [infoStep, setInfoStep] = useState<number>(1);

    const frame = [
      {
        id: 1,
        text: <><Text style={{ fontWeight: 800, color: '#78beff' }}>
          {dataLabel(myLanguage, 1).split(":")[0]}
        </Text>
          <Text style={{ fontWeight: 400, color: colors.white }}>:{dataLabel(myLanguage, 1).split(":")[1]}</Text></>
      },
      {
        id: 2,
        text: <><Text style={{ fontWeight: 800, color: '#78beff' }}>
          {dataLabel(myLanguage, 2).split(":")[0]}
        </Text>
          <Text style={{ fontWeight: 400, color: colors.white }}>:{dataLabel(myLanguage, 2).split(":")[1]}</Text></>
      },
      {
        id: 3,
        text: <><Text style={{ fontWeight: 800, color: '#78beff' }}>
          {dataLabel(myLanguage, 3).split(":")[0]}
        </Text>
          <Text style={{ fontWeight: 400, color: colors.white }}>:{dataLabel(myLanguage, 3).split(":")[1]}</Text></>
      },
    ];

    return (
      <>
        {infoModalVisible &&
          <Portal name='sidelabel-portal' >
            <View style={{  // OVERLAY SCURO
              position: 'absolute',
              top: 0, left: 0,
              bottom: 0, right: 0,
              backgroundColor: 'rgba(71,64,71, 1)',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 12,
            }}>

              {/* PULS CHIUSURA */}
              <View style={{
                position: 'absolute',
                top: 48,
                right: 0,
              }}>
                <TouchableOpacity
                  style={{
                    padding: 6,
                    marginRight: 12,
                    backgroundColor: colors.cancelButton,
                    borderRadius: 99,
                  }}
                  onPress={() => setInfoModalVisible(false)}>
                  <IconSymbol name='xmark'
                    size={xcrossSize}
                    color={colors.disabled} />
                </TouchableOpacity>
              </View>
              <View style={{ // WRAPPER SCURO
                width: '100%',
                maxWidth: 550,
                alignItems: 'center',
              }}>

                {/* TITOLO */}
                <View style={{
                  width: '100%',
                  flexWrap: 'wrap',
                  paddingHorizontal: 32,
                  alignContent: 'center',
                }}>
                  <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>
                    {dataLabel(myLanguage, 4)}
                  </Text>
                </View>

                <Carousel
                  ref={ref}
                  autoPlay={true}
                  autoPlayInterval={5000}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: .99,
                    parallaxScrollingOffset: 0,
                  }}
                  //onProgressChange={ () => ref.current && setDots(ref.current.getCurrentIndex)}
                  onSnapToItem={(index) => {
                    setInfoStep(index + 1);
                  }}
                  loop={true}
                  pagingEnabled
                  width={320}//myWidth}
                  height={120}
                  data={frame}
                  renderItem={({ index }) => (
                    <View style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    ><Text style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: colors.text
                    }}
                    >{frame[index].text}</Text></View>
                  )}
                />

                <FakeSplittedBar
                  index={infoStep}
                  action={(x: number) => {
                    setInfoStep(x);
                    ref.current?.scrollTo({ index: x - 1, animated: true });
                  }} />

                {/* SPAZIATORE */}
                <View style={{ height: 12, }} />

                {/* DOTS */}
                <Pagination
                  dotsLength={frame.length}
                  activeDotIndex={infoStep - 1}
                  containerStyle={{
                  }}
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: colors.white,
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </View>

              {/* FAQ / PRIVACY */}
              <View style={{
                width: '100%',
                maxWidth: 550,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 48,

              }}>
                <Faq />
                <Privacy />
              </View>

              {/* CREDIT */}
              <View style={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                width: '100%',
              }}>
                <Text style={{ fontSize: 11, color: colors.white, alignSelf: 'center' }}>Ponti e Ferie! 1.0.4 b - 2025/2026 © Angeli e Associati</Text>
              </View>

            </View >
          </Portal >}

        <View style={styles.label}>
          <TouchableOpacity
            onPress={() => setInfoModalVisible(!infoModalVisible)}>
            <IconSymbol name="info.circle.fill" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

      </>
    )
  }
  return sideLabel;
}

export default UseSideLabel;





