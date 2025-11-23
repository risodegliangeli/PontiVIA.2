import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native';

export function PulseWand() {

  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

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
      <Image source={isLight ?
        require('@/assets/images/icon_wand-on.png')
        :
        require('@/assets/images/icon_wand-on-dark.png')
      }/>
    </Animated.View>
  );
}
