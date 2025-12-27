// console.log('[DATA.TSX]');
import { getLocales, } from 'expo-localization';

/* ============================================================================= 
    NOME DEI MESI
    ============================================================================= */
export const getMonth = (country: string, id: number): string => {
  let month = new Date(1970, id, 1).toLocaleString(country, { month: "long" });
  return month;
}

/* ============================================================================= 
    NOMI DEI GIORNI
    ============================================================================= */
export const getLocalizedWeekdays = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  return [...Array(7).keys()].map((dayIndex) => {
    const date = new Date(Date.UTC(2024, 0, 1 + dayIndex));
    return formatter.format(date);
  });
}

/* ============================================================================= 
  GIORNI FESTIVI PER NAZIONE
  ============================================================================= */
export const getLocalHolydas = (country: string) => {
  switch (country) {
    case "de-AT":
      return [
        { day: 1, month: 0, description: "Neujahrstag" },
        { day: 6, month: 0, description: "Heilige Drei Könige" },
        { day: 1, month: 4, description: "Staatsfeiertag" },
        { day: 15, month: 7, description: "Mariä Himmelfahrt" },
        { day: 26, month: 9, description: "Nationalfeiertag" },
        { day: 1, month: 10, description: "Allerheiligen" },
        { day: 8, month: 11, description: "Mariä Empfängnis" },
        { day: 25, month: 11, description: "Christtag" },
        { day: 26, month: 11, description: "Stefanitag" }
      ];
    case "ch-CH":
      return [
        { day: 1, month: 0, description: "Capodanno" },
        { day: 2, month: 0, description: "Giorno di Berchtold" },
        { day: 1, month: 7, description: "Festa Nazionale Svizzera" },
        { day: 25, month: 11, description: "Natale" },
        { day: 26, month: 11, description: "Santo Stefano" }
      ];
    case "be-BE":
      return [
        { day: 1, month: 0, description: "Nouvel An / Nieuwjaar" },
        { day: 1, month: 4, description: "Fête du Travail / Dag van de Arbeid" },
        { day: 21, month: 6, description: "Fête Nationale / Nationale Feestdag" },
        { day: 15, month: 7, description: "Assomption / Onze-Lieve-Vrouw-Hemelvaart" },
        { day: 1, month: 10, description: "Toussaint / Allerheiligen" },
        { day: 11, month: 10, description: "Armistice / Wapenstilstand" },
        { day: 25, month: 11, description: "Noël / Kerstmis" }
      ];
    case "en-GB":
      return [
        { day: 1, month: 0, description: "New Year's Day" },
        { day: 2, month: 0, description: "New Year's Day (Scotland)" },
        { day: 25, month: 7, description: "Summer Bank Holiday" },
        { day: 25, month: 11, description: "Christmas Day" },
        { day: 26, month: 11, description: "Boxing Day" }
      ];
    case "en-IE":
      return [
        { day: 1, month: 0, description: "New Year's Day" },
        { day: 17, month: 2, description: "St. Patrick's Day" },
        { day: 25, month: 11, description: "Christmas Day" },
        { day: 26, month: 11, description: "Boxing Day" }
      ];
    case "fr-FR":
      return [
        { day: 1, month: 0, description: "Jour de l'An" },
        { day: 1, month: 4, description: "Fête du Travail" },
        { day: 8, month: 4, description: "Victoire 1945" },
        { day: 14, month: 6, description: "Fête Nationale" },
        { day: 15, month: 7, description: "Assomption" },
        { day: 1, month: 10, description: "Toussaint" },
        { day: 11, month: 10, description: "Armistice 1918" },
        { day: 25, month: 11, description: "Noël" }
      ];
    case "de-DE":
      return [
        { day: 1, month: 0, description: "Neujahr" },
        { day: 1, month: 4, description: "Tag der Arbeit" },
        { day: 3, month: 9, description: "Tag der Deutschen Einheit" },
        { day: 25, month: 11, description: "Weihnachtstag" },
        { day: 26, month: 11, description: "Zweiter Weihnachtstag" }
      ];
    case 'es-ES':
      return [
        { day: 1, month: 0, description: "Año Nuevo" },
        { day: 6, month: 0, description: "Día de los Reyes Magos" },
        { day: 1, month: 4, description: "Día del Trabajador" },
        { day: 15, month: 7, description: "Asunción de la Virgen" },
        { day: 12, month: 9, description: "Día de la Hispanidad" },
        { day: 1, month: 10, description: "Día de Todos los Santos" },
        { day: 6, month: 11, description: "Día de la Constitución" },
        { day: 8, month: 11, description: "Inmaculada Concepción" },
        { day: 25, month: 11, description: "Navidad" }
      ];
    case 'nl-NL':
      return [
        { day: 1, month: 0, description: "Nieuwjaardag" },
        { day: 5, month: 4, description: "Bevrijdingsdag" },
        { day: 25, month: 11, description: "Eerste Kerstdag" },
        { day: 26, month: 11, description: "Tweede Kerstdag" }
      ];
    case 'pt-PT':
      return [
        { day: 1, month: 0, description: "Ano Novo" },
        { day: 25, month: 3, description: "Dia da Liberdade" },
        { day: 1, month: 4, description: "Dia do Trabalhador" },
        { day: 10, month: 5, description: "Dia de Portugal" },
        { day: 15, month: 7, description: "Assunção de Nossa Senhora" },
        { day: 5, month: 9, description: "Implantação da República" },
        { day: 1, month: 10, description: "Dia de Todos os Santos" },
        { day: 1, month: 11, description: "Restauração da Independência" },
        { day: 8, month: 11, description: "Imaculada Conceição" },
        { day: 25, month: 11, description: "Natal" }
      ];
    case 'si-SI':
      return [
        { day: 1, month: 0, description: "Novo leto" },
        { day: 2, month: 0, description: "Novo leto" },
        { day: 8, month: 1, description: "Prešernov dan" },
        { day: 27, month: 3, description: "Dan upora proti okupatorju" },
        { day: 1, month: 4, description: "Praznik dela" },
        { day: 2, month: 4, description: "Ppraznik dela" },
        { day: 25, month: 5, description: "dDan državnosti" },
        { day: 15, month: 7, description: "Marijino vnebovzetje" },
        { day: 31, month: 9, description: "Dan reformacije" },
        { day: 1, month: 10, description: "Dan spomina na mrtve" },
        { day: 25, month: 11, description: "Božič" },
        { day: 26, month: 11, description: "Dan samostojnosti in enotnosti" },
      ];
    case 'hr-HR':
      return [
        { day: 1, month: 0, description: "Nova godina" },
        { day: 6, month: 0, description: "Sveta tri kralja" },
        { day: 1, month: 4, description: "Praznik rada" },
        { day: 30, month: 4, description: "Dan državnosti" },
        { day: 22, month: 5, description: "Dan antifašističke borbe" },
        { day: 5, month: 7, description: "Dan pobjede i domovinske zahvalnosti" },
        { day: 15, month: 7, description: "Velika Gospa" },
        { day: 1, month: 10, description: "Dan svih svetih" },
        { day: 18, month: 10, description: "Dan sjećanja na žrtve Domovinskog rata" },
        { day: 25, month: 11, description: "Božić" },
        { day: 26, month: 11, description: "Sveti Stjepan" },
      ];
    case 'gr-GR':
      return [
        { day: 1, month: 0, description: "Πρωτοχρονιά" },
        { day: 6, month: 0, description: "Θεοφάνια" },
        { day: 25, month: 2, description: "Εικοστή Πέμπτη Μαρτίου" },
        { day: 1, month: 4, description: "Εργατική Πρωτομαγιά" },
        { day: 15, month: 7, description: "Κοίμηση της Θεοτόκου" },
        { day: 28, month: 9, description: "Ημέρα του Όχι" },
        { day: 25, month: 11, description: "Χριστούγεννα" },
        { day: 26, month: 11, description: "Δεύτερη μέρα των Χριστουγέννων" },
      ];
    default:
      return [
        { day: 1, month: 0, description: 'Capodanno' },
        { day: 6, month: 0, description: 'Epifania' },
        { day: 25, month: 3, description: 'Festa della Liberazione' },
        { day: 1, month: 4, description: 'Festa del lavoro' },
        { day: 2, month: 5, description: 'Festa della Repubblica' },
        { day: 15, month: 7, description: 'Ferragosto' },
        { day: 4, month: 9, description: 'San Francesco d\'Assisi' },
        { day: 1, month: 10, description: 'Ognissanti' },
        { day: 8, month: 11, description: 'Immacolata Concezione' },
        { day: 25, month: 11, description: 'Natale' },
        { day: 26, month: 11, description: 'Santo Stefano' },
      ];
  }
}

/* ###########################################################################################################

                                                MAIN
                                    
########################################################################################################### */
export default function useLocalizationData() {

  // LEGGE IL PAESE IN CUI SI TROVA L'APP (es. pt-PT)
  const myLanguage = getLocales()[0].languageTag;

  const country = myLanguage; // per adesso prende il valore letto dal sistema

  // GENERO I NOMI DEI MESI E DEI GIORNI
  const localizedDays = getLocalizedWeekdays(myLanguage);
  const months = (() => {
    const mesi = [];
    for (let i = 0; i <= 11; i++) {
      mesi.push({ label: getMonth(myLanguage, i), value: i.toString() });
    }
    return mesi;
  })();

  // FESTIVI NAZIONALI: LA DICHIARO MA NON LA INIZIALIZZO SUBITO PERCHE TANTO VIENE SOVRASCRITTA IMMEDIATAMENTE DOPO
  const localHolydas: any[] = [];

  // RESTITUISCE LE VARIABILI COME UNICO OGGETTO
  return {
    localizedDays,
    localHolydas,
    months,
  };
}



