import { calendarScrenLabels as dataLabel } from '@/constants/dataLabel'; // LABEL LOCALIZZATE
import { useHolydays } from '@/context/HolydaysContext';
import { isWithinInterval } from "date-fns";

/* ==================================================================

MAIN - useShareMsgComposer

================================================================== */
// Questo hook restituisce una funzione per comporre i messaggi di condivisione.
// Chiama useHolydays al livello superiore per rispettare le regole degli hooks.
export default function useShareMsgComposer() {
  // VALORI PASSATI DAL CONTEXT (chiamato al top level del hook)
  const {
    newPersonalHolydays,
    myLanguage,
    sniffer,
  } = useHolydays();

  // Restituisce la funzione che compone il messaggio
  const composeMessage = (type: string, id: any): string => {

    let msg = '';
    let link = sniffer || 'https://pontivia.blogspot.com/p/redirect.html?action=newItemFromExternal';
    //  let link = `${sniffer || 'https://pontivia-2025.web.app/detect.html?action=newItemFromExternal'}`;

    if (type === 'holyday') {
      // ////////////////////////////
      // TIPO: FESTIVITA' (1+ GIORNI)
      // ////////////////////////////
      msg = `${dataLabel(myLanguage, 12)}\n\n`;    // Vorrei condividere con te. \n\n

      msg += `*${id[2]}*\n`; // nome evento

      // Check: cerca se quella data esiste in newPersonalHolydays:
      const isPersonalHolyday = newPersonalHolydays.some((item: any, index: number) => {
        // la description è presente in myPersonalHolydays?
        if (id[2] === item.description) {
          // SI (la data esiste in myPersonalHolydays)

          // il record in myPersonalHolydays ha anche una endDate?
          if (newPersonalHolydays[index].endDate === null) {
            // [ NO = quindi evento di 1 giorno]
            // controllo di conferma: data del giorno premuto = data dell'evento sull'array?
            if (id[0].getTime() === newPersonalHolydays[index].startDate.getTime()) {
              // si aggiunge al msg la data in formato human-readable
              msg += newPersonalHolydays[index].startDate.toLocaleDateString(myLanguage, { day: 'numeric', month: 'long', year: 'numeric' });
              // si forma la seconda parte del link
              link += `&pStartDate=${id[0].getFullYear()}-${id[0].getMonth() + 1}-${id[0].getDate()}`;
              // trattandosi di evento inserito dall'utente
              // si aggiungono al link anche: description, pRODate e pRODay
              link += `&pDescription=${newPersonalHolydays[index].description?.replace(/ /g, "%20")}`;
              if (newPersonalHolydays[index].repeatOnDate) link += '&pRODate=true'
              if (newPersonalHolydays[index].repeatOnDay) link += '&pRODay=true'
              return true;
            };
          } else {
            // [ SI = quindi la data appartiene a un evento di più giorni]
            // controllo di conferma: data giorno premuto compresa tra startDate e endDate?
            if (isWithinInterval(new Date(id[0]), { start: newPersonalHolydays[index].startDate, end: newPersonalHolydays[index].endDate })) {
              // si aggiunge al msg la doppia data in formato human readable
              msg += newPersonalHolydays[index].startDate.toLocaleDateString(myLanguage, { day: 'numeric', month: 'long', year: 'numeric' });
              msg += ' - ';
              msg += newPersonalHolydays[index].endDate.toLocaleDateString(myLanguage, { day: 'numeric', month: 'long', year: 'numeric' });
              // idem, si forma il link con la doppia data
              link += `&pStartDate=${newPersonalHolydays[index].startDate.getFullYear()}-${newPersonalHolydays[index].startDate.getMonth() + 1}-${newPersonalHolydays[index].startDate.getDate()}`;
              link += `&pEndDate=${newPersonalHolydays[index].endDate.getFullYear()}-${newPersonalHolydays[index].endDate.getMonth() + 1}-${newPersonalHolydays[index].endDate.getDate()}`;
              // trattandosi di evento inserito dall'utente
              // si aggiungono al link anchei description, pRODate e pRODay
              link += `&pDescription=${newPersonalHolydays[index].description?.replace(/ /g, "%20")}`;
              if (newPersonalHolydays[index].repeatOnDate) link += '&pRODate=true'
              if (newPersonalHolydays[index].repeatOnDay) link += '&pRODay=true'
              return true;
            };
          }
        }
      });

      // se la data NON è inserita dall'utente
      // si aggiunge al msg la data della probabile festivita nazionale in formato human-readable
      if (!isPersonalHolyday) {
        msg += id[0].toLocaleDateString(myLanguage, { day: 'numeric', month: 'long', year: 'numeric' }) + "\n\n";
      }
      // se la data è inserita dall'utente si aggiunge il link
      if (isPersonalHolyday) {
        msg += `\n\n${dataLabel(myLanguage, 14)}` + link; // (aggiungi evento al tuo calendario: 
      }
    } else {
      // /////////////////////////
      // TIPO: POSSIBILE PONTE
      // /////////////////////////
      // MESSAGGIO: solo segnalazione ponte, niente link per inserire le date
      msg += `${dataLabel(myLanguage, 12)}\n\n`;      // Vorrei condividere con te. \n\n
      msg += `*${dataLabel(myLanguage, 9)}*\n`;       // Descrizione\n
      msg += `_${id[0].toLocaleDateString(myLanguage, { day: 'numeric', month: 'long', year: 'numeric' })}_\n\n`;
    }

    // COPYRIGHT
    msg += `\n\n${new Date().getFullYear()} © PontiVIA!`; // 2025 PontiVIA!

    return msg;
  };

  return composeMessage;
}