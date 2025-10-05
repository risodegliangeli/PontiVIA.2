console.log('[CHECKPERSONALHOLYDAYS.TSX]');
import { addDays, getDay, differenceInDays, startOfMonth } from 'date-fns';

// new --> INTERFACCIA DI NewHolyday ***
interface NewHolyday {
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  repeatOnDate: boolean;  // RIPETE OGNI ANNO, IL 25 settembre 
  repeatOnDay: boolean;   // RIPETE OGNI ANNO, il primo martedì di settembre
}

/* CALCOLA LA RICORRENZA DI UNA DATA ALL'INTERNO DEL MESE */
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

/* TROVA IL GIORNO DEL MESE (es 'secondo martedì di luglio') */
function findNthDayOfWeek(year, month, dayOfWeek, nTh) {
const date = new Date(year, month - 1, 1);
let daysUntilFirst = (dayOfWeek - date.getDay() + 7) % 7;
date.setDate(1 + daysUntilFirst);
const daysToAddForNth = (nTh - 1) * 7;
date.setDate(date.getDate() + daysToAddForNth);
return date;
}

/* ================================================================

                            MAIN

================================================================ */
export default function checkPersonalHolydays (holydaysList:any[], year: number) {

    // SI DICHIARA NUOVO ARRAY CONTENITORE
    const userPersonalHolydays: Holiday[] = [];

    // FUNZIONE DI SCRITTURA SU ARRAY
    const appendItem = (itemDate, itemMonth, itemDescription) => {            
        userPersonalHolydays.push(
                {
                day: itemDate,
                month: itemMonth,
                description: itemDescription
                })
    }

    // LOOP DI TUTTE LE DATE CARICATE DALL'UTENTE
    holydaysList.map( (item, counter: number) => {

        // VARIABILI DI SERVIZIO
        //let isSingleDay = item.endDate === null;
        let isRepeatingOnDate: boolean = item.repeatOnDate;
        let isRepeatingOnDay: boolean = item.repeatOnDay
        let isRepeating: boolean = isRepeatingOnDay || isRepeatingOnDate;
        let itemDate: number = new Date(item.startDate).getDate();
        let itemMonth: number = new Date(item.startDate).getMonth();
        let itemYear: number = new Date(item.startDate).getFullYear();
        let itemLength: number = 0;
            if (item.endDate !== null) itemLength = differenceInDays(item.endDate, item.startDate);
        let currentYear: number = year; 
        
        // INIZIO CALCOLO ===================================
        if (!isRepeating) {
        // SE SI TRATTA DI EVENTO UNICO, NON RICORRENTE, ALLORA...
            
            for (let x=0; x<=itemLength; x++) {// LOOP SE EVENTO DI PIU' GIORNI
            let updatedDay: Date = addDays(item.startDate, x)

                // PER OGNI GIORNO CALCOLATO SI CONTROLLA SE ANNO = ANNO CORRENTE
                if (updatedDay.getFullYear() === currentYear) {
                appendItem(
                    updatedDay.getDate(), 
                    updatedDay.getMonth(), 
                    item.description
                )
                }

            }

        } else {
        // SE INVECE E' UN GIORNO RICORRENTE:

        if (isRepeatingOnDate) {
            // RIPETE OGNI ANNO PER DATA? SI AGGIUNGE SUBITO ALL' ARRAY
            
            for (let x=0; x<=itemLength; x++) {// LOOP SE EVENTO DI PIU' GIORNI
            let updatedDay: Date = addDays(item.startDate, x)
                appendItem(
                updatedDay.getDate(), 
                updatedDay.getMonth(), 
                item.description
                )
            }

        } else {
            // RIPETE OGNI ANNO PER ENNESIMO GIORNO DEL MESE?
            if (itemYear === currentYear) {
            // SE ANNO E' LO STESSO: SI AGGIUNGE ALL'ARRAY SENZA NESSUN CALCOLO
            
            for (let x=0; x<=itemLength; x++) {// LOOP SE EVENTO DI PIU' GIORNI
                let updatedDay: Date = addDays(item.startDate, x)
                appendItem(
                updatedDay.getDate(), 
                updatedDay.getMonth(), 
                item.description
                )
            }

            } else {
            // SE L'ANNO E' DIFFERENTE DATA DATA CARICATA, ALLORA SI EFFETTUANO CALCOLI
            // si scompone item --> si ottiene riccorenza e giorno della settimana
            let nth = getWeekdayRecurrence(item.startDate); // ennesima (nth) ricorrenza
            let dow = getDay(item.startDate);               // giorno della settimana

            // si calcola la ricorrenza nello stesso mese dell'anno in esame
            let calculatedDate = findNthDayOfWeek(currentYear, itemMonth + 1, dow, nth);

            // quindi si aggiunge la data calcolata all'array
            // LOOP SE EVENTO DI PIU' GIORNI
            for (let x=0; x<=itemLength; x++) {
                let updatedDay: Date = addDays(calculatedDate, x)
                appendItem(
                    updatedDay.getDate(), 
                    updatedDay.getMonth(), 
                    item.description
                )
            }
            }
        }
        }
    })
    return userPersonalHolydays;
}
