import { IconSymbol } from '@/components/ui/IconSymbol';
import { View, Text, TouchableOpacity, StyleSheet, Modal, useColorScheme, Platform, ImageBackground, Animated } from "react-native";
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import Svg, {Path} from 'react-native-svg';
import { indexLabels as dataLabel } from '@/components/dataLabel';
import { useHolydays } from '@/context/HolydaysContext';        // CONTEXT
import FakeSplittedBar  from '@/components/ui/FakeSplittedBar';


const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};



// interface SideLabelInterface {
//     index: number;
//     action: () => void;
// }

/* ======================================================================
                                    MAIN
====================================================================== */
// const SideLabel: React.FC<SideLabelInterface> = ({
//     index,
//     action
//     }) => {
const SideLabel = () => {

    // GESTIONE COLORE
    const colors = useThemeColors();

    // VARIABILI DA CONTEXT
    const { 
        myLanguage
    } = useHolydays();

    const SVG_VIEWBOX = "0 0 654 506";

    // VISIBILITA INFO ANIMATE
    const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
    const [infoStep, setInfoStep] = useState<number>(1);
    

    // STYLES
    const styles = StyleSheet.create ({
    // INFOPOINT
    label: {
      position:'absolute',
      top:72,
      left:-56,
      zIndex:999999,
      width:90,
      height:28,
      borderRadius:24,
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end',
      padding:2,
      backgroundColor:colors.blueBar,
      elevation:12,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
      width: 4,
      height: 6, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 8 // Match elevation for iOS
      },
    infoBalloon: {
      width:'100%',
      minHeight:350,
      //backgroundColor: colors.cardBackground,
      //borderRadius:24,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems:'center',
      padding:24,
    },
    // TITOLO PAGINA
    sectionTitle: {
      fontSize: 20,
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
    svg: {
      position: 'absolute',
      top:0, left:'-30%',
      width: '175%',
      height: 400,
      resizeMode: 'contain',
      opacity: 1,

      elevation:24,
      shadowColor: colors.black, // iOS shadow
      shadowOffset: {
      width: 4,
      height: 6, // Match elevation for iOS
      },
      shadowOpacity: 0.45,
      shadowRadius: 8 // Match elevation for iOS
    },     // IMMAGINE DI SFONDO
    image: {      
      flex: 1,
      width: '100%',
      alignItems:'center',
    },
    })

    return (
        <>
        <View style={styles.label}>
            <TouchableOpacity
                onPress={ () => setInfoModalVisible(!infoModalVisible)}>
                <IconSymbol name="info.circle.fill" size={24} color={colors.white} />
            </TouchableOpacity>
        </View>  
        <Modal
            visible={infoModalVisible}
            transparent={false}           // false: così sormonta la bottom bar
            backdropColor={'#333'}      // colore sempre pieno: altrimenti si vede la bar
            animationType={'slide'}
            hardwareAccelerated={true}
            >
            <ImageBackground 
            source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
            resizeMode="cover" 
            style={styles.image} >

                <View style={
                    [StyleSheet.absoluteFill,
                    {
                        backgroundColor: useColorScheme() === 'light' ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .75)',
                    }]
                } />

                <View
                    style={[
                    StyleSheet.absoluteFill,
                    {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems:'center',
                    }]}>

                    <View style={{
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    paddingRight: 24,
                    }}>
                    <TouchableOpacity
                        style={{
                        backgroundColor:colors.cardBackground,
                        padding:12,
                        borderRadius:'100%'
                        }}
                        onPress={ () => {
                        setInfoModalVisible(!infoModalVisible);
                        setInfoStep(1)}}>
                        <IconSymbol name='xmark' size={Platform.OS === 'ios' ? 20 : 28} color={colors.blueBar} />
                    </TouchableOpacity>
                    </View>

                    <Animated.View
                    style={styles.infoBalloon}>
                    <Svg 
                        viewBox={SVG_VIEWBOX} 
                        preserveAspectRatio="xMidYMid meet" 
                        fill="none"
                        style={styles.svg}>
                        {infoStep === 1 ?                           
                            <Path d="M617.22 176.741C635.246 9.14016 303.827 -59.7463 135.345 60.9828C-23.1991 98.3852 -49.0849 287.527 93.0509 353.573C74.3808 404.773 141.112 440.836 228.946 455.77L214.386 505.549C244.199 487.795 260.146 460.091 260.146 460.091C369.17 471.925 497.454 453.015 537.485 393.343C590.178 393.343 714.287 305.281 617.22 176.741Z" fill={colors.cardBackground}/>
                            :
                            infoStep === 2 ?
                            <Path d="M617.22 176.553C635.246 9.13045 303.827 -59.6828 135.345 60.9181C-23.1991 98.2806 -49.0849 287.222 93.0509 353.197C69.5904 417.466 180.978 457.859 299.637 462.498C299.637 462.498 306.738 489.883 330.879 505.503V462.887C419.48 461.613 505.919 439.928 537.485 392.925C590.178 392.925 714.287 304.957 617.22 176.553Z" fill={colors.cardBackground}/>
                            :
                            <Path d="M617.22 176.553C635.246 9.13045 303.827 -59.6828 135.345 60.9181C-23.1991 98.2806 -49.0849 287.222 93.0509 353.197C62.6179 436.567 259.098 479.759 404.013 456.849C404.013 456.849 408.274 489.173 449.456 505.503L428.155 452.301C477.305 441.45 517.927 422.047 537.485 392.925C590.178 392.925 714.287 304.957 617.22 176.553Z" fill={colors.cardBackground}/>
                        }
                    </Svg>

                        <View style={{ // CONTENITORE TESTI DENTRO BALLOON
                        flex:1,
                        flexDirection:'column',
                        justifyContent:'space-around', // VER
                        alignItems:'center', // HOR
                        paddingHorizontal:12,
                        paddingTop:32,
                        paddingBottom:12,
                        }}>

                        {/* TITOLO + CHIUSURA */}
                        <View style={{
                            width:'100%', 
                            flexDirection:'row', 
                            justifyContent:'center',
                            }}>
                            <Text 
                            style={[styles.sectionTitle, {flex:1, textAlign: 'center'}]}>
                                Come funziona?
                            </Text>
                        </View>

                        {/* NUMERI */}
                        <View style={{
                            width:'100%', 
                            // borderWidth:1,
                            flexDirection:'row', 
                            justifyContent:'space-between', 
                            alignItems: 'center',
                            }}>
                            <TouchableOpacity onPress={ () => setInfoStep(1)}>
                            <View style={[styles.dot32, {backgroundColor:colors.blueBar}]}>
                                <Text style={styles.dot32text}>1</Text>
                            </View>
                            </TouchableOpacity>

                            <View style={{
                            width: 50, 
                            height:4, 
                            backgroundColor: infoStep >=2 ? colors.blueBar : '#666'
                            }}/>

                            <TouchableOpacity onPress={ () => setInfoStep(2)}>
                            <View style={[
                                styles.dot32, 
                                {backgroundColor: infoStep >=2 ? colors.blueBar : '#666'}
                                ]}>
                                <Text style={styles.dot32text}>2</Text>
                            </View>
                            </TouchableOpacity>

                            <View style={{
                            width: 50, 
                            height:4, 
                            backgroundColor: infoStep >=3 ? colors.blueBar : '#666'
                            }}/>

                            <TouchableOpacity onPress={ () => setInfoStep(3)}>
                            <View style={[
                                styles.dot32, 
                                {backgroundColor: infoStep >=3 ? colors.blueBar : '#666'}
                                ]}>                                
                                <Text style={styles.dot32text}>3</Text>
                            </View>
                            </TouchableOpacity>
                        </View>

                        {/* DIDASCALIA */}
                        <View style={{width:'100%', }}>
                            <Text style={{
                            fontSize:20,
                            fontWeight:600, 
                            lineHeight:28, 
                            color: colors.text, 
                            textAlign: 'center'}}>
                            {dataLabel(myLanguage, infoStep)}
                            </Text>
                        </View>

                        {/* FRECCETTE NAVIGAZIONE */}
                        <View style={{
                        width:'45%', 
                        flexDirection:'row', 
                        justifyContent:'space-between', 
                        alignItems:'center'
                        // position:'absolute',
                        
                        // bottom:24,
                        }}>
                            <TouchableOpacity
                            onPress={ () => {
                                if (infoStep > 1) setInfoStep( infoStep - 1 )
                                }}>                              
                            <IconSymbol name='chevron.left' size={Platform.OS === 'ios' ? 20:28} color={colors.disabled} />
                            </TouchableOpacity>
                            <View style={{width:12,height:12,borderRadius:20,
                                backgroundColor: infoStep === 1 ? colors.blueBar : colors.disabled}}/>
                            <View style={{width:12,height:12,borderRadius:20,
                                backgroundColor: infoStep === 2 ? colors.blueBar : colors.disabled}}/>
                            <View style={{width:12,height:12,borderRadius:20,
                                backgroundColor: infoStep === 3 ? colors.blueBar : colors.disabled}}/>
                            <TouchableOpacity
                            onPress={ () => {
                                if (infoStep < 3) setInfoStep( infoStep + 1 )
                                }}>
                            <IconSymbol name='chevron.right' size={Platform.OS === 'ios' ? 20:28} color={colors.disabled} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    </Animated.View>
                </View>

            <FakeSplittedBar 
                index={infoStep}/>

            </ImageBackground>
        </Modal>
        </>
    )







}

export default SideLabel;



