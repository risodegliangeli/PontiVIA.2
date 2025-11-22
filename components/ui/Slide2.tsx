import { Image, View, Dimensions, StyleSheet} from 'react-native';
import { useEffect, } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function Slide2 () {
  const windowWidth = Dimensions.get("window").width;
  const moveAnimation = useSharedValue(-20);
  const scaleAnimation = useSharedValue(1.5);

  useEffect(() => {
    moveAnimation.value = withRepeat( 
      withSequence(
        withTiming(
            -20, { duration: 1500 }), 
            withTiming(0, { duration: 1500 }), withTiming(-20, { duration: 1500 })),
            -1);
    scaleAnimation.value = withRepeat( 
      withSequence(
        withTiming(
            1.5, { duration: 1600 }), 
            withTiming(1, { duration: 800 }), withTiming(1.5, { duration: 800 })),
            -1);
  }, [moveAnimation, scaleAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: moveAnimation.value }],
  }));
  
  const animatedSecondStyle = useAnimatedStyle(() => ({
      transform: [{ scaleY: scaleAnimation.value }],
  }));

  const styles:any = StyleSheet.create ({
    imageBack: {
      position:'absolute',
      top:0, left:0,
      width: windowWidth,
      height: windowWidth,
      resizeMode: 'contain',
      //borderWidth:1,
    },
    imageTop: {
      position:'absolute',
      top:0, left:0,
      width: windowWidth,
      height: windowWidth,
      resizeMode: 'contain',
    }
  })

  return (
    <View style={{
      //borderWidth:1,
      width: windowWidth,
      height: windowWidth,
      backgroundColor: 'transparent',
    }}>
      <Image
        style={styles.imageTop}
        source={require('@/assets/images/_slide2_00.png')}
      />      
      <Animated.Image 
        style={[styles.imageBack, animatedStyle]}
        source={require('@/assets/images/_slide2_01.png')}
      />
      <Animated.Image 
        style={[styles.imageBack, animatedSecondStyle]}
        source={require('@/assets/images/_slide2_02.png')}
      />
    </View>
  )
}