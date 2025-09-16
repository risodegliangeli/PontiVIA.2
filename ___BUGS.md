# TICKET APERTI:



- ### TRADUZIONI

---

- ### CONDIVISIONE DATE PERSONALI
  -- con altri utenti che hanno PontiVIA! installato
  -- se non installato te lo fa installare

---

- ### ADV AdMob
  -- aggiungere

---

- #### ALERT possibili ponti

---

- #### ALERT eventi personali
  -- aggiungere checkbox CAMPANELLA nelle due modal (giono singolo e periodo):
  "Ricordami di questa data [ 7 ] giorni prima"

---

- #### FESTIVI GERMANIA 
  -- per ciascun Land

---

- #### ANNO BISESTILE
  -- aggiungere nel datepicker del giorno singolo

---

- #### TOOLTIP
  aggiungere a fianco delle label delle PREFERENCES

---

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


