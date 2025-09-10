import useLocalizationData from '@/app/data/data';
import DropdownComponent from '@/components/ui/DropdownComponent'; // IMPORTA DROPDOWN DURATA PONTI
import DropdownFDOW from '@/components/ui/DropdownFDoW'; // IMPORTA DROPDOWN GIORNO SETTIMANA
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Suspense, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  } from 'react-native';
  const { localizedDays } = useLocalizationData();

const preferencesLabel = [
  'Filtri e preferenze',
  'Durata del ponte',
  'Primo giorno della settimana',
  'Giorni della settimana festivi',
  'Altri giorni festivi',
  'Modifica lista',
  'Festività religiose',
  ''
];

const dataLabel = [
  'Pasqua',
  'Lunedì dell\'angelo',
  'Ascensione',
  'Pentecoste',
  'Lunedì di pentecoste',
  'Festività nazionali',
  'Festività locali',
  'Festività personali',
  'Periodi di ferie'
];

export const PREFERENCES = {
  domenica:  { status: true, label: localizedDays[6].charAt(0).toUpperCase() + localizedDays[6].slice(1) },
  sabato:    { status: true, label: localizedDays[5].charAt(0).toUpperCase() + localizedDays[5].slice(1) },
  venerdi:   { status: false, label: localizedDays[4].charAt(0).toUpperCase() + localizedDays[4].slice(1) },
  giovedi:   { status: false, label: localizedDays[3].charAt(0).toUpperCase() + localizedDays[3].slice(1) },
  mercoledi: { status: false, label: localizedDays[2].charAt(0).toUpperCase() + localizedDays[2].slice(1) },
  martedi:   { status: false, label: localizedDays[1].charAt(0).toUpperCase() + localizedDays[1].slice(1) },
  lunedi:    { status: false, label: localizedDays[0].charAt(0).toUpperCase() + localizedDays[0].slice(1) },
  // -----------------------------
  pasqua: { status: true, label: dataLabel[0] },
  lunediDellAngelo: { status: true, label: dataLabel[1] },
  ascensione: { status: false, label: dataLabel[2] },
  pentecoste: { status: false, label: dataLabel[3] },
  lunediPentecoste: { status: false, label: dataLabel[4] },
  // -----------------------------
  festivitaNazionali: { status: true, label: dataLabel[5] },
  festivitaLocali: { status: true, label: dataLabel[6]},
  festivitaPersonali: { status: true, label: dataLabel[7]},
  feriePersonali: { status: true, label: dataLabel[8] },
  bridgeDuration: 3, 
  firstDayOfWeek: 1,
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};



/* =========================== SWITCH ====================================== */
function PreferenceSwitch ({ preferenceKey }: { preferenceKey: keyof typeof PREFERENCES }) {
  const colors = useThemeColors();
  const [isEnabled, setIsEnabled] = useState((PREFERENCES[preferenceKey] as { status: boolean }).status);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    PREFERENCES[preferenceKey].status = !isEnabled;
  };
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
      <Text style={styles.text}>{PREFERENCES[preferenceKey].label}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#767577' }} 
        thumbColor={isEnabled ? colors.textRed : '#f4f3f4'} 
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

/* ============================================================================= 

                          MAIN EXPORT - Preferences

============================================================================= */
export default function Preferences() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const handleEditHolydays = () => { navigation.navigate('holydays') };

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    container: {
      flex: 1, 
      width:'100%',
      maxWidth:600,
      paddingHorizontal:12,
      backgroundColor: 'transparent',
      paddingTop:80
    },
    // contentContainer: {
    //   paddingHorizontal: 12,
    //   //paddingTop: 80,
    //   width: '100%',
    //   maxWidth: 600, 
    //   backgroundColor:'red'
    // },
    // scrollview: {
    //   flex:1,
    //   backgroundColor: 'transparent',
    //   paddingHorizontal:12, 
    //   paddingTop: 80,
    //   maxWidth:600,
    // },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },

    // TITOLO ESTERNO BLOCCHETTI
    listTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
      marginTop: 0,
      marginBottom: 0,
      paddingBottom: 12,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
    },
    // CARD
    groupContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal:18,
      marginBottom: 20,
      width: '100%',
    },

    preferenceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    editLinkContainer: {
      width: '100%',
      alignItems: 'flex-end',
      paddingTop: 16,
      paddingRight:12,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editText: {
      marginLeft: 8,
      marginTop:12, 
      marginBottom:12, 
      color: colors.text,
      fontSize: 14,
      fontWeight: 400,
    },
    creditsView: {
      flex:1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    credits: {
      fontSize: 11,
      color: colors.disabled,
    },

  });

  return (
    <ImageBackground 
      source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg')}
      resizeMode="cover" 
      style={[styles.image, {alignItems:'center'}]}>

        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}>
          {/* ==================== TITOLO PAGINA + PULSANTE RESET ==================== */}
          <View style={{
            //flex:1,
            width:'100%',
            height:48,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            pointerEvents: 'box-none',
          }}>
            <Text style={styles.sectionTitle}>{preferencesLabel[0]}</Text>
          </View>

          {/* ==================== DROPDOWN DURATA PONTI ==================== */}
          <Text style={styles.listTitle}>{preferencesLabel[1]}</Text>
          <DropdownComponent 
            selectedValue={PREFERENCES.bridgeDuration}
            onChange={(value) => {
              PREFERENCES.bridgeDuration = value;
            }}
          />
          {/* ==================== DROPDOWN GIORNO SETTIMANA ==================== */}
          <Text style={styles.listTitle}>{preferencesLabel[2]}</Text>
          <DropdownFDOW 
            selectedValue={PREFERENCES.firstDayOfWeek}
            onChange={(value) => {
              PREFERENCES.firstDayOfWeek= value;
            }}
          />
          {/* ==================== SETTIMANA ==================== */}
          <View>
            <Text style={styles.listTitle}>{preferencesLabel[3]}</Text>
          </View>
          <View style={styles.groupContainer}>
            <PreferenceSwitch preferenceKey="domenica"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="sabato"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="venerdi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="giovedi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="mercoledi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="martedi"  />
            <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
            <PreferenceSwitch preferenceKey="lunedi"  />
          </View>
          {/* ==================== FESTIVITA NAZIONALI ==================== */}   
          <Suspense> 
            <View>
              <Text style={styles.listTitle}>{preferencesLabel[4]}</Text>
            </View>
            <View style={styles.groupContainer}>
              <PreferenceSwitch preferenceKey="festivitaNazionali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="festivitaLocali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="festivitaPersonali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="feriePersonali" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <View style={styles.editLinkContainer}>
                <TouchableOpacity onPress={handleEditHolydays} style={styles.editButton}>
                  <IconSymbol size={20} name="pencil" color={colors.text} />
                  <Text style={styles.editText}>{preferencesLabel[5]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Suspense>  
          {/* ==================== PASQUA ==================== */}
          <Suspense>
            <View>
              <Text style={styles.listTitle}>{preferencesLabel[6]}</Text>
            </View>
            <View style={styles.groupContainer}>
              <PreferenceSwitch preferenceKey="pasqua" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="lunediDellAngelo" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="ascensione"/>
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="pentecoste" />
              <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>
              <PreferenceSwitch preferenceKey="lunediPentecoste" /> 
            </View>
          </Suspense>
          <View style={{ height: 180 }} />
        </ScrollView>
    </ImageBackground>
  );
}

