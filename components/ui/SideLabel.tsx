import { IconSymbol } from '@/components/ui/IconSymbol';
import { View, Text, TouchableOpacity, StyleSheet, Modal, useColorScheme, Platform, ImageBackground, Pressable, Dimensions} from "react-native";
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import Svg, {Path} from 'react-native-svg';
import { indexLabels as dataLabel } from '@/constants/dataLabel';
//import { splittedBarLabel } from '@/constants/dataLabel';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT
import FakeSplittedBar  from '@/components/ui/FakeSplittedBar';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ======================================================================
                                    MAIN
====================================================================== */
const SideLabel = () => {

    // GESTIONE COLORE
    const colors = useThemeColors();
    const colorScheme = useColorScheme();
    const isLight = colorScheme === 'light';

    const viewBox="0 0 360 557";
    const fill = isLight ? 'rgba(255, 255, 255, .85)' : 'rgba(255, 255, 255, .15)'
    const {width, height} = Dimensions.get("window");

    // VARIABILI DA CONTEXT
    const { 
        myLanguage
    } = useHolydays();

    // VISIBILITA INFO ANIMATE
    const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
    const [infoStep, setInfoStep] = useState<number>(1);

    // STYLES
    const styles:any = StyleSheet.create ({
    // INFOPOINT
    label: {
      position:'absolute',
      top:72,
      left:-54,
      zIndex:999999,
      width:90,
      height:32,
      borderRadius:24,
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end',
      padding:2,
      backgroundColor:colors.dot32,
      elevation:18,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
      width: 4,
      height: 18, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 16 // Match elevation for iOS
    },
    infoBalloon: {
      width:'100%',
      minHeight:120,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'center',
      alignContent:'center',
    },
    // TITOLO PAGINA
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    dot32: {
      width:44, 
      height:44, 
      borderRadius:24, 
      backgroundColor: '#dedede',
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },
    dot32text:{
      position:'absolute',
      top:0, left:0,
      width: '100%',
      height:'100%',
      fontSize:28,
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 1)',
      textAlign:'center',
      paddingTop: Platform.OS === 'ios' ? 6 : 3,
    },
    // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center',
    },
    dida: {
        fontSize:20,
        fontWeight:400, 
        lineHeight:28, 
        letterSpacing: .6,
        color: colors.text, 
        textAlign: 'center'
    }
    })


    return (
        <>
            <View style={styles.label}>
                <TouchableOpacity
                    onPress={ () => setInfoModalVisible(!infoModalVisible)}>
                    <IconSymbol name="info.circle.fill" size={28} color={colors.white} />
                </TouchableOpacity>
            </View>  
            <Modal
                visible={infoModalVisible}
                transparent={false}           // false: così sormonta la bottom bar
                backdropColor={'#333'}      // colore sempre pieno: altrimenti si vede la bar
                animationType={'fade'}
                hardwareAccelerated={true}
                >
                <ImageBackground 
                source= {isLight && require('@/assets/images/background-image_minified.jpg') }
                resizeMode="cover" 
                style={styles.image} >

                    {/* OVERLAY 50% */}
                    <View style={
                        [StyleSheet.absoluteFill,
                        {
                            backgroundColor: isLight ? 'rgba(0, 0, 0, .5)' : colors.cardBackground,
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                        }]}/>

                    <View style={{ 
                        maxWidth: 600, 
                        width: '100%', 
                        alignSelf: 'center',
                        position:'absolute',
                        top: Math.trunc(height * .5), 
                        transform: [{translateY: Math.trunc(height * .35) * -1}],
                        }}>

                        <Svg
                            viewBox={viewBox}
                            width="100%"
                            height="100%"
                            fill={fill}
                            preserveAspectRatio="xMidYMid meet"
                            style={{ aspectRatio: 360/557, maxWidth: width}}
                            >
                            <Path d="M478 260.2C478 373.679 394.663 470.191 278.428 505.77L299.014 557C265.848 540.988 250.408 512.966 250.408 512.966C227.507 517.872 204.138 520.4 179.5 520.4C14.643 520.4 -119 403.905 -119 260.2C-119 116.496 14.643 0 179.5 0C344.357 0 478 116.496 478 260.2Z" />
                        </Svg>

                        <View style={{
                            width:'100%',
                            height:'70%',
                            position:'absolute',
                            top:0,
                            flexDirection:'column',
                            justifyContent:'space-between',
                            gap:48,
                            alignItems:'center',
                            alignContent:'center',
                            marginVertical:94,
                            }}>
                            <Text style={styles.sectionTitle}>
                                {dataLabel(myLanguage, 4)}
                            </Text>

                            <Text style={[styles.dida, {paddingHorizontal:48}]}>
                                {dataLabel(myLanguage, infoStep)}
                            </Text>

                            <View style={{
                                flexDirection:'column',
                                alignItems:'center',
                                gap:48,
                                }}>
                                {/* SPLITTED BAR */}
                                <FakeSplittedBar 
                                    index={infoStep}
                                    action={ (x) => {
                                        setInfoStep(x);
                                        }}/>
                                {/* PALLINI */}
                                <View style={{
                                    width:'55%', 
                                    //maxWidth: 314,
                                    flexDirection:'row', 
                                    justifyContent:'space-between', 
                                    alignItems:'center'
                                    }}>
                                    <TouchableOpacity
                                        onPress={ () => {
                                            if (infoStep > 1) setInfoStep( infoStep - 1 )  
                                            }}>                              
                                        <IconSymbol name='chevron.left' size={Platform.OS === 'ios' ? 20:28} color={colors.disabled} />
                                    </TouchableOpacity>
                                    <Pressable 
                                        onPress={ () => setInfoStep(1) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 1 ? colors.blueBar : colors.disabled }}/>
                                    <Pressable 
                                        onPress={ () => setInfoStep(2) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 2 ? colors.blueBar : colors.disabled }}/>
                                    <Pressable 
                                        onPress={ () => setInfoStep(3) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 3 ? colors.blueBar : colors.disabled }}/>
                                    <TouchableOpacity
                                        onPress={ () => {
                                            if (infoStep < 3) setInfoStep( infoStep + 1 )
                                            }}>
                                        <IconSymbol name='chevron.right' size={Platform.OS === 'ios' ? 20:28} color={colors.disabled} />
                                    </TouchableOpacity>
                                </View>  
                            </View>


                        </View>
                    </View>

                    {/* PULS CHIUSURA */}
                    <View style={{
                        position:'absolute',
                        top:Platform.OS === 'ios' ? 44 : 0,
                        right: 0,
                        }}>
                        <TouchableOpacity
                            style={{
                            padding:6,
                            marginTop:24,
                            marginRight:24,
                            backgroundColor: isLight ? colors.cancelButton : 'rgba(255, 255, 255, .15)',
                            borderRadius: 99,
                            }}
                            onPress={ () => {
                                setInfoModalVisible(!infoModalVisible);
                                setInfoStep(1)}}>
                            <IconSymbol name='xmark' 
                                size={Platform.OS === 'ios' ? 24 : 32} 
                                color={isLight ? colors.black : colors.disabled} />
                        </TouchableOpacity>
                    </View>  
                </ImageBackground>
            </Modal>
        </>
    )
}

export default SideLabel;



