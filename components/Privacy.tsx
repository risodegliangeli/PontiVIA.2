import { dataLabel, privacy } from '@/constants/dataLabel';
import { ScrollView, View, Text, Modal, ImageBackground, useColorScheme, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
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
function Privacy() {

    const colors = useThemeColors();
    const isIos = Platform.OS === 'ios';
    const xcrossSize = isIos ? 24 : 32
    const [isPrivacyVisible, setIsPrivacyVisible] = useState<boolean>(false);
    const {
        myLanguage
    } = useHolydays();

    return (
        <>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    gap: 12,
                }}
                onPress={() => setIsPrivacyVisible(true)}>
                <IconSymbol
                    name={'eye.fill'}
                    size={28}
                    color={'#78beff'} //'white'
                />
                <Text style={{
                    fontSize: 14,
                    fontWeight: '800',
                    textAlign: 'center',
                    color: '#78beff', //colors.blueBar, //colors.white,
                }}>
                    {dataLabel(myLanguage, 17)}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isPrivacyVisible}
                transparent={false}           // false: così sormonta la bottom bar
                backdropColor={'rgba(71,64,71, 1)'}   // colore sempre pieno: altrimenti si vede la bar
                animationType={'slide'}
                hardwareAccelerated={true}
            >
                <ScrollView style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: [{ translateX: '-50%' }],
                    width: '100%',
                    maxWidth: 550,
                    height: '100%',
                    paddingHorizontal: 24,
                    paddingVertical: 96,
                    backgroundColor: colors.cardBackground,
                }}>
                    <Text
                        style={{ fontSize: 14, color: colors.text }} >
                        {privacy('en', 0)}
                    </Text>
                </ScrollView>

                {/* PULS CHIUSURA */}
                <View style={{
                    position: 'absolute',
                    top: isIos ? 48 : 0,
                    right: 0,
                }}>
                    <TouchableOpacity
                        style={{
                            padding: 6,
                            marginTop: 24,
                            marginRight: 24,
                            backgroundColor: colors.cancelButton,
                            borderRadius: 99,
                        }}
                        onPress={() => setIsPrivacyVisible(false)}>
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