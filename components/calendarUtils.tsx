console.log('<CALENDARUTILS>');
//import { useMemo } from 'react';
import { addDays, } from 'date-fns';
// import { PREFERENCES } from '@/app/(tabs)/preferences';
import useLocalizationData, { getLocalHolydas } from '@/app/data/data';
import { getLocales,  } from 'expo-localization';
// import { Platform } from 'react-native';
//import { da } from 'date-fns/locale'; // importa il Danese???
import { dataLabel } from '@/components/dataLabel';
import  checkPersonalHolydays  from '@/components/checkPersonalHolydays';

// TYPE Holiday (VECCHIO)
interface Holiday {
    day: number;
    month: number;
    yyyy?: number; // OPZIONALE
    description: string;
    }

// TYPE NewHoliday (NUOVO)
type NewHolyday = {
  startDate: Date;
  endDate: Date | null;
  description: string;
  repeatOnDate: boolean;
  repeatOnDay: boolean;
};

// CARICA LE FESTIVITA' LOCALI DAL FILE .data
const { localHolydas: countryHolydays } = useLocalizationData();

// CARICA IL LINGUAGGIO
const myLanguage = (getLocales()[0].languageTag).slice(0,2);

/* ============================================================================= 
    CREA UNA DATA A MEZZOGIORNO UTC ( su base YYYY MM GG)
============================================================================= */ 
const createUTCDate = (year: Number, month: Number, day: Number) => {
    const date = new Date(Date.UTC(Number(year), Number(month), Number(day), 12, 0, 0, 0)); // 12:00 UTC
    return date;
};

/* ============================================================================= 
    NUMERO DEI GIORNI DI UN MESE IN UN CERTO ANNO

    *** si può sostituire (con modifiche) con: date-fns --> getDaysInMonth
============================================================================= */
const getDaysInMonth = (year: number, month: number) => {
    return createUTCDate(year, month + 1, 0).getUTCDate(); 
};

/* ============================================================================= 
    CALCOLA GIORNO DELLA SETTIMANA PER UNA DTERMINATA DATA

    *** si può sostituire con: date-fns --> getDay
============================================================================= */
const getUTCDayOfWeek = (date: Date) => {
    return date.getUTCDay();
};

/* ============================================================================= 
    ARRAY CON LE FESTIVITA' NAZIONALI + PASQUA + LUNEDI DELL'ANGELO
    + FESTIVITA PERSONALI + PERIODI DI VACANZA
============================================================================= */
const getCountryNationalHolidays = (
    myCountry: string,
    year: number,
    newPersonalHolydays: NewHolyday[],
    myPreferences,
    nationalExcluded 
    ) => {   

    console.log('\t\t[GETCOUNTRYNATIONALHOLYDAYS]');
    //console.log('\t- - nationalExcluded:', JSON.stringify(nationalExcluded));

    // ARRAY DOVE SONO SALVATI I DATI
    const holidays = [];
    
    // SE SWITCH Festivita Nazionali = true AGGIUNGO LE FESTIVITA LOCALI DEL PAESE
    // ** VALIDE PER TUTTI GLI ANNI ** QUINDI yyy = undefined
    if (myPreferences.festivitaNazionali.status) {
        // opzione 1) AGGIUNGE TUTTE LE FESTIVITA SENZA FILTRI
        //holidays.push(...getLocalHolydas(myCountry)); // funzione per le nazionali

        // opzione 2) ELIMINA LE FESTIVITA NAZIONALI DISATTIVATE
        // Rimuove da tempLocalHolydays tutti gli item il cui indice è presente in nationalExcluded
        let tempLocalHolydays: Holiday[] = [...getLocalHolydas(myCountry)];
        tempLocalHolydays = tempLocalHolydays.filter((_, idx) => 
            !nationalExcluded.includes(idx)
            );

        holidays.push(...tempLocalHolydays);
        }

    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + +

    REFACTORING > ok

    + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

    if (myPreferences.festivitaPersonali.status) {
        const tempNewPersonalHolydays = checkPersonalHolydays(newPersonalHolydays, year);
        holidays.push(...tempNewPersonalHolydays);
        }
    /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
    + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

    // CALCOLO PASQUA
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const g = Math.floor((8 * b + 13) / 25);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const monthOfEaster = Math.floor((h + l - 7 * m + 114) / 31); // Mese di Pasqua (1-12)
    const dayOfEaster = ((h + l - 7 * m + 114) % 31) + 1;         // Giorno di Pasqua
    
    // AGGIUNGO PASQUA A holidays SE SWITCH pasqua=true
    myPreferences.pasqua.status && holidays.push({ 
        day: dayOfEaster, 
        month: monthOfEaster - 1, 
        description: dataLabel(myLanguage,0) 
    });

    // CREO VARIABILE TIPO Data PER I CALCOLI CHE SEGUONO
    let currentPasqua = createUTCDate(year, monthOfEaster - 1, dayOfEaster);

    // AGGIUNGO LUNEDI DELL'ANGELO A holidays SE LO SWITCH =true
    if (myPreferences.lunediDellAngelo.status === true) {
        const easterMonday = addDays(currentPasqua, 1);    
        holidays.push({ 
            day: easterMonday.getUTCDate(), 
            month: easterMonday.getUTCMonth(), 
            description: dataLabel(myLanguage,1) });
    }

    // ASCENSIONE (39 giorni dopo Pasqua)
    if (myPreferences.ascensione.status === true) {
        const ascensione = addDays(currentPasqua, 39);
        holidays.push({ 
            day: ascensione.getUTCDate(), 
            month: ascensione.getUTCMonth(), 
            description: dataLabel(myLanguage,2) 
        });
    }

    // PENTECOSTE (49 giorni dopo Pasqua)
    if (myPreferences.pentecoste.status === true) {
        const pentecoste = addDays(currentPasqua, 49);
        holidays.push({ 
            day: pentecoste.getUTCDate(), 
            month: pentecoste.getUTCMonth(), 
            description: dataLabel(myLanguage,3) 
        });
    }

    // LUNEDI DI PENTECOSTE (50 giorni dopo Pasqua)
    if (myPreferences.lunediPentecoste.status === true) {
        const lunediPentecoste = addDays(currentPasqua, 50);
        holidays.push({ 
            day: lunediPentecoste.getUTCDate(), 
            month: lunediPentecoste.getUTCMonth(), 
            description: dataLabel(myLanguage,4) 
        });
    }

    // CORPUS DOMINI (60 giorni dopo Pasqua)
    if (myPreferences.corpusDomini.status === true) {
        const corpusDomini = addDays(currentPasqua, 60);
        holidays.push({ 
            day: corpusDomini.getUTCDate(), 
            month: corpusDomini.getUTCMonth(), 
            description: dataLabel(myLanguage,5)
        });
    }

    // RESTITUISCE ARRAY ORDINATO CRESCENTE
    holidays.sort((a, b) => {
        if (a.month !== b.month) {
            return a.month - b.month;
        }
        return a.day - b.day;
    });

    // console.log('- - script terminato');
    //console.log('- - holydays: ', holidays);
   
    return holidays;
};

/* ============================================================================= 
CALCOLO DEL CALENDARIO
============================================================================== */
const getDayType = (
    date: Date, 
    holidays: { day: number; month: number; description: string }[],
    myPreferences
    ) => {

    const dayOfWeek = getUTCDayOfWeek(date); // 0 = Domenica, 6 = Sabato

    // 1) CONTROLLO: FESTIVITA NAZIONALE/PERSONALE/LOCALE/PASQUA?
    let foundHoliday: { day: number; month: number; description: string } | undefined = undefined; 

    // Controlla sempre le festività personali e locali se gli switch sono attivi
    if (myPreferences.festivitaPersonali.status || myPreferences.festivitaLocali.status || myPreferences.festivitaNazionali.status || myPreferences.feriePersonali.status) {
        foundHoliday = holidays.find(
            (holiday) => holiday.day === date.getUTCDate() && holiday.month === date.getUTCMonth()
        );
    }
    if (foundHoliday) {
        return { value: 1, type: foundHoliday.description };
    }

    // 2) GIORNI DELLA SETTIMANA FESTIVI IMPOSTATI IN PREFERENZE?
    if (dayOfWeek === 0 && myPreferences.domenica.status) { return { value: 1, type: undefined }; }
    if (dayOfWeek === 6 && myPreferences.sabato.status)   { return { value: 1, type: undefined }; }      
    if (dayOfWeek === 5 && myPreferences.venerdi.status)  { return { value: 1, type: undefined }; }
    if (dayOfWeek === 4 && myPreferences.giovedi.status)  { return { value: 1, type: undefined }; }
    if (dayOfWeek === 3 && myPreferences.mercoledi.status) {return { value: 1, type: undefined }; }
    if (dayOfWeek === 2 && myPreferences.martedi.status)  { return { value: 1, type: undefined }; } 
    if (dayOfWeek === 1 && myPreferences.lunedi.status)   { return { value: 1, type: undefined }; }

    // 3) SE NESSUNO DI QUESTI ALLORA --> GIORNO FERIALE
    return { value: undefined, type: undefined };
};

/* ============================================================================= 
CONTEGGIO DEI PONTI. // CONTEGGIA TUTTI I PONTI ALL'INTERNO DI CIASCUNA CARD E LI AGGIUNGE IN FONDO ALL'ARRAY 'grid'
============================================================================== */
const countBridges = (monthTable: any[]) => {
    const bridges: Array<{ da: Date; a: Date; length: number }> = [];
    let currentBridge: { start: Date; days: Date[] } | null = null;
    // Filtra solo i giorni che appartengono al mese corrente (isCurrentMonth === true)
    const currentMonthDays = monthTable.filter(day => day[3] === true);
    const sortedDays = [...currentMonthDays].sort((a, b) => a[0].getTime() - b[0].getTime());

    sortedDays.forEach((day) => {
        const [date, type] = day;
        if (type === -1) { // PONTE
            if (!currentBridge) {
                currentBridge = {
                    start: new Date(date),
                    days: [new Date(date)]
                };
            } else {
                const lastBridgeDay = currentBridge.days[currentBridge.days.length - 1];
                const nextDay = new Date(lastBridgeDay);
                nextDay.setDate(nextDay.getDate() + 1);
                if (date.getTime() === nextDay.getTime()) {
                    currentBridge.days.push(new Date(date));
                } else {
                    bridges.push({
                        da: currentBridge.start,
                        a: currentBridge.days[currentBridge.days.length - 1],
                        length: currentBridge.days.length
                    });
                    currentBridge = {
                        start: new Date(date),
                        days: [new Date(date)]
                    };
                }
            }
        } else {
            if (currentBridge) {
                bridges.push({
                    da: currentBridge.start,
                    a: currentBridge.days[currentBridge.days.length - 1],
                    length: currentBridge.days.length
                });
                currentBridge = null;
            }
        }
    });

    if (currentBridge) {
        bridges.push({
            da: currentBridge.start,
            a: currentBridge.days[currentBridge.days.length - 1],
            length: currentBridge.days.length
        });
    }

    return bridges;
};

/* ============================================================================= 
    CREAZIONE ARRAY CON LA GRIGLIA DEI GIORNI - createCalendarGrid

    per ogni mese si crea un array 'grid' così strutturato:
    [{
        "y":2025, // ANNO
        "m":8, // MESE
        "table":[..., ..., ...] // TABELLA GIORNI
        "bridges": [{0: da, a, length}, {1: da, a, length}, ...]
            },
        {...},
        {...}]
============================================================================= */
const createCalendarGrid = (
        startDate: Date, 
        monthsTotal: number, 
        bridgeLength: number, 
        newPersonalHolydays: NewHolyday[],
        myCountry: string, 
        myPreferences,
        nationalExcluded: number[],
    ) => {
    console.log('\t[CREATECALENDARGRID]');
    //console.log(`prop ricevuto -> nationalExcluded: ${JSON.stringify(nationalExcluded)}`);
   
    // AZZERO L'ARRAY CHE CONTERRA' LA GRIGLIA
    const grid = [];
    const initialYear = startDate.getUTCFullYear();
    const initialMonth = startDate.getUTCMonth();

    // Cache per le festività per anno - evita ricalcoli
    const holidaysByYear: { [year: number]: Holiday[] } = {};
    
    const getHolidaysForYear = (year: number) => {
        if (!holidaysByYear[year]) {
            holidaysByYear[year] = getCountryNationalHolidays(
                                        myCountry, 
                                        year, 
                                        newPersonalHolydays, 
                                        myPreferences,
                                        nationalExcluded,
                                        );
            }
        return holidaysByYear[year];
    };

    for (let i = 0; i < monthsTotal; i++) {
        const currentMonthFirstDay = createUTCDate(initialYear, initialMonth + i, 1);
        const year = currentMonthFirstDay.getUTCFullYear();
        const month = currentMonthFirstDay.getUTCMonth();

        // Ottieni le festività solo per l'anno corrente del mese
        const currentYearHolidays = getHolidaysForYear(year);
        
        // Per i giorni del mese precedente/successivo, potrebbe servire anche l'anno adiacente
        const prevYear = year - 1;
        const nextYear = year + 1;
        const prevYearHolidays = getHolidaysForYear(prevYear);
        const nextYearHolidays = getHolidaysForYear(nextYear);

        const monthData = {
            y: year,        // anno
            m: month + 1,   // mese -> (+1) 
            table: [],      // array coi giorni
            bridges: []
        };

        // calcola il primo giorno della settimana del mese corrente
        const dayOfWeekOfFirstDay = getUTCDayOfWeek(currentMonthFirstDay); // 0 (Dom) a 6 (Sab)

        // calcola quanti giorni del mese precedente servono per riempire l'inizio della PRIMA settimana
        const daysFromPrevMonth = (dayOfWeekOfFirstDay === 0) ? 6 : dayOfWeekOfFirstDay - 1;

        const prevMonthLastDay = createUTCDate(year, month, 0);
        const prevMonthYear = prevMonthLastDay.getUTCFullYear();
        const prevMonth = prevMonthLastDay.getUTCMonth();
        const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

        for (let j = daysFromPrevMonth - 1; j >= 0; j--) {
            const dateToAdd: Date = createUTCDate(prevMonthYear, prevMonth, daysInPrevMonth - j);
            const dateYear = dateToAdd.getUTCFullYear();
            const holidaysToUse = dateYear === year ? currentYearHolidays : 
                                 dateYear === prevYear ? prevYearHolidays : 
                                 getHolidaysForYear(dateYear);
            const { value, type } = getDayType(dateToAdd, holidaysToUse, myPreferences);
            monthData.table.push([dateToAdd, value, type, false]);
        }

        // Giorni del mese corrente
        const daysInCurrentMonth = getDaysInMonth(year, month);
        for (let j = 1; j <= daysInCurrentMonth; j++) {
            const dateToAdd = createUTCDate(year, month, j);
            const { value, type } = getDayType(dateToAdd, currentYearHolidays, myPreferences);
            monthData.table.push([dateToAdd, value, type, true]);
        }

        // Giorni del mese successivo
        let dayOfNextMonth = 1;
        while (monthData.table.length < 42) {
            const dateToAdd = createUTCDate(year, month + 1, dayOfNextMonth);
            const dateYear = dateToAdd.getUTCFullYear();
            const holidaysToUse = dateYear === year ? currentYearHolidays : 
                                 dateYear === nextYear ? nextYearHolidays : 
                                 getHolidaysForYear(dateYear);
            const { value, type } = getDayType(dateToAdd, holidaysToUse, myPreferences);
            monthData.table.push([dateToAdd, value, type, false]);
            dayOfNextMonth++;
        }

        // CALCOLO PONTI
        // scorro l'intera table per identificare i ponti
        for (let k = 0; k < monthData.table.length; k++) {
            const [, currentValue] = monthData.table[k]; 
            // NB. LA VIRGOLA SIGNIFICA CHE SI PARTE DAL SECONDO ELEMENTO DELL'ARRAY 

            // giorno feriale (= undefined)
            if (currentValue === undefined) {
                let isPotentialBridge = false;

                // controlla il giorno precedente: deve essere festivo o weekend
                const prevDayIndex = k - 1;
                if (prevDayIndex >= 0) {
                    const [, prevValue] = monthData.table[prevDayIndex];
                    if (prevValue === 1 || prevValue === 2 || prevValue === 3) {
                        isPotentialBridge = true;
                    }
                }

                if (isPotentialBridge) {
                    let daysInBetween = 0;
                    let foundNextHoliday = false;
                    let bridgeDaysIndices = []; 
                    // memorizza gli indici dei giorni che formano il ponte

                    // conta dal giorno corrente (k) fino a `bridgeLength` giorni avanti
                    for (let b = 0; b < bridgeLength + 1 ; b++) {
                        const checkIndex = k + b;
                        if (checkIndex < monthData.table.length) {
                            const [, checkValue] = monthData.table[checkIndex];
                            if (checkValue === undefined) { // È un giorno feriale (potenziale giorno di ponte)
                                daysInBetween++;
                                bridgeDaysIndices.push(checkIndex);
                                if (daysInBetween > bridgeLength) { // Troppi giorni, non è un ponte valido
                                    break;
                                }
                            } else if (checkValue === 1 || checkValue === 2 || checkValue === 3) { // festivo/weekend
                                foundNextHoliday = true;
                                break;
                            } else { // giorno già marcato (es. un altro ponte o giorno speciale)
                                break;
                            }
                        } else { // fine della griglia
                            break;
                        }
                    }

                    // ee il gg successivo è festivo e la lunghezza del ponte è valida
                    if (foundNextHoliday && daysInBetween > 0 && daysInBetween <= bridgeLength) {
                        
                        // marca TUTTI i giorni identificati come parte del ponte
                        bridgeDaysIndices.forEach( idx => {
                            // controlla che il giorno non sia già stato marcato come festività, sabato o domenica
                            if (monthData.table[idx][1] === undefined) {
                                // ponte
                                monthData.table[idx][1] = -1 ; 
                                monthData.table[idx][2] = '_'; //dataLabel[6]; // basta che la cell[2] non sia vuota
                            }
                        });
                    }
                }
            }
        }
        // CHIAMO LA FUNZIONE CHE CONTEGGIA I PONTI E LA AGGIUNGO ALL'ARRAY monthData
        monthData.bridges = [...countBridges(monthData.table)];
        grid.push(monthData);
    }
    //console.log('\n\nGRID\n', JSON.stringify(grid));
    return grid;
};

export {
    createCalendarGrid, createUTCDate
};

