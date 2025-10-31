import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native';

export function PulseGirl() {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Heartbeat-like pulse: quick strong beat, small secondary beat, then rest
    scale.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 300 }),   // quick contraction
        withTiming(1.25, { duration: 300 }), // strong expansion (beat)
        withTiming(0.95, { duration: 300 }),  // slight recoil
        withTiming(1.05, { duration: 300 }), // small secondary pulse
        withTiming(1, { duration: 300 })     // return to rest
      ),
      -1,
      false
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image source={require('@/assets/images/icon_girl-on.png')} />
    </Animated.View>
  );
}
