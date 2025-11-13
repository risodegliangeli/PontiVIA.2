import SplittedBar from '@/components/ui/SplittedBar';// MY CUSTOM SPLITTED BAR
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme,   } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from 'expo-blur';
import { LinearGradient } from "expo-linear-gradient";
import { easeGradient } from "react-native-easing-gradient";
import * as SplashScreen from 'expo-splash-screen'; 
import { useHolydays } from '@/context/HolydaysContext';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
//import { useContext } from 'react';
//import { HolydaysProvider } from '@/context/HolydaysContext';// CONTEXT

/* ###########################################################################################################

                                      MAIN
                                      
########################################################################################################### */
export default function TabLayout() {

  SplashScreen.setOptions({
    duration: 1500, // Esempio: 1000 millisecondi (1 secondo)
    fade: true,
  });

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
        pointerEvents="none"
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

  const { isCarouselVisible } = useHolydays();
  console.log(`(tabs)/_layout isCarouselVisible: ${isCarouselVisible}`);

  return (
    <MenuProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> 
        <Tabs
          initialRouteName="index"
          tabBar={ props => <SplittedBar {...props}/>}
          screenOptions={{
            headerShown: false,
            tabBarStyle: isCarouselVisible ? { display:"none" } : undefined,
            animation: 'shift', // fade | shift | none
            transitionSpec: {
              animation: 'timing',
              config: {
                duration: 250,
              },
            },
          }}>

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
            }} />
            
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
            }}
          />
        </Tabs>          
      </ThemeProvider>
    </MenuProvider>
  );
}


