import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { HolydaysProvider } from '@/context/HolydaysContext'; // CONTEXT
import { SplashCarouselProvider } from '@/context/SplashCarouselContext';
//import { useFonts } from 'expo-font';
//import { useColorScheme } from '@/hooks/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import mobileAds from 'react-native-google-mobile-ads';
import { useEffect } from 'react';

// GESTISCE LE CHIAMATE ESTERNE DEL TIPO pontivia://...
const linking = {
  prefixes: ['pontivia://'],
  config: {
    screens: {
      Home: 'index',              // pontivia://index/
      Holydays: 'holydays',       // pontivia://holydays/
      Preferences: 'preferences', // pontivia://preferences/
    },
  },
};

/* ###########################################################################################################

                                      MAIN
                                      
########################################################################################################### */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // INIZIALIZZAZIONE ADMOB AL BOOT DELL'APP
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob Initialized @ app boot (_layout.tsx)');
      })
      .catch(error => {
        console.error('AdMob initialization error:', error);
      });
  }, []);

  // const [loaded] = useFonts({
  //   SpaceMono: require('@/assets/fonts/NotoSans.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  return (
    <>
      <SplashCarouselProvider>
        <HolydaysProvider>
          <ThemeProvider value={isLight ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  headerStyle: { backgroundColor: 'transparent' },
                  headerTintColor: 'dark',
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" />
          </ThemeProvider>
          <PortalHost />
        </HolydaysProvider>
      </SplashCarouselProvider>
    </>
  );
}
