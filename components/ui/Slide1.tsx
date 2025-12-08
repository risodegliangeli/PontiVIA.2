import { Image, View, StyleSheet, useWindowDimensions } from 'react-native';
import { useEffect, } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function Slide1() {
  let { width, height } = useWindowDimensions();
  width > 550 && (width = 550);
  height = width; // immagine quadrata

  const moveAnimation = useSharedValue(-50);
  const scaleAnimation = useSharedValue(.90);

  useEffect(() => {
    moveAnimation.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1200 }),
        withTiming(-50, { duration: 1200 })),
      -1);
    scaleAnimation.value = withRepeat(
      withSequence(
        withTiming(
          1, { duration: 1200 }),
        withTiming(.90, { duration: 1200 })),
      -1);
  }, [moveAnimation, scaleAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: moveAnimation.value }, { scaleX: scaleAnimation.value }],
  }));

  const styles: any = StyleSheet.create({
    imageBack: {
      position: 'absolute',
      top: 0, left: 0,
      width: width,
      height: width,
      resizeMode: 'contain',
    },
    imageTop: {
      position: 'absolute',
      top: 0, left: 0,
      width: width,
      height: width,
      resizeMode: 'contain',
    }
  })

  return (
    <View style={{
      width: width,
      height: width,
      backgroundColor: 'transparent',
    }}>
      <Animated.Image
        style={[styles.imageBack, animatedStyle]}
        source={require('@/assets/images/_slide1_00.png')}
      />
      <Image
        style={styles.imageTop}
        source={require('@/assets/images/_slide1_01.png')}
      />
    </View>
  )
}