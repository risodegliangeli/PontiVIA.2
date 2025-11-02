import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native';

export function PulseCalendar() {
  const scale = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(0.75, { duration: 650 }),
      -1,
      true
    );
  }, []);


  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={require('@/assets/images/icon_calendar-on.png')}
      />
    </Animated.View>
  );
}
