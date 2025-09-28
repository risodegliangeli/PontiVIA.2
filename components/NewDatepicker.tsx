import {useState, useEffect, } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet,  } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { addDays, getWeekOfMonth, getDay, differenceInDays } from 'date-fns';
import { getLocales,  } from 'expo-localization';
import useLocalizationData from '@/app/data/data';
import DateTimePicker from 'react-native-ui-datepicker'; // https://www.npmjs.com/package/react-native-ui-datepicker

// LABEL LOCALIZZATE
const dataLabel: any = {
  'it-IT': [
    'Aggiungi un evento',      // 0
    '1 giorno',                // 1
    '2 giorni',                // 2
    '3 giorni',                // 3
    'Personalizza',            // 4
    'Annulla',                 // 5
    'Aggiungi',                // 6
    'Descrizione',             // 7
    'Ripete',                  // 8
    'Ripete ogni anno, il',     // 9
    'primo',                   // 10
    'secondo',                 // 11
    'terzo',                   // 12
    'quarto',                  // 13
    'quinto',                  // 14
    'di',                      // 15
    'Chiudi',                  // 16
    'Ok',                      // 17
  ],
}; 

// INTERFACCIA COMPONENT
interface NewDatepickerInterface {
language: string | undefined;
startDate: Date;
endDate: Date | null;
description: string | undefined;
repeatOnDate: boolean | null;
repeatOnDay: boolean | null;
onCancel: () => null;
onConfirm: (
  startDate: Date, 
  endDate: Date | null, 
  description: string,  
  upperRadioButtonActive: boolean, 
  lowerRadioButtonActive: boolean
  ) => void;
}

/* =========================================================
    CREA UNA DATA ALLE 12:00:00 UTC
========================================================= */
const createUTCDate = (inputDate: Date) => {
  return new Date(Date.UTC( inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 12, 0, 0)); // 12:00 UTC
};

/* =========================================================

      NewDatepicker - 2025 G. Angeli 

      MAIN

========================================================= */
const NewDatepicker: React.FC<NewDatepickerInterface> = ({
  language,
  startDate,
  endDate,
  description,
  repeatOnDate,
  repeatOnDay,
  onCancel,
  onConfirm
  }) => {
  
  // SE NON VIENE PASSATO UN language SI PRENDE QUELLO DI SISTEMA
  if (!language) language = (getLocales()[0].languageTag);

  // COPIA DEI PROPS IN INGRESSO PER USO INTERNO
  const [myStartDate, setMyStartDate] = useState<Date>(createUTCDate(startDate));     // DATA INIZIO
  const [myEndDate, setMyEndDate] = useState<Date | null>(endDate);                   // DATA FINE
  const [myDescription, setMyDescription] = useState<string | undefined>(description); // DESCRIZIONE

  // NOMI MESI E GIORNI DELLA SETTIMANA LETTI DAL data
  const { months, localizedDays } = useLocalizationData();

  // VARIABILI DI SERVZIO
  const [datepickerCaller, setDatepickerCaller] = useState<'startDate' | 'endDate'>(); // DA QUALE CAMPO VIENE RICHIAMATO IL DATEPICKER?
  const [selectedDate, setSelectedDate] = useState<Date>(); // INIZIALIZZATA DAL DATEPICKER 
  const [descriptionAlert, setDescriptionAlert] = useState(false); // CAMBIA IL COLORE DEL SEGNAPOSTO

  // SWITCH VISIBILE/NON VISIBILE PER I SINGOLI ELEMENTI
  const [toDate, setToDate] = useState( myEndDate ? true : false); // SECONDA DATA
  const [radioButton, setRadioButton] = useState( repeatOnDate || repeatOnDay ? true : false); // GRUPPO RADIOBUTTON
  const [rotateArrow, setRotateArrow] = useState<string>('0deg');
  const [datepickerVisible, setDatepickerVisible] = useState(false); // CALENDARIO

  // DROPDOWN GIORNI DI DURATA EVENTO
  const [value, setValue] = useState(1);          // DURATA SELEZIONATA
  const [isFocus, setIsFocus] = useState(false);  // FOCUS DELLA DROPDOWN

  // LABEL DURATA EVENTO
  const dropdownLabel: string[] = [  // LABEL LOCALIZZATE DELLA DROPDOWN
    dataLabel[language][1],
    dataLabel[language][2],
    dataLabel[language][3],
    dataLabel[language][4],
    ];

  const data: {label: string, value: number | null }[] = [ // LABEL E RISPETTIVI VALORI DELLA DROPDOWN
    { label: dropdownLabel[0], value: 1 },
    { label: dropdownLabel[1], value: 2 },
    { label: dropdownLabel[2], value: 3 },
    { label: dropdownLabel[3], value: null },
    ];

  // GESTISCE CAMBIO DROPDOWN GIORNI PARTENDO DA DROPDOWN
  useEffect( () => {
    switch (value) {
      case 1:
        setMyEndDate(null);
        setToDate(false);
      break;
      case 2:
        setMyEndDate(addDays(myStartDate, 1));
        setToDate(true);
      break;
      case 3:
        setMyEndDate(addDays(myStartDate, 2));
        setToDate(true);
      break;
      case null: 
        setMyEndDate(myStartDate); 
        setToDate(true);
      break;
      default:
        setToDate(false);
      return;
    }
  }, [value, myStartDate]);

  // GESTISCE LA DROPDOWN PARTENDO DALLA DIFFERENZA TRA DATE
  useEffect( () => {
    myEndDate && differenceInDays(myEndDate,myStartDate) > 2 && setValue(null);
    }, [myStartDate, myEndDate]);
  
  /* RADIOBUTTON 
   INIZIALMENTE false ENTRAMBI, SI ATTIVANO/DISATTIVANO QND L'UTENTE APRE/CHIUDE IL GRUPPO RADIOBUTTON
     SERVE COME PROP DA PASSARE AL CHIAMANTE (ripete? si/no, quale? upper/lower) */
  const [upperRadioButtonActive, setUpperRadioButtonActive] = useState(repeatOnDate || false); 
  const [lowerRadioButtonActive, setLowerRadioButtonActive] = useState(repeatOnDay || false);  

  // LABEL LOCALIZZATE CHE SARANNO RI-ASSEMBLATE OGNI VOLTA CHE CAMBIANO myStartDate O myEndDate
  const [upperRadioButtonLabel, setUpperRadioButtonLabel] = useState<string>(); // {/*es. Ripete ogni anno, il 25 settembre*/}
  const [lowerRadioButtonLabel, setLowerRadioButtonLabel] = useState<string>(); // {/*es. Ripete ogni anno, il quarto giovedì di settembre*/}

  // ASSEMBLA LE LABEL DEI RADIOBUTTON OGNI VOLTA CHE CAMBIANO myStartDate O myEndDate
  useEffect( () => {
    setUpperRadioButtonLabel(`${dataLabel[language][9]} ${myStartDate.getDate()} di ${ months[myStartDate.getMonth()].label }`);
    setLowerRadioButtonLabel(`${dataLabel[language][9]} ${dataLabel[language][9 + getWeekOfMonth(myStartDate)]} ${localizedDays[getDay(myStartDate) === 0 ? 6 : getDay(myStartDate) - 1]} di ${ months[myStartDate.getMonth()].label } `);
  }, [myStartDate, myEndDate]);

  // ICONE USATE NELLO SCRIPT
  const IcoCalendar = <Image source={require('@/assets/images/ico_calendar_picker.png')} style={{width:13, height:14, resizeMode:'contain'}}/>;
  const IcoRepeat = <Image source={require('@/assets/images/ico_repeat_picker.png')} style={{width:13, height:14, resizeMode:'contain'}}/>;
  const IcoArrow = <Image source={require('@/assets/images/arrow_down.png')} style={{ width:24, height:24, resizeMode:'contain', transform: [{rotate: rotateArrow}]}}/>

  // STILI
  const styles = StyleSheet.create({
    modalContainer: {
      width:'100%',
      //backgroundColor:'white',
      //borderRadius:24,
      flexDirection:'column',
      gap:24,
      alignItems:'center', // HOR
      justifyContent:'center',
      alignContent:'center',
      // paddingHorizontal:12,
      // paddingVertical:24,
      // borderWidth:1,
    },    
    listTitle: {
      color: '#333',
      fontSize: 18,
      fontWeight: '600',
      paddingBottom: 12,
      textAlign:'center', 
    },
    textInput: {
      width: '100%',
      fontSize:20,
      fontWeight:400,
      paddingBottom:8,
      borderBottomWidth: 1,
      borderBottomColor: '#FF778F',
    },
    dateContainer: {
      width:'100%',
      flexDirection: 'column',
      alignContent:'flex-start',
      gap:12,
    },
    dateContainerRow: {
      //flex:2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap:8,
      alignItems: 'center',
    },
    dateFrom: {
      borderWidth: 1,
      borderColor: '#FF778F',
      borderRadius: 8,
      padding:8,
      flexDirection:'row',
      justifyContent: 'space-between',
      gap:8,
      minWidth: '49%',
      maxWidth: '50%',
    },
    dateFromText: {
      fontSize:16,
      },
      repeatText: {
      fontSize:16,
      color: '#0088ff'
    },
    // DROPDOWN
    dropdownStyle: {
      height: 36,
      borderColor: 'gray',
      borderWidth: 0,
      borderRadius: 8,
      paddingHorizontal: 8,
      },
      dropdownSelectedTextStyle: {
      fontSize: 16,
    },
    repeatButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:4,
    },
    dropdownPlaceholderStyle:{
      fontSize: 16,
      color: 'rgba(51,51,51,.5)',
    },
    // RADIOBUTTON
    radioContainer: {
      width:'100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingVertical:16,
      paddingHorizontal: 12,
      borderWidth:1,
      borderColor: '#dedede',
      borderRadius:8,
      minHeight:80,
      gap:12,
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
    // PALLINO NERO ACCESO
    radioButtonSelected: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#0088FF',
    },   
    radioButtonLabel: {
      fontSize:14,
      flex:1,
    }, 
    // PULSANTI ADD/CANCEL
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    addButton: {
      //backgroundColor: '#00',
      borderColor: '#0088FF',
      borderWidth: 1,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginLeft: 10,
    },
    addButtonText: {
      color: '#0088ff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButton: {
      borderWidth:1,
      borderColor:  'rgba(51, 51, 51, .5)',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    cancelButtonText: {
      color:  'rgba(51, 51, 51, .5)',
      fontSize: 16,
      fontWeight: 'bold',
    },
    datepickerContainer: {
      position:'absolute',
      top:12,
      marginHorizontal:24,
      paddingHorizontal:24,
      paddingVertical:24,
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      flex:1,
      borderRadius:12,
      backgroundColor:'#fafafa',
      borderWidth:2,
      borderColor: '#efefef',
      elevation:6,
      shadowColor: '#000000', // iOS shadow
      shadowOffset: {
        width: 0,
        height: 16, // Match elevation for iOS
      },
      shadowOpacity: 0.25,
      shadowRadius: 16 // Match elevation for iOS
    }
  })

  return (
    <View style={styles.modalContainer}>
      {/* MODAL */}
      <View style={styles.modalContainer}>
        {/* TITOLO MODAL */}
        <Text style={styles.listTitle}>{dataLabel[language][0]}</Text>
        {/* INPUT TEXT  */}
        <TextInput
          key={'description'}
          style={styles.textInput}
          placeholder={dataLabel[language][7]}
          placeholderTextColor={descriptionAlert ? 'red' : '#929292'}
          value={myDescription}
          onChangeText={setMyDescription}
        />
        {/* DATE FROM - TO*/}
        <View style={styles.dateContainer}>
          {/* ROW 1 - DA */}
          <View style={styles.dateContainerRow}>
            {/* FROM */}
            <TouchableOpacity 
              onPress={ () => {
                setDatepickerCaller('startDate'); // PASSA AL DATEPICKER IL CHIAMANTE
                setSelectedDate(myStartDate);     // PASSA AL DATEPICKER LA DATA DA VISUALIZZARE
                setDatepickerVisible(true);       // APRE IL DATEPICKER
              }}
              style={styles.dateFrom}>
              <Text key='fromDate' style={styles.dateFromText}>{myStartDate.toLocaleDateString()}</Text>{IcoCalendar}
            </TouchableOpacity>
            {/* DROPDOWN DURATA */}
            <View style={{width:'48%'}}>
              <Dropdown
                style={styles.dropdownStyle}
                placeholder={!isFocus ? 'Scegli la data' : '...'}
                placeholderStyle={styles.dropdownPlaceholderStyle}
                selectedTextStyle={styles.dropdownSelectedTextStyle}
                data={data}
                labelField="label"
                valueField="value"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                }}                
                //search
                //maxHeight={300}
                //searchPlaceholder="Search..."
                //renderLeftIcon={() => null }
              />
            </View>
          </View>
          {/* ROW 2 - A */}
          {toDate && <View style={styles.dateContainerRow}>
            {/* TO */}
            <TouchableOpacity 
              style={styles.dateFrom}
              onPress={ () => {
                setDatepickerCaller('endDate'); // PASSA AL DATEPICKER IL CHIAMANTE
                setSelectedDate(myEndDate);     // PASSA AL DATEPICKER LA DATA DA VISUALIZZARE
                setDatepickerVisible(true);
                }}>
              <Text key='toDate' style={styles.dateFromText}>{myEndDate?.toLocaleDateString()}</Text>{IcoCalendar}
            </TouchableOpacity>
          </View>}
          {/* ROW 3 - BOTTONE RIPETE */}
          <View style={[styles.dateContainerRow, {maxWidth:'50%', justifyContent:'flex-start'}]}>
            <TouchableOpacity 
              style={styles.repeatButton}
              onPress={ () => {
                if (!radioButton) { 
                  setRadioButton(true)  // SE GRUPPO RADIOBUTTON SPENTO LO SI ACCENDE
                  setRotateArrow('180deg'); // SI RUOTA LA FRECCIA
                  setUpperRadioButtonActive(true) // E SI IMPOSTA true IL PRIMO
                } else {
                  setRadioButton(false) // ALTRIMENTI SI SPEGNE IL GRUPPO
                  setRotateArrow('0deg');
                  setUpperRadioButtonActive(false)  // E SI RIPORTANO A false I DUE RADIOBUTTON
                  setLowerRadioButtonActive(false)
                }
              }}
              >
              {IcoRepeat}<Text style={styles.repeatText}>{dataLabel[language][8]}</Text>{IcoArrow}

            </TouchableOpacity>
          </View>
          {/* ROW 4 - RADIOBUTTON */}
          {radioButton && <View style={styles.radioContainer}>
            {/* UPPER */}
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => {
                setUpperRadioButtonActive(true);
                setLowerRadioButtonActive(false);
              }} >
              <View style={styles.radioButton }>
                {upperRadioButtonActive && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioButtonLabel}>
              {/*Ripete ogni anno, il 25 settembre*/}
                  {upperRadioButtonLabel}
              </Text>
            </TouchableOpacity>
            {/* LOWER */}
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => {
                setUpperRadioButtonActive(false);
                setLowerRadioButtonActive(true);
              }} >
              <View style={styles.radioButton }>
                {lowerRadioButtonActive && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioButtonLabel}>
              {/*Ripete ogni anno, il quarto giovedì di settembre*/}
                {lowerRadioButtonLabel}
              </Text>
            </TouchableOpacity>
          </View>}          
          {/* PULSANTI ANNULLA-SALVA GENERALI */}
          <View style={styles.modalButtons}>
            {/* ANNULLA */}
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={ () => onCancel() }>
              <Text style={styles.cancelButtonText}>{dataLabel[language][5]}</Text>
            </TouchableOpacity>
            {/* SALVA */}
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={ () => 
              myDescription ?
                onConfirm(myStartDate, myEndDate, myDescription, upperRadioButtonActive, lowerRadioButtonActive) 
              :
                setDescriptionAlert(true)
              }>
              <Text style={styles.addButtonText}>{dataLabel[language][6]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* CALENDARIO */}
      {datepickerVisible && 
        <View style={styles.datepickerContainer}>
          <DateTimePicker
            mode="single"
            calendar="gregory"
            date={selectedDate}
            minDate={datepickerCaller === 'endDate' ? myStartDate : null}
            onChange={( {date } ) => {
              setSelectedDate(createUTCDate(date));
              datepickerCaller === 'startDate' ? setMyStartDate(date) : setMyEndDate(date); // IL CHIAMANTE RICEVE L'AGGIORNAMENTO
              }}
            containerHeight={220}
            hideWeekdays={false}
            disableMonthPicker={false}
            disableYearPicker={false}
            showOutsideDays={false}          
            // minDate={minDate}
            // maxDate={maxDate}
            firstDayOfWeek={1}
            //timeZone={'UTC'}
            locale={language}
            style={{
            //   backgroundColor: 'transparent',
            //   borderWidth:1,
            //   paddingTop: 24
            }}
            //navigationPosition={'right'}
            styles={{
              header:{marginBottom:36},
              //...defaultStyles,
              //today: { borderWidth: 0, backgroundColor:'transparent', }, 
              //today_label: { color: '#333333'},
              selected: { backgroundColor: '#FF778F', borderRadius:'12%' }, 
              selected_label: { color: 'white' },
              selected_month: {backgroundColor: '#FF778F'},
              //year_selector_label: { display:'none'},
              //day_cell:{backgroundColor:'#dedede'},
              month_selector_label: {fontSize: 16, fontWeight:600, textTransform:'capitalize'},
              year_selector_label: {fontSize: 16, fontWeight:600, textTransform:'capitalize'},
              day_label: {fontSize:16, color: '#333333'},
              button_next: { backgroundColor: '#FF778F', borderRadius:'100%', },
              button_next_image:{color:'red'},
              button_prev: { backgroundColor: '#FF778F', borderRadius:'100%', },
            }}
          />
          <View style={styles.modalButtons}>
            {/* CHIUDE CALENDARIO */}
            <TouchableOpacity 
              style={[styles.cancelButton, {borderWidth:1}]} 
              onPress={ () => 
                setDatepickerVisible(false) // CHIUDE IL DATEPICKER E LASCIA INVARIATO
              }>
              <Text style={styles.cancelButtonText}>{dataLabel[language][16]}</Text>
            </TouchableOpacity>
            {/* CONFERMA CALENDARIO */}
            <TouchableOpacity 
              style={[styles.addButton, {borderWidth:1}]} 
              onPress={ () => {
                datepickerCaller === 'startDate' ? setMyStartDate(selectedDate) : setMyEndDate(selectedDate); // AGGIORNA LA VARIABILE CHIAMANTE
                setDatepickerVisible(false) // CHIUDE IL DATEPICKER
              }}>
              <Text style={styles.addButtonText}>{dataLabel[language][17]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
}

export default NewDatepicker;

