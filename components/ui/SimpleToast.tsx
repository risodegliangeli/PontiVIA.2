/* ===============================
   SIMPLE TOAST
   G. Angeli 2025 - MIT License
   =============================*/
import React, { useEffect } from 'react';
import { Animated, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface SimpleToastInterface {
  isSTVisible: boolean;
  isSTPosition: ('top' | 'bottom' | 'center') ;
  isSTBackground: string;
  isOverlayBackground: string;
  isSTRadius?: number | number[] | undefined;
  isSTpaddingFromTop?: number;
  isSTpaddingFromBottom?: number;
  isSTBody: string | React.ReactNode; 
  isSTAnimation: ('none' | 'slide' | 'fade');
  onClose: () => void;
}

const SimpleToast: React.FC<SimpleToastInterface> = ({ 
  isSTVisible, 
  isSTPosition = 'center', 
  isSTBackground = 'rgba(255, 255, 255, 1)', // DEFAULT
  isOverlayBackground = 'rgba(0, 0, 0, .5)', // DEFAULT
  isSTRadius = [0, 0, 0, 0],
  isSTpaddingFromTop = 0, 
  isSTpaddingFromBottom = 0,
  isSTBody, 
  isSTAnimation, 
  onClose
  }) => {

  const styles = StyleSheet.create({
    baseST: {
      minWidth:'85%',
      maxWidth: '90%',
      padding:24, 
      backgroundColor: isSTBackground,
      borderTopLeftRadius: Array.isArray(isSTRadius) ? isSTRadius[0] || 0 : isSTRadius || 0, // checks if the value is an array
      borderTopRightRadius: Array.isArray(isSTRadius) ? isSTRadius[1] || 0 : isSTRadius || 0,
      borderBottomLeftRadius: Array.isArray(isSTRadius) ? isSTRadius[2] || 0 : isSTRadius || 0,
      borderBottomRightRadius: Array.isArray(isSTRadius) ? isSTRadius[3] || 0 : isSTRadius || 0,
      alignItems: 'center',
      justifyContent: 'center',
      // elevation: 6,
      // shadowColor: 'rgba(0, 0, 0, .45)',
      // shadowOffset: {
      //   width: 2,
      //   height: 6,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 6,
    },
    modalContainer: {
      width:'100%',
      maxWidth:500,
      height:'100%',
      flexDirection: 'column',
      alignItems: 'center', // HOR.
      alignContent:'center',
      justifyContent: 
        isSTPosition === 'top'
          ? 'flex-start'
          : isSTPosition === 'center'
          ? 'center'
          : 'flex-end'
      , 
      paddingTop: isSTpaddingFromTop ? isSTpaddingFromTop : 0,
      paddingBottom: isSTpaddingFromBottom ? isSTpaddingFromBottom : 0,
    },
  });



    const modalSize= new Animated.Value(1.2);     // DA SCALA 0
    const modalOpacity = new Animated.Value(0); // DA OPACITY 0
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(modalSize, { 
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, { 
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
    useEffect( () => {
      isSTVisible && startAnimation()
      }, [isSTVisible]);
  


  return (  
      <Modal
        visible={isSTVisible}
        transparent={true}
        // backdropColor={'rgba(225, 0, 0, 1)'} // NON FUNZIONA TRASPARENZA: ASSEGNATO BGCOLOR ALLA TOUCHABLE
        animationType={isSTAnimation}
        onRequestClose={onClose}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        >
          <TouchableOpacity 
            style={[
              StyleSheet.absoluteFill, 
              {
                alignItems:'center', 
                backgroundColor: 'rgba(0, 0, 0, 0.30)'
              }
              ]} 
            onPress={onClose} 
            activeOpacity={1}>
            <View 
              style={styles.modalContainer}>
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={ (e) => e.stopPropagation() }>
                <Animated.View 
                  style={[
                    styles.baseST,
                    {
                    transform: [{scale: modalSize.interpolate({inputRange: [0, 1], outputRange: [0, 1]})}],
                    opacity: modalOpacity,
                    }
                    ]}>
                  {isSTBody}
                </Animated.View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
      </Modal>
  )

}
export default SimpleToast;

