import { Image, View, Dimensions, StyleSheet} from 'react-native';
import { useEffect, } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function Slide3 () {
  const windowWidth = Dimensions.get("window").width;
  const moveAnimation = useSharedValue(-10);
  const rotateAnimation = useSharedValue(-5);

  useEffect(() => {
    moveAnimation.value = withRepeat( 
      withSequence(
        withTiming(
            5, { duration: 2500 }), 
            withTiming(-10, { duration: 2500 })),
            -1);
    rotateAnimation.value = withRepeat( 
      withSequence(
        withTiming(
            0, { duration: 1600 }), 
            withTiming(-5, { duration: 1200 })),
            -1);

  }, [moveAnimation, rotateAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${moveAnimation.value}deg` }],
  }));
  
  const animatedSecondStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: rotateAnimation.value }],
  }));

  const styles = StyleSheet.create ({
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
        source={require('@/assets/images/_slide3_00.png')}
      />      
      <Animated.Image 
        style={[
          styles.imageBack, 
          animatedStyle, // rotazione
          animatedSecondStyle // spostamento
          ]}
        source={require('@/assets/images/_slide3_01.png')}
      />
    </View>
  )
}