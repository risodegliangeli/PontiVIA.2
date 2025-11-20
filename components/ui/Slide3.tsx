import { Image, View, Dimensions, StyleSheet,} from 'react-native';
import { useEffect, } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

const Slide3 = () => {
  const windowWidth = Dimensions.get("window").width;
  const rotation = useSharedValue(0);

  useEffect(() => {
    // singola rotazione avanti-indietro
    const singleRotation = withSequence(
      withTiming(8, { duration: 200, easing: Easing.inOut(Easing.ease) }),
      withTiming(-8, { duration: 200, easing: Easing.inOut(Easing.ease) })
    );

    // ciclo = 3 rotazioni avanti-indietro
    const cycle = withSequence(
      withRepeat(singleRotation, 3, false), // 3 volte
      withDelay(2000, withTiming(0, { duration: 1 })) // pausa di 2s
    );

    // ripeti all’infinito
    rotation.value = withRepeat(cycle, -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });


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
      animationName: {
        '50%': { transform: [{ rotate: '25deg' }] },
        },
      animationIterationCount: 15,
      animationDuration: '300ms',
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
          styles.imageBack, animatedStyle
          ]}
        source={require('@/assets/images/_slide3_01.png')}
      />
    </View>
  )
}

export default Slide3;