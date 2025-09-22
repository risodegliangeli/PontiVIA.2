import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import DropdownCountry from '@/components/ui/DropdownCountry'; // COUNTRY PICKER 
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import React, { useEffect, useState, Suspense,  } from 'react';
import DateTimePicker, { useDefaultStyles, } from 'react-native-ui-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales,  } from 'expo-localization';
import DatepicketSelector from '@/components/ui/DatepickerSelector';

import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform
} from 'react-native';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const myLanguage: string = (getLocales()[0].languageTag).slice(0,2); // 'it', 'fr', 'de', ecc

const { months } = useLocalizationData();

const dataLabel: any = {
  'it':[
    'Le mie date',                                // 0
    'Aggiungi i tuoi giorni speciali',            // 1
    'Le festività nazionali',                     // 2
    'I periodi lunghi',                           // 3
    'I tuoi giorni speciali',                     // 4
    'Un giorno',                                  // 5
    'Più giorni',                                 // 6
    'Attenzione',                                 // 7
    'Vuoi eliminare il giorno',                   // 8
    'Annulla',                                    // 9
    'Elimina',                                    // 10
    'Salva',                                      // 11
    'Inserisci una descrizione',                  // 12
    'Esiste già una festività nazionale in questa data',  // 13
    'Descrizione',                                // 14
    '(ripete ogni anno)',                         // 15
    'I tuoi giorni speciali',                     // 16
    'In questa data è già presente un evento',     // 17
    'Vuoi eliminare tutte le date di questa sezione?'// 18],
    ],
  "fr":[
    'Mes dates',                                // 0
    'Ajoutez vos jours spéciaux',            // 1
    'Les fêtes nationales',                     // 2
    'Les longues périodes',                           // 3
    'Tes jours spéciaux',                     // 4
    'Un jour',                                  // 5
    'Plusieurs jours',                   // 6
    'Attention',                                 // 7
    'Voulez-vous supprimer le jour',                   // 8
    'Annuler',                                    // 9
    'Supprimer',                                    // 10
    'Enregistrer',                                      // 11
    'Saisissez une description',                  // 12
    'Il existe déjà une fête nationale à cette date',  // 13
    'Description',                                // 14
    '(se répète chaque année)',                         // 15
    'Tes jours spéciaux',                     // 16
    'Un événement est déjà présent à cette date',     // 17
    'Voulez-vous supprimer toutes les dates de cette section ?'// 18],
    ],  
  'es':[
    'Mis fechas',                                // 0
    'Añade tus días especiales',            // 1
    'Las festividades nacionales',                     // 2
    'Los períodos largos',                           // 3
    'Tus días especiales',                     // 4
    'Un día',                                  // 5
    'Varios días',                   // 6
    'Atención',                                 // 7
    '¿Quieres eliminar el día',                   // 8
    'Cancelar',                                    // 9
    'Eliminar',                                    // 10
    'Guardar',                                      // 11
    'Introduce una descripción',                  // 12
    'Ya existe una festividad nacional en esta fecha',  // 13
    'Descripción',                                // 14
    '(se repite cada año)',                         // 15
    'Tus días especiales',                     // 16
    'Ya hay un evento presente en esta fecha',     // 17
    '¿Quieres eliminar todas las fechas de esta sección?'// 18],
    ],  
  "de":[
    'Meine Termine',                                // 0
    'Füge deine besonderen Tage hinzu',            // 1
    'Die nationalen Feiertage',                     // 2
    'Die langen Zeiträume',                           // 3
    'Deine besonderen Tage',                     // 4
    'Ein Tag',                                  // 5
    'Ein mehrtägiger Zeitraum',                   // 6
    'Vorsicht!',                                 // 7
    'Möchtest du den Tag löschen',                   // 8
    'Abbrchen',                                    // 9
    'Löschen',                                    // 10
    'Speichern',                                      // 11
    'Gib eine Beschreibung ein!',                  // 12
    'An diesem Datum gibt es bereits einen nationalen Feiertag',  // 13
    'Beschreibung',                                // 14
    '(wiederholt sich jedes Jahr)',                         // 15
    'Deine besonderen Tage',                     // 16
    'An diesem Datum ist bereits ein Ereignis vorhanden',     // 17
    'Möchtest du alle Termine in diesem Bereich löschen?'// 18],
    ],
  "en":[
    'My dates',                                // 0
    'Add your special days',            // 1
    'National holidays',                     // 2
    'Long periods',                           // 3
    'Your special days',                     // 4
    'One day',                                  // 5
    'A multi-day period',                   // 6
    'Attention',                                 // 7
    'Do you want to delete the day',                   // 8
    'Cancel',                                    // 9
    'Delete',                                    // 10
    'Save',                                      // 11
    'Enter a description',                  // 12
    'A national holiday already exists on this date',  // 13
    'Description',                                // 14
    '(repeats every year)',                         // 15
    'Your special days',                     // 16
    'An event already exists on this date',     // 17
    'Do you want to delete all dates in this section?'// 18],
    ],
  "nl":[
    'Mijn datums',                                // 0
    'Voeg je speciale dagen toe',            // 1
    'Nationale feestdagen',                     // 2
    'Lange periodes',                           // 3
    'Jouw speciale dagen',                     // 4
    'Eén dag',                                  // 5
    'Periode van meerdere dagen',                   // 6
    'Let op',                                 // 7
    'Wil je de dag verwijderen',                   // 8
    'Annuleren',                                    // 9
    'Verwijderen',                                    // 10
    'Opslaan',                                      // 11
    'Voer een beschrijving in',                  // 12
    'Er bestaat al een nationale feestdag op deze datum',  // 13
    'Beschrijving',                                // 14
    '(herhaalt elk jaar)',                         // 15
    'Jouw speciale dagen',                     // 16
    'Er is al een evenement op deze datum',     // 17
    'Wil je alle datums in deze sectie verwijderen?'// 18],
    ],
  'pt':[
    'Minhas datas',                                // 0
    'Adicione seus dias especiais',            // 1
    'Feriados nacionais',                     // 2
    'Períodos longos',                           // 3
    'Seus dias especiais',                     // 4
    'Um dia',                                  // 5
    'Um período de vários dias',                   // 6
    'Atenção',                                 // 7
    'Deseja excluir o dia',                   // 8
    'Cancelar',                                    // 9
    'Excluir',                                    // 10
    'Salvar',                                      // 11
    'Insira uma descrição',                  // 12
    'Já existe um feriado nacional nesta data',  // 13
    'Descrição',                                // 14
    '(repete todos os anos)',                         // 15
    'Seus dias especiais',                     // 16
    'Já existe um evento nesta data',     // 17
    'Deseja excluir todas as datas desta seção?'// 18],
    ],
  'hr': [
    'Moji datumi',                                    // 0
    'Dodaj svoje posebne dane',                       // 1
    'Nacionalni praznici',                            // 2
    'Dugi periodi',                                   // 3
    'Tvoji posebni dani',                             // 4
    'Jedan dan',                                      // 5
    'Period od više dana',                            // 6
    'Pažnja',                                         // 7
    'Želiš li obrisati dan',                          // 8
    'Otkaži',                                         // 9
    'Obriši',                                         // 10
    'Spremi',                                         // 11
    'Unesi opis',                                     // 12
    'Već postoji nacionalni praznik na ovaj datum',   // 13
    'Opis',                                           // 14
    '(ponavlja se svake godine)',                     // 15
    'Tvoji posebni dani',                             // 16
    'Na ovaj datum već postoji događaj',              // 17
    'Želiš li obrisati sve datume iz ove sekcije?'   // 18
  ],
  'si': [
    'Moji datumi',                                    // 0
    'Dodaj svoje posebne dni',                        // 1
    'Državni prazniki',                               // 2
    'Dolga obdobja',                                  // 3
    'Tvoji posebni dnevi',                            // 4
    'En dan',                                         // 5
    'Obdobje več dni',                                // 6
    'Pozor',                                          // 7
    'Ali želiš izbrisati dan',                        // 8
    'Prekliči',                                       // 9
    'Izbriši',                                        // 10
    'Shrani',                                         // 11
    'Vnesi opis',                                     // 12
    'Na ta datum že obstaja državni praznik',         // 13
    'Opis',                                           // 14
    '(se ponavlja vsako leto)',                       // 15
    'Tvoji posebni dnevi',                            // 16
    'Na ta datum že obstaja dogodek',                 // 17
    'Ali želiš izbrisati vse datume iz tega odseka?' // 18
  ],
  'gr': [
    'Οι ημερομηνίες μου',                             // 0
    'Πρόσθεσε τις ξεχωριστές σου μέρες',              // 1
    'Εθνικές γιορτές',                                // 2
    'Μακρές περίοδοι',                                // 3
    'Οι ξεχωριστές σου μέρες',                        // 4
    'Μία μέρα',                                       // 5
    'Περίοδος περισσότερων ημερών',                   // 6
    'Προσοχή',                                        // 7
    'Θέλεις να διαγράψεις τη μέρα',                   // 8
    'Ακύρωση',                                        // 9
    'Διαγραφή',                                       // 10
    'Αποθήκευση',                                     // 11
    'Εισάγετε περιγραφή',                             // 12
    'Υπάρχει ήδη εθνική γιορτή σε αυτή την ημερομηνία', // 13
    'Περιγραφή',                                      // 14
    '(επαναλαμβάνεται κάθε χρόνο)',                   // 15
    'Οι ξεχωριστές σου μέρες',                        // 16
    'Σε αυτή την ημερομηνία υπάρχει ήδη γεγονός',     // 17
    'Θέλεις να διαγράψεις όλες τις ημερομηνίες από αυτό το τμήμα?' // 18
  ]
};

type Holiday = {  // DEFINIZIONE DI holiday
  day: number;
  month: number;
  description: string;
};

type HolidayType = 'personal' | 'regional' | 'national';

type ItemType = HolidayType | 'vacation';

interface VacationPeriod {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  description: string;
}

// GESTIONE LOCAL STORAGE DATI
const saveData = async (data: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Errore ${key} nel salvataggio locale: `, e);
  }
};



/* ###########################################################################################################

                                      MAIN - HolydaysScreen
                                      
########################################################################################################### */
export default function HolydaysScreen({}: any) {

  const colors = useThemeColors();

  const { personalHolydays, setPersonalHolydays,
          //regionalHolydays, setRegionalHolydays,
          nationalHolydays, setNationalHolydays,
          vacationPeriods, setVacationPeriods,
          myCountry, setMyCountry,
          } = useHolydays();
          
  const [isModalSingleDateVisible, setIsModalSingleDateVisible] = useState(false);

  // MODAL SINGOLA DATA: STATUS DEI DATI DEL FORM
  const [singleDateDay, setSingleDateDay] = useState<string | null>(null); // SERVE PER handleAddSingleDate
  const [singleDateMonth, setSingleDateMonth] = useState<string | null>(null); // idem
  const [singleDateDescription, setSingleDateDescription] = useState<string | undefined>(undefined);
  // const [singleDateType, setSingleDateType] = useState<HolidayType>('personal');
  const [singleDateError, setSingleDateError] = useState<string | null>(null);

  // SERVE PER EDIT/SOVRASCRITTURA DEL RECORD FESTIVITA' SINGOLA
  const [initialType, setInitialType] = useState<HolidayType>();
  const [initialIndex, setInitialIndex] = useState<number | null>(null);

  // SERVE PER EDIT/SOVRASCRITTURA DEL RECORD PERIODO VACANZA
  const [initialPeriodIndex, setInitialPeriodIndex] = useState<number | null>(null);
  
  /* ============================================================================= 
   VALORI NUOVA MODAL
   ============================================================================= */
  const [datePickerSelected, setDatePickerSelected] = useState<Date | null>(null); // DATA SELEZIONATA SU PICKER SINGLE DAY
  
  const [startDate, setStartdate] = useState<Date | null>(null); // DATA INIZIO SELEZIONATA SU PICKER PERIOD
  const [endDate, setEndDate] = useState<Date | null>(null);     // DATA FINE SELEZIONATA SU PICKER PERIOD

  const defaultStyles = useDefaultStyles();
  const minDate = new Date( new Date().getFullYear() + '-01-01'); // MIN E MAX SONO IMPOSTATI NELL'ANNO 2020 (BISESTILE)
  const maxDate = new Date( new Date().getFullYear() + '-12-31'); // PER POTR VISUALIZZARE IL GIORNO 29 FEBBRAIO

  // MODAL PERIODO: STATUS DEI DATI DEL FORM
  const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
  const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

  /* ============================================================================= 
     GESTIONE SHOW/HIDE MODAL
  ============================================================================= */
  const showModalSingleDate = () => {
    setSingleDateDay('');
    setSingleDateMonth('');
    setIsModalSingleDateVisible(true);
  };
  const hideModalSingleDate = () => {
    setIsModalSingleDateVisible(false);
  };

  /* ============================================================================= 
     RESET MODAL GIORNO SINGOLO avviene sempre alla chiusura della modal 
  ============================================================================= */
  const resetSingleDateForm = () => {
    hideModalSingleDate();        // CHIUDE MODAL
    setPeriodStartDate(null);     // AZZERA VARIABILI PERIOD
    setPeriodEndDate(null);       //
    setSingleDateDay(null);       // AZZERA VARIABILI GIORNO SINGOLO
    setSingleDateMonth(null);
    setSingleDateDescription(undefined); // AZZERA CAMPO DESCRIZIONE
    setSingleDateError(null);     // AZZER ERRORE
    setInitialIndex(null);        // VARIABILE USATA (SE DIVERSA DA null) PER L'EDIT DI UN RECORD
  };

  // AZZERAMENTO STATUS, CHIUSURA MODAL E RETURN
  const clearData = () => {
    hideModalSingleDate();        // CHIUDE MODAL
    setInitialType(undefined);
    setInitialIndex(null);
    setPeriodStartDate(null);     // AZZERA VARIABILI PERIOD
    setPeriodEndDate(null);       //
    setSingleDateDay(null);       // AZZERA VARIABILI GIORNO SINGOLO
    setSingleDateMonth(null);
    setSingleDateDescription(undefined); // AZZERA CAMPO DESCRIZIONE
    setSingleDateError(null);     // AZZER ERRORE
    setInitialIndex(null);  // VARIABILE USATA (SE DIVERSA DA null) PER L'EDIT DI UN RECORD
  }
  
  /* ============================================================================= 
    AGGIUNGI GIORNO SINGOLO 
  ============================================================================= */
  const handleAddSingleDate = async () => {

    // CONTROLLA COMPILAZIONE DELLA DESCRIZIONE NELLA FORM
    if (!singleDateDescription) {
      setSingleDateError(dataLabel[myLanguage][12]); // MSG ERRORE 'Inserisci una descrizione ecc...'
      return;
    }

    // CONTROLLA SE ESISTE GIA' QUEL GIORNO TRA LE FESTIVITA NAZIONALI
    const nationalIndex = nationalHolydays.findIndex(h => h.day === day && h.month === month);
    if (nationalIndex !== -1) {
      setSingleDateError(dataLabel[myLanguage][13]); // MSG ERRORE: 'Esiste già una festività nazionale in questa data...'
      return;
    }    
    
    // SE DESCRIZIONE = OK E DATA NON PRESENTE TRA LE FEST. NAZIONALI -->    
    
    // PRELEVA I VALORI DALLE VARIABILI DALLA FORM
    const day = parseInt(singleDateDay);
    const month = parseInt(singleDateMonth);
    // E ASSEGNA I VALORI ALLA COSTANTE newHolyday
    const newHoliday: Holiday = { day, month, description: singleDateDescription.trim() };

    // CONTROLLO: E' UN NUOVO ITEM O SI EDITA UN ITEM ESISTENTE? -->

    // NUOVO ITEM 
    if (initialIndex === null) {
      //console.log('\t- nuovo item');

      // CERCA SE ESISTE GIA' ITEM CON STESSO GIORNO E MESE
      let sameCategoryDuplicate = 0;
      sameCategoryDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month);
      //console.log('\t- item stessa data/mese?', sameCategoryDuplicate);
        
        // TROVATO = ERRORE E RETURN 
      if (sameCategoryDuplicate > -1) {
        setSingleDateError(dataLabel[myLanguage][17]); // MSG ERRORE: 'Questa data esiste già ecc.'
        return;
      } else {
        // NON TROVATO = SCRITTURA NUOVO ITEM E RETURN
        //console.log('\t- scrittura su personalHolydays');
        let tempPersonalHolydays = [...personalHolydays, newHoliday];
          setPersonalHolydays(tempPersonalHolydays);
          await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
        setSingleDateError(null); // RESETTA EVENTUALI MSG DI ERRORE
      }

    } else {

      // EDIT //
      // SE GIORNO O MESE INIZIALI SONO DIVERSI DA QUELLI DELL'initialIndex
      let presentDay = personalHolydays[initialIndex].day;
      let presentMonth = personalHolydays[initialIndex].month;

      if (presentDay != day || presentMonth != month) {
        // ATTENZIONE: L'UTENTE HA MODIFICATO LA DATA
        // SI CERCA SE LA NUOVA DATA ESISTE
        let sameCategoryDuplicate = 0;
        sameCategoryDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month);
        if (sameCategoryDuplicate > -1) {
          // SE QUELLA DATA ESISTE GIA' = ERRORE
          setSingleDateError(dataLabel[myLanguage][17]); // MSG ERRORE: 'Questa data esiste già ecc.'
          return;
        } else {
          // SE QUELLA DATA E' LIBERA = SOVRASCRITTURA
          let tempPersonalHolydays = personalHolydays.map((h, i) => i === initialIndex ? newHoliday : h);
            setPersonalHolydays(tempPersonalHolydays);
            await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
        }
      } else {
        // L'UTENTE NON HA MODIFICATO LA DATA
        // SI SOVRASCRIVE
        let tempPersonalHolydays = personalHolydays.map((h, i) => i === initialIndex ? newHoliday : h);
          setPersonalHolydays(tempPersonalHolydays);
          await saveData(tempPersonalHolydays, 'personalHolydays'); // SALVATAGGIO LOCAL STORAGE
      }
    }

    // AZZERAMENTO VARIABILI E CHIUSURA MODAL
    clearData();

    return;
  }

  /* ============================================================================= 
    AGGIUNGI PERIODO FESTIVI
   ============================================================================= */
  const handleAddPeriod = async () => {
  
    // CONTROLLA COMPILAZIONE DELLA DESCRIZIONE NELLA FORM
    if (!singleDateDescription) {
      setSingleDateError(dataLabel[myLanguage][12]); // MSG ERRORE 'Inserisci una descrizione'
      return;
    }

    // PRELEVA DATI DALLA FORM
    const startDay = periodStartDate?.getDate();
    const startMonth = periodStartDate?.getMonth() + 1;
    const startYear = periodStartDate?.getFullYear(); 

    const adjustedEndDate = new Date(periodEndDate);
    if (periodEndDate?.getHours() === 0 && periodEndDate.getMinutes() === 0 && periodEndDate.getSeconds() === 0) {
      adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
    }

    const endDay = periodEndDate?.getDate();
    const endMonth = periodEndDate?.getMonth() + 1;
    const endYear = periodEndDate?.getFullYear();   
  
    const newPeriod: VacationPeriod = { startDay, startMonth, startYear, endDay, endMonth, endYear, description: singleDateDescription.trim() };

    // MODIFICA ITEM = SOVRASCRITTURA
    if (initialPeriodIndex !== null) {
      let tempVacationPeriods = vacationPeriods.map((period, index) => index === initialPeriodIndex ? newPeriod : period);
        setVacationPeriods(tempVacationPeriods);
        await saveData(tempVacationPeriods, 'vacationPeriods'); 
    } else {
      // NUOVO ITEM = AGGIUNTA ALL'ARRAY
      let tempVacationPeriods = [...vacationPeriods, newPeriod];
        setVacationPeriods(tempVacationPeriods);
        await saveData(tempVacationPeriods, 'vacationPeriods'); 
    }

    setInitialPeriodIndex(null); // Resetta l'indice dopo il salvataggio

    // AZZERA VARIABILI E CHIUDE MODAL
    clearData();
  };

  /* ============================================================================= 
   EDIT ITEM (SINGOLO E PERIODO)
   ============================================================================= */
  // LA FUNZIONE RICEVE CATEGORIA 'type' E INDICE 'index' DEL RECORD DA EDITARE
  const handleEdit = (type: ItemType, index: number) => {

    // DEFINISCE E AZZERA I CONTENITORI COI VALORI DA EDITARE, GIORNO SINGOLO E PERIODO
    let itemToEdit: { 
      day: number; 
      month: number; 
      description: string | undefined } | null = null; // singolo
    let periodToEdit: {
      startDay: number; 
      startMonth: number; 
      startYear: number; 
      endDay: number; 
      endMonth: number; 
      endYear: number; 
      description: string | undefined} | null = null; // periodo
  
    // SI COPIANO I VALORI DAL RECORD N. index IN itemToEdit O IN periodToEdit
    switch (type) {
      case 'personal':
        if (personalHolydays[index]) {
          itemToEdit = {
            day: personalHolydays[index].day,
            month: personalHolydays[index].month,
            description: personalHolydays[index].description
          };
        }
        // SET RADIOBUTTON PERIOD = INACTIVE (E RADIOBUTTON SINGLE ATTIVO)
        // -- così si carica da solo il datepicker 'single'
        setLeftRadioButtonActive(true);
        setRightRadioButtonActive(false);
      break;

      // VACATION -> SI COPIANO I VALORI DAL RECORD DELL'ARRAY E SI APRE LA MODAL 'periodo'
      case 'vacation':
        setInitialPeriodIndex(index);

        if (JSON.stringify(vacationPeriods[index])) {
          periodToEdit = {
            startDay: vacationPeriods[index].startDay,
            startMonth: vacationPeriods[index].startMonth,
            startYear: vacationPeriods[index].startYear,
            endDay: vacationPeriods[index].endDay,
            endMonth: vacationPeriods[index].endMonth,
            endYear: vacationPeriods[index].endYear,
            description: vacationPeriods[index].description
          };
        }
        // VISUALIZZA MODAL PERIODO
        //showModalSingleDate();
      break;

      default:
        console.warn('Impossibile modificare l\'elemento:', type);
      return;
    }

    // CASO 1) ITEM SINGOLO (itemToEdit != null)
    if (itemToEdit) {
      setDatePickerSelected(
        new Date(
          new Date().getFullYear(),
          itemToEdit.month ,
          itemToEdit.day
        )
      );
      setSingleDateDay(itemToEdit.day.toString());
      setSingleDateMonth((itemToEdit.month).toString());
      setSingleDateDescription(itemToEdit.description);
      setSelectedRadioOption('single');

      // SI INIZIALIZZANO initialType E initialIndex CON CATEGORIA E POSIZIONE DI PROVENIENZA
      // SERVIRANNO ALLA FUNZIONE handleAddSingleDate PER I CONFRONTI
      setInitialType(type as HolidayType);
      setInitialIndex(index);

      setIsModalSingleDateVisible(true);

    } else if (periodToEdit) {
    // CASO 2) PERIODO (periodToEdit != null)
      let sd: Date = new Date(
          periodToEdit.startYear, 
          periodToEdit.startMonth - 1, 
          periodToEdit.startDay
        )
      setStartdate(sd);
      setPeriodStartDate(sd);

      let ed: Date = new Date(
          periodToEdit.endYear, 
          periodToEdit.endMonth - 1, 
          periodToEdit.endDay
        )
      setEndDate(ed);
      setPeriodEndDate(ed);
      
      setSingleDateDescription(periodToEdit?.description);
      setSelectedRadioOption('period');
                  // AGGIUNGERE:
                  // RADIOBUTTON SINGLE = INACTIVE
                  // -- quindi si carica da solo il datepicker 'single'
                  setLeftRadioButtonActive(false);
                  setRightRadioButtonActive(true);
      setIsModalSingleDateVisible(true);
    }
  };

  /* ============================================================================= 
   DELETE ITEM
   ============================================================================= */
  const handleDelete = async (type: ItemType, index: number) => {
    let itemDescription = '';
    switch (type) {
      case 'personal':
        if (personalHolydays[index]) {
          itemDescription = `${personalHolydays[index].day} ${months[personalHolydays[index].month]?.label} (${personalHolydays[index].description})`;
        }
        break;
      case 'vacation':
        if (vacationPeriods[index]) {
          const period = vacationPeriods[index];
          itemDescription = `${period.startDay}/${period.startMonth}/${period.startYear} - ${period.endDay}/${period.endMonth}/${period.endYear} (${period.description})`;
        }
        break;
      default:
        itemDescription = `l'item ${index}`;
      break;
    }

    Alert.alert(
        dataLabel[myLanguage][7],
        `${dataLabel[myLanguage][8]} ${itemDescription}?`,
        [
          {
            text: dataLabel[myLanguage][9],
            style: "cancel"
          },
          { 
            text: dataLabel[myLanguage][10], 
            onPress: async () => {
              switch (type) {
                case 'personal':
                  let tempPersonalHolydays = personalHolydays.filter((_, i) => i !== index);
                    setPersonalHolydays(tempPersonalHolydays);
                    await saveData(tempPersonalHolydays, 'personalHolydays');
                  break;
                case 'vacation':
                  let tempVacationPeriods = vacationPeriods.filter((_, i) => i !== index);
                    setVacationPeriods(tempVacationPeriods);
                    await saveData(vacationPeriods.filter((_, i) => i !== index), 'vacationPeriods');
                  break;
              }
            }
          }
        ]
      );
    };

  /* ============================================================================= 
   STYLESHEET
   ============================================================================= */
  const styles =StyleSheet.create({
    // SFONDO
    image: {      
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      },
    // CONTENITORE PRINCIPALE
    container: {
      width:'100%',
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingTop: 80,
      maxWidth:600,
    },
    // TITOLO PAGINA
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    // WRAPPER TITOLO PAGINA
    sectionContainer: {
      width: '100%',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
    },
    // TITOLO CARD
    listTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      paddingBottom: 12,
    },
    // CARD
    listItem: { 
      backgroundColor: colors.cardBackground,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft:16,
      paddingRight:16,
      borderRadius: 24,
      marginBottom: 10,
    },
    holidayRow: { 
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    itemDate: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft:12,
      color: colors.text,
    },
    itemDescription: {
      fontSize: 14,
      paddingLeft:12,
      color: colors.text,
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight:12,
    },
    dot32text:{
      height:'100%',
      fontSize:26,
      fontWeight: useColorScheme() === 'dark' ? 200 : 300,
      color: 'rgba(255,255,255,1)',
      textAlign:'center',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      paddingTop: Platform.OS === 'ios' ? 6:3,
      letterSpacing:-.5,
      borderWidth:0    
    },
    // MODAL
    modalOverlay: {
      flex: 1,
      margin: 0,
      backgroundColor: 'rgba(255, 0, 0, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: colors.modalBackground,
      width: '95%', // RIENTRATO RISPETTO AI BORDI SCREEN
      maxWidth:500, // CENTRATO SU TABLET
      paddingVertical: 24,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    // modalTitle: {
    //   fontSize: 16,
    //   fontWeight: 'bold',
    //   marginBottom: 20,
    //   textAlign: 'center',
    // },
    // modalLabel: {
    //   fontSize: 16,
    //   marginBottom: 5,
    //   marginTop: 10,
    // },
    // dateInputContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   marginBottom: 15,
    // },
    datePickerWrapper: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      padding:8,
      backgroundColor:'transparent',
    },
    modalInput: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 99,
      padding: 10,
      fontSize: 16,
      marginBottom: 12,
      height:50,
      color: colors.black,
    },
    // dateAndMonthContainer: {
    //   flex:1, 
    //   flexDirection:'row', 
    //   alignItems:'flex-start',
    //   alignContent:'flex-start',
    //   justifyContent:'space-between', 
    //   width: '100%',
    // },
    // dropdownContainer: { 
    //   minWidth: `${calc(100%-48)}`, 
    //   flex:1, 
    //   flexDirection:'column', 
    //   justifyContent:'flex-end', 
    //   alignItems:'center',
    //   alignContent:'flex-end',
    // },
    // dateInput: {
    //   width: 60,
    //   textAlign: 'center',
    //   marginBottom: 0,
    //   marginRight:8,
    //   color: colors.black,
    // },
    // dateSeparator: {
    //   fontSize: 20,
    //   marginHorizontal: 5,
    // },
    // Nuovi stili per i pulsanti data
    dateButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 5,
      padding: 12,
      marginBottom: 15,
      backgroundColor: colors.textNegative,
    },
    dateButtonText: {
      fontSize: 16,
      color: colors.black,
    },
    // RADIOBUTTON
    radioContainer: {
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 0,
    },
      radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      // (SOLO CIRCOLETTO ESTERNO)
      radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
      },
      radioButtonDisabled: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
      },
      // PALLINO NERO ACCESO
      radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.textRed,
      },
      radioLabelNotFocused: {
        fontSize: 16,
        fontWeight: 400,
        color: colors.black,
      },
      radioLabelInactive: {
              fontSize: 16,
        fontWeight: 400,
        color: '#999999',
      },
      radioLabelFocused:{
        fontSize: 16,
        fontWeight: 800,
        color: colors.textRed,
      },

    // PULSANTI ADD/CANCEL
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
      addButton: {
        backgroundColor: colors.textRed,
        padding: 15,
        borderRadius: 99,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
      },
      addButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
      },
      cancelButton: {
        backgroundColor: colors.cancelButton,
        padding: 15,
        borderRadius: 99,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
      },
      cancelButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
      },
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
      fontSize:16,
      fontWeight:600,
    },
    // PULSANTONE AGGIUNGI GIORNI SPECIALI
    specialDays: {
      flex:1,
      minHeight:80,
      borderWidth: 2,
      borderColor: '#0088ff',
      borderStyle: 'dotted',
      borderRadius: 24,
      backgroundColor: useColorScheme() === 'dark' ? colors.tabBarFocusDotAndroid : 'transparent',
      marginBottom:24,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft:16
    },
    specialDaysLabel: {
      fontSize:20,
      fontWeight:400,
      color: '#0088ff',
    },
    // DROPDOWN FESTIVITA PER PAESE
    dropDownCountry: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:8,
    }
  });
  
  // BOTTONE RESET DROPDOWN COUNTRY: RIPORTA LA SELEZIONE AL PAESE LOCALIZZATO
  const ResetCountryButton = () => {
    return(
      <TouchableOpacity
        onPress={ 
          async () => {
            setMyCountry(getLocales()[0].languageTag);
            await saveData(getLocales()[0].languageTag, 'myCountry');
            console.log('dropDown ripristinato a:', getLocales()[0].languageTag);
          }
        }>
        <IconSymbol size={20} name="gobackward" color={colors.blueBar} style={{paddingBottom:8,}}/>
      </TouchableOpacity>
    )
  }
  
  // GESTIONE STATI DELLE RADIOBUTTON DELLA MODAL, ATTIVO, FOCUSED E DISABILITATO
  const [selectedRadioOption, setSelectedRadioOption] = useState<'single' | 'period'>('single'); // STATO INIZIALE DEL RADIOBUTTON
  const [leftRadioButtonActive, setLeftRadioButtonActive] = useState<boolean>(true);    // FLAG PER DISATTIVARE IL RADIOBUTTON SINISTRO (da resettare a ogni [+ Aggiungi] )
  const [rightRadioButtonActive, setRightRadioButtonActive] = useState<boolean>(true);  // FLAG PER DISATTIVARE IL RADIOBUTTON DESTRO (da resettare a ogni [+ Aggiungi] )

  // GESTIONE SLIDER PER SELEZIONARE GIORNO/PERIODO NEL DATEPICKER
  const [sliderTargetValue, setSliderTargetValue] = useState(0);
  const buttonLeftAction = () => {
    sliderTargetValue === 1 && console.log('Un giorno'); // ESEGUE SOLO SE VALORE ERA IMPOSTATO SULL'ALTRO
    sliderTargetValue === 1 && setSliderTargetValue(0);
    sliderTargetValue === 1 && setSelectedRadioOption('single');
    };
  const buttonRightAction = () => {
    sliderTargetValue === 0 && console.log('Piu giorni');
    sliderTargetValue === 0 && setSliderTargetValue(1);
    sliderTargetValue === 0 && setSelectedRadioOption('period');
    };


  /* ============================================================================= 
  * useEffect * AL CAMBIO DI myCountry
  Viene richiamato ogni volta che myCountry cambia, per aggiornare le festività nazionali
  ============================================================================= */
  useEffect( () => {
    setNationalHolydays(getLocalHolydas(myCountry));    // RICHIAMO LA FUNZIONE getLocalHolydas (DA data.tsx)
    async () => await saveData(myCountry, 'myCountry');
  }, [myCountry]);

  return (
    <ImageBackground 
      source= {useColorScheme() === 'light' && require('@/assets/images/background-image_minified.jpg')}
      resizeMode="cover" 
      style={[styles.image, {alignItems:'center'}]}> 

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false} >

        {/* TITOLO PAGINA  */}{/* LE MIE DATE */}
        <Text style={[styles.sectionTitle, { flex:1, marginBottom:32, }]}>{dataLabel[myLanguage][0]}</Text> 

        {/* PULSANTONE + GIORNI SPECIALI ########################################################################## */}
        <TouchableOpacity 
          style={styles.specialDays}
          onPress={ () => { 
            setSelectedRadioOption('single');           
            setDatePickerSelected(new Date());  // SINGLE DATE: IMPOSTA A MESE CORRENTE 
            setStartdate(null);                 // PERIOD: AZZERA SCELTA PRECEDENTE
            setEndDate(null);                   // PERIOD: AZZERA SCELTA
            setSingleDateDescription(undefined);
            setLeftRadioButtonActive(true);     // RESETTA A ATTIVI ENTRAMBI I RADIOBUTTON
            setRightRadioButtonActive(true);
            showModalSingleDate();              // --> APRE MODAL CON DATEPICKER
          }}
        >
          <IconSymbol name="plus" size={36} color={'#0088ff'}/>
          <Text style={styles.specialDaysLabel}>{dataLabel[myLanguage][1]}</Text>
        </TouchableOpacity>

        {/* CARD GIORNI SPECIALI ############################################################################# */}
        {personalHolydays.length > 0 && (
          <View style={styles.listItem}>

            {/* LABEL SEZIONE CON PULSANTE CANCELLAZIONE */}
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{opacity:0}}>*</Text>
              <Text style={[styles.listTitle, { textAlign:'center' } ]}>{dataLabel[myLanguage][4]}</Text>
              {personalHolydays ?                
                <TouchableOpacity
                  onPress={ async () => {
                    Alert.alert(
                        dataLabel[myLanguage][7],  // Attenzione
                        dataLabel[myLanguage][18],// Vuoi eliminare tutte le date ecc.?
                        [
                          {
                            text: dataLabel[myLanguage][9], // Annulla
                            style: "cancel"
                          },
                          { 
                            text: dataLabel[myLanguage][10], // Elimina
                            onPress: async () => {
                              setPersonalHolydays([]);
                              await saveData([], 'personalHolydays');
                            }
                          }
                        ]
                      );
                  }}>
                  <IconSymbol size={Platform.OS === 'ios' ? 20 : 26}  name="plus" color={colors.blueBar} style={{marginRight:8, transform: [{rotate: '45deg'}]}}/>
                </TouchableOpacity>
              :
                <Text style={{opacity:0}}>*</Text>
              }
            </View>

            {personalHolydays.sort((a, b) => a.day - b.day).sort((a, b) => a.month - b.month).map((holiday, index) => (
              <React.Fragment key={index}>
                <View 
                style={styles.holidayRow }>
                  <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                    {/* <View style={{width:32, height:32, borderRadius:24, backgroundColor: colors.dot32}}></View> */}
                    <View style={{width:44, height:44, borderRadius:24, backgroundColor: colors.dot32}}>
                      <Text style={styles.dot32text}>{holiday.day}</Text>
                    </View>
                    <View style={{flexDirection:'column'}} >
                      <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label} `}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240, fontStyle:'italic', fontWeight:400}]}>{dataLabel[myLanguage][15]}</Text>
                    </View>
                  </View>
                  <View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEdit('personal', index)}>
                      <IconSymbol name="pencil" size={20} color={colors.blueBar} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete('personal', index)} style={{ marginLeft: 12 }}>
                      <IconSymbol name="trash" size={20} color={colors.blueBar} />
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
                {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
                {index !== personalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
              </React.Fragment>
            ))}
          </View>
        )}

        {/* PERIODI PIU' LUNGHI ########################################################################## */}
        {vacationPeriods.length > 0 && (
          <View style={styles.listItem}>

            {/* LABEL SEZIONE CON PULSANTE CANCELLAZIONE */}
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{opacity:0}}>*</Text>
              <Text style={[styles.listTitle, { textAlign:'center' } ]}>{dataLabel[myLanguage][3]}</Text>
              {personalHolydays ?                
                <TouchableOpacity
                  onPress={ async () => {
                    Alert.alert(
                        dataLabel[myLanguage][7],  // Attenzione
                        dataLabel[myLanguage][18],// Vuoi eliminare tutte le date ecc.?
                        [
                          {
                            text: dataLabel[myLanguage][9], // Annulla
                            style: "cancel"
                          },
                          { 
                            text: dataLabel[myLanguage][10], // Elimina
                            onPress: async () => {
                              setVacationPeriods([]);
                              await saveData([], 'vacationPeriods');
                            }
                          }
                        ]
                      );
                  }}>
                  <IconSymbol size={Platform.OS === 'ios' ? 20 : 26} name="plus" color={colors.blueBar} style={{marginRight:8, transform: [{rotate: '45deg'}]}}/>
                </TouchableOpacity>
              :
                <Text style={{opacity:0}}>*</Text>
              }
            </View>

            {vacationPeriods.sort((a, b) => a.startDay - b.startDay).sort((a, b) => a.startMonth - b.startMonth).sort((a, b) => a.startYear - b.startYear).map((period, index) => (
              <React.Fragment key={index}>
                <View key={index} style={styles.holidayRow}>
                  <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <View style={{width:44, height:44, borderRadius:24, backgroundColor: colors.dot32}}>
                      <Text style={[styles.dot32text, {paddingTop:4, paddingBottom:0}]}>---</Text>
                    </View>                      
                    <View style={{flexDirection:'column'}} >
                      <Text style={styles.itemDate}>
                        {`${period.startDay}.${period.startMonth}.${period.startYear} / ${period.endDay}.${period.endMonth}.${period.endYear}`}
                      </Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{period.description}</Text>
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEdit('vacation', index)}>
                      <IconSymbol name="pencil" size={20} color={colors.blueBar} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete('vacation', index)} style={{ marginLeft: 12 }}>
                      <IconSymbol name="trash" size={20} color={colors.blueBar} />
                    </TouchableOpacity>
                  </View>
                </View>
                {index !== vacationPeriods.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
              </React.Fragment>
            ))}
          </View>
        )}    
        
        {/* FESTIVITA NAZIONALI ############################################################################# */}
        <View style={styles.listItem}>
          
          {/* TITOLO */}
          <Text style={[ styles.listTitle, { textAlign:'center' } ]}>{dataLabel[myLanguage][2]}</Text>

          {/* DROPDOWN PAESE */}
          <View style={styles.dropDownCountry}>
            <DropdownCountry 
              selectedValue={myCountry}
              onChange={ async (item) => {
                setMyCountry(item);
                await saveData(item, 'myCountry');
              }}
            />
            { myCountry.slice(0,2) === myLanguage  ? null : <ResetCountryButton/> }
          </View>

          {nationalHolydays.map((holiday, index) => (
            <React.Fragment key={index} >
              <View 
                key={index} 
                style={[styles.holidayRow, {justifyContent:'space-between', alignItems:'center'}]}>

                  <View style={[styles.holidayRow, {justifyContent:'flex-start', alignItems:'flex-start'}]}>
                    <View style={{width:44, height:44, borderRadius:24, backgroundColor: colors.dot32}}>
                      <Text style={styles.dot32text}>{holiday.day}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                      {/* <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label}`}</Text> */}
                      <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label}`}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={ () => 
                      // RENDE DISABLED LA RIGA DELLA FESTIVITA' CHE NON SARA' CONTEGGIATA
                      null
                    } >
                    <IconSymbol size={24} name="checkmark.circle.fill" color={colors.blueBar} style={{paddingBottom:8,}}/>
                    {/* <IconSymbol size={24} name="xmark.circle" color={colors.disabled} style={{paddingBottom:8,}}/> */}
                  </TouchableOpacity>

              </View> 


              {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
              {index !== nationalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
            </React.Fragment>
          ))}
        </View>

        {/* BOTTOM SPACE ############################################################################# */}
        <View style={{ height: 280 }} ><Text style={{fontSize:11}}>Prebuild 0.0.9@22092025 (c) Angeli & Associati</Text></View>
      </ScrollView>

      {/* MODAL DATEPICKER ############################################################################# */}
      <Suspense>
          <Modal
            visible={isModalSingleDateVisible}
            // presentationStyle="fullScreen"
            transparent={true}
            // backdropColor={'rgba(0, 0, 0, .25)'} // NON FUNZIONA TRASPARENZA
            animationType="none"
            onRequestClose={hideModalSingleDate} 
            hardwareAccelerated={true}
            >
            <View style={{
              flex:1,
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            }}>

              <View style={styles.modalContainer}>
                {/* TITOLO MODAL */}
                <Text style={[styles.listTitle, { color: colors.black, textAlign:'center', marginBottom:12, }]}>{dataLabel[myLanguage][4]}</Text>
                {singleDateError ? <Text style={styles.errorText}>{singleDateError}</Text> : null}

                {/* RADIOBUTTON (ORA --> SLIDER) */}
                <View style={styles.radioContainer}>
                  {/* SLIDER CHE SOSTITUISCE I RADIOBUTTON*/}
                  <DatepicketSelector
                    windowWidth={300}
                    buttonLeft={dataLabel[myLanguage][5]}
                    buttonRight={dataLabel[myLanguage][6]}
                    buttonLeftAction={buttonLeftAction}
                    buttonRightAction={buttonRightAction}
                    sliderTargetValue={sliderTargetValue}
                  />

                  {/* LEFT */}
                  {/* <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => {
                      leftRadioButtonActive ? setSelectedRadioOption('single') : null;
                    }} >
                    <View style={ leftRadioButtonActive ?  styles.radioButton : styles.radioButtonDisabled}>
                      {selectedRadioOption === 'single' && <View style={styles.radioButtonSelected}/>}
                    </View>
                    <Text style={
                      leftRadioButtonActive ? // RADIOBUTTON ATTIVO
                        selectedRadioOption === 'single' ? styles.radioLabelFocused : styles.radioLabelNotFocused
                      :
                        styles.radioLabelInactive // RADIOBUTTON DISABLED
                      }>
                        {dataLabel[myLanguage][5]}
                    </Text>
                  </TouchableOpacity> */}
                  
                  {/* RIGHT */}
                  {/* <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => {
                      rightRadioButtonActive ? setSelectedRadioOption('period') : null;
                    }} >
                    <View style={rightRadioButtonActive ? styles.radioButton : styles.radioButtonDisabled}>
                      {selectedRadioOption === 'period' && <View style={styles.radioButtonSelected}/>}
                    </View>
                    <Text style={
                      rightRadioButtonActive ?
                        selectedRadioOption === 'period' ? styles.radioLabelFocused : styles.radioLabelNotFocused
                      :
                        styles.radioLabelInactive}>
                          {dataLabel[myLanguage][6]}
                    </Text>
                  </TouchableOpacity> */}

                </View>

                <View style={styles.datePickerWrapper}> 
                {selectedRadioOption === 'single' ? 
                    <DateTimePicker // SINGLE //////////////////////////////
                      mode="single"
                      calendar="gregory"
                      date={datePickerSelected}
                      onChange={( {date } ) => {
                        setDatePickerSelected( date );
                        setSingleDateDay( new Date(date).getDate() );                        
                        setSingleDateMonth( new Date(date).getMonth()); 
                      } }
                      containerHeight={265}
                      hideWeekdays={true}
                      disableMonthPicker={true}
                      disableYearPicker={true}
                      showOutsideDays={false}          
                      minDate={minDate}
                      maxDate={maxDate}
                      firstDayOfWeek={1}
                      //timeZone={'UTC'}
                      locale={myLanguage}
                      // style={{
                      //   backgroundColor: 'transparent',
                      // }}
                      styles={{
                        ...defaultStyles,
                        today: { borderWidth: 0, backgroundColor:'transparent'}, 
                        today_label: { color: colors.black},
                        selected: { backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        selected_label: { color: 'white' },
                        year_selector_label: { display:'none'},
                        month_selector_label: {fontSize: 16, fontWeight:600, textTransform:'capitalize'},
                        day_label: {fontSize:16, color: colors.black},
                        button_next: { backgroundColor: colors.textNegative, borderRadius:'100%', },
                        button_prev: { backgroundColor: colors.textNegative, borderRadius:'100%', },
                      }}
                    />
                  : 
                    <DateTimePicker // PERIOD ///////////////////////////////
                      mode="range"
                      calendar="gregory"
                      startDate={startDate}
                      endDate={endDate}
                      onChange={({startDate, endDate}) =>  {
                        setStartdate(startDate); 
                        setEndDate(endDate);
                        startDate && setPeriodStartDate(startDate);
                        endDate && setPeriodEndDate(endDate);
                      }}
                      containerHeight={265}
                      hideWeekdays={false}
                      disableMonthPicker={true}
                      disableYearPicker={true}
                      showOutsideDays={false}          
                      firstDayOfWeek={1}
                      // timeZone={'UTC'}
                      locale={myLanguage}
                      // style={{
                      //   backgroundColor: 'transparent',
                      // }}
                      styles={{
                        ...defaultStyles,
                        today: { borderWidth: 0, backgroundColor:'transparent'}, 
                        today_label: { color: colors.black},
                        selected: { borderColor:colors.textRed, borderWidth:2, borderStyle:'dotted', borderRadius:'10%' },
                        selected_label: { color:colors.textRed},
                        range_start: { borderWidth:0, backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        range_start_label: { color: 'white' },
                        range_end: { borderWidth:0, backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        range_end_label: { color: 'white' },
                        range_fill: { backgroundColor: 'rgba(255,0,0,.25)',  },
                        year_selector_label: { fontSize: 16, color: colors.black, fontWeight: 800},
                        month_selector_label: {fontSize: 16, fontWeight:600, textTransform:'capitalize'},
                        day_label: {fontSize:16, color: colors.black},
                        button_next: { backgroundColor: colors.textNegative, borderRadius:'100%', },
                        button_prev: { backgroundColor: colors.textNegative, borderRadius:'100%', },
                      }}
                    />
                }
                </View>
        
                {/* DESCRIZIONE */}
                <TextInput
                  style={[styles.modalInput, {marginTop:24}]}
                  placeholder={dataLabel[myLanguage][14]}
                  placeholderTextColor={colors.black}
                  value={singleDateDescription}
                  onChangeText={setSingleDateDescription}
                />

                {/* PULSANTI ANNULLA-SALVA */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={resetSingleDateForm}
                    >
                    <Text style={styles.cancelButtonText}>{dataLabel[myLanguage][9]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={ () => {
                      // console.log('chiusura modal + operazione scrittura', selectedRadioOption);
                      selectedRadioOption === 'single' ? handleAddSingleDate() : handleAddPeriod();
                      }}>
                    <Text style={styles.addButtonText}>{dataLabel[myLanguage][11]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </View>
          </Modal>
      </Suspense>
    </ImageBackground>
  );
}
