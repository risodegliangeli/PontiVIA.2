import { IconSymbol } from '@/components/ui/IconSymbol';
import { View, Text, TouchableOpacity, StyleSheet, Modal, useColorScheme, Platform, ImageBackground, Pressable, } from "react-native";
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
//import Svg, {Path} from 'react-native-svg';
import { indexLabels as dataLabel } from '@/components/dataLabel';
//import { splittedBarLabel } from '@/components/dataLabel';
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

    // VARIABILI DA CONTEXT
    const { 
        myLanguage
    } = useHolydays();

    // VISIBILITA INFO ANIMATE
    const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
    const [infoStep, setInfoStep] = useState<number>(1);

    // STYLES
    const styles = StyleSheet.create ({
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
        color: colors.white, 
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
                source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg') }
                resizeMode="cover" 
                style={styles.image} >

                    {/* OVERLAY 50% */}
                    <View style={
                        [StyleSheet.absoluteFill,
                        {
                            backgroundColor: useColorScheme() === 'light' ? 'rgba(0, 0, 0, .5)' : colors.cardBackground,
                        }]
                    } />

                    {/* PULS CHIUSURA */}
                    <View style={{
                        position:'absolute',
                        top:Platform.OS === 'ios' ? 44 : 0,
                        right: 0,
                        }}>
                        <TouchableOpacity
                            style={{
                            padding:36,
                            }}
                            onPress={ () => {
                                setInfoModalVisible(!infoModalVisible);
                                setInfoStep(1)}}>
                            <IconSymbol name='xmark' size={Platform.OS === 'ios' ? 28 : 36} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    
                    {/* WRAPPER PRINCIPALE */}
                    <View
                        style={[
                        StyleSheet.absoluteFill,
                        {
                            flexDirection: 'column',
                            justifyContent: 'center',
                            //alignItems:'center',
                            //maxWidth: 550,
                            position:'absolute',
                            // left:'50%',
                            // transform: [{translateX:'-50%'}]
                        }]}>

                        {/* TESTI   */}
                        <View style={styles.infoBalloon}>
                            <View 
                                style={{ 
                                    flex:1,
                                    flexDirection:'column',
                                    justifyContent:'center', // VER
                                    alignItems:'center', // HOR
                                    //borderWidth:2,
                                    maxWidth: 550,
                                }}>

                                {/* COME FUNZIONA PONTIVIA? */}
                                <Text 
                                    style={[
                                        styles.sectionTitle, 
                                        {
                                            color:colors.white, 
                                            width:'100%', 
                                            textAlign: 'center',
                                            marginBottom:24,
                                        }]}>
                                    {dataLabel(myLanguage, 4)}
                                </Text>

                                {/* NAVIGAZIONE E PALLINI */}
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
                                        <IconSymbol name='chevron.left' size={Platform.OS === 'ios' ? 20:28} color={colors.white} />
                                    </TouchableOpacity>
                                    <Pressable 
                                        onPress={ () => setInfoStep(1) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 1 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, .5)' }}/>
                                    <Pressable 
                                        onPress={ () => setInfoStep(2) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 2 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, .5)'}}/>
                                    <Pressable 
                                        onPress={ () => setInfoStep(3) }
                                        style={{width:12, height:12, borderRadius:12,
                                        backgroundColor: infoStep === 3 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, .5)'}}/>
                                    <TouchableOpacity
                                        onPress={ () => {
                                            if (infoStep < 3) setInfoStep( infoStep + 1 )
                                            }}>
                                        <IconSymbol name='chevron.right' size={Platform.OS === 'ios' ? 20:28} color={colors.white} />
                                    </TouchableOpacity>
                                </View>                       
                            </View>
                        </View>

                        {/* DIDASCALIA */}
                        <View style={{
                            width:'100%',
                            maxWidth: 550,
                            paddingHorizontal:24,
                            position:'absolute',
                            left:'50%',
                            transform: [{translateX: '-50%'}],
                            bottom: 160,
                            }}>
                            <Text style={styles.dida}>
                            {dataLabel(myLanguage, infoStep)}
                            </Text>
                        </View>
                    </View>

                <FakeSplittedBar 
                    index={infoStep}
                    action={ (x) => {
                        setInfoStep(x);
                        //console.log('azione di ritorno', x)
                        } }/>

                </ImageBackground>
            </Modal>
        </>
    )
}

export default SideLabel;



