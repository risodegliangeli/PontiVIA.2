// MY CUSTOM BAR
// import CustomTabBar from '@/components/ui/CustomTabBar';
import SplittedBar from '@/components/ui/SplittedBar';

// CONTEXT
import { HolydaysProvider } from '@/context/HolydaysContext';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

// GRADIENT BLUR
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from 'expo-blur';
import { LinearGradient } from "expo-linear-gradient";
import { easeGradient } from "react-native-easing-gradient";

// const useThemeColors = () => {
//   const colorScheme = useColorScheme();
//   return Colors[colorScheme ?? 'light'];
// };

/* ###########################################################################################################

                                                MAIN
                                      
########################################################################################################### */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const gradient = easeGradient({
    colorStops: {
      0: {color: 'rgba(0,0,0, 1)'},
      0.5: {color: 'rgba(0,0,0, .5)'},
      1: {color: 'rgba(0,0,0, .01)'}
    },
  });
  const colors = gradient.colors;
  const locations = gradient.locations;

  const BlurPad = () => {
    return (
      <MaskedView
        maskElement={
          <LinearGradient
            locations={locations as [number, number, ...number[]]}
            colors={colors as [string, string, ...string[]]}
            style={[StyleSheet.absoluteFill, {height:64, pointerEvents: 'box-none',}]} />
          }
        style={[StyleSheet.absoluteFill, {pointerEvents: 'box-none',}]} >
        <BlurView 
          experimentalBlurMethod="dimezisBlurView"
          intensity={60}
          tint={colorScheme === 'light' ? 'light' : 'dark'}
          style={{
            position:'absolute', 
            top:0, 
            left:0, 
            height:128, 
            width:'100%', 
            pointerEvents: 'box-none',}} />
      </MaskedView>       
    )
  };




    //   <BlurView
        // style={{ 
        //   position: 'absolute',
        //   left: 0, 
        //   top: 0, 
        //   width:'100%',
        //   height:56,
        //   }}
    //     experimentalBlurMethod="dimezisBlurView"
    //     intensity={8}
    //     tint="default"
    //     // blurType="none"
    //     // borderRadius={10}
    //   /> 
    // );
    //};

  return (
    <HolydaysProvider>
      <MenuProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>          
          <Tabs
            initialRouteName="index"
            tabBar={ props => <SplittedBar {...props} />}
            screenOptions={{
              headerShown: false,
            }} 
            >

            {/* ================================== HOLYDAYS LIST  ================================== */}
            <Tabs.Screen
              name="holydays"
              options={{
                title: '',
                headerTitleAlign: 'center',
                headerShown: true,
                headerTransparent: true,
                headerBackground: () => (
                  <BlurPad/>
                ),
                // headerTitle: logo,
                // headerStyle: {
                //   height: 64,
                //   //backgroundColor: 'transparent',
                //   // elevation: 12, // Android shadow
                //   // shadowColor: colors.black, // iOS shadow
                //   // shadowOffset: {
                //   //   width: 0,
                //   //   height: 4, // Match elevation for iOS
                //   // },
                //   // shadowOpacity: 0.25,
                //   // shadowRadius: 4// Match elevation for iOS
                // },
                // paddingTop: 69,
                // tabBarIcon: ({ color }) => {
                //   return < size={28} name="calendar" color={color} />;
                // },
                // tabBarActiveTintColor: '#FFF',
                // tabBarInactiveTintColor: 'rgba(45, 115, 114, 1)',
                // tabBarLabelStyle: {
                //   fontSize: 12,
                //   fontWeight: 'bold',
                //   }
              }} />
            
            {/* ================================== INDEX ================================== */}
            <Tabs.Screen
              name="index"
              options={{
                title: '',
                headerTitleAlign: 'center',
                headerShown: true,
                headerTransparent: true,
                headerBackground: () => (
                  <BlurPad/>
                ),
                // headerTitle: logo,
                // headerStyle: {
                //   height: 64,
                //   //backgroundColor: 'transparent',
                //   // elevation: 12, // Android shadow
                //   // shadowColor: colors.black, // iOS shadow
                //   // shadowOffset: {
                //   //   width: 0,
                //   //   height: 4, // Match elevation for iOS
                //   // },
                //   // shadowOpacity: 0.25,
                //   // shadowRadius: 4// Match elevation for iOS
                // },
                // paddingTop: 69,
                // tabBarIcon: ({ color }) => {
                //   return <IconSymbol size={28} name="calendar" color={color} />;
                // },
                // tabBarActiveTintColor: '#FFF',
                // tabBarInactiveTintColor: 'rgba(45, 115, 114, 1)',
                // tabBarLabelStyle: {
                //   fontSize: 12,
                //   fontWeight: 'bold',
                //   }
              }} />

            {/* ================================== PREFERENCES  ================================== */}
            <Tabs.Screen
              name="preferences"
              options={{
                title: '',
                headerTitleAlign: 'center',
                headerShown: true,
                headerTransparent: true,
                headerBackground: () => (
                  <BlurPad/>
                ),
                // headerTitle: logo,
                // headerStyle: {
                //   height: 64,
                //   //backgroundColor: 'transparent',
                //   // elevation: 12, // Android shadow
                //   // shadowColor: colors.black, // iOS shadow
                //   // shadowOffset: {
                //   //   width: 0,
                //   //   height: 4, // Match elevation for iOS
                //   // },
                //   // shadowOpacity: 0.25,
                //   // shadowRadius: 4// Match elevation for iOS
                // },
                // paddingTop: 69,
                // tabBarIcon: ({ color }) => {
                //   return <IconSymbol size={28} name="calendar" color={color} />;
                // },
                // tabBarActiveTintColor: '#FFF',
                // tabBarInactiveTintColor: 'rgba(45, 115, 114, 1)',
                // tabBarLabelStyle: {
                //   fontSize: 12,
                //   fontWeight: 'bold',
                //   }
              }}
            />
          </Tabs>
        </ThemeProvider>
      </MenuProvider>
    </HolydaysProvider>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     blurContainer: {
//         position: 'absolute',
//         bottom: 0,
//         zIndex: 2,
//     },
//     linearGradient: {
//         bottom: 0,
//         position: 'absolute',
//     },
//     textContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1
//     },
//     text: {
//         color: 'white',
//         fontSize: 40,
//         fontWeight: 'bold'
//     }
// })

