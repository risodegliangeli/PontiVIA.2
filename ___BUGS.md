# TICKET APERTI:


- ### SPOSTARE PREFERENCES
  -- in data.js

- ### ADV AdMob
  -- aggiungere

---

- ### CONTROLLO SOVRAPPOSIZIONE DATE
  -- se una data è ricorrente negli anni (per data o per giorno) la logica non rileva se un nuovo inserimento si sovrappone a quella ricorrenza negli anni futuri
  es. ho un periodo on una data che RIPETE OGNI ANNO IL III GIOVEDì DI NOVEMBRE
      non rileva se carico un periodo, sia fisso che ricorrente, che si accavalla negli anni 

---

- ### SimpleToast FESTIVITA: RENDERE EDITABILE
  -- aggiungere pulsante 'modifica' (o cancella) nel toast

---

- ### CONDIVISIONE DATE PERSONALI
  -- con altri utenti che hanno PontiVIA! installato
  -- se non installato te lo fa installare
  -- oppure inviare via WhatsApp

---

- #### ALERT possibili ponti

---

- #### ALERT eventi personali
  -- aggiungere checkbox CAMPANELLA nelle due modal (giono singolo e periodo):
  -- "Ricordami di questa data [ 7 ] giorni prima"

---

- #### TOOLTIP
  aggiungere a fianco delle label delle PREFERENCES

---

- #### PAGINA HELP
  -- creare una pagina grafica di spiegazioni


- #### geolocalizzazione per santo del giorno

---

- #### inserimento date PERS/LOC: non segnala i duplicati nelle altre categorie e nei nazionali, -> R.246 A) NUOVO

--- 
 
- #### SPLASH ICON & SCREEN



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


# TICKET RISOLTI:


- ### FESTIVITA NAZIONALI EDITABILI/DISATTIVABILI
-- o perlomeno ogni data checkabile (on/off)
  -- con pulsante di rollback per il ripristino

---

- ### AZZERARE maxDate (20251009.001)
  -- azzerare maxDate = null nel momento in cui si nasconde il field 'endDate'

---

- ### NON CONSERVA LUNGHEZZA PONTE
  -- quando si esce/rientra nell'app non viene conservata la lunghezza del ponte

--- 

- #### ANNO BISESTILE
  -- aggiungere nel datepicker del giorno singolo

---


- ### DatepickerSelector
  -- quando si edita una data prvedere il corretto posizionamento dello switch
  (Un giorno / Più giorni) e disabilitare l'altro pulsante

---


- ### TRADUZIONI
  ##### impostare due variabili, una per le traduzioni (myLanguage) e una per la dropdown (myCountry)
        -- tradurre SplittedBar
        -- tradurre DropdownComponent


        -- myLanguage viene letto dal sistema 
           ∟ NON cambia
           ∟ agisce sulla lingua di tutte le schede
           ∟ imposta la dropdown festività al boot

        -- myCountry deriva da myLanguage e successivamente viene cambiato dall'utente
           ∟ agisce sul calcolo delle festività
           ∟ NON agisce sul linguaggio delle schede

        ~~-- raccogliere TUTTE le traduzioni nel Context~~


        -- holydays.tsx BOTTONE RESET DROPDOWN COUNTRY: RIPORTA LA SELEZIONE A ~~'ITALIA'~


        Tabella linguaggi e festivita:

        .slice(0,2) 
        1 'it'
        2 'fr'
        3 'es'
        4 'de'
        5 'en'
        6 'nl'
        7 'pt'
        8 'hr'
        9 'si'
        10 'gr'

        const languageData = [
          // Italiano 'it'
          { label: 'Italiano (Italia)', value: 'it-IT', flag: '🇮🇹' },
          { label: 'English (Italia)', value: 'en-IT', flag: '🇮🇹' },
          { label: 'Italiano (Svizzera)', value: 'it-CH', flag: '🇨🇭' },
          
          { label: 'Romancio (Svizzera)', value: 'rm-CH', flag: '🇨🇭' },
          
          // Tedesco 'de'
          { label: 'Deutsch (Deutschland)', value: 'de-DE', flag: '🇩🇪' },
          { label: 'Deutsch (Schweiz)', value: 'de-CH', flag: '🇨🇭' },
          { label: 'Deutsch (Österreich)', value: 'de-AT', flag: '🇦🇹' },
          
          // Francese
          { label: 'Français (France)', value: 'fr-FR', flag: '🇫🇷' },
          { label: 'Français (Belgique)', value: 'fr-BE', flag: '🇧🇪' },
          { label: 'Français (Suisse)', value: 'fr-CH', flag: '🇨🇭' },
          { label: 'Nederlands (België)', value: 'be-BE', flag: '🇧🇪' },
          
          // Inglese
          { label: 'English (UK)', value: 'en-GB', flag: '🇬🇧' },
          { label: 'English (US)', value: 'en-US', flag: '🇺🇸' }, // Aggiunta bandiera USA
          { label: 'English (Ireland)', value: 'en-IE', flag: '🇮🇪' },
          
          // Olandese
          { label: 'Nederlands (Nederland)', value: 'nl-NL', flag: '🇳🇱' },
          { label: 'Nederlands (België)', value: 'nl-BE', flag: '🇧🇪' },
          
          // Spagnolo
          { label: 'Español (España)', value: 'es-ES', flag: '🇪🇸' },
          
          // Catalano
          { label: 'Català (España)', value: 'ca-ES', flag: '🇪🇸' },
          
          // Portoghese
          { label: 'Português (Portugal)', value: 'pt-PT', flag: '🇵🇹' },

          { label: 'Ελληνικά (Ελλάδα)', value: 'el-GR', flag: '🇬🇷' },  // Greco

          { label: 'Hrvatski (Hrvatska)', value: 'hr-HR', flag: '🇭🇷' }, // Croato
        ];



- ### ROVESCIARE PULSANTIERA
  -- 1 -2


- ### PONTI FUORI DAL MESE
  -- eliminare segnalazione ponti che sono prima o dopo il mese corrente

---

- ### MODALITA' DI NAVIGAZIONE SU ANDROID
  -- applicare SafeArea alla SplittedBar

---


- ### DARK MODE

---


- ### DROPDOWN LUNGHEZZA PONTE
  -- non salva nelle preferenze
  -- check: inizio settimana

---

- ### SALVATAGGIO LOCALE
  -- alla chiusura si perdono *date inserite* e *preferenze*

---

- #### RIMUOVER CODICE RELATIVO A CATEGORIA 'festivià locali'

---


- #### EDIT ITEM SINGOLO
  -- se cambio la data ma non la descrizione vien creato un nuovo record

---

- #### HOLYDAYS: EDIT RECORD
  -- impostare il radiobutton dell'altra catgoria com inactive

  ---

- #### EDIT PERIODO
  -- idem questione index: verificare
  -- se apro in edit un record, NON modifico e clicco Salva genera errore

---

- #### HOLYDAYS: PERIODI LUNGHI
  -- aggiungere trascinamento per ordinare

---

-- #### EDIT PERIOD-
  -passare props alla function--

---

-- #### BLUR-
  -riposizionare blur & gradient hp-

---


- #### GESTIONE CALENDARIO UTENTE
  -- quando l'utente preme il pulsante "Aggiungi a calendario" deve aprirsi il calendario di sistema posizionato sulla data del ponte (o sul primo giorno se il ponte è > 1 giorno) 

---

- #### SIMPLETOAST: RIMUOVERE BLUR
  -- rimuovere blur per aumentare performances

---

- #### CARD MESE
  -- aggiungere label "N ponti possibili!"
    -- aggiungere array in month() con [{1: da, a}, {2: da, a}, ecc]

---

- #### copy + cambiare icone LISTA / PREFERENZE

---


- #### TOAST --> [[SOSTITUIRE]]
  non sempre funziona, dopo qlc scroll (1 anno) non risponde più al click;
  https://github.com/zahidalidev/toastify-react-native
  risolto portando SOPRA TUTTO la touchable

00) 
-- PASQUA il doppio calcolo genera doppie date per ciascun anno-
    --- sdoppiare o assegnare anno-

--- PENTECOSTE, ASCENSIONE idem-


19)
- cambiare evidenzazione PONTE

20)
-- cambiare evidenza FESTIVITA PERSONALI-



4) [[ NON REPLICABILE --> SOLO SU iOS  ]]
- dopo aver usato la DIALOG per singola data il campo DESCRIZIONE non viene cancellato e ci si trova ancora la descrizione dell'ultimo inserimento

10) [[ TROPPO DIFFICILE ]]
- (holydays.tsx / preferences.tsx) gestire il pulsante RIPRISTINA PREDEFINITI

1)
- dopo aver scrollato di 3 + 3 mesi, vado in PREF, aggiorno LUNGHEZZA PONTE  o UNO SWITCH, torno in INDEX e i mesi ripartono dalla serie di 3 SUCCESSIVA all'ultima caricata

2)
--- EDIT PERIODO: al salvataggio raddoppia l'item, non lo sovrascrive--

3)
---- se disattivo le FESTIVITA NAZIONALI nelle preferenze, nel calendario non mi mostra né LOCALI né PERSONALI---

3.1)
- se disattivo FESTIVITA NAZIONALI non vedo neppure i periodi di FERIE

7)
- Require cycle: app/(tabs)/preferences.tsx -> components/ui/DropdownComponent.tsx -> app/(tabs)/preferences.tsx
- Require cycle: app/(tabs)/preferences.tsx -> components/ui/DropdownFDoW.tsx -> app/(tabs)/preferences.tsx
- Require cycle: app/(tabs)/preferences.tsx -> components/ui/PreferenceSwitch.tsx -> app/(tabs)/preferences.tsx

8)
- al boot troppe chiamate a 'createCalendarGrid()':

9) 
-- NAZIONALE DELETE ITEM, cancella una data dalla lista ma poi sul calendario risulta ancora festivo-

11)
- INDEX: togliere SAFEAREA
- rimettere Snackbar

12) 
-- sostituire IMAGE con EXPO IMAGE-

13) 
-- controllare che la navigazione avvenga mediante EXPO ROUTER-

15)
- (holydays.tsx) ordinare per data le festività personali/locali inserite


17)
- aggiungere TOAST








----------------------------------------------------------------------------------------

MAPPA DATI

Context
    |
    |--- personalHolydays, setPersonalHolydays,
    |    regionalHolydays, setRegionalHolydays,
    |    vacationPeriods, setVacationPeriods,
    |    nationalHolydays, setNationalHolydays,
    |    myCountry, setMyCountry,
    |


app/data
    |
    |--- localizedDays,
    |    localHolydas,
    |    months,
    |
    |   

------------------------------------------------------------------------------------------

RIFERIMENTI ONLINE


FESTIVITA MONDIALI
https://date.nager.at/

LIQUID GLASS
https://callstackincubator.github.io/react-native-bottom-tabs/docs/getting-started/quick-start.html

FREE ICONS
https://ionic.io/ionicons


