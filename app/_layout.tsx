console.log('[@/_Layout]');

import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

// GESTISCE LE CHIAMATE ESTERNE pontivia://...
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

/* ======================================================

MAIN

====================================================== */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/NotoSans.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider 
      value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ 
              headerShown: false, headerStyle: {backgroundColor: 'transparent'}, headerTintColor: 'dark' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
