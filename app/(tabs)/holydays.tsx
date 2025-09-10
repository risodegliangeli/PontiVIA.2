import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import DropdownCountry from '@/components/ui/DropdownCountry'; // COUNTRY PICKER 
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useHolydays } from '@/context/HolydaysContext'; // CONTEXT
import React, { useEffect, useState, Suspense, ReactNode } from 'react';
import DateTimePicker, { DateType, useDefaultStyles, } from 'react-native-ui-datepicker';
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
  Image
} from 'react-native';

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
};

const { months } = useLocalizationData();

const holydaysLabels = [
  'Le mie date',                                // 0
  'Aggiungi i tuoi giorni speciali',            // 1
  'Le festività nazionali',                     // 2
  'I periodi lunghi',                           // 3
  'I tuoi giorni speciali',                     // 4
  'Un giorno',                                  // 5
  'Un periodo di più giorni',                   // 6
  'Attenzione',                                 // 7
  'Vuoi eliminare il giorno',                   // 8
  'Annulla',                                    // 9
  'Elimina',                                    // 10
  'Salva',                                      // 11
  'Inserisci una descrizione',                  // 12
  'Esiste già una festività nazionale in questa data',  // 13
  'Descrizione',                                // 14
  '(ripete ogni anno)',                         // 15
  'I tuoi giorni speciali'                      // 16
]

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

/* ###########################################################################################################

                                      MAIN - HolydaysScreen
                                      
########################################################################################################### */
export default function HolydaysScreen({}: any) {

  const colors = useThemeColors();

  const { personalHolydays, setPersonalHolydays,
          regionalHolydays, setRegionalHolydays,
          nationalHolydays, setNationalHolydays,
          vacationPeriods, setVacationPeriods,
          myCountry, setMyCountry,
          } = useHolydays();
          
  const [isModalSingleDateVisible, setIsModalSingleDateVisible] = useState(false);

  // MODAL SINGOLA DATA: STATUS DEI DATI DEL FORM
  const [singleDateDay, setSingleDateDay] = useState<string | null>(null); // SERVE PER handleAddSingleDate
  const [singleDateMonth, setSingleDateMonth] = useState<string | null>(null); // idem
  const [singleDateDescription, setSingleDateDescription] = useState<string | undefined>(undefined);
  const [singleDateType, setSingleDateType] = useState<HolidayType>('personal');
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
    setInitialIndex(null);  // VARIABILE USATA (SE DIVERSA DA null) PER L'EDIT DI UN RECORD
  };

  // AZZERAMENTO STATUS, CHIUSURA MODAL E RETURN
  const clearData = () => {
    setInitialType(undefined);
    setInitialIndex(null);
    hideModalSingleDate();
  }
  
  /* ============================================================================= 
    AGGIUNGI GIORNO SINGOLO 
  ============================================================================= */
  const handleAddSingleDate = () => {

    // PRELEVA I VALORI DALLE VARIABILI
    const day = parseInt(singleDateDay);
    const month = parseInt(singleDateMonth);

    // CONTROLLA ESISTENZA DELLA DESCRIZIONE
    if (!singleDateDescription) {
      setSingleDateError(holydaysLabels[12]);
      return;
    }

    // ASSEGNA I VALORI PRELEVATI DALLA FORM ALLA COSTANTE newHolyday
    const newHoliday: Holiday = { day, month, description: singleDateDescription.trim() };

    // CONTROLLA SE ESISTE GIA' UN RECORD CON LO STESSO GIORNO E LO STESSO MESE TRA I 'national'
    const nationalIndex = nationalHolydays.findIndex(h => h.day === day && h.month === month);
    if (nationalIndex !== -1) {
      setSingleDateError(holydaysLabels[13]);
      return;
    }

    // A) NUOVO *********************************************************************
    if (initialType != singleDateType && initialIndex === null) {
      // CERCA LA STESSA DATA NELL'ALTRA CATEGORIA
      let foundDuplicate = '';
      singleDateType === 'personal' ? foundDuplicate = regionalHolydays.findIndex(h => h.day === day && h.month === month) : foundDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month);

      // CERCA ANCHE NELLA STESSA CATEGORIA
      let sameCategoryDuplicate = '';
      singleDateType === 'personal' ? sameCategoryDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month) : sameCategoryDuplicate = regionalHolydays.findIndex(h => h.day === day && h.month === month);

      if (foundDuplicate > -1) {
      // ESISTE DUPLICATO NELL'ALTRA CATEGORIA SI PROCEDE A CANCELLARLO
        switch (singleDateType) {
          case 'personal':
            setRegionalHolydays(regionalHolydays.filter((_, i) => i !== foundDuplicate));
            break;
          case 'regional':
            setPersonalHolydays(personalHolydays.filter((_, i) => i !== foundDuplicate));
            break;
        }
        // E SI PROCEDE ALLA SCRITTURA SULL'ARRAY (singleDateType)
        switch (singleDateType) {
          case 'personal':
            setPersonalHolydays([...personalHolydays, newHoliday]);
            break;
          case 'regional':
            setRegionalHolydays([...regionalHolydays, newHoliday]);
            break;
        }
      } else {
      // NON ESISTE DUPLICATO NELL'ALTRA CATEGORIA

        // CONTROLLO SE ESISTE DUPLICATO NELLA *PROPRIA* CATEGORIA (singleDateType)
        if (sameCategoryDuplicate > -1) {
          // ESISTE GIA' NELLA PROPRIA CATEGORIA
          setSingleDateError('Questa data esiste già');
          return;      
        } else {
          switch (singleDateType) {
            case 'personal':
              setPersonalHolydays([...personalHolydays, newHoliday]);
              break;
          }
        }

      }
      clearData();
      return;
    }

    // B) EDIT **********************************************************************
    if (initialType === singleDateType && initialIndex != null) {
      // CERCA LA STESSA DATA NELL'ALTRA CATEGORIA (se 'personal' -> cerca in 'regional' e viceversa)
      let foundDuplicate: number[] = [];
      singleDateType === 'personal' ? 
        foundDuplicate = [regionalHolydays.findIndex(h => h.day === day && h.month === month), 'festività locali'] 
        : 
        foundDuplicate = [personalHolydays.findIndex(h => h.day === day && h.month === month), 'festività personali'];

      if (foundDuplicate[0] > -1) {
        setSingleDateError(`Esiste già una data uguale tra le ${foundDuplicate[1]}`);
        return;
      } else {
        switch (singleDateType) {
          case 'personal':
            setPersonalHolydays(personalHolydays.map((h, i) => i === initialIndex ? newHoliday : h));
            break;
          // case 'regional':
          //   setRegionalHolydays(regionalHolydays.map((h, i) => i === initialIndex ? newHoliday : h));
          //   break;
        }
      }
      clearData();
      return;
    }

    // C) EDIT + SPOSTA *************************************************************
    if (initialType  != singleDateType && initialIndex  != undefined) {
      // console.log('C) EDIT + SPOSTA');

      // CERCA LA STESSA DATA NELLA CATEGORIA DI DESTINAZION (singleDataType)
      let foundDuplicate = '';
      singleDateType === 'personal' ? foundDuplicate = personalHolydays.findIndex(h => h.day === day && h.month === month) : foundDuplicate = regionalHolydays.findIndex(h => h.day === day && h.month === month);
      // console.log(`foundDuplicate in ${singleDateType}: ${foundDuplicate}`);

      // SE ESISTE DUPLICATO NELL'ALTRA CATEGORIA SI SOVRASCRIVE
      if (foundDuplicate > -1) {
        // SOVRASCRITTURA SU singleDateType @ foundDuplicate
        switch (singleDateType) {
          case 'personal':
            setPersonalHolydays(personalHolydays.map((h, i) => i === foundDuplicate ? newHoliday : h));
            break;
        }
        // CANCELLAZIONE initialIndex DA initialType
        switch (initialType) {
          case 'personal':
            setPersonalHolydays(personalHolydays.filter((_, i) => i !== initialIndex));
            break;
        }

      } else {

      // SE NON ESISTE UN DUPLICATO SI CANCELLA DALLA VECCHIA CATEGORIA E SI SCRIVE SULLA NUOVA
      
      // SCRITTURA SU singleDateType
        switch (singleDateType) {
          case 'personal':
            setPersonalHolydays([...personalHolydays, newHoliday]);
            break;
        }
      // CANCELLAZIONE DA initialType
        switch (initialType) {
          case 'personal':
            setPersonalHolydays(personalHolydays.filter((_, i) => i !== initialIndex));
            break;
        }
      }
      clearData();
      return;
    }

    // AZZERA VARIABILI E CHIUDE MODAL
    resetSingleDateForm();
  }

  /* ============================================================================= 
    AGGIUNGI PERIODO FESTIVI
   ============================================================================= */
  const handleAddPeriod = () => {

    // console.log('\t<handleAddPeriod>');
   
    if (!singleDateDescription) {
      setSingleDateError('Inserisci una descrizione');
      return;
    }
  
    // console.log(`periodStartDate ${periodStartDate}, periodEndDate ${periodEndDate}, singleDateDescription ${singleDateDescription}`);

    const startDay = periodStartDate?.getDate();
    const startMonth = periodStartDate.getMonth() + 1;
    const startYear = periodStartDate?.getFullYear(); 

    const adjustedEndDate = new Date(periodEndDate);
    if (periodEndDate?.getHours() === 0 && periodEndDate.getMinutes() === 0 && periodEndDate.getSeconds() === 0) {
      adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
    }

    const endDay = periodEndDate?.getDate();
    const endMonth = periodEndDate?.getMonth() + 1;
    const endYear = periodEndDate?.getFullYear();   
  
    const newPeriod: VacationPeriod = { 
      startDay, 
      startMonth, 
      startYear, 
      endDay, 
      endMonth, 
      endYear, 
      description: singleDateDescription.trim() 
    };

    // Caso di modifica: aggiorna l'elemento esistente
    if (initialPeriodIndex !== null) {
      setVacationPeriods(vacationPeriods.map((period, index) =>
        index === initialPeriodIndex ? newPeriod : period
      ));
    } else {
      // Caso di aggiunta: aggiungi un nuovo elemento
      setVacationPeriods([...vacationPeriods, newPeriod]);
    }

    setInitialPeriodIndex(null); // Resetta l'indice dopo il salvataggio

    // AZZERA VARIABILI E CHIUDE MODAL
    resetSingleDateForm();
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

      // console.log(`\titemToEdit: ${JSON.stringify(itemToEdit)}`);
      break;

      // NATIONAL -> NON SI FA NIENTE
      // case 'national':
      // return;

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
  const handleDelete = (type: ItemType, index: number) => {
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
        holydaysLabels[7],
        `${holydaysLabels[8]} ${itemDescription}?`,
        [
          {
            text: holydaysLabels[9],
            style: "cancel"
          },
          { 
            text: holydaysLabels[10], 
            onPress: () => {
              switch (type) {
                case 'personal':
                  setPersonalHolydays(personalHolydays.filter((_, i) => i !== index));
                  break;
                // case 'regional':
                //   setRegionalHolydays(regionalHolydays.filter((_, i) => i !== index));
                //   break;
                case 'national':
                  setNationalHolydays(nationalHolydays.filter((_, i) => i !== index));
                  break;
                case 'vacation':
                  setVacationPeriods(vacationPeriods.filter((_, i) => i !== index));
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
      flex: 1,
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
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
    },
    // TITOLO CARD
    listTitle: {
      color: colors.headerText,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      paddingBottom: 12,
    },
    // CARD
    listItem: { 
      flex:1,
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
    // MODAL
    modalOverlay: {
      flex: 1,
      // position:'absolute',
      // top:0, left:0,
      // bottom:0, right:0,
       margin: 0,
      backgroundColor: 'rgba(255, 0, 0, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      width: '100%',
      maxWidth:500, // CENTRATO SU TABLET
      paddingVertical: 24,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalLabel: {
      fontSize: 16,
      marginBottom: 5,
      marginTop: 10,
    },
    dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    datePickerWrapper: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 5,
      padding:8,
      backgroundColor:'transparent',
    },
    modalInput: {
      borderWidth: 1,
      borderColor: colors.textRed,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 12,
      height:50,
      color: colors.black,
    },
    dateAndMonthContainer: {
      flex:1, 
      flexDirection:'row', 
      alignItems:'flex-start',
      alignContent:'flex-start',
      justifyContent:'space-between', 
      width: '100%',
    },
    dropdownContainer: { 
      minWidth: 'calc(100%-48)', 
      flex:1, 
      flexDirection:'column', 
      justifyContent:'flex-end', 
      alignItems:'center',
      alignContent:'flex-end',
    },
    dateInput: {
      width: 60,
      textAlign: 'center',
      marginBottom: 0,
      marginRight:8,
      color: colors.black,
    },
    dateSeparator: {
      fontSize: 20,
      marginHorizontal: 5,
    },
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
    radioContainer: {
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 42,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // RADIOBUTTON (SOLO CIRCOLETTO ESTERNO)
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

    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    addButton: {
      backgroundColor: colors.textRed,
      padding: 15,
      borderRadius: 8,
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
      borderRadius: 8,
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
    button: {
      borderRadius: 6,
      width: 220,
      margin: 20,
    },
    buttonContainer: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    specialDays: {
      flex:1,
      minHeight:80,
      borderWidth: 2,
      borderColor: '#0088ff',
      borderStyle: 'dotted',
      borderRadius: 24,
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
    dropDownCountry: {
      flex:1,
      width:'100%',
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center',
      gap:8,
    }
  });

  // BOTTONE RESET DROPDOWN COUNTRY: RIPORTA LA SELEZIONE A 'ITALIA'
  const ResetCountryButton = () => {
    return(
      <TouchableOpacity
        onPress={ () => setMyCountry('it-IT')}>
        <IconSymbol size={20} name="gobackward" color={colors.blueBar} style={{paddingBottom:8,}}/>
      </TouchableOpacity>
    )
  }
  
  // GESTIONE STATI DELLE RADIOBUTTON DELLA MODAL, ATTIVO, FOCUSED E DISABILITATO
  const [selectedRadioOption, setSelectedRadioOption] = useState<'single' | 'period'>('single'); // STATO INIZIALE DEL RADIOBUTTON
  const [leftRadioButtonActive, setLeftRadioButtonActive] = useState<boolean>(true);    // FLAG PER DISATTIVARE IL RADIOBUTTON SINISTRO (da resettare a ogni + Aggiungi)
  const [rightRadioButtonActive, setRightRadioButtonActive] = useState<boolean>(true);  // FLAG PER DISATTIVARE IL RADIOBUTTON DESTRO (da resettare a ogni + Aggiungi)

  /* ============================================================================= 
  * useEffect * AL CAMBIO DI myCountry
  Viene richiamato ogni volta che myCountry cambia, per aggiornare le festività nazionali
  ============================================================================= */
  useEffect(() => {
    // console.log('(holydays.tsx) * useEffect * myCountry -> aggiornato a ' + myCountry + ', si aggiorna la lista');
    setNationalHolydays(getLocalHolydas(myCountry));    // RICHIAMO LA FUNZIONE getLocalHolydas (DA data.tsx)
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
        <Text style={[styles.sectionTitle, { flex:1, marginBottom:32, }]}> {holydaysLabels[0]} </Text> 

        {/* TOUCHABLE + GIORNI SPECIALI ########################################################################## */}
        <TouchableOpacity 
          style={styles.specialDays}
          onPress={ () => { 
            setSelectedRadioOption('single');           
            setDatePickerSelected(new Date()); // SINGLE DATE: IMPOSTA A MESE CORRENTE 
            setStartdate(null); // PERIOD: AZZERA SCELTA PRECEDENTE
            setEndDate(null); // PERIOD: AZZERA SCELTA
            setSingleDateDescription(undefined);
            setLeftRadioButtonActive(true); // RESETTA A ATTIVI ENTRAMBI I RADIOBUTTON
            setRightRadioButtonActive(true);
            showModalSingleDate(); // APRE MODAL CON DATEPICKER
          }}
        >
          <IconSymbol name="plus" size={36} color={'#0088ff'}/>
          <Text style={styles.specialDaysLabel}>{holydaysLabels[1]}</Text>
        </TouchableOpacity>




        {/* ////////////////////////////////
        // /////////////////////////////////
        //       CONTROLLO VALORI.       ///
        // /////////////////////////////////
        // //////////////////////////////*/}
        {/* <TouchableOpacity
          onPress={ () => {
            console.log('GIORNI SPECIALI:');
            personalHolydays.map( (index) => {
              console.log('\t',index);
              })}
          }>
          <View>
            <Text style={{textAlign:'center', padding:12}}>STAMPA GIORNI SPECIALI</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => {
            console.log('PERIODI LUNGHI:');
            vacationPeriods.map( (index) => {
              console.log('\t',index);
              })}
          }>
          <View>
            <Text style={{textAlign:'center', paddingBottom:12}}>STAMPA PERIODI</Text>
          </View>
        </TouchableOpacity> */}

        {/* ////////////////////////////////
        // /////////////////////////////////
        //       CONTROLLO VALORI.       ///
        // /////////////////////////////////
        // //////////////////////////////*/}




        {/* CARD GIORNI SPECIALI ############################################################################# */}
        {personalHolydays.length > 0 && (
          <View style={styles.listItem}>
            <Text style={[styles.listTitle, { textAlign:'center' } ]}>{holydaysLabels[4]}</Text>
            {personalHolydays.sort((a, b) => a.day - b.day).sort((a, b) => a.month - b.month).map((holiday, index) => (
              <React.Fragment key={index}>
                <View 
                style={styles.holidayRow }>
                  <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <Image
                      source={require('@/assets/images/icon_calendar-off.png')} 
                      style={{width:24, height:24, resizeMode:'contain'}}/>
                    <View style={{flexDirection:'column'}} >
                      <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label} `}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                      <Text style={[styles.itemDescription, {maxWidth:240, fontStyle:'italic', fontWeight:400}]}>{holydaysLabels[15]}</Text>
                    </View>
                  </View>
                  <View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEdit('personal', index)}>
                      <IconSymbol name="pencil" size={20} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete('personal', index)} style={{ marginLeft: 12 }}>
                      <IconSymbol name="trash" size={20} color={colors.text} />
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
            <Text style={[styles.listTitle, { textAlign:'center' } ]}>{holydaysLabels[3]}</Text>
            {vacationPeriods.sort((a, b) => a.startDay - b.startDay).sort((a, b) => a.startMonth - b.startMonth).sort((a, b) => a.startYear - b.startYear).map((period, index) => (
              <React.Fragment key={index}>
                <View key={index} style={styles.holidayRow}>
                  <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <Image
                      source={require('@/assets/images/icon_calendar_bridge-off.png')} 
                      style={{width:24, height:24, resizeMode:'contain'}}/>
                    <View style={{flexDirection:'column'}} >
                      <Text style={styles.itemDate}>
                        {`${period.startDay}.${period.startMonth}.${period.startYear} / ${period.endDay}.${period.endMonth}.${period.endYear}`}
                      </Text>
                      <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{period.description}</Text>
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEdit('vacation', index)}>
                      <IconSymbol name="pencil" size={20} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete('vacation', index)} style={{ marginLeft: 12 }}>
                      <IconSymbol name="trash" size={20} color={colors.text} />
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
          <Text style={[ styles.listTitle, { textAlign:'center' } ]}>{holydaysLabels[2]}</Text>

          {/* DROPDOWN PAESE */}
          <View style={styles.dropDownCountry}>
            <DropdownCountry 
              selectedValue={myCountry}
              onChange={ (item) => {
                setMyCountry(item);
              }}
            />
            { myCountry !== 'it-IT'  ? <ResetCountryButton/> : null }
          </View>

          {nationalHolydays.map((holiday, index) => (
            <React.Fragment key={index}>
              <View 
                key={index} 
                style={[styles.holidayRow, {justifyContent:'flex-start', alignItems:'flex-start'}]}>
                  <IconSymbol name="calendar.circle" size={28} color={colors.text}  />
                  <View style={{flexDirection:'column'}}>
                    <Text style={styles.itemDate}>{`${holiday.day} ${months[holiday.month]?.label}`}</Text>
                    <Text style={[styles.itemDescription, {maxWidth:240}]} numberOfLines={1} ellipsizeMode="tail">{holiday.description}</Text>
                  </View>
              </View> 
              {/* SE NON E' L'ULTIMO ELEMENTO, AGGIUNGE UNA LINEA DI SEPARAZIONE */}
              {index !== nationalHolydays.length - 1 && <View style={{width:'100%', height:1, backgroundColor: colors.border}}></View>}
            </React.Fragment>
          ))}
        </View>

        {/* BOTTOM SPACE ############################################################################# */}
        <View style={{ height: 280 }} />
      </ScrollView>

      {/* MODAL GIORNO SINGOLO ############################################################################# */}
      <Suspense>
          <Modal
            visible={isModalSingleDateVisible}
            presentationStyle="fullScreen"
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
                <Text style={[styles.listTitle, { textAlign:'center', marginBottom:24, }]}>{holydaysLabels[4]}</Text>
                {singleDateError ? <Text style={styles.errorText}>{singleDateError}</Text> : null}

                {/* RADIOBUTTON */}
                <View style={styles.radioContainer}>

                  {/* LEFT */}
                  <TouchableOpacity
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
                        {holydaysLabels[5]}
                    </Text>
                  </TouchableOpacity>
                  
                  {/* RIGHT */}
                  <TouchableOpacity
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
                          {holydaysLabels[6]}
                    </Text>
                  </TouchableOpacity>

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
                      locale={'it-IT'}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                      styles={{
                        ...defaultStyles,
                        today: { borderWidth: 0, backgroundColor:'transparent'}, 
                        selected: { backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        selected_label: { color: 'white' },
                        year_selector_label: { display:'none'},
                        month_selector_label: {fontSize: 14, fontWeight:600, textTransform:'capitalize'},
                        day: {fontSize:16}
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
                      locale={'it-IT'}
                      style={{
                        backgroundColor: '#transparent',
                      }}
                      styles={{
                        ...defaultStyles,
                        today: { borderWidth: 0, backgroundColor:'transparent'}, 
                        selected: { borderColor:colors.textRed, borderWidth:2, borderStyle:'dotted', borderRadius:'10%' },
                        selected_label: { color:colors.textRed},
                        range_start: { borderWidth:0, backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        range_start_label: { color: 'white' },
                        range_end: { borderWidth:0, backgroundColor: colors.textRed, borderRadius:'10%' }, 
                        range_end_label: { color: 'white' },
                        //year_selector_label: { display:'none'},
                        month_selector_label: {fontSize: 14, fontWeight:600, textTransform:'capitalize'},
                        day: {fontSize:16}
                      }}
                    />
                }
                </View>
        
                {/* DESCRIZIONE */}
                <TextInput
                  style={[styles.modalInput, {marginTop:24}]}
                  placeholder={holydaysLabels[14]}
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
                    <Text style={styles.cancelButtonText}>Annulla</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={ () => {
                      // console.log('chiusura modal + operazione scrittura', selectedRadioOption);
                      selectedRadioOption === 'single' ? handleAddSingleDate() : handleAddPeriod();
                      }}>
                    <Text style={styles.addButtonText}>Salva</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </View>
          </Modal>
      </Suspense>
    </ImageBackground>
  );
}
