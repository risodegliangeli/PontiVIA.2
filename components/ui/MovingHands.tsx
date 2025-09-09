import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native';


export function MovingHands() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(
            15, { duration: 350 }), 
            withTiming(0, { duration: 350 })),
            4);
  }, [rotationAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    //transform: [{ rotate: `${rotationAnimation.value}deg` }],
      transform: [{ translateY: rotationAnimation.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
                      <Image
                source={require('@/assets/images/blue-hand.png')}
                style={{
                  marginTop: 24, 
                  width:48, 
                  height:72, 
                  resizeMode:'contain'}}
              />

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});