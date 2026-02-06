import React, { useRef, useState } from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useHolydays } from '@/context/HolydaysContext';
import { Colors } from '@/constants/Colors';
import { splashCarousel as splashCarouselLabel } from '@/constants/dataLabel';
import Pagination from '@/components/ui/Pagination';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ------------------------------------------------------------- 

SplashCarousel

------------------------------------------------------------- */
export default function SplashCarousel(props: any) {
  const { splashClose } = props;

  // GESTIONE COLORE
  const colors = useThemeColors();

  let { width, height } = useWindowDimensions();
  // Usa la larghezza completa dello schermo per i video

  // RICEVE VARIABILI DAL CONTEXT
  const {
    myLanguage
  } = useHolydays();

  const ref = useRef<ICarouselInstance>(null);
  const [dots, setDots] = useState<number>(0);

  const styles: any = StyleSheet.create({
    text: {
      fontSize: 16,
      fontWeight: '800',
      fontStyle: 'italic',
      color: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 24,
    },
    textSecondLine: {
      fontSize: 16,
      fontWeight: '400',
      fontStyle: 'italic',
      color: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 24,
      paddingVertical: 4,
    },
    textItalic: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, .08)',
      padding: 8,
      borderRadius: 99,
      paddingHorizontal: 24
    },
    carouselView: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#E35527',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    innerContent: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 0,
    },
    videoContainer: {
      width: '95%',
      height: '80%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: '3%',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      marginTop: 24,
      paddingHorizontal: 24,
    }
  });

  const videoSources = [
    require('@/assets/videos/pontivia_1_480_noaudio_nologo.mp4'),
    require('@/assets/videos/pontivia_2_480_noaudio_nologo.mp4'),
    require('@/assets/videos/pontivia_3_480_noaudio_nologo.mp4'),
  ];

  const frame = [
    {
      id: 1,
      video: videoSources[0],
      text: (
        <>
          <Text style={styles.text}>
            {splashCarouselLabel(myLanguage, 0)}{' '}
            {splashCarouselLabel(myLanguage, 1) !== '' && (
              <Text style={styles.text}>{splashCarouselLabel(myLanguage, 1)}</Text>
            )}
          </Text>
          <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 2)}</Text>
        </>
      )
    },
    {
      id: 2,
      video: videoSources[1],
      text: (
        <>
          <Text style={styles.text}>
            {splashCarouselLabel(myLanguage, 3)}{' '}
            {splashCarouselLabel(myLanguage, 4) !== '' && (
              <Text style={styles.text}>{splashCarouselLabel(myLanguage, 4)}</Text>
            )}
          </Text>
          <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 5)}</Text>
        </>
      )
    },
    {
      id: 3,
      video: videoSources[2],
      text: (
        <>
          <Text style={styles.text}>
            {splashCarouselLabel(myLanguage, 6)}{' '}
            {splashCarouselLabel(myLanguage, 7) !== '' && (
              <Text style={styles.text}>{splashCarouselLabel(myLanguage, 7)}</Text>
            )}
          </Text>
          <Text style={styles.textSecondLine}>{splashCarouselLabel(myLanguage, 8)}</Text>
        </>
      )
    },
  ];

  return (
    <View style={styles.carouselView}>
      <Carousel
        width={width}
        height={height}
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        ref={ref}
        autoPlay={false}
        onSnapToItem={(index) => setDots(index)}
        loop={false}
        pagingEnabled
        data={frame}
        renderItem={({ index }) => (
          <View style={styles.innerContent}>
            <View style={styles.videoContainer}>
              <Video
                source={frame[index].video}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            </View>
            <View style={styles.textContainer}>
              {frame[index].text}
            </View>
          </View>
        )}
      />

      <View style={{
        position: 'absolute',
        bottom: 20,
        flexDirection: 'column',
        gap: 24,
      }}>
        {/* DOTS */}
        <Pagination
          dotsLength={frame.length}
          activeDotIndex={dots}
          containerStyle={{}}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        {/* SKIP */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderWidth: 2,
              borderColor: colors.white,
              elevation: 18,
              shadowColor: colors.black,
              shadowOffset: {
                width: 4,
                height: 18,
              },
              shadowOpacity: 0.45,
              shadowRadius: 16
            }]}
          onPress={splashClose}>
          <Text style={styles.textItalic}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
