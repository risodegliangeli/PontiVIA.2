import { View, Text, useColorScheme, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';
import { IconSymbol } from "@/components/ui/IconSymbol";

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
export default function InfoPoint ()  {

    const colors = useThemeColors();
    const styles = StyleSheet.create({
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
    modalInfo: {
        display: 'none',
    }
})

    return (    
        <>
            <View style={styles.label}>
                <TouchableOpacity
                    onPress={ () => null }>
                    <IconSymbol name="info.circle.fill" size={24} color={colors.white} />
                </TouchableOpacity>
            </View>  

        </>
    )


}

