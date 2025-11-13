import { Image, View, Dimensions, StyleSheet,} from 'react-native';
import { useEffect, } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const Slide3 = ({ isVisible }) => {
  const windowWidth = Dimensions.get("window").width;

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
          ]}
        source={require('@/assets/images/_slide3_01.png')}
      />
    </View>
  )
}

export default Slide3;