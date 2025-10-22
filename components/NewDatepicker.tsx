import {useState, useEffect, } from 'react';
import {  View, Text, Image, TextInput, TouchableOpacity, StyleSheet,  } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { addDays, subDays, compareAsc, getDay, differenceInDays, startOfMonth } from 'date-fns';
import { getLocales,  } from 'expo-localization';
import useLocalizationData from '@/app/data/data';
import DateTimePicker from 'react-native-ui-datepicker'; // https://www.npmjs.com/package/react-native-ui-datepicker
import { IconSymbol } from '@/components/ui/IconSymbol';
import { datepickerLabels as dataLabel } from '@/components/dataLabel';

// INTERFACCIA COMPONENT
interface NewDatepickerInterface {
  language: string | undefined;
  startDate: Date;
  endDate: Date | null;
  description: string | undefined;
  repeatOnDate: boolean | null;
  repeatOnDay: boolean | null;
  isError: boolean;
  errorMsg: string | null;
  initialIndex: number | null; // USATO IN CASO DI EDIT PER CAMBIARE PULSANTE Aggiungi/Aggiorna
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
  if (!inputDate) return null;
  return new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 12, 0, 0, 0)); // 12:00 UTC
};

/* =========================================================
    CALCOLA LA RICORRENZA DI UNA DATA ALL'INTERNO DEL MESE
========================================================= */
function getWeekdayRecurrence(targetDate: Date) {
    const targetDayOfWeek = getDay(targetDate);
    const firstDayOfMonth = startOfMonth(targetDate);
    const startDayOfWeek = getDay(firstDayOfMonth);
    const daysToAdd = (targetDayOfWeek - startDayOfWeek + 7) % 7;
    const firstOccurrence = addDays(firstDayOfMonth, daysToAdd);
    const daysDifference = differenceInDays(targetDate, firstOccurrence);
    const recurrenceNumber = (daysDifference / 7) + 1;
    return recurrenceNumber;
}

/* =========================================================

              NewDatepicker - 2025 G. Angeli 

                          MAIN

========================================================= */
const NewDatepicker: React.FC<NewDatepickerInterface> = ({
  language,
  startDate,
  endDate,
  description,
  isError,
  errorMsg,
  repeatOnDate,
  repeatOnDay,
  initialIndex,
  onCancel,
  onConfirm
}) => {

  //console.log( `<NEWDATEPICKER>` );

  // LINGUA DI SISTEMA
  language = (getLocales()[0].languageTag).slice(0,2);

  // NOMI MESI E GIORNI DELLA SETTIMANA LETTI DAL data
  const { months, localizedDays } = useLocalizationData();

  // COPIA DEI PROPS IN INGRESSO PER USO INTERNO
  const [myStartDate, setMyStartDate] = useState<Date>(createUTCDate(startDate));     // DATA INIZIO
  const [myEndDate, setMyEndDate] = useState<Date | null>(endDate);                   // DATA FINE | null
  const [myDescription, setMyDescription] = useState<string | undefined>(description); // DESCRIZIONE

  // VARIABILI DI SERVZIO
  const [datepickerCaller, setDatepickerCaller] = useState<'startDate' | 'endDate'>(); // DA QUALE CAMPO VIENE RICHIAMATO IL DATEPICKER?
  const [maxDate, setMaxDate] = useState<Date | null>(null); // 'maxdate' del datepicker, per evitare che startDate > endDate
  const [minDate, setMinDate] = useState<Date | null>(null); // idem
  const [selectedDate, setSelectedDate] = useState<Date>(); // INIZIALIZZATA DAL DATEPICKER 
  const [descriptionAlert, setDescriptionAlert] = useState(false); // CAMBIA IL COLORE DEL SEGNAPOSTO

  // SWITCH VISIBILE/NON VISIBILE PER I SINGOLI ELEMENTI
  const [toDate, setToDate] = useState( myEndDate ? true : false); // SECONDA DATA
  const [radioButton, setRadioButton] = useState( repeatOnDate || repeatOnDay ? true : false); // GRUPPO RADIOBUTTON
  //const [rotateArrow, setRotateArrow] = useState<string>('0deg');
  const [datepickerVisible, setDatepickerVisible] = useState(false); // CALENDARIO

  // DROPDOWN GIORNI DI DURATA EVENTO
  const [value, setValue] = useState<number | null>(1);   // DURATA SELEZIONATA
  const [isFocus, setIsFocus] = useState(false);          // FOCUS DELLA DROPDOWN

  // LABEL DURATA EVENTO
  const dropdownLabel: string[] = [  // LABEL LOCALIZZATE DELLA DROPDOWN
    dataLabel(language, 1),
    dataLabel(language, 2),
    dataLabel(language, 3),
    dataLabel(language, 4),
    ];

  const data: {label: string, value: number | null }[] = [ // LABEL E RISPETTIVI VALORI DELLA DROPDOWN
    { label: dropdownLabel[0], value: 1 },
    { label: dropdownLabel[1], value: 2 },
    { label: dropdownLabel[2], value: 3 },
    { label: dropdownLabel[3], value: null },
    ];

  
  /* RADIOBUTTON REPEAT-ON-DATE/ON-DAY
  INIZIALMENTE false ENTRAMBI, SI ATTIVANO/DISATTIVANO QND L'UTENTE APRE/CHIUDE IL GRUPPO RADIOBUTTON
  SERVE COME PROP DA PASSARE AL CHIAMANTE (ripete? si/no, quale? upper/lower) */
  const [upperRadioButtonActive, setUpperRadioButtonActive] = useState(repeatOnDate || false); 
  const [lowerRadioButtonActive, setLowerRadioButtonActive] = useState(repeatOnDay || false);  

  // LABEL LOCALIZZATE CHE SARANNO RI-ASSEMBLATE OGNI VOLTA CHE CAMBIANO myStartDate O myEndDate
  const [upperRadioButtonLabel, setUpperRadioButtonLabel] = useState<string>(); // {/*es. Ripete ogni anno, il 25 settembre*/}
  const [lowerRadioButtonLabel, setLowerRadioButtonLabel] = useState<string>(); // {/*es. Ripete ogni anno, il quarto giovedì di settembre*/}

  // ICONE USATE NELLO SCRIPT
  const IcoCalendar = <Image source={require('@/assets/images/ico_calendar_picker.png')} style={{width:13, height:14, resizeMode:'contain'}}/>;
  const IcoRepeat = <Image 
    style={{width:13, height:14, resizeMode:'contain'}}
    source={
      radioButton ? require('@/assets/images/ico_repeat_picker.png') : require('@/assets/images/ico_repeat_picker_black.png')
    }/>;
  const IcoArrow = <Image 
  source={
    radioButton ? require('@/assets/images/ico_arrow_blue.png') : require('@/assets/images/ico_arrow_black.png')
  } 
  style={{ width:24, height:24, resizeMode:'contain', }
}/>

  // STILI
  const styles = StyleSheet.create({
    modalContainer: {
      width:'100%',
      flexDirection:'column',
      gap:32,
      alignItems:'center', // HOR
      justifyContent:'center',
      alignContent:'center',
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
      gap:20,
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
      paddingVertical:24,
      paddingHorizontal: 12,
      borderWidth:1,
      borderColor: '#dedede',
      borderRadius:8,
      minHeight:80,
      gap:24,
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
      //gap:20,
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
    },
    errorMsg: {
      fontSize:16,
      fontWeight:600,
      textAlign:'center',
      color: '#cc0000',
    }
  })


  /* --------------------------------------------------
  GESTISCE LA DROPDOWN PARTENDO DALLA DIFFERENZA TRA DATE
  -------------------------   ------------------------- */
  useEffect(() => {

    if (myEndDate) {
      // controllo che startDate sia < di endDate: nel caso la forzo = endDate
      // si utilizza {compareAsc}
      // Compare the two dates and return 1 if the first date is after the second, 
      // -1 if the first date is before the second or 
      // 0 if dates are equal.
      if ( compareAsc(myStartDate, myEndDate) > 0 ) { setValue(1) }
      // controllo
      let d = differenceInDays(myEndDate, myStartDate);
      console.log(`- - useEffect: GESTISCE LA DROPDOWN PARTENDO DALLA DIFFERENZA\ndifferenceInDays = ${d}`);
      if (d > 0 && d <= 3 && value !== d + 1) {
        setValue(d + 1);
      } else if ((d <= 0 || d > 3) && value !== null) {
        setValue(null);
      }
    }
    // Do not update value if myEndDate is null
  }, [myStartDate, myEndDate]);

  /* --------------------------------------------------
  ASSEMBLA LE LABEL DEI RADIOBUTTON OGNI VOLTA CHE CAMBIANO myStartDate O myEndDate
  -------------------------   ------------------------- */
  useEffect( () => {
    setUpperRadioButtonLabel(`${dataLabel(language, 9)} ${myStartDate.getDate()} di ${ months[myStartDate.getMonth()].label }`);
    setLowerRadioButtonLabel(`${dataLabel(language, 9)} ${dataLabel(language, 9 + getWeekdayRecurrence(myStartDate))} ${localizedDays[getDay(myStartDate) === 0 ? 6 : getDay(myStartDate) - 1]} di ${ months[myStartDate.getMonth()].label } `);
  }, [myStartDate, myEndDate]);


  return (
    <View style={styles.modalContainer}>



      {/* MODAL */}
      <View style={styles.modalContainer} >
        {/* TITOLO MODAL */}
        <Text style={styles.listTitle}>
          {initialIndex !== null ? dataLabel(language, 19) : dataLabel(language, 0)}
          </Text>

        {/* ERRORE <-- IN ARRIVO DAL CHIAMANTE */}
        {isError && <Text style={styles.errorMsg}>{errorMsg}</Text>}

        {/* INPUT TEXT  */}
        <TextInput
          key={'description'}
          style={styles.textInput}
          placeholder={dataLabel(language, 7)}
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
              onPress={ () => {                   // CHIAMANTE = 'startDate'  
                setDatepickerCaller('startDate'); // PASSA AL DATEPICKER IL CHIAMANTE
                setSelectedDate(myStartDate);     // PASSA AL DATEPICKER LA DATA DA VISUALIZZARE
                myEndDate ? setMaxDate( subDays(myEndDate, 1) ) : setMaxDate(null); // SE ESISTE UNA endDate SI PASSA IL maxDate
                setMinDate(null); // NESSUN VINCOLO ALL'INDIETRO NEL CALENDARIO
                setDatepickerVisible(true);       // APRE IL DATEPICKER
              }}
              style={styles.dateFrom}>
              <Text key='fromDate' style={styles.dateFromText}>{myStartDate.toLocaleDateString()}</Text>{IcoCalendar}
            </TouchableOpacity>
            {/* DROPDOWN DURATA */}
            <View style={{width:'48%'}}>
              <Dropdown
                style={styles.dropdownStyle}
                placeholder={!isFocus ? 'Select' : '...'}
                placeholderStyle={styles.dropdownPlaceholderStyle}
                selectedTextStyle={styles.dropdownSelectedTextStyle}
                data={data}
                labelField="label"
                valueField="value"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={ (item) => {
                   
                  let v: number = item.value;
                  switch (v) {
                    case 1:
                      setToDate(false);   // NASCONDE endDate
                      setValue(v);        // SPOSTA DROPDOWN
                      setMyEndDate(null); // AZZERA endDate ALTRIMENTI VIENE INTERPRETATO COME PERIODO
                      setMaxDate(null); 
                      break;
                    case 2:
                      setMyEndDate( addDays(myStartDate, 1) );
                      setToDate(true);
                      //setValue(v);      // SPOSTA DROPDOWN
                      break;
                    case 3:
                      setMyEndDate( addDays(myStartDate, 2) );
                      setToDate(true);
                      //setValue(v);      // SPOSTA DROPDOWN
                      break;
                    default:
                      setMyEndDate( myStartDate );
                      setToDate(true);
                      setValue(v);      // SPOSTA DROPDOWN
                    return;
                  }
                }               
                //search
                //maxHeight={300}
                //searchPlaceholder="Search..."
                //renderLeftIcon={() => null }
              } />
            </View>
          </View>
          {/* ROW 2 - A */}
          {toDate && <View style={styles.dateContainerRow}>
            {/* TO */}
            <TouchableOpacity 
              style={styles.dateFrom}
              onPress={ () => {                       // CHIAMANTE = 'endDate'
                setDatepickerCaller('endDate');       // PASSA AL DATEPICKER IL CHIAMANTE
                setSelectedDate(myEndDate);           // PASSA AL DATEPICKER LA DATA DA VISUALIZZARE
                setMinDate(addDays(myStartDate, 1));  // imposta data min al giorno succesivo alla startDate
                setMaxDate(null);                     // NESSUN VINCOLO IN AVANTI NEL CALENDARIO
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
                  //setRotateArrow('180deg'); // SI RUOTA LA FRECCIA
                  setUpperRadioButtonActive(true) // E SI IMPOSTA true IL PRIMO
                } else {
                  setRadioButton(false) // ALTRIMENTI SI SPEGNE IL GRUPPO
                  //setRotateArrow('0deg');
                  setUpperRadioButtonActive(false)  // E SI RIPORTANO A false I DUE RADIOBUTTON
                  setLowerRadioButtonActive(false)
                }
              }}
              >
              {IcoRepeat}<Text 
              style={[styles.repeatText, 
                !radioButton && {color: '#333333'}
              ]}>
                {dataLabel(language, 8)}
                </Text>{IcoArrow}

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
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={ () => onCancel() }>
              <Text style={styles.cancelButtonText}>{dataLabel(language, 5)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={ () => 
              myDescription ?
                onConfirm(
                  createUTCDate(myStartDate), 
                  myEndDate && createUTCDate(myEndDate), 
                  myDescription, 
                  upperRadioButtonActive, 
                  lowerRadioButtonActive) 
              :
                setDescriptionAlert(true)
              }>
              <Text style={styles.addButtonText}>
                {initialIndex !== null ? dataLabel(language, 18) : dataLabel(language, 6)}
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* DATEPICKER - GRIGLIA CALENDARIO */}
      {datepickerVisible && 
        <View style={styles.datepickerContainer}>

          <DateTimePicker
            mode="single"
            calendar="gregory"
            date={selectedDate}
            maxDate={maxDate}
            minDate={minDate}
            onChange={({date}) => {

              // VARIABILE DI SERVIZIO
              let d: Date | null = createUTCDate(date);

              // console.log(`- - caller: ${datepickerCaller}`);
              // console.log(`- - selectedDate: ${createUTCDate(date)?.toLocaleDateString()}`);
              // console.log(`- - myStartDate: ${myStartDate.toLocaleDateString()}`);
              // console.log(`- - myEndDate: ${myEndDate?.toLocaleDateString()}`);
              // console.log(`- - maxDate: ${maxDate?.toLocaleDateString()}`);
              // console.log(`- - minDate: ${minDate?.toLocaleDateString()}`);

              if (datepickerCaller === 'startDate') { 
                setMyStartDate(d); 
              } else { 
                setMyEndDate(d); 
              }; 
              
              setSelectedDate(d); // AGGIORNA DATA NEL FILED
              // setMaxDate(null); // RESETTA maxdate
              // setMinDate(null);
              }
            }
            containerHeight={220}
            hideWeekdays={false}
            disableMonthPicker={false}
            disableYearPicker={false}
            showOutsideDays={false}          
            firstDayOfWeek={1}
            //timeZone={'UTC'}
            locale={language}
            style={{
            // backgroundColor: 'transparent',
            // borderWidth:1,
            // paddingTop: 24
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
          
          <View style={{width: '100%', height:1, backgroundColor:'#dedede', marginBottom: 24}} />
          
          <View style={[styles.modalButtons, {marginTop:0}]}>
            {/* CHIUDE CALENDARIO */}
            <TouchableOpacity 
              //style={[styles.cancelButton, {borderWidth:1}]} 
              onPress={ () => 
                setDatepickerVisible(false) // CHIUDE IL DATEPICKER E LASCIA INVARIATO
              }>
              {/*<Text style={styles.cancelButtonText}>{dataLabel(language, 16]}</Text>*/}
              <IconSymbol size={24} name="xmark" color={'#969696'} style={{marginLeft:0}} />
            </TouchableOpacity>
            {/* CONFERMA CALENDARIO */}
            <TouchableOpacity 
              onPress={ () => {
                datepickerCaller === 'startDate' ? // AGGIORNA LA VARIABILE CHIAMANTE
                  setMyStartDate(selectedDate) 
                  : 
                  setMyEndDate(selectedDate); 
                setDatepickerVisible(false) // CHIUDE IL DATEPICKER
              }}>
              <IconSymbol size={24} name="checkmark" color={'#0088ff'} style={{marginRight:0}} />
            </TouchableOpacity>
          </View>

        </View>
      }
      
    </View>
  );
}

export default NewDatepicker;

