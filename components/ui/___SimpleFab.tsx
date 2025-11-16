import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image, useColorScheme, Platform} from 'react-native';
import { Colors } from '@/constants/Colors';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

interface SimpleFabInterface {
  fabBackgroundColor?: string;
  fabIconsSet?: 'dark' | 'light';
  distanceFromRight: number;
  distanceFromBottom: number ;
  firstFabAction: () => void;
  secondFabAction: () => void;
}

/* ======================================================================
                                    MAIN
====================================================================== */
const SimpleFab: React.FC<SimpleFabInterface> = ({
  fabBackgroundColor,
  fabIconsSet,
  distanceFromRight,
  distanceFromBottom,
  firstFabAction,
  secondFabAction
  }) => {

  const colors = useThemeColors();  
  
  // // SE NON E' STATO PASSATO ALCUN COLORE PER DEFAULT SI PESCA IL COLORE DI SFONDO DI ANDROID
  fabBackgroundColor === undefined ? fabBackgroundColor=colors.tabBarBackgroundAndroid : null;
  fabIconsSet === undefined ? fabIconsSet = 'dark' : null;

  console.log('valore assegnato a fabIconSet', fabIconsSet);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue  = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const styles = StyleSheet.create({
      fabOverlay: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor: 'rgba(0, 0, 0, .5)',
      },      
      fabContainer: {
        position:'absolute',
        bottom: distanceFromBottom,
        right: distanceFromRight,
        flexDirection:'column',
        alignItems:'flex-end',
      },
      touchableFab: {
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        marginBottom:16,
        marginRight:12,
      },
      smallFab:{
        width:40,
        height:40,
        borderRadius:12,
        backgroundColor: fabBackgroundColor,
        elevation: 6, // ANDROID SHADOW
        shadowColor: 'black', // iOS shadow
        shadowOffset: {
          width: 0,
          height: 4, // Match elevation for iOS
        },
        shadowOpacity: 0.25,
        shadowRadius: 6, // Match elevation for iOS 
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      },
      smallFabLabel: {
        backgroundColor:fabBackgroundColor,
        maxHeight:28,
        paddingVertical:4,
        paddingHorizontal:8,
        borderRadius:4,
        flexDirection:'column',
        justifyContent:'center',
      },
      smallFabText:{
        fontSize:12, 
        fontWeight:600,
        color: fabIconsSet === 'dark' ? '#0088ff' : 'white',
      },
      largeFab:{
        width:64,
        height:64,
        borderRadius:16,
        backgroundColor: fabBackgroundColor,
        elevation: 6, // ANDROID SHADOW
        shadowColor: 'black', // iOS shadow
        shadowOffset: {
          width: 0,
          height: 4, // Match elevation for iOS
        },
        shadowOpacity: 0.25,
        shadowRadius: 6, // Match elevation for iOS 
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }, 
    })
  
  const largeFabPress = () => {  // RUOTA DI 45°

    setModalVisible(!modalVisible)

    Animated.timing(rotateValue, {
      toValue: rotateValue._value === 0 ? rotateValue._value + 45 : rotateValue._value - 45,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleValue, { // RIDUCI/ESPANDI
      toValue: scaleValue._value === 1 ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
  };

  const resetFab = () => {
    setModalVisible(!modalVisible);
    rotateValue.setValue(0);
    scaleValue.setValue(0);
  }

  return (
    <React.Fragment>
      {/* OVERLAY */}
      { modalVisible ? <View style={styles.fabOverlay} /> : null } 

      <View style={styles.fabContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {/* 1 SMALL FAB */}
            <TouchableOpacity 
              style={styles.touchableFab} 
              onPress={ () => {
                resetFab()
                firstFabAction()
              }}>
              <View style={styles.smallFabLabel}>
                <Text style={styles.smallFabText}>Aggiungi un giorno</Text>
              </View>
              <View style={styles.smallFab}>
                <Image 
                  source={ fabIconsSet === 'dark' ? require('@/assets/images/icon_calendar_today_20.png') : require('@/assets/images/icon_calendar_today_20_neg.png')} 
                  style={{width:18, height:18, resizeMode:'contain'}}/>
              </View>
            </TouchableOpacity>

            {/* 2 SMALL FAB */}
            <TouchableOpacity 
              style={styles.touchableFab} 
              onPress={ () => {
                resetFab()
                secondFabAction()
                }}>
              <View style={ styles.smallFabLabel }>
                <Text style={styles.smallFabText}>Aggiungi più giorni</Text>
              </View>
              <View style={styles.smallFab}>
                <Image 
                  source={fabIconsSet === 'dark' ? require('@/assets/images/icon_calendar_month_20.png') : require('@/assets/images/icon_calendar_month_20_neg.png')} 
                  style={{width:18, height:18, resizeMode:'contain'}}/>
              </View>
            </TouchableOpacity>
        </Animated.View>

        {/* SPACE */}
        <View style={{width:'100%', height:6}} />

        {/* LARGE FAB */}
        <TouchableOpacity onPress={ () => largeFabPress() }>
          <View style={styles.largeFab}>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }], }} >
            <Image 
              source={fabIconsSet === 'dark' ? require('@/assets/images/icon_add_18.png') : require('@/assets/images/icon_add_18_neg.png')} 
              style={{ width:24, height:24, resizeMode:'contain', }}/>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>

    </React.Fragment>
    )
  }

export default SimpleFab;