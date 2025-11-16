import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native';

export function PulseGirl() {
  const scale = useSharedValue(0.75);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(0.9, { duration: 650 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image source={useColorScheme() === 'light' ?
        require('@/assets/images/icon_girl-on.png')
        :
        require('@/assets/images/icon_girl-on-dark.png')
      } />
    </Animated.View>
  );
}
