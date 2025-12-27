import useLocalizationData from '@/app/data/data';
import DropdownComponent from '@/components/ui/DropdownComponent'; // DROPDOWN DURATA PONTI
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { getLocales, } from 'expo-localization';
import { dataLabel as switchNames } from '@/constants/dataLabel'; // LABEL LOCALIZZATE
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
//import * as Linking from 'expo-linking';
//import UseSideLabel from '@/components/ui/SideLabel';
import createPreferencesStyles from '@/components/styles/createPreferencesStyles';
// import { BACKGROUND_BRIDGE_TASK } from '@/utils/backgroundTask';
// import { registerForPushNotificationsAsync } from '@/utils/notifications';

import {
  ImageBackground,
  Platform,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  Pressable,
  Dimensions,
} from 'react-native';
//import Privacy from '@/components/Privacy';

// GOOGLE ADMOB ///////////////////////////////////
import mobileAds, { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';

// COLORI
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

/* ============================================================================= 

                          MAIN EXPORT - Preferences

============================================================================= */
export default function Preferences() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  // AGGANCIA LE VARIABILI myPreferences E preferences DAL CONTEXT
  const {
    myPreferences, setMyPreferences,
    myLanguage,
    adUnitId,
  } = useHolydays();

  // ADV: TEST ID FROM https://developers.google.com/admob/ios/test-ads?hl=it
  // DA AGGIORNARE/RIMUOVERE CON ID CORRETTI
  // - iOS id: 
  // ca-app-pub-3704551485094904/6380057197
  // - Android id:
  // ca-app-pub-3704551485094904/1638672883
  //const adUnitId = Platform.OS === 'ios' ? "ca-app-pub-3940256099942544/2934735716" : "ca-app-pub-3940256099942544/6300978111";

  // SWITCH ADV PER TEST
  const isAdvertising: boolean = true; // SE ATTIVA CAMPAGNA AdMob

  // NOMI GIORNI LOCALIZZATI
  const { localizedDays } = useLocalizationData();

  const navigation = useNavigation();

  // ADMOB
  const bannerRef = useRef<BannerAd>(null);
  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  // CALCOLO DINAMICO MARGINE ESTERNO DELLE CARD
  const width = Dimensions.get("window").width;
  const sideMargin = Math.trunc(width * .025); // MARGINE LATERALE

  const [dropdownSelected, setDropdownSelected] = useState<number>(Math.trunc(myPreferences?.bridgeDuration ?? 3));

  /* ============================================================================= 
    GESTIONE BACKGROUND TASK
  ============================================================================= */
  // Aggiorna lookahead (REMOVED)
  /*
  const updateLookahead = async (val: number) => {
    // Feature removed
  }
  */

  // GESTISCE PULSANTE 'MODIFICA LISTA FESTIVITA'
  const handleEditHolydays = () => { navigation.navigate('holydays' as never) };
  // const handleBackgroundTaskTest = () => { navigation.navigate('test-background' as never) };

  const styles = createPreferencesStyles();

  // AGGIORNA CONTEXT A OGNI CAMBIAMENTO DI PREFERENCES
  /* ===================================================
    SWITCH DINAMICO: usa myPreferences dal context
  =================================================== */
  function PreferenceSwitch({ preferenceKey }: { preferenceKey: string }) {
    const colors = useThemeColors();
    const [isEnabled, setIsEnabled] = useState<boolean>(myPreferences?.[preferenceKey]?.status ?? false);

    // Sincronizza lo stato locale con il valore dal context
    useEffect(() => {
      setIsEnabled(myPreferences?.[preferenceKey]?.status ?? false);
    }, [myPreferences?.[preferenceKey]?.status]);

    // cambia stato dello switch: aggiorna context e salva su AsyncStorage
    const toggleSwitch = async () => {
      const newStatus = !isEnabled;
      setIsEnabled(newStatus);
      const updated = { ...myPreferences, [preferenceKey]: { ...(myPreferences?.[preferenceKey] ?? {}), status: newStatus } };
      setMyPreferences(updated);
      try { await AsyncStorage.setItem('PREFERENCES_KEY', JSON.stringify(updated)); } catch (e) { console.error('Failed to save preferences:', e); }
    };

    // STILI DELLO SWITCH
    const styles = StyleSheet.create({
      image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
      },
      preferenceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      },
      text: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '400',
      }
    });

    return (
      <View style={styles.preferenceRow as ViewStyle}>
        <Text style={styles.text}>{(myPreferences?.[preferenceKey]?.label ?? preferenceKey)}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      source={isLight
        ? require('@/assets/images/background-image_minified.jpg')
        : require('@/assets/images/background-image_minified-dark.jpg') // o stessa immagine
      }
      resizeMode="cover"
      style={[styles.image, { alignItems: 'center' }]}>

      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false} >

        {/* ======================== TITOLO PAGINA  ======================== */}
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Text style={[styles.sectionTitle, { flex: 1, marginBottom: 6 }]}>
            {switchNames(myLanguage, 12)}
          </Text>
        </View>

        {/* GOOGLE ADMOB ############################################################################# */}
        {isAdvertising && (adUnitId !== undefined) &&
          <View style={[styles.advContainer, { width: '100%', alignItems: 'center', }]}>
            <Text style={{ fontSize: 10, color: colors.disabled, marginBottom: 8 }}>ADV</Text>
            <BannerAd
              ref={bannerRef}
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE} />
          </View>
        }

        {/* ==================== DROPDOWN DURATA PONTI ==================== */}
        <View style={styles.groupContainer}>
          <Text style={[styles.listTitle, { textAlign: 'center' }]}>{switchNames(myLanguage, 11)}</Text>
          <DropdownComponent
            language={myLanguage}
            selectedValue={dropdownSelected}
            onChange={async (value) => {
              setDropdownSelected(value);           // POSIZIONA LA VOCE DELLA DROPDOWN
              const updated = { ...myPreferences, bridgeDuration: value };
              setMyPreferences(updated);            // AGGIORNA LA VARIABILE myPreferences
              try { await AsyncStorage.setItem('PREFERENCES_KEY', JSON.stringify(updated)); } catch (e) { console.error('Failed to save preferences:', e); }
            }}
          />
        </View>

        {/* ==================== NOTIFICHE BACKGROUND (DISABLED) ==================== */}
        {/*
        <View style={styles.groupContainer}>
          <Text style={[styles.listTitle, { textAlign: 'center' }]}>{switchNames(myLanguage, 20)}</Text>

          <Text style={{ fontSize: 13, color: colors.text, marginBottom: 8, paddingHorizontal: 4 }}>{switchNames(myLanguage, 21)}</Text>
          <DropdownLookahead
            selectedValue={lookaheadValue}
            onChange={updateLookahead}
          />

          <View style={{ width: '100%', height: 1, backgroundColor: colors.border, marginBottom: 12 }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, color: colors.text }}>{switchNames(myLanguage, 26)}</Text>
            <Switch
              onValueChange={toggleBackground}
              value={isBackgroundEnabled}
            />
          </View>
        </View>
        */}

        {/* ==================== DROPDOWN GIORNO SETTIMANA ==================== */}
        {/* <Text style={[styles.listTitle, {textAlign:'center'}]}>{dataLabel[2]}</Text>
          <DropdownFDOW 
            selectedValue={PREFERENCES.firstDayOfWeek}
            onChange={async (value) => {
              PREFERENCES.firstDayOfWeek= value;
              await savePreferences();
            }}
          /> */}

        {/* ==================== SETTIMANA ==================== */}
        <View style={styles.groupContainer}>
          <View style={{ width: '100%' }}>
            <Text style={[styles.listTitle, { textAlign: 'center' }]}>{switchNames(myLanguage, 13)}</Text>
          </View>
          <PreferenceSwitch preferenceKey="domenica" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="sabato" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="venerdi" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="giovedi" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="mercoledi" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="martedi" />
          <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
          <PreferenceSwitch preferenceKey="lunedi" />
        </View>

        {/* ==================== FESTIVITA NAZIONALI ==================== */}
        <Suspense>
          <View style={styles.groupContainer}>
            <View style={{ width: '100%' }}>
              <Text style={[styles.listTitle, { textAlign: 'center' }]}>{switchNames(myLanguage, 10)}</Text>
            </View>
            <PreferenceSwitch preferenceKey="festivitaNazionali" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            {/*<PreferenceSwitch preferenceKey="festivitaLocali" />
                  <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>*/}
            <PreferenceSwitch preferenceKey="festivitaPersonali" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            {/* <PreferenceSwitch preferenceKey="feriePersonali" />
                  <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View> */}
            <View style={styles.editLinkContainer}>
              <TouchableOpacity onPress={handleEditHolydays} style={styles.editButton}>
                <IconSymbol size={20} name="pencil" color={colors.text} />
                <Text style={styles.editText}>{switchNames(myLanguage, 15)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Suspense>

        {/* ==================== RICORRENZE CATTOLICHE  ==================== */}
        <Suspense>
          <View style={styles.groupContainer}>
            <View style={{ width: '100%' }}>
              <Text style={[styles.listTitle, { textAlign: 'center' }]}>{switchNames(myLanguage, 14)}</Text>
            </View>
            <PreferenceSwitch preferenceKey="pasqua" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            <PreferenceSwitch preferenceKey="lunediDellAngelo" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            <PreferenceSwitch preferenceKey="ascensione" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            <PreferenceSwitch preferenceKey="pentecoste" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            <PreferenceSwitch preferenceKey="lunediPentecoste" />
            <View style={{ width: '100%', height: 1, backgroundColor: colors.border }}></View>
            <PreferenceSwitch preferenceKey="corpusDomini" />
          </View>
        </Suspense>

        {/* GOOGLE ADMOB ####################################################################### */}
        {isAdvertising && (adUnitId !== undefined) &&
          <View style={[styles.advContainer, { width: '100%', alignItems: 'center', }]}>
            <Text style={{ fontSize: 10, color: colors.disabled, marginBottom: 8 }}>ADV</Text>
            <BannerAd
              ref={bannerRef}
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE} />
          </View>
        }




        {/*
        <TouchableOpacity onPress={handleBackgroundTaskTest}>
          <Text style={{ alignSelf: 'center', color: colors.text }}>Test Background Task</Text>
        </TouchableOpacity>
        */}




        {/* SPACER  ############################################################################# */}
        <View style={{ height: 480 }} />
      </ScrollView>

    </ImageBackground>
  );
}
