import { dataLabel, privacy } from '@/constants/dataLabel';
import { ScrollView, View, Text, Modal, ImageBackground, useColorScheme, StyleSheet, TouchableOpacity, Platform, Pressable} from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                      MAIN - Privacy
                                      
########################################################################################################### */
function Privacy(){

    const colors = useThemeColors();
    const xcrossSize = Platform.OS === 'ios' ? 24 : 32
    const [isPrivacyVisible, setIsPrivacyVisible] = useState<boolean>(false);
    const { 
        myLanguage
    } = useHolydays();

    return(
        <>
        <Pressable
            // style={{
            //     borderWidth:1, 
            //     borderColor: colors.textNegative, 
            //     borderRadius:99, 
            //     paddingVertical:12,
            //     paddingHorizontal:20,
            //     }}
            onPress={ () => setIsPrivacyVisible(true) }>
            <Text style={{
            fontSize:14,
            fontWeight:'800',
            textAlign: 'center',
            color: colors.white,
            }}>
            {dataLabel(myLanguage, 17)}
            </Text>
        </Pressable>        

        <Modal
            visible={isPrivacyVisible}
            transparent={false}           // false: così sormonta la bottom bar
            backdropColor={'#ffffff'}   // colore sempre pieno: altrimenti si vede la bar
            animationType={'slide'}
            hardwareAccelerated={true}
            >
            <ScrollView style={{
                position:'absolute',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                paddingHorizontal:24,
                paddingVertical: 96,
                backgroundColor: colors.cardBackground,
            }}>
                <Text 
                    style={{fontSize:14, color: colors.text}} >
                    {privacy('en', 0)}
                </Text>
            </ScrollView>

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
                    backgroundColor: colors.cancelButton,
                    borderRadius: 99,
                    }}
                    onPress={ () => setIsPrivacyVisible(false) }>
                    <IconSymbol name='xmark' 
                        size={xcrossSize} 
                        color={colors.disabled} />
                </TouchableOpacity>
            </View>        
        </Modal>
        </>
    )
};

export default Privacy;