// TRADUZIONI: 
// QUESTO FILE RACCOGLIE TUTTE LE LABEL DELLE PAGINE 
// TRADOTTE IN 10 LINGUE

// LABEL USATE IN splittedBar.tsx
export function splittedBarLabel(language, item) {
  const countryLabels = {
    'it': [
      'Le mie date',
      'Filtri',
      ''
    ],
    'fr': [
      'Mes Dates',
      'Filtres',
      ''
    ],
    'es': [
      'Mis Fechas',
      'Filtros',
      ''
    ],
    'de': [
      'Meine Daten',
      'Filter',
      ''
    ],
    'en': [
      'My Dates',
      'Filters',
      ''
    ],
    'nl': [
      'Mijn Data',
      'Filters',
      ''
    ],
    'pt': [
      'Minhas Datas',
      'Filtros',
      ''
    ],
    'hr': [
      'Moji datumi',
      'Filteri',
      ''
    ],
    'si': [
      'Moji datumi',
      'Filtri',
      ''
    ],
    'gr': [
      'Οι ημερομηνίες μου',
      'Φίλτρα',
      ''
    ],
  };
  return countryLabels[language][item];
}

// LABEL USATE IN index.tsx
export function indexLabels(language, item) {
  const dataLabel = {
    'it': [
      'Nessun ponte in vista?\nScorri il calendario e imposta\ni filtri e i tuoi giorni',
      'LE MIE DATE: aggiungi qui le tue ferie e tutti quei giorni in cui non lavori (es. compleanno, patrono della città ecc)',
      'I FILTRI: seleziona qui i giorni liberi della settimana e scegli quali festività includere nel calcolo',
      'IL CALENDARIO: scopri qui i ponti perfetti per pianificare le tue vacanze ideali!',
      'Cosa puoi fare con Ponti e Ferie?'
    ],
    'fr': [
      'Pas de pont en vue?\nFaites défiler le calendrier\net définissez les filtres et vos dates',
      'MES DATES : ajoutez ici vos congés et tous les jours où vous ne travaillez pas (ex. anniversaire, fête du saint patron, etc.)',  // 32
      'LES FILTRES : sélectionnez ici les jours libres de la semaine et choisissez quelles fêtes inclure dans le calcul',  // 33
      'LE CALENDRIER : découvrez ici les ponts parfaits pour planifier vos vacances idéales !',  // 34
      'Que pouvez-vous faire avec Ponti e Ferie ?'                                     // 35
    ],
    'es': [
      '¿Ningún puente a la vista?\nDesliza el calendario y configura\nlos filtros y tus días',
      'MIS FECHAS: añade aquí tus vacaciones y todos los días en que no trabajas (ej. cumpleaños, patrón de la ciudad, etc.)',  // 32
      'LOS FILTROS: selecciona aquí los días libres de la semana y elige qué festividades incluir en el cálculo',  // 33
      'EL CALENDARIO: ¡descubre aquí los puentes perfectos para planificar tus vacaciones ideales!',  // 34
      '¿Qué puedes hacer con Ponti e Ferie?'                                           // 35
    ],
    'de': [
      'Keine Brücke in Sicht?\nBlättern Sie im Kalender vorwärts\nund stellen Sie die Filter und Ihre Daten ein',
      'MEINE TERMINE: Fügen Sie hier Ihren Urlaub und alle Tage hinzu, an denen Sie nicht arbeiten (z.B. Geburtstag, Stadtpatron usw.)',  // 32
      'DIE FILTER: Wählen Sie hier die freien Wochentage aus und entscheiden Sie, welche Feiertage in die Berechnung einbezogen werden sollen',  // 33
      'DER KALENDER: Entdecken Sie hier die perfekten Brücken, um Ihren idealen Urlaub zu planen!',  // 34
      'Was können Sie mit Ponti e Ferie tun?'                                          // 35

    ],
    'en': [
      'No bridge in sight?\nScroll the calendar and set\nfilters and your days',
      'MY DATES: add here your holidays and all the days when you don\'t work (e.g. birthday, city patron saint, etc.)',  // 32
      'FILTERS: select here your weekly days off and choose which holidays to include in the calculation',  // 33
      'THE CALENDAR: discover here the perfect bridges to plan your ideal vacations!',  // 34
      'What can you do with Ponti e Ferie?'                                            // 35
    ],
    'nl': [
      'Geen brug in zicht?\nScroll door de kalender en stel\nfilters en je dagen in',
      'MIJN DATUMS: voeg hier je vakanties en alle dagen waarop je niet werkt toe (bijv. verjaardag, stadspatroon, enz.)',  // 32
      'DE FILTERS: selecteer hier je vrije weekdagen en kies welke feestdagen je in de berekening wilt opnemen',  // 33
      'DE KALENDER: ontdek hier de perfecte bruggen om je ideale vakanties te plannen!',  // 34
      'Wat kun je doen met Ponti e Ferie?'                                             // 35
    ],
    'pt': [
      'Nenhuma ponte à vista?\nDeslize o calendário e configure\nos filtros e seus dias',
      'MINHAS DATAS: adicione aqui suas férias e todos os dias em que você não trabalha (ex. aniversário, padroeiro da cidade, etc.)',  // 32
      'OS FILTROS: selecione aqui os dias livres da semana e escolha quais feriados incluir no cálculo',  // 33
      'O CALENDÁRIO: descubra aqui as pontes perfeitas para planejar suas férias ideais!',  // 34
      'O que você pode fazer com Ponti e Ferie?'                                       // 35
    ],
    'hr': [
      'Nema mosta na vidiku?\nSkrolaj kalendar i postavi\nfiltere i svoje dane',
      'MOJI DATUMI: dodaj ovdje svoj godišnji odmor i sve dane kada ne radiš (npr. rođendan, gradski svetac patron, itd.)',  // 32
      'FILTERI: odaberi ovdje slobodne dane u tjednu i odaberi koje praznike uključiti u izračun',  // 33
      'KALENDAR: otkrij ovdje savršene mostove za planiranje svojih idealnih praznika!',  // 34
      'Što možeš raditi s Ponti e Ferie?'                                              // 35
    ],
    'si': [
      'Ni mosta na vidiku?\nDrsaj po koledarju in nastavi\nfiltre in svoje dni',
      'MOJI DATUMI: dodaj tukaj svoj letni dopust in vse dni, ko ne delaš (npr. rojstni dan, mestni zavetnik, itd.)',  // 32
      'FILTRI: izberi tukaj proste tedenske dni in izberi, katere praznike vključiti v izračun',  // 33
      'KOLEDAR: odkrij tukaj popolne mostove za načrtovanje svojih idealnih počitnic!',  // 34
      'Kaj lahko narediš s Ponti e Ferie?'                                             // 35
    ],
    'gr': [
      'Καμία γέφυρα στον ορίζοντα;\nΚύλισε το ημερολόγιο και όρισε\nφίλτρα και τις μέρες σου',
      'ΟΙ ΗΜΕΡΟΜΗΝΙΕΣ ΜΟΥ: προσθέστε εδώ τις διακοπές σας και όλες τις μέρες που δεν εργάζεστε (π.χ. γενέθλια, πολιούχος της πόλης, κ.λπ.)',  // 32
      'ΤΑ ΦΙΛΤΡΑ: επιλέξτε εδώ τις ελεύθερες ημέρες της εβδομάδας και διαλέξτε ποιες αργίες να συμπεριληφθούν στον υπολογισμό',  // 33
      'ΤΟ ΗΜΕΡΟΛΟΓΙΟ: ανακαλύψτε εδώ τις τέλειες γέφυρες για να σχεδιάσετε τις ιδανικές σας διακοπές!',  // 34
      'Τι μπορείτε να κάνετε με το Ponti e Ferie;'
    ]
  };
  return dataLabel[language][item];
}

// LABEL USATE IN calendarUtils.tsx E preferences.tsx
export function dataLabel(language, item) {
  const countryLabels = {
    'it': [
      'Pasqua',                               // 0
      'Lunedì dell\'Angelo',                  // 1
      'Ascensione',                           // 2
      'Pentecoste',                           // 3
      'Lunedì di Pentecoste',                 // 4
      'Corpus Domini',                        // 5
      'Possibile ponte!',                     // 6
      'Festività nazionali',                  // 7
      'Festività locali',                     // 8
      'I tuoi giorni speciali',               // 9
      'Altri festivi',                        // 10
      'Durata del ponte',                     // 11
      'Imposta i tuoi filtri',                // 12
      'Giorni della settimana festivi',       // 13
      'Festività cattoliche',                 // 14
      'Modifica lista dei giorni',            // 15
      'Come funziona?',                       // 16
      'Info Privacy',                         // 17
      'Stai per essere indirizzato verso una pagina esterna. Vuoi proseguire?',   // 18
      'Prosegui',                             // 19
      'Notifiche Ponti',                      // 20
      'Cerca ponti nei prossimi:',            // 21
      '7 giorni',                             // 22
      '14 giorni',                            // 23
      '30 giorni',                            // 24
      '60 giorni',                            // 25
      'Attiva notifiche',                     // 26
      'Ponti e Ferie cercherà nuovi ponti ogni giorno anche con l\'app chiusa',   // 27
    ],
    'fr': [
      'Pâques',                               // 0
      'Lundi de Pâques',                      // 1
      'Ascension',                            // 2
      'Pentecôte',                            // 3
      'Lundi de Pentecôte',                   // 4
      'Fête-Dieu',                            // 5
      'Pont possible !',                      // 6
      'Fêtes nationales',                     // 7
      'Fêtes locales',                        // 8
      'Jours spéciaux',                       // 9
      'Autres jours fériés',                  // 10
      'Durée du pont',                        // 11
      'Configurez vos filtres',               // 12
      'Jours fériés de la semaine',           // 13
      'Fêtes religieuses',                    // 14
      'Modifier la liste',                    // 15
      'Comment ça marche ?',                  // 16
      'Infos Confidentialité',                // 17
      'Vous allez être redirigé vers une page externe. Voulez-vous continuer ?',  // 18
      'Continuer',                            // 19
      'Notifications Ponts',                  // 20
      'Chercher ponts dans les prochains :',  // 21
      '7 jours',                              // 22
      '14 jours',                             // 23
      '30 jours',                             // 24
      '60 jours',                             // 25
      'Activer notifications',                // 26
      'Ponti e Ferie va chercher de nouveaux ponts chaque jour même avec l\'app fermée' // 27
    ],
    'es': [
      'Pascua',                               // 0
      'Lunes de Pascua',                      // 1
      'Ascensión',                            // 2
      'Pentecostés',                          // 3
      'Lunes de Pentecostés',                 // 4
      'Corpus Christi',                       // 5
      '¡Posible puente!',                     // 6
      'Festividades nacionales',              // 7
      'Festividades locales',                 // 8
      'Días especiales',                      // 9
      'Otros días festivos',                  // 10
      'Duración del puente',                  // 11
      'Configura tus filtros',                // 12
      'Días festivos de la semana',           // 13
      'Festividades religiosas',              // 14
      'Editar lista',                         // 15
      '¿Cómo funciona?',                          // 16
      'Info Privacidad',                      // 17
      'Está a punto de ser redirigido a una página externa. ¿Desea continuar?', // 18
      'Continuar',                            // 19
      'Notificaciones Ponts',                 // 20
      'Buscar puente en los próximos :',      // 21
      '7 días',                               // 22
      '14 días',                              // 23
      '30 días',                              // 24
      '60 días',                              // 25
      'Activar notificaciones',               // 26
      'Ponti e Ferie buscará nuevos puente cada día incluso con la app cerrada' // 27
    ],
    'de': [
      'Ostern',                               // 0
      'Ostermontag',                          // 1
      'Christi Himmelfahrt',                  // 2
      'Pfingsten',                            // 3
      'Pfingstmontag',                        // 4
      'Fronleichnam',                         // 5
      'Mögliche Brücke!',                     // 6
      'Nationale Feiertage',                  // 7
      'Lokale Feiertage',                     // 8
      'Besondere Tage',                       // 9
      'Andere Feiertage',                     // 10
      'Dauer der Brücke',                     // 11
      'Stellen Sie Ihre Filter ein',          // 12
      'Feiertage der Woche',                  // 13
      'Religiöse Feiertage',                  // 14
      'Liste bearbeiten',                     // 15
      'Wie funktioniert es?',                 // 16
      'Datenschutz-Info',                     // 17
      'Sie werden zu einer externen Seite weitergeleitet. Möchten Sie fortfahren?', // 18
      'Fortfahren',                           // 19
      'Brücken-Benachrichtigungen',           // 20
      'Suche Brücken in den nächsten :',      // 21
      '7 Tage',                               // 22
      '14 Tage',                              // 23
      '30 Tage',                              // 24
      '60 Tage',                              // 25
      'Aktiviere Benachrichtigungen',         // 26
      'Ponti e Ferie sucht täglich neue Brücken auch wenn die App geschlossen ist' // 27
    ],
    'en': [
      'Easter',                               // 0
      'Easter Monday',                        // 1
      'Ascension',                            // 2
      'Pentecost',                            // 3
      'Whit Monday',                          // 4
      'Corpus Christi',                       // 5
      'Possible bridge!',                     // 6
      'National holidays',                    // 7
      'Local holidays',                       // 8
      'Special days',                         // 9
      'Other holidays',                       // 10
      'Bridge duration',                      // 11
      'Set your filters',                     // 12
      'Weekly holidays',                      // 13
      'Religious holidays',                   // 14
      'Edit list',                            // 15
      'How does it work?',                    // 16
      'Privacy Info',                         // 17
      'You are about to be redirected to an external page. Do you want to continue?', // 18
      'Continue',                             // 19
      'Bridge Notifications',                 // 20
      'Search bridges in the next:',          // 21
      '7 days',                               // 22
      '14 days',                              // 23
      '30 days',                              // 24
      '60 days',                              // 25
      'Enable notifications',                 // 26
      'Ponti e Ferie will search for new bridges every day even with the app closed' // 27
    ],
    'nl': [
      'Pasen',                                // 0
      'Paasmaandag',                          // 1
      'Hemelvaart',                           // 2
      'Pinksteren',                           // 3
      'Pinkstermaandag',                      // 4
      'Sacramentsdag',                        // 5
      'Mogelijke brug!',                      // 6
      'Nationale feestdagen',                 // 7
      'Lokale feestdagen',                    // 8
      'Speciale dagen',                       // 9
      'Andere feestdagen',                    // 10
      'Duur van de brug',                     // 11
      'Stel je filters in',                   // 12
      'Weekdagen feestdagen',                 // 13
      'Religieuze feestdagen',                // 14
      'Lijst bewerken',                       // 15
      'Hoe werkt het?',                       // 16
      'Privacy Info',                         // 17
      'U wordt doorgestuurd naar een externe pagina. Wilt u doorgaan?',// 18
      'Doorgaan',                             // 19
      'Brugmeldingen',                        // 20
      'Zoek bruggen in de komende:',          // 21
      '7 dagen',                              // 22
      '14 dagen',                             // 23
      '30 dagen',                             // 24
      '60 dagen',                             // 25
      'Meldingen activeren',                  // 26
      'Ponti e Ferie zal elke dag naar nieuwe bruggen zoeken, zelfs wanneer de app gesloten is' // 27
    ],
    'pt': [
      'Páscoa',                               // 0
      'Segunda-feira de Páscoa',              // 1
      'Ascensão',                             // 2
      'Pentecostes',                          // 3
      'Segunda de Pentecostes',               // 4
      'Corpus Christi',                       // 5
      'Ponte possível!',                      // 6
      'Feriados nacionais',                   // 7
      'Feriados locais',                      // 8
      'Dias especiais',                       // 9
      'Outros feriados',                      // 10
      'Duração da ponte',                     // 11
      'Configure seus filtros',               // 12
      'Dias feriados da semana',              // 13
      'Feriados religiosos',                  // 14
      'Editar lista',                         // 15
      'Como funciona?',                       // 16
      'Info Privacidade',                     // 17
      'Você está prestes a ser redirecionado para uma página externa. Deseja continuar?',  // 18
      'Continuar',                            // 19
      'Notificações Pontes',                  // 20
      'Procurar pontes nos próximos:',        // 21
      '7 dias',                               // 22
      '14 dias',                              // 23
      '30 dias',                              // 24
      '60 dias',                              // 25
      'Ativar notificações',                  // 26
      'Ponti e Ferie procurará novas pontes todos os dias mesmo com o app fechado' // 27
    ],
    'hr': [
      'Uskrs',                                // 0
      'Uskršnji ponedjeljak',                 // 1
      'Uzašašće',                             // 2
      'Duhovi',                               // 3
      'Duhovni ponedjeljak',                  // 4
      'Tijelovo',                             // 5
      'Moguć most!',                          // 6
      'Nacionalni praznici',                  // 7
      'Lokalni praznici',                     // 8
      'Posebni dani',                         // 9
      'Ostali praznici',                      // 10
      'Trajanje mosta',                       // 11
      'Postavi svoje filtrove',               // 12
      'Praznici u tjednu',                    // 13
      'Vjerski praznici',                     // 14
      'Uredi listu',                          // 15
      'Kako funkcionira?',                    // 16
      'Info o privatnosti',                   // 17
      'Bit ćete preusmjereni na vanjsku stranicu. Želite li nastaviti?', // 18
      'Nadaljuj',                             // 19
      'Obavijesti o mostovima',               // 20
      'Traži mostove u sljedećih:',           // 21
      '7 dana',                               // 22
      '14 dana',                              // 23
      '30 dana',                              // 24
      '60 dana',                              // 25
      'Aktiviraj obavijesti',                 // 26
      'Ponti e Ferie će tražiti nove mostove svaki dan čak i kad je app zatvoren' // 27
    ],
    'si': [
      'Velika noč',                           // 0
      'Velikonočni ponedeljek',               // 1
      'Vnebovzetje',                          // 2
      'Binkošti',                             // 3
      'Binkošti ponedeljek',                  // 4
      'Rešnje telo',                          // 5
      'Možen most!',                          // 6
      'Državni prazniki',                     // 7
      'Lokalni prazniki',                     // 8
      'Posebni dnevi',                        // 9
      'Ostali prazniki',                      // 10
      'Trajanje mosta',                       // 11
      'Nastavi svoje filtre',                 // 12
      'Tedni prazniki',                       // 13
      'Verski prazniki',                      // 14
      'Uredi seznam',                         // 15
      'Kako deluje?',                         // 16
      'Info o zasebnosti',                    // 17
      'Preusmerjeni boste na zunanjo stran. Želite nadaljevati?', // 18
      'Nadaljuj',                             // 19
      'Obvestila o mostovih',                 // 20
      'Išči mostove v naslednjih:',           // 21
      '7 dni',                                // 22
      '14 dni',                               // 23
      '30 dni',                               // 24
      '60 dni',                               // 25
      'Aktiviraj obvestila',                  // 26
      'Ponti e Ferie bo iskal nove mostove vsak dan tudi ko je aplikacija zaprta' // 27
    ],
    'gr': [
      'Πάσχα',                                // 0
      'Δευτέρα του Πάσχα',                    // 1
      'Ανάληψη',                              // 2
      'Πεντηκοστή',                           // 3
      'Δευτέρα της Πεντηκοστής',              // 4
      'Θεοφάνεια',                            // 5
      'Πιθανή γέφυρα!',                       // 6
      'Εθνικές γιορτές',                      // 7
      'Τοπικές γιορτές',                      // 8
      'Ειδικές μέρες',                        // 9
      'Άλλες αργίες',                         // 10
      'Διάρκεια γέφυρας',                     // 11
      'Ρύθμισε τα φίλτρα σου',                // 12
      'Αργίες της εβδομάδας',                 // 13
      'Θρησκευτικές γιορτές',                 // 14
      'Επεξεργασία λίστας',                   // 15
      'Πώς λειτουργεί;',                      // 16
      'Πληροφορίες Απορρήτου',                // 17
      'Πρόκειται να ανακατευθυνθείτε σε εξωτερική σελίδα. Θέλετε να συνεχίσετε;',  // 18
      'Συνέχεια',                             // 19
      'Ειδοποιήσεις Γεφυρών',                 // 20
      'Αναζήτηση γεφυρών στις επόμενες:',     // 21
      '7 μέρες',                              // 22
      '14 μέρες',                             // 23
      '30 μέρες',                             // 24
      '60 μέρες',                             // 25
      'Ενεργοποίηση ειδοποιήσεων',            // 26
      'Το Ponti e Ferie θα αναζητά νέες γέφυρες κάθε μέρα ακόμα και με την εφαρμογή κλειστή' // 27
    ]
  };
  return countryLabels[language][item];
}

// LABEL USATE IN holydays.tsx
export function holydayLabels(language, item) {
  const dataLabel = {
    'it': [
      'Le mie date',                                              // 0
      'Aggiungi i tuoi giorni speciali',                          // 1
      'Le festività nazionali',                                   // 2
      'I periodi lunghi',                                         // 3
      'I tuoi giorni speciali',                                   // 4
      'Un giorno',                                                // 5
      'Più giorni',                                               // 6
      'Attenzione',                                               // 7
      'Vuoi eliminare il giorno',                                 // 8
      'Annulla',                                                  // 9
      'Elimina',                                                  // 10
      'Salva',                                                    // 11
      'Inserisci una descrizione',                                // 12
      'Esiste già una festività nazionale in questa data',        // 13
      'Descrizione',                                              // 14
      '(ripete ogni anno)',                                       // 15
      'I tuoi giorni speciali',                                   // 16
      'In questa data è già presente un evento',                  // 17
      'Vuoi eliminare tutte le date di questa sezione?',          // 18
      '(es. un evento che ricorre ogni anno)',                    // 19
      '(es. un periodo di ferie)',                                // 20
      'La data di inizio coincide con una festività nazionale',   // 21
      'Questa data fa parte di un periodo esistente',             // 22
      'Attenzione, l\'evento si sovrappone a ',                   // 23
      'Attenzione, l\'evento è in conflitto con ',                // 24
      'Questa data è già presente ',                              // 25
      'Come funziona?',                                           // 26
      'Info Privacy',                                             // 27 ex 'Info Privacy'
      'Vorrei condividere con te questo evento:',                 // 28
      'Scarica Ponti e Ferie!',                                        // 29
      'Stai per essere indirizzato verso una pagina esterna. Vuoi proseguire?',    // 30
      'Prosegui',                                                 // 31
      'Aggiungilo al tuo calendario: '                           // 32
    ],
    'fr': [
      'Mes dates',                                                // 0
      'Ajoutez vos jours spéciaux',                               // 1
      'Les fêtes nationales',                                     // 2
      'Les longues périodes',                                     // 3
      'Vos jours spéciaux',                                       // 4
      'Un jour',                                                  // 5
      'Plusieurs jours',                                          // 6
      'Attention',                                                // 7
      'Voulez-vous supprimer le jour',                            // 8
      'Annuler',                                                  // 9
      'Supprimer',                                                // 10
      'Enregistrer',                                              // 11
      'Saisissez une description',                                // 12
      'Il existe déjà une fête nationale à cette date',           // 13
      'Description',                                              // 14
      '(se répète chaque année)',                                 // 15
      'Vos jours spéciaux',                                       // 16
      'Un événement est déjà présent à cette date',               // 17
      'Voulez-vous supprimer toutes les dates de cette section ?',// 18
      '(ex. une date fixe qui revient chaque année)',             // 19
      '(ex. une période de vacances)',                            // 20
      'La date de début coïncide avec une fête nationale',        // 21
      'Cette date fait partie d\'une période existante',          // 22
      'Attention, l\'événement chevauche ',                       // 23
      'Attention, l\'événement est en conflit avec ',             // 24
      'Cette date est déjà présente ',                            // 25
      'Comment ça marche ?',                                      // 26
      'Infos Confidentialité',                                    // 27
      'Je voudrais partager cet événement avec toi :',            // 28
      'Télécharge Ponti e Ferie !',                                    // 29
      'Vous allez être redirigé vers une page externe. Voulez-vous continuer ?',// 30
      'Continuer',                                                // 31
      'Ajoute-le à ton calendrier: '                             // 32
    ],
    'es': [
      'Mis fechas',                                               // 0
      'Añade tus días especiales',                                // 1
      'Las festividades nacionales',                              // 2
      'Los períodos largos',                                      // 3
      'Tus días especiales',                                      // 4
      'Un día',                                                   // 5
      'Más días',                                                 // 6
      'Atención',                                                 // 7
      '¿Quieres eliminar el día',                                 // 8
      'Cancelar',                                                 // 9
      'Eliminar',                                                 // 10
      'Guardar',                                                  // 11
      'Introduce una descripción',                                // 12
      'Ya existe una festividad nacional en esta fecha',          // 13
      'Descripción',                                              // 14
      '(se repite cada año)',                                     // 15
      'Tus días especiales',                                      // 16
      'Ya hay un evento presente en esta fecha',                  // 17
      '¿Quieres eliminar todas las fechas de esta sección?',      // 18
      '(ej. una fecha fija que se repite cada año)',              // 19
      '(ej. un período de vacaciones)',                           // 20
      'La fecha de inicio coincide con una festividad nacional',  // 21
      'Esta fecha forma parte de un período existente',           // 22
      'Atención, el evento se superpone a ',                      // 23
      'Atención, el evento está en conflicto con ',               // 24
      'Esta fecha ya está presente ',                             // 25
      '¿Cómo funciona?',                                          // 26
      'Info Privacidad',                                          // 27
      'Me gustaría compartir este evento contigo:',               // 28
      '¡Descarga Ponti e Ferie!',                                      // 29
      'Está a punto de ser redirigido a una página externa. ¿Desea continuar?', // 30
      'Continuar',                                                // 31
      'Añádelo a tu calendario: '                                // 32
    ],
    'de': [
      'Meine Termine',                                            // 0
      'Füge deine Termine ein',                                   // 1
      'Die nationalen Feiertage',                                 // 2
      'Die langen Zeiträume',                                     // 3
      'Deine besonderen Tage',                                    // 4
      'Ein Tag',                                                  // 5
      'Mehrere Tage',                                             // 6
      'Vorsicht!',                                                // 7
      'Möchtest du den Tag löschen',                              // 8
      'Abbrechen',                                                // 9
      'Löschen',                                                  // 10
      'Speichern',                                                // 11
      'Gib eine Beschreibung ein!',                               // 12
      'An diesem Datum gibt es bereits einen nationalen Feiertag', // 13
      'Beschreibung',                                             // 14
      '(wiederholt sich jedes Jahr)',                             // 15
      'Deine besonderen Tage',                                    // 16
      'An diesem Datum ist bereits ein Ereignis vorhanden',       // 17
      'Möchtest du alle Termine in diesem Bereich löschen?',      // 18
      '(z.B. ein festes Datum, das jedes Jahr wiederkehrt)',      // 19
      '(z.B. eine Ferienzeit)',                                   // 20
      'Das Startdatum fällt auf einen nationalen Feiertag',       // 21
      'Dieses Datum ist Teil eines bestehenden Zeitraums',        // 22
      'Achtung, das Ereignis überlappt sich mit ',                // 23
      'Achtung, das Ereignis steht in Konflikt mit ',             // 24
      'Dieses Datum ist bereits vorhanden ',                      // 25
      'Wie funktioniert es?',                                     // 16
      'Datenschutz-Info',                                         // 17
      'Ich möchte dieses Ereignis mit dir teilen:',               // 28
      'Lade Ponti e Ferie herunter!',                                  // 29
      'Sie werden zu einer externen Seite weitergeleitet. Möchten Sie fortfahren?', // 30
      'Fortfahren',                                               // 31
      'Füge es zu deinem Kalender hinzu: '                       // 32
    ],
    'en': [
      'My dates',                                                 // 0
      'Add your special days',                                    // 1
      'National holidays',                                        // 2
      'Long periods',                                             // 3
      'Your special days',                                        // 4
      'One day',                                                  // 5
      'Multiple days',                                            // 6
      'Attention',                                                // 7
      'Do you want to delete the day',                            // 8
      'Cancel',                                                   // 9
      'Delete',                                                   // 10
      'Save',                                                     // 11
      'Enter a description',                                      // 12
      'A national holiday already exists on this date',           // 13
      'Description',                                              // 14
      '(repeats every year)',                                     // 15
      'Your special days',                                        // 16
      'An event already exists on this date',                     // 17
      'Do you want to delete all dates in this section?',         // 18
      '(e.g. a fixed date that recurs every year)',               // 19
      '(e.g. a holiday period)',                                  // 20
      'The start date coincides with a national holiday',         // 21
      'This date is part of an existing period',                  // 22
      'Warning, the event overlaps with ',                        // 23
      'Warning, the event conflicts with ',                       // 24
      'This date is already present ',                            // 25
      'How does it work?',                                        // 26
      'Privacy Info',                                             // 27
      'I would like to share this event with you:',               // 28
      'Download Ponti e Ferie!',                                       // 29
      'You are about to be redirected to an external page. Do you want to continue?', // 30
      'Continue',                                                 // 31
      'Add it to your calendar: '                                // 32
    ],
    'nl': [
      'Mijn datums',                                              // 0
      'Voeg je speciale dagen toe',                               // 1
      'Nationale feestdagen',                                     // 2
      'Lange periodes',                                           // 3
      'Jouw speciale dagen',                                      // 4
      'Eén dag',                                                  // 5
      'Meerdere dagen',                                           // 6
      'Let op',                                                   // 7
      'Wil je de dag verwijderen',                                // 8
      'Annuleren',                                                // 9
      'Verwijderen',                                              // 10
      'Opslaan',                                                  // 11
      'Voer een beschrijving in',                                 // 12
      'Er bestaat al een nationale feestdag op deze datum',       // 13
      'Beschrijving',                                             // 14
      '(herhaalt elk jaar)',                                      // 15
      'Jouw speciale dagen',                                      // 16
      'Er is al een evenement op deze datum',                     // 17
      'Wil je alle datums in deze sectie verwijderen?',           // 18
      '(bijv. een vaste datum die elk jaar terugkeert)',          // 19
      '(bijv. een vakantieperiode)',                              // 20
      'De startdatum valt samen met een nationale feestdag',      // 21
      'Deze datum maakt deel uit van een bestaande periode',      // 22
      'Let op, het evenement overlapt met ',                      // 23
      'Let op, het evenement is in conflict met ',                // 24
      'Deze datum is al aanwezig ',                               // 25
      'Hoe werkt het?',                                           // 26
      'Privacy Info',                                             // 27
      'Ik wil deze gebeurtenis met je delen:',                    // 28
      'Download Ponti e Ferie!',                                       // 29
      'U wordt doorgestuurd naar een externe pagina. Wilt u doorgaan?',// 30
      'Doorgaan',                                                 // 31
      'Voeg het toe aan je kalender: '                           // 32
    ],
    'pt': [
      'Minhas datas',                                             // 0
      'Adicione seus dias especiais',                             // 1
      'Feriados nacionais',                                       // 2
      'Períodos longos',                                          // 3
      'Seus dias especiais',                                      // 4
      'Um dia',                                                   // 5
      'Vários dias',                                              // 6
      'Atenção',                                                  // 7
      'Deseja excluir o dia',                                     // 8
      'Cancelar',                                                 // 9
      'Excluir',                                                  // 10
      'Salvar',                                                   // 11
      'Insira uma descrição',                                     // 12
      'Já existe um feriado nacional nesta data',                 // 13
      'Descrição',                                                // 14
      '(repete todos os anos)',                                   // 15
      'Seus dias especiais',                                      // 16
      'Já existe um evento nesta data',                           // 17
      'Deseja excluir todas as datas desta seção?',               // 18
      '(ex. uma data fixa que se repete todo ano)',               // 19
      '(ex. um período de férias)',                               // 20
      'A data de início coincide com um feriado nacional',        // 21
      'Esta data faz parte de um período existente',              // 22
      'Atenção, o evento se sobrepõe a ',                         // 23
      'Atenção, o evento está em conflito com ',                  // 24
      'Esta data já está presente ',                              // 25
      'Como funciona?',                                           // 26
      'Info Privacidade',                                         // 27
      'Gostaria de compartilhar este evento com você:',           // 28
      'Baixe Ponti e Ferie!',                                          // 29
      'Você está prestes a ser redirecionado para uma página externa. Deseja continuar?',  // 30
      'Continuar',                                                // 31
      'Adicione ao seu calendário: '                             // 32
    ],
    'hr': [
      'Moji datumi',                                              // 0
      'Dodaj svoje posebne dane',                                 // 1
      'Nacionalni praznici',                                      // 2
      'Dugi periodi',                                             // 3
      'Tvoji posebni dani',                                       // 4
      'Jedan dan',                                                // 5
      'Više dana',                                                // 6
      'Pažnja',                                                   // 7
      'Želiš li obrisati dan',                                    // 8
      'Otkaži',                                                   // 9
      'Obriši',                                                   // 10
      'Spremi',                                                   // 11
      'Unesi opis',                                               // 12
      'Već postoji nacionalni praznik na ovaj datum',             // 13
      'Opis',                                                     // 14
      '(ponavlja se svake godine)',                               // 15
      'Tvoji posebni dani',                                       // 16
      'Na ovaj datum već postoji događaj',                        // 17
      'Želiš li obrisati sve datume iz ove sekcije?',             // 18
      '(npr. fiksni datum koji se ponavlja svake godine)',        // 19
      '(npr. period odmora)',                                     // 20
      'Početni datum se poklapa s nacionalnim praznikom',         // 21
      'Ovaj datum je dio postojećeg perioda',                     // 22
      'Pažnja, događaj se preklapa s ',                           // 23
      'Pažnja, događaj je u sukobu s ',                           // 24
      'Ovaj datum je već prisutan ',                              // 25
      'Kako funkcionira?',                                        // 26
      'Info o privatnosti',                                       // 27
      'Želio bih podijeliti ovaj događaj s tobom:',               // 28
      'Preuzmi Ponti e Ferie!',                                        // 29
      'Bit ćete preusmjereni na vanjsku stranicu. Želite li nastaviti?', // 30
      'Nastavi',                                                  // 31
      'Dodaj u svoj kalendar: '                                  // 32
    ],
    'si': [
      'Moji datumi',                                              // 0
      'Dodaj svoje posebne dni',                                  // 1
      'Državni prazniki',                                         // 2
      'Dolga obdobja',                                            // 3
      'Tvoji posebni dnevi',                                      // 4
      'En dan',                                                   // 5
      'Več dni',                                                  // 6
      'Pozor',                                                    // 7
      'Ali želiš izbrisati dan',                                  // 8
      'Prekliči',                                                 // 9
      'Izbriši',                                                  // 10
      'Shrani',                                                   // 11
      'Vnesi opis',                                               // 12
      'Na ta datum že obstaja državni praznik',                   // 13
      'Opis',                                                     // 14
      '(se ponavlja vsako leto)',                                 // 15
      'Tvoji posebni dnevi',                                      // 16
      'Na ta datum že obstaja dogodek',                           // 17
      'Ali želiš izbrisati vse datume iz tega odseka?',           // 18
      '(npr. fiksni datum, ki se ponavlja vsako leto)',           // 19
      '(npr. počitniško obdobje)',                                // 20
      'Začetni datum se ujema z državnim praznikom',              // 21
      'Ta datum je del obstoječega obdobja',                      // 22
      'Pozor, dogodek se prekriva z ',                            // 23
      'Pozor, dogodek je v sporu z ',                             // 24
      'Ta datum je že prisoten ',                                 // 25
      'Kako deluje?',                                             // 26
      'Info o zasebnosti',                                        // 27
      'Rad bi delil ta dogodek s teboj:',                         // 28
      'Prenesi Ponti e Ferie!',                                        // 29
      'Preusmerjeni boste na zunanjo stran. Želite nadaljevati?', // 30
      'Nadaljuj',                                                 // 31
      'Dodaj v svoj koledar: '                                   // 32
    ],
    'gr': [
      'Οι ημερομηνίες μου',                                       // 0
      'Πρόσθεσε τις ξεχωριστές σου μέρες',                        // 1
      'Εθνικές γιορτές',                                          // 2
      'Μακρές περίοδοι',                                          // 3
      'Οι ξεχωριστές σου μέρες',                                  // 4
      'Μία μέρα',                                                 // 5
      'Περισσότερες μέρες',                                       // 6
      'Προσοχή',                                                  // 7
      'Θέλεις να διαγράψεις τη μέρα',                             // 8
      'Ακύρωση',                                                  // 9
      'Διαγραφή',                                                 // 10
      'Αποθήκευση',                                               // 11
      'Εισάγετε περιγραφή',                                       // 12
      'Υπάρχει ήδη εθνική γιορτή σε αυτή την ημερομηνία',         // 13
      'Περιγραφή',                                                // 14
      '(επαναλαμβάνεται κάθε χρόνο)',                             // 15
      'Οι ξεχωριστές σου μέρες',                                  // 16
      'Σε αυτή την ημερομηνία υπάρχει ήδη γεγονός',               // 17
      'Θέλεις να διαγράψεις όλες τις ημερομηνίες από αυτό το τμήμα?', // 18
      '(π.χ. μια σταθερή ημερομηνία που επαναλαμβάνεται κάθε χρόνο)', // 19
      '(π.χ. μια περίοδος διακοπών)',                             // 20
      'Η ημερομηνία έναρξης συμπίπτει με εθνική γιορτή',          // 21
      'Αυτή η ημερομηνία αποτελεί μέρος υπάρχουσας περιόδου',     // 22
      'Προσοχή, το γεγονός επικαλύπτεται με ',                    // 23
      'Προσοχή, το γεγονός έρχεται σε σύγκρουση με ',             // 24
      'Αυτή η ημερομηνία είναι ήδη παρούσα ',                     // 25
      'Πώς λειτουργεί;',                                          // 26
      'Πληροφορίες Απορρήτου',                                    // 27
      'Θα ήθελα να μοιραστώ αυτό το γεγονός μαζί σου:',           // 28
      'Κατέβασε το Ponti e Ferie!',                                    // 29
      'Πρόκειται να ανακατευθυνθείτε σε εξωτερική σελίδα. Θέλετε να συνεχίσετε;',  // 30
      'Συνέχεια',                                                 // 31
      'πρόσθεσέ το στο ημερολόγιό σου: '                         // 32
    ]
  };
  return dataLabel[language][item];
}

// LABEL USATE IN calendarScreen.tsx
export function calendarScrenLabels(language, item) {
  const dataLabel = {
    'it': [
      'Ponte!',                                   // 0
      'Ponti e Ferie! ha trovato questo ponte per te', // 1
      'ponti trovati!',                           // 2
      'ponte trovato!',                           // 3
      'Dal ',                                     // 4
      ' fino al ',                                // 5
      ' giorni)',                                 // 6
      'Il ',                                      // 7
      ' (1 giorno)',                              // 8
      'Possibile ponte!',                         // 9
      'Annulla',                                  // 10
      'Aggiungi',                                 // 11
      'Vorrei condividere con te questo evento:', // 12
      'Scarica Ponti e Ferie!',                        // 13
      'Aggiungilo al tuo calendario: ',          // 14
      'Permesso Calendario Richiesto',            // 15
      'Per salvare eventi nel calendario, Ponti e Ferie ha bisogno del permesso di accesso al calendario. Senza questo permesso non potrai salvare i ponti trovati nel tuo calendario.', // 16
      'Riprova',                                  // 17
      'Permesso Negato',                          // 18
      'Non potrai salvare eventi nel calendario finché non concedi il permesso nelle impostazioni del dispositivo.', // 19
      'Evento Aggiunto',                          // 20
      'Il ponte è stato aggiunto al tuo calendario!', // 21
      'Errore',                                   // 22
      'Si è verificato un errore durante il salvataggio dell\'evento nel calendario.' // 23
    ],
    'fr': [
      'Pont !',                                   // 0
      'Ponti e Ferie! a trouvé ce pont pour vous',     // 1
      'ponts trouvés !',                          // 2
      'pont trouvé !',                            // 3
      'Du ',                                      // 4
      ' au ',                                     // 5
      ' jours)',                                  // 6
      'Le ',                                      // 7
      ' (1 jour)',                                // 8
      'Pont possible !',                          // 9
      'Annuler',                                  // 10
      'Ajouter',                                  // 11
      'Je voudrais partager cet événement avec toi :',// 12
      'Télécharge Ponti e Ferie !',                    // 13
      'Ajoute-le à ton calendrier: ',            // 14
      'Permission Calendrier Requise',            // 15
      'Pour enregistrer des événements dans le calendrier, Ponti e Ferie a besoin de la permission d\'accès au calendrier. Sans cette permission, vous ne pourrez pas enregistrer les ponts trouvés dans votre calendrier.', // 16
      'Réessayer',                                // 17
      'Permission Refusée',                       // 18
      'Vous ne pourrez pas enregistrer d\'événements dans le calendrier tant que vous n\'aurez pas accordé la permission dans les paramètres de l\'appareil.', // 19
      'Événement Ajouté',                         // 20
      'Le pont a été ajouté à votre calendrier !', // 21
      'Erreur',                                   // 22
      'Une erreur s\'est produite lors de l\'enregistrement de l\'événement dans le calendrier.' // 23
    ],
    'es': [
      '¡Puente!',                                 // 0
      '¡Ponti e Ferie! encontró este puente para ti',  // 1
      '¡puentes encontrados!',                    // 2
      '¡puente encontrado!',                      // 3
      'Del ',                                     // 4
      ' al ',                                     // 5
      ' días)',                                   // 6
      'El ',                                      // 7
      ' (1 día)',                                 // 8
      '¡Posible puente!',                         // 9
      'Cancelar',                                 // 10
      'Añadir',                                    // 11
      'Me gustaría compartir este evento contigo:', // 12
      '¡Descarga Ponti e Ferie!',                      // 13
      'Añádelo a tu calendario: ',               // 14
      'Permiso de Calendario Requerido',          // 15
      'Para guardar eventos en el calendario, Ponti e Ferie necesita permiso de acceso al calendario. Sin este permiso no podrás guardar los puentes encontrados en tu calendario.', // 16
      'Reintentar',                               // 17
      'Permiso Denegado',                         // 18
      'No podrás guardar eventos en el calendario hasta que concedas el permiso en la configuración del dispositivo.', // 19
      'Evento Añadido',                           // 20
      '¡El puente ha sido añadido a tu calendario!', // 21
      'Error',                                    // 22
      'Se produjo un error al guardar el evento en el calendario.' // 23
    ],
    'de': [
      'Brücke!',                                  // 0
      'Ponti e Ferie! hat diese Brücke für dich gefunden', // 1
      'Brücken gefunden!',                        // 2
      'Brücke gefunden!',                         // 3
      'Vom ',                                     // 4
      ' bis ',                                    // 5
      ' Tage)',                                   // 6
      'Am ',                                      // 7
      ' (1 Tag)',                                 // 8
      'Mögliche Brücke!',                         // 9
      'Abbrechen',                                // 10
      'Hinzufügen',                               // 11
      'Ich möchte dieses Ereignis mit dir teilen:', // 12
      'Lade Ponti e Ferie herunter!',                  // 13
      'Füge es zu deinem Kalender hinzu: ',      // 14
      'Kalenderberechtigung Erforderlich',        // 15
      'Um Ereignisse im Kalender zu speichern, benötigt Ponti e Ferie die Berechtigung zum Zugriff auf den Kalender. Ohne diese Berechtigung können Sie die gefundenen Brücken nicht in Ihrem Kalender speichern.', // 16
      'Erneut versuchen',                         // 17
      'Berechtigung Verweigert',                  // 18
      'Sie können keine Ereignisse im Kalender speichern, bis Sie die Berechtigung in den Geräteeinstellungen erteilen.', // 19
      'Ereignis Hinzugefügt',                     // 20
      'Die Brücke wurde zu Ihrem Kalender hinzugefügt!', // 21
      'Fehler',                                   // 22
      'Beim Speichern des Ereignisses im Kalender ist ein Fehler aufgetreten.' // 23
    ],
    'en': [
      'Bridge!',                                  // 0
      'Ponti e Ferie! found this bridge for you',      // 1
      'bridges found!',                           // 2
      'bridge day found!',                        // 3
      'From ',                                    // 4
      ' to ',                                     // 5
      ' days)',                                   // 6
      'On ',                                      // 7
      ' (1 day)',                                 // 8
      'Possible bridge!',                         // 9
      'Cancel',                                   // 10
      'Add',                                      // 11
      'I would like to share this event with you:',// 12
      'Download Ponti e Ferie!',                       // 13
      'Add it to your calendar: ',               // 14
      'Calendar Permission Required',             // 15
      'To save events to the calendar, Ponti e Ferie needs permission to access the calendar. Without this permission you will not be able to save the bridges found to your calendar.', // 16
      'Retry',                                    // 17
      'Permission Denied',                        // 18
      'You will not be able to save events to the calendar until you grant permission in the device settings.', // 19
      'Event Added',                              // 20
      'The bridge has been added to your calendar!', // 21
      'Error',                                    // 22
      'An error occurred while saving the event to the calendar.' // 23
    ],
    'nl': [
      'Brug!',                                    // 0
      'Ponti e Ferie! vond deze brug voor jou',        // 1
      'bruggen gevonden!',                        // 2
      'brug gevonden!',                           // 3
      'Van ',                                     // 4
      ' tot ',                                    // 5
      ' dagen)',                                  // 6
      'Op ',                                      // 7
      ' (1 dag)',                                 // 8
      'Mogelijke brug!',                          // 9
      'Annuleren',                                // 10
      'Toevoegen',                                // 11
      'Ik wil deze gebeurtenis met je delen:',    // 12
      'Download Ponti e Ferie!',                       // 13
      'Voeg het toe aan je kalender: ',          // 14
      'Kalendertoestemming Vereist',              // 15
      'Om gebeurtenissen op te slaan in de kalender, heeft Ponti e Ferie toestemming nodig voor toegang tot de kalender. Zonder deze toestemming kunt u de gevonden bruggen niet opslaan in uw kalender.', // 16
      'Opnieuw proberen',                         // 17
      'Toestemming Geweigerd',                    // 18
      'U kunt geen gebeurtenissen opslaan in de kalender totdat u toestemming verleent in de apparaatinstellingen.', // 19
      'Gebeurtenis Toegevoegd',                   // 20
      'De brug is toegevoegd aan je kalender!',   // 21
      'Fout',                                     // 22
      'Er is een fout opgetreden bij het opslaan van de gebeurtenis in de kalender.' // 23
    ],
    'pt': [
      'Ponte!',                                   // 0
      'Ponti e Ferie! encontrou esta ponte para você', // 1
      'pontes encontradas!',                      // 2
      'ponte encontrada!',                        // 3
      'De ',                                      // 4
      ' até ',                                    // 5
      ' dias)',                                   // 6
      'Em ',                                      // 7
      ' (1 dia)',                                 // 8
      'Ponte possível!',                          // 9
      'Cancelar',                                 // 10
      'Adicionar',                                // 11
      'Gostaria de compartilhar este evento com você:',// 12
      'Baixe Ponti e Ferie!',                          // 13
      'Adicione ao seu calendário: ',            // 14
      'Permissão de Calendário Necessária',        // 15
      'Para salvar eventos no calendário, Ponti e Ferie precisa de permissão para acessar o calendário. Sem esta permissão você não poderá salvar as pontes encontradas no seu calendário.', // 16
      'Tentar novamente',                         // 17
      'Permissão Negada',                         // 18
      'Você não poderá salvar eventos no calendário até que conceda a permissão nas configurações do dispositivo.', // 19
      'Evento Adicionado',                        // 20
      'A ponte foi adicionada ao seu calendário!', // 21
      'Erro',                                     // 22
      'Ocorreu um erro ao salvar o evento no calendário.' // 23
    ],
    'hr': [
      'Most!',                                    // 0
      'Ponti e Ferie! je pronašao ovaj most za tebe',  // 1
      'mostovi pronađeni!',                       // 2
      'most pronađen!',                           // 3
      'Od ',                                      // 4
      ' do ',                                     // 5
      ' dana)',                                   // 6
      'Na ',                                      // 7
      ' (1 dan)',                                 // 8
      'Moguć most!',                              // 9
      'Otkaži',                                   // 10
      'Dodaj',                                    // 11
      'Želio bih podijeliti ovaj događaj s tobom:',// 12
      'Preuzmi Ponti e Ferie!',                        // 13
      'Dodaj u svoj kalendar: ',                 // 14
      'Potrebna Dozvola za Kalendar',             // 15
      'Za spremanje događaja u kalendar, Ponti e Ferie treba dozvolu za pristup kalendaru. Bez ove dozvole nećeš moći spremiti pronađene mostove u svoj kalendar.', // 16
      'Pokušaj ponovo',                            // 17
      'Dozvola Odbijena',                         // 18
      'Nećeš moći spremati događaje u kalendar dok ne dadeš dozvolu u postavkama uređaja.', // 19
      'Događaj Dodan',                             // 20
      'Most je dodan u tvoj kalendar!',           // 21
      'Greška',                                    // 22
      'Došlo je do greške prilikom spremanja događaja u kalendar.' // 23
    ],
    'si': [
      'Most!',                                    // 0
      'Ponti e Ferie! je našel ta most za tebe',       // 1
      'mostovi najdeni!',                         // 2
      'most najden!',                             // 3
      'Od ',                                      // 4
      ' do ',                                     // 5
      ' dni)',                                    // 6
      'Na ',                                      // 7
      ' (1 dan)',                                 // 8
      'Možen most!',                              // 9
      'Prekliči',                                 // 10
      'Dodaj',                                    // 11
      'Rad bi delil ta dogodek s teboj:',         // 12
      'Prenesi Ponti e Ferie!',                        // 13
      'Dodaj v svoj koledar: ',                  // 14
      'Potrebno Dovoljenje za Koledar',           // 15
      'Za shranjevanje dogodkov v koledar, Ponti e Ferie potrebuje dovoljenje za dostop do koledarja. Brez tega dovoljenja ne boste mogli shraniti najdenih mostov v svoj koledar.', // 16
      'Poskusi znova',                            // 17
      'Dovoljenje Zavrnjeno',                     // 18
      'Ne boste mogli shranjevati dogodkov v koledar, dokler ne podelite dovoljenja v nastavitvah naprave.', // 19
      'Dogodek Dodan',                            // 20
      'Most je bil dodan v vaš koledar!',         // 21
      'Napaka',                                   // 22
      'Prišlo je do napake pri shranjevanju dogodka v koledar.' // 23
    ],
    'gr': [
      'Γέφυρα!',                                  // 0
      'Το Ponti e Ferie! βρήκε αυτή τη γέφυρα για σας', // 1
      'γέφυρες βρέθηκαν!',                        // 2
      'γέφυρα βρέθηκε!',                          // 3
      'Από ',                                     // 4
      ' έως ',                                    // 5
      ' μέρες)',                                  // 6
      'Στις ',                                    // 7
      ' (1 μέρα)',                                // 8
      'Πιθανή γέφυρα!',                           // 9
      'Ακύρωση',                                  // 10
      'Προσθήκη',                                 // 11
      'Θα ήθελα να μοιραστώ αυτό το γεγονός μαζί σου:',// 12
      'Κατέβασε το Ponti e Ferie!',                    // 13
      'πρόσθεσέ το στο ημερολόγιό σου: ',         // 14
      'Απαιτείται Άδεια Ημερολογίου',             // 15
      'Για να αποθηκεύσετε γεγονότα στο ημερολόγιο, το Ponti e Ferie χρειάζεται άδεια πρόσβασης στο ημερολόγιο. Χωρίς αυτήν την άδεια δεν θα μπορείτε να αποθηκεύσετε τις γέφυρες που βρέθηκαν στο ημερολόγιό σας.', // 16
      'Επανάληψη',                                // 17
      'Άρνηση Άδειας',                         // 18
      'Δεν θα μπορείτε να αποθηκεύσετε γεγονότα στο ημερολόγιο μέχρι να χορηγήσετε άδεια στις ρυθμίσεις της συσκευής.', // 19
      'Γεγονός Προστέθηκε',                      // 20
      'Η γέφυρα προστέθηκε στο ημερολόγιό σας!', // 21
      'Σφάλμα',                                   // 22
      'Παρουσιάστηκε σφάλμα κατά την αποθήκευση του γεγονότος στο ημερολόγιο.' // 23
    ]
  };
  return dataLabel[language][item];
}

// LABEL USATE IN NewDatepicker
export function datepickerLabels(language, item) {
  const dataLabel = {
    'it': [
      'Aggiungi un evento',      // 0
      '1 giorno',                // 1
      '2 giorni',                // 2
      '3 giorni',                // 3
      'Personalizza',            // 4
      'Annulla',                 // 5
      'Aggiungi',                // 6
      'Descrizione',             // 7
      'Ripete',                  // 8
      'Ripete ogni anno, il',    // 9
      'primo',                   // 10
      'secondo',                 // 11
      'terzo',                   // 12
      'quarto',                  // 13
      'quinto',                  // 14
      'di',                      // 15
      'Chiudi',                  // 16
      'Ok',                      // 17
      'Aggiorna',                // 18
      'Modifica evento',         // 19
    ],
    'fr': [
      'Ajouter un événement',    // 0
      '1 jour',                  // 1
      '2 jours',                 // 2
      '3 jours',                 // 3
      'Personnaliser',           // 4
      'Annuler',                 // 5
      'Ajouter',                 // 6
      'Description',             // 7
      'Répète',                  // 8
      'Répète chaque année, le', // 9
      'premier',                 // 10
      'deuxième',                // 11
      'troisième',               // 12
      'quatrième',               // 13
      'cinquième',               // 14
      'de',                      // 15
      'Fermer',                  // 16
      'Ok',                      // 17
      'Mettre à jour',           // 18
      'Modifier événement',      // 19
    ],
    'es': [
      'Añadir un evento',        // 0
      '1 día',                   // 1
      '2 días',                  // 2
      '3 días',                  // 3
      'Personalizar',            // 4
      'Cancelar',                // 5
      'Añadir',                  // 6
      'Descripción',             // 7
      'Repite',                  // 8
      'Repite cada año, el',     // 9
      'primer',                  // 10
      'segundo',                 // 11
      'tercer',                  // 12
      'cuarto',                  // 13
      'quinto',                  // 14
      'de',                      // 15
      'Cerrar',                  // 16
      'Ok',                      // 17
      'Actualizar',              // 18
      'Modificar evento',        // 19
    ],
    'de': [
      'Ereignis hinzufügen',     // 0
      '1 Tag',                   // 1
      '2 Tage',                  // 2
      '3 Tage',                  // 3
      'Anpassen',                // 4
      'Abbrechen',               // 5
      'Hinzufügen',              // 6
      'Beschreibung',            // 7
      'Wiederholt sich',         // 8
      'Wiederholt sich jedes Jahr, am', // 9
      'ersten',                  // 10
      'zweiten',                 // 11
      'dritten',                 // 12
      'vierten',                 // 13
      'fünften',                 // 14
      'des',                     // 15
      'Schließen',               // 16
      'Ok',                      // 17
      'Aktualisieren',           // 18
      'Ereignis bearbeiten',     // 19
    ],
    'en': [
      'Add an event',            // 0
      '1 day',                   // 1
      '2 days',                  // 2
      '3 days',                  // 3
      'Customize',               // 4
      'Cancel',                  // 5
      'Add',                     // 6
      'Description',             // 7
      'Repeats',                 // 8
      'Repeats every year, on the', // 9
      'first',                   // 10
      'second',                  // 11
      'third',                   // 12
      'fourth',                  // 13
      'fifth',                   // 14
      'of',                      // 15
      'Close',                   // 16
      'Ok',                      // 17
      'Update',                  // 18
      'Edit event',              // 19
    ],
    'nl': [
      'Evenement toevoegen',     // 0
      '1 dag',                   // 1
      '2 dagen',                 // 2
      '3 dagen',                 // 3
      'Aanpassen',               // 4
      'Annuleren',               // 5
      'Toevoegen',               // 6
      'Beschrijving',            // 7
      'Herhaalt',                // 8
      'Herhaalt elk jaar, op de', // 9
      'eerste',                  // 10
      'tweede',                  // 11
      'derde',                   // 12
      'vierde',                  // 13
      'vijfde',                  // 14
      'van',                     // 15
      'Sluiten',                 // 16
      'Ok',                      // 17
      'Bijwerken',               // 18
      'Evenement bewerken',      // 19
    ],
    'pt': [
      'Adicionar um evento',     // 0
      '1 dia',                   // 1
      '2 dias',                  // 2
      '3 dias',                  // 3
      'Personalizar',            // 4
      'Cancelar',                // 5
      'Adicionar',               // 6
      'Descrição',               // 7
      'Repete',                  // 8
      'Repete todo ano, no',     // 9
      'primeiro',                // 10
      'segundo',                 // 11
      'terceiro',                // 12
      'quarto',                  // 13
      'quinto',                  // 14
      'de',                      // 15
      'Fechar',                  // 16
      'Ok',                      // 17
      'Atualizar',               // 18
      'Editar evento',           // 19
    ],
    'hr': [
      'Dodaj događaj',           // 0
      '1 dan',                   // 1
      '2 dana',                  // 2
      '3 dana',                  // 3
      'Prilagodi',               // 4
      'Otkaži',                  // 5
      'Dodaj',                   // 6
      'Opis',                    // 7
      'Ponavlja se',             // 8
      'Ponavlja se svake godine,', // 9
      'prvi',                    // 10
      'drugi',                   // 11
      'treći',                   // 12
      'četvrti',                 // 13
      'peti',                    // 14
      'u',                       // 15
      'Zatvori',                 // 16
      'Ok',                      // 17
      'Ažuriraj',                // 18
      'Uredi događaj',           // 19
    ],
    'si': [
      'Dodaj dogodek',           // 0
      '1 dan',                   // 1
      '2 dni',                   // 2
      '3 dni',                   // 3
      'Prilagodi',               // 4
      'Prekliči',                // 5
      'Dodaj',                   // 6
      'Opis',                    // 7
      'Ponavlja se',             // 8
      'Ponavlja se vsako leto,', // 9
      'prvi',                    // 10
      'drugi',                   // 11
      'tretji',                  // 12
      'četrti',                  // 13
      'peti',                    // 14
      'v',                       // 15
      'Zapri',                   // 16
      'Ok',                      // 17
      'Posodobi',                // 18
      'Uredi dogodek',           // 19
    ],
    'gr': [
      'Προσθήκη συμβάντος',      // 0
      '1 μέρα',                  // 1
      '2 μέρες',                 // 2
      '3 μέρες',                 // 3
      'Προσαρμογή',              // 4
      'Ακύρωση',                 // 5
      'Προσθήκη',                // 6
      'Περιγραφή',               // 7
      'Επαναλαμβάνεται',         // 8
      'Επαναλαμβάνεται κάθε χρόνο, στις', // 9
      'πρώτη',                   // 10
      'δεύτερη',                 // 11
      'τρίτη',                   // 12
      'τέταρτη',                 // 13
      'πέμπτη',                  // 14
      'του',                     // 15
      'Κλείσιμο',                // 16
      'Ok',                      // 17
      'Ενημέρωση',               // 18
      'Επεξεργασία συμβάντος',   // 19
    ],
  };
  return dataLabel[language][item];
}

export function privacy(language, item) {
  const dataLabel = {
    'en': [
      'PRIVACY POLICY\n\nLast Update: December 2025\n\n1. INTRODUCTION\n\n Ponti e Ferie! respects user privacy and is committed to protecting personal data in compliance with the General Data Protection Regulation (GDPR) and applicable regulations.\n\n2. DATA CONTROLLER \n\nAngeli & Associati Milan - angelieassociati@gmail.com \n\n3. DATA COLLECTED\n\n3.1 Data provided directly by the user\n\n- The application locally manages the following voluntarily entered data:\n\n- Personal events: holidays, anniversaries, and appointments entered into the application.\n\n- Preferences: selection of the reference country for holidays, language settings, and search filters.\n\n3.2 AUTOMATICALLY COLLECTED DATA (THIRD PARTY SERVICES) \n\nWhile the app authors do not directly collect personal data, the application uses Google AdMob to display advertisements. To operate this service, the following data may be automatically collected and processed:\n\n- IP Address (to estimate approximate location).\n\n- Device Identifiers (such as Android Advertising ID or iOS IDFA).\n\n- Usage data, diagnostics, and ad interactions.\n\n- Cookies and similar technologies for ad frequency capping and fraud prevention.\n\n3.3 USER SHARING \n\nWhen the user chooses to share dates or bridges with third parties, the information is transmitted through the device\'s native sharing system. The app does not store or track what content is shared, with whom, or when. Sharing occurs exclusively upon the user\'s voluntary initiative.\n\n4. PURPOSE OF PROCESSING \n\nData is processed for the following purposes:\n\n- App Functionality: To calculate available bridges between holidays, display the personalized calendar, and manage holidays.\n\n- Advertising: To display advertisements (including personalized ones, subject to consent) via the Google AdMob service.\n\n5. LEGAL BASIS FOR PROCESSING \n\nProcessing is based on user consent. Regarding personalized advertising, consent is explicitly requested via a Consent Management Platform (CMP) upon app launch, in compliance with Google policies and GDPR.\n\n6. DATA RETENTION\n\nUser Data: All personal data (events, holidays) entered is stored exclusively locally on the user\'s device and is not transferred to external servers managed by the developer.\n\nAdvertising Data: Technical data collected by Google AdMob is managed according to Google\'s retention policies.\n\n7. DATA SHARING AND THIRD PARTIES \n\nThe developer DOES NOT share or sell user personal data (events, names, notes) to third parties. However, the app integrates third-party services necessary for the project\'s sustainability:\n\n- Google AdMob (Google LLC/Google Ireland Ltd): Advertising service provider. For more information: Google Privacy Policy.\n\n8. USER RIGHTS \n\nIn accordance with GDPR, users have the right to:\n\n- Access and Rectification: View and modify their data directly within the app.\n\n- Erasure: Delete all data by uninstalling the application or manually deleting events.\n\n- Ad Management: Users can revoke consent for ad personalization via device settings or the app\'s internal privacy options.\n\n- Objection: Cease using the application at any time.\n\n9. DATA SECURITY \n\nPonti e Ferie! adopts appropriate technical measures, such as secure local storage on the device. Please note that the transmission of data required for ad delivery occurs via secure protocols managed by Google.\n\n10. MINOR USERS \n\nThe application is suitable for users of all ages. It does not intentionally collect identifying personal data from minors. Since the app displays advertisements, parental supervision is recommended for users under 13 years of age (or the applicable minimum age in their country).\n\n11. CHANGES TO THE POLICY \n\nWe reserve the right to update this policy. Changes will be communicated through app updates or Store notifications.\n\n12. CONTACT \n\nFor privacy-related questions or requests, contact: angelieassociati@gmail.com.\n\n13. SUPERVISORY AUTHORITY \n\nUsers have the right to lodge a complaint with the competent supervisory authority (Italy: Data Protection Authority - www.garanteprivacy.it).\n\n\n\n\n\n'
    ]
  }
  return dataLabel[language][item];
}

export function faq(language, item) {
  const dataLabel = {
    'it': [
      "FAQ: COS'È PONTI E FERIE! E A COSA SERVE?\n\nPonti e Ferie! è un'app che ti aiuta a individuare automaticamente tutte le opportunità di ponte tra le festività. Grazie a un calendario perpetuo che scorre nel tempo, l'app calcola quando è possibile ottenere giorni di riposo extra collegando festività e weekend, aiutandoti a pianificare al meglio ferie e viaggi.\n\nL’APP MOSTRA ANCHE I PONTI PASSATI?\n\nNo, Ponti e Ferie! calcola solo i ponti futuri a partire dal mese corrente. Non è possibile visualizzare date precedenti: l'obiettivo dell'app è aiutarti a pianificare i prossimi ponti disponibili.\n\nPER QUALI PAESI FUNZIONA PONTI E FERIE!?\n\nL'app include le festività nazionali fisse di 14 Paesi europei:\n\n⁃ 🇮🇹 Italia\n⁃ 🇦🇹 Austria\n⁃ 🇨🇭 Svizzera\n⁃ 🇫🇷 Francia\n⁃ 🇩🇪 Germania\n⁃ 🇪🇸 Spagna\n⁃ 🇵🇹 Portogallo\n⁃ 🇧🇪 Belgio\n⁃ 🇳🇱 Olanda\n⁃ 🇬🇧 Regno Unito\n⁃ 🇮🇪 Irlanda\n⁃ 🇸🇮 Slovenia\n⁃ 🇵🇹 Croazia\n⁃ 🇬🇷 Grecia\n\n\n* CONSIGLI PER L'USO\n\n\nCOME SFRUTTO AL MEGLIO PONTI E FERIE! PER PIANIFICARE LE MIE VACANZE?\n\n1) Imposta i tuoi giorni festivi settimanali nella pagina 'Filtri'\n\n2) Aggiungi eventuali festività personali o locali in 'Le mie date'\n\n3) Scorri il calendario per individuare i ponti evidenziati in blu\n\n4) Tocca le date dei ponti per aggiungerle al calendario del tuo dispositivo\n\n5) Pianifica le tue ferie in base alle migliori opportunità trovate\n\nPOSSO USARE PONTI E FERIE! PER VIAGGI ALL'ESTERO?\n\nCertamente! Seleziona il Paese di destinazione dalla pagina 'Le mie date' per visualizzare i ponti basati sulle festività locali. In questo modo potrai pianificare il viaggio tenendo conto sia delle tue festività che di quelle del Paese che visiterai.\n\nQUANTO LONTANO NEL FUTURO POSSO PIANIFICARE?\n\nIl calendario scorre in avanti all'infinito, quindi puoi pianificare i tuoi ponti con qualsiasi anticipo desideri, anche per anni futuri.\n\n\n* IL CALENDARIO\n\n\nCOME FUNZIONA IL CALENDARIO DI PONTI E FERIE!?\n\nIl calendario parte dal mese corrente e scorre in avanti all'infinito. Le date sono visualizzate con colori diversi per aiutarti a distinguere rapidamente i diversi tipi di giorni.\n\nCOSA SIGNIFICANO I DIVERSI COLORI NEL CALENDARIO?\n\n⁃ Carattere nero semplice: giorni feriali\n⁃ Carattere rosso grassetto: giorni della settimana che hai impostato come festivi (es. sabato e domenica)\n⁃ Carattere rosso cerchiato: festività nazionali o date personali che hai inserito\n⁃ Sfondo blu con carattere bianco: possibili ponti identificati dall'app\n\nCOSA SUCCEDE QUANDO TOCCO UNA DATA NEL CALENDARIO?\n\nDipende dal tipo di data:\n\n⁃ giorni feriali: tenendo premuto a lungo puoi aggiungere quella data alle tue festività personali\n⁃ weekend/festivi settimanali: non succede niente\n⁃ festività nazionali o personali: appare un messaggio con il nome dell'evento\n⁃ possibili ponti: l'app ti chiede se vuoi aggiungere quella data al calendario del tuo dispositivo\n\n\n* LE MIE DATE\n\n\nCOME POSSO CAMBIARE IL PAESE DELLE FESTIVITÀ?\n\nNella pagina 'Le mie date' trovi un menu a tendina dove puoi selezionare uno dei 14 Paesi disponibili. Questa funzione è particolarmente utile se stai pianificando un viaggio e vuoi conoscere i ponti locali del Paese di destinazione.\n\nPOSSO MODIFICARE L'ELENCO DELLE FESTIVITÀ NAZIONALI?\n\nNon puoi modificare l'elenco predefinito, ma puoi escludere dal calcolo alcune festività che non desideri o non puoi celebrare. Basta deselezionarle dall'elenco.\n\nCOME FACCIO A RIPRISTINARE LE FESTIVITÀ DEL MIO PAESE?\n\nSe hai selezionato le festività di un altro Paese, comparirà un pulsante accanto al menu di selezione che ti permette di ripristinare rapidamente il Paese di default.\n\nPOSSO AGGIUNGERE FESTIVITÀ PERSONALI?\n\nSì! Nella pagina 'Le mie date' puoi aggiungere i tuoi giorni speciali, come la festa del santo patrono locale o altre ricorrenze personali. Hai due opzioni:\n\n- Eventi di un giorno: per festività che ricorrono in una data specifica\n- Periodi di più giorni: per eventi che durano più giorni consecutivi\n\nLE DATE PERSONALI SI POSSONO RIPETERE OGNI ANNO?\n\nSì, quando aggiungi una data personale puoi scegliere se farla ripetere automaticamente ogni anno. Hai due modalità di ripetizione:\n\n- In base alla data: ad esempio sempre il 7 dicembre\n- In base al giorno del mese: ad esempio sempre il terzo giovedì di novembre\n\nCOME POSSO MODIFICARE O ELIMINARE LE DATE PERSONALI?\n\nLe date personali possono essere editate o eliminate sia singolarmente che in blocco direttamente dalla pagina 'Le mie date'.\n\n\n* CONDIVISIONE\n\n\nPOSSO CONDIVIDERE I PONTI O LE DATE CON ALTRE PERSONE?\n\nSì! Ponti e Ferie! ti permette di condividere con i tuoi contatti sia i ponti identificati dall'app che le date personali che hai inserito. Questa funzione è utile per coordinare ferie o eventi con colleghi, amici e familiari.\n\nCOME FUNZIONA LA CONDIVISIONE?\n\nQuando condividi un elemento, l'app genera un messaggio che include:\n\n- per i ponti identificati: informazioni sul ponte (data e durata) e il link per scaricare l'app\n- per le date personali: i dettagli dell'evento e un link speciale che permette al destinatario di aggiungere automaticamente quella data alla propria app Ponti e Ferie! (se già installata), oltre al link per scaricare l'app\n\nCHI RICEVE LA CONDIVISIONE DEVE AVERE PONTI E FERIE! INSTALLATA?\n\nPer visualizzare le informazioni base: no, chiunque può leggere i dettagli nel messaggio Per aggiungere automaticamente una data personale condivisa alla propria app: sì, è necessario avere Ponti e Ferie! già installata\n\nQUALI DATI VENGONO CONDIVISI?\n\nQuando condividi un elemento, vengono trasmesse solo le informazioni specifiche di quella data o ponte (descrizione, data, durata). Nessun altro dato personale o preferenza della tua app viene condiviso.\n\nFILTRI E PERSONALIZZAZIONE\n\nQUALI FILTRI POSSO IMPOSTARE PER IL CALCOLO DEI PONTI?\n\nNella pagina 'Filtri' puoi personalizzare completamente il calcolo dei ponti secondo le tue esigenze:\n\n- Durata del ponte: da 1 a 3 giorni\n- Giorni della settimana festivi: puoi selezionare quali giorni considerare come festivi (di default sabato e domenica)\n- Elenchi di festività: puoi scegliere se includere le festività nazionali e/o quelle personali\n\nPOSSO CONSIDERARE FESTIVI GIORNI DIVERSI DA SABATO E DOMENICA?\n\nSì, nella sezione 'Giorni della settimana festivi' puoi attivare o disattivare qualsiasi giorno della settimana secondo le tue esigenze lavorative.\n\nQUALI FESTIVITÀ CATTOLICHE POSSO INCLUDERE?\n\nPonti e Ferie! ti permette di includere nel calcolo le principali festività cattoliche a data variabile:\n\n⁃ Pasqua\n⁃ Lunedì dell'Angelo\n⁃ Ascensione\n⁃ Pentecoste\n⁃ Lunedì di Pentecoste\n⁃ Corpus Domini\n\nQueste festività sono particolarmente utili se viaggi in Paesi dove vengono celebrate come giorni festivi nazionali.\n\nPOSSO MODIFICARE LE DATE DIRETTAMENTE DALLA PAGINA FILTRI?\n\nSì, nella pagina 'Filtri' trovi un pulsante che ti rimanda rapidamente alla pagina 'Le mie date' per modificare l'elenco delle festività.\n\n\n* PRIVACY E SUPPORTO\n\n\nDOVE TROVO INFORMAZIONI SULLA PRIVACY?\n\nTroverai tutte le informazioni sulla privacy nel pulsante “Info Privacy” e nella pagina dello store insieme al supporto con le FAQ complete.\n\nCOME POSSO OTTENERE AIUTO O SEGNALARE UN PROBLEMA?\n\nPuoi consultare le FAQ complete in questo sito web o contattare il supporto scrivendo a: angelieassociati@gmail.com\n\n\n\n\n"
    ],
    'en': [
      "FAQ: WHAT IS PONTI E FERIE! AND WHAT IS IT FOR?\n\n\nPonti e Ferie! is an app that helps you automatically identify all bridge opportunities between holidays. Thanks to a perpetual calendar that scrolls through time, the app calculates when it's possible to get extra days off by connecting holidays and weekends, helping you better plan vacations and trips.\n\nDOES THE APP ALSO SHOW PAST BRIDGES?\n\nNo, Ponti e Ferie! only calculates future bridges starting from the current month. It's not possible to view previous dates: the app's goal is to help you plan upcoming available bridges.\n\nWHICH COUNTRIES DOES PONTI E FERIE! WORK FOR?\n\nThe app includes fixed national holidays from 14 European countries:\n\n⁃ 🇮🇹 Italy\n⁃ 🇦🇹 Austria\n⁃ 🇨🇭 Switzerland\n⁃ 🇫🇷 France\n⁃ 🇩🇪 Germany\n⁃ 🇪🇸 Spain\n⁃ 🇵🇹 Portugal\n⁃ 🇧🇪 Belgium\n⁃ 🇳🇱 Netherlands\n⁃ 🇬🇧 United Kingdom\n⁃ 🇮🇪 Ireland\n⁃ 🇸🇮 Slovenia\n⁃ 🇭🇷 Croatia\n⁃ 🇬🇷 Greece.\n\n\n* USAGE TIPS\n\n\nHOW DO I BEST USE PONTI E FERIE! TO PLAN MY VACATIONS?\n\n1) Set your weekly holidays in the 'Filters' page\n\n2) Add any personal or local holidays in 'My dates'\n\n3) Scroll through the calendar to identify bridges highlighted in blue\n\n4) Tap on bridge dates to add them to your device calendar\n\n5) Plan your holidays based on the best opportunities found\n\nCAN I USE PONTI E FERIE! FOR TRIPS ABROAD?\n\nCertainly! Select the destination country from the 'My dates' page to view bridges based on local holidays. This way you can plan your trip taking into account both your holidays and those of the country you'll visit.\n\nHOW FAR INTO THE FUTURE CAN I PLAN?\n\nThe calendar scrolls forward infinitely, so you can plan your bridges with any advance notice you wish, even for future years.\n\n\n* THE CALENDAR\n\n\nHow does the Ponti e Ferie! calendar work?\n\nThe calendar starts from the current month and scrolls forward infinitely. Dates are displayed with different colors to help you quickly distinguish different types of days.\n\nWHAT DO THE DIFFERENT COLORS IN THE CALENDAR MEAN?\n\n⁃ Simple black text: working days\n⁃ Bold red text: days of the week you've set as holidays (e.g. Saturday and Sunday)\n⁃ Circled red text: national holidays or personal dates you've entered\n⁃ Blue background with white text: possible bridges identified by the app\n\nWHAT HAPPENS WHEN I TAP A DATE IN THE CALENDAR?\n\nIt depends on the type of date:\n\n⁃ working days: by long pressing you can add that date to your personal holidays\n⁃ weekend/weekly holidays: nothing happens\n⁃ national or personal holidays: a message appears with the event name\n⁃ possible bridges: the app asks if you want to add that date to your device calendar\n\n\n* MY DATES\n\n\nHOW CAN I CHANGE THE HOLIDAY COUNTRY?\n\nOn the 'My dates' page you'll find a dropdown menu where you can select one of the 14 available countries. This feature is particularly useful if you're planning a trip and want to know the local bridges of the destination country.\n\nCAN I MODIFY THE LIST OF NATIONAL HOLIDAYS?\n\nYou can't modify the default list, but you can exclude from calculation some holidays you don't want or can't celebrate. Just deselect them from the list.\n\nHOW DO I RESTORE MY COUNTRY'S HOLIDAYS?\n\nIf you've selected another country's holidays, a button will appear next to the selection menu that allows you to quickly restore the default country.\n\nCAN I ADD PERSONAL HOLIDAYS?\n\nYes! On the 'My dates' page you can add your special days, such as local patron saint festivals or other personal occasions. You have two options:\n\n- Single-day events: for holidays that occur on a specific date\n- Multi-day periods: for events lasting several consecutive days\n\nCAN PERSONAL DATES REPEAT EVERY YEAR?\n\nYes, when you add a personal date you can choose whether to make it repeat automatically every year. You have two repeat modes:\n\n- By date: for example always on December 7th\n- By day of month: for example always on the third Thursday of November\n\nHOW CAN I EDIT OR DELETE PERSONAL DATES?\n\nPersonal dates can be edited or deleted either individually or in bulk directly from the 'My dates' page.\n\n\n*SHARING\n\n\nCAN I SHARE BRIDGES OR DATES WITH OTHER PEOPLE?\n\nYes! Ponti e Ferie! allows you to share with your contacts both the bridges identified by the app and the personal dates you've entered. This feature is useful for coordinating holidays or events with colleagues, friends and family.\n\nHOW DOES SHARING WORK?\n\nWhen you share an item, the app generates a message that includes:\n\n- for identified bridges: bridge information (date and duration) and the link to download the app\n- for personal dates: event details and a special link that allows the recipient to automatically add that date to their own Ponti e Ferie! app (if already installed), plus the link to download the app\n\nDOES THE RECIPIENT NEED TO HAVE PONTI E FERIE! INSTALLED?\n\nTo view basic information: no, anyone can read the details in the message\nTo automatically add a shared personal date to their own app: yes, they need to have Ponti e Ferie! already installed\n\nWHAT DATA IS SHARED?\n\nWhen you share an item, only the specific information for that date or bridge (description, date, duration) is transmitted. No other personal data or preferences from your app are shared.\n\n\n* FILTERS AND CUSTOMIZATION\n\n\nWHAT FILTERS CAN I SET FOR BRIDGE CALCULATION?\n\nOn the 'Filters' page you can completely customize bridge calculation according to your needs:\n\n- Bridge duration: from 1 to 3 days\n- Weekly holidays: you can select which days to consider as holidays (default Saturday and Sunday)\n- Holiday lists: you can choose whether to include national and/or personal holidays\n\nCan I consider days other than Saturday and Sunday as holidays?\n\nYes, in the 'Weekly holidays' section you can enable or disable any day of the week according to your work needs.\n\nWhich Catholic holidays can I include?\n\nPONTI E FERIE! ALLOWS YOU TO INCLUDE IN THE CALCULATION THE MAIN CATHOLIC HOLIDAYS WITH VARIABLE DATES:\n\n⁃ Easter\n⁃ Easter Monday\n⁃ Ascension\n⁃ Pentecost\n⁃ Whit Monday\n⁃ Corpus Christi\n\nThese holidays are particularly useful if you travel to countries where they are celebrated as national holidays.\n\nCAN I MODIFY DATES DIRECTLY FROM THE FILTERS PAGE?\n\nYes, on the 'Filters' page you'll find a button that quickly redirects you to the 'My dates' page to modify the holiday list.\n\n\n* PRIVACY AND SUPPORT\n\n\nWHERE CAN I FIND PRIVACY INFORMATION?\n\nYou'll find all privacy information in the 'Privacy Info' button and on the store page along with support and complete FAQs.\n\nHOW CAN I GET HELP OR REPORT AN ISSUE?\n\nYou can consult the complete FAQs on this website or contact support by writing to: angelieassociati@gmail.com\n\n\n\n\n"
    ],
    'de': [
      "FAQ: WAS IST PONTI E FERIE! UND WOFÜR DIENT ES?\n\n\nPonti e Ferie! ist eine App, die dir hilft, automatisch alle Brückenmöglichkeiten zwischen Feiertagen zu identifizieren. Dank eines ewigen Kalenders, der durch die Zeit scrollt, berechnet die App, wann es möglich ist, zusätzliche freie Tage zu bekommen, indem Feiertage und Wochenenden verbunden werden, und hilft dir so, Urlaub und Reisen optimal zu planen.\n\nZEIGT DIE APP AUCH VERGANGENE BRÜCKEN?\n\nNein, Ponti e Ferie! berechnet nur zukünftige Brücken ab dem aktuellen Monat. Es ist nicht möglich, vorherige Daten anzuzeigen: Das Ziel der App ist es, dir zu helfen, die kommenden verfügbaren Brücken zu planen.\n\nFÜR WELCHE LÄNDER FUNKTIONIERT PONTI E FERIE!?\n\nDie App enthält feste nationale Feiertage aus 14 europäischen Ländern:\n\n⁃ 🇮🇹 Italien\n⁃ 🇦🇹 Österreich\n⁃ 🇨🇭 Schweiz\n⁃ 🇫🇷 Frankreich\n⁃ 🇩🇪 Deutschland\n⁃ 🇪🇸 Spanien\n⁃ 🇵🇹 Portugal\n⁃ 🇧🇪 Belgien\n⁃ 🇳🇱 Niederlande\n⁃ 🇬🇧 Vereinigtes Königreich\n⁃ 🇮🇪 Irland\n⁃ 🇸🇮 Slowenien\n⁃ 🇭🇷 Kroatien\n⁃ 🇬🇷 Griechenland.\n\n\n* NUTZUNGSTIPPS\n\n\nWIE NUTZE ICH PONTI E FERIE! AM BESTEN, UM MEINEN URLAUB ZU PLANEN?\n\n1) Lege deine wöchentlichen freien Tage auf der Seite 'Filter' fest\n\n2) Füge eventuelle persönliche oder lokale Feiertage unter 'Meine Termine' hinzu\n\n3) Scrolle durch den Kalender, um die blau hervorgehobenen Brücken zu finden\n\n4) Tippe auf die Brückendaten, um sie zu deinem Gerätekalender hinzuzufügen\n\n5) Plane deinen Urlaub basierend auf den besten gefundenen Möglichkeiten\n\nKANN ICH PONTI E FERIE! FÜR REISEN INS AUSLAND NUTZEN?\n\nAuf jeden Fall! Wähle das Zielland auf der Seite 'Meine Termine' aus, um Brücken basierend auf den lokalen Feiertagen anzuzeigen. So kannst du deine Reise unter Berücksichtigung sowohl deiner Feiertage als auch der des Landes, das du besuchst, planen.\n\nWIE WEIT IN DIE ZUKUNFT KANN ICH PLANEN?\n\nDer Kalender scrollt unendlich nach vorne, sodass du deine Brücken mit beliebigem Vorlauf planen kannst, auch für zukünftige Jahre.\n\n\n* DER KALENDER\n\n\nWIE FUNKTIONIERT DER PONTI E FERIE! KALENDER?\n\nDer Kalender beginnt beim aktuellen Monat und scrollt unendlich nach vorne. Die Daten werden mit verschiedenen Farben angezeigt, um dir zu helfen, schnell verschiedene Tagestypen zu unterscheiden.\n\n\nWAS BEDEUTEN DIE VERSCHIEDENEN FARBEN IM KALENDER?\n\n⁃ Einfacher schwarzer Text: Arbeitstage\n⁃ Fetter roter Text: Wochentage, die du als Feiertage festgelegt hast (z.B. Samstag und Sonntag)\n⁃ Rot umkreister Text: Nationale Feiertage oder persönliche Termine, die du eingetragen hast\n⁃ Blauer Hintergrund mit weißem Text: Mögliche Brücken, die von der App identifiziert wurden\n\n\nWAS PASSIERT, WENN ICH EIN DATUM IM KALENDER ANTIPPE?\n\nDas hängt vom Datumstyp ab:\n\n⁃ Arbeitstage: durch langes Drücken kannst du dieses Datum zu deinen persönlichen Feiertagen hinzufügen\n⁃ Wochenende/wöchentliche Feiertage: nichts passiert\n⁃ Nationale oder persönliche Feiertage: es erscheint eine Nachricht mit dem Ereignisnamen\n⁃ Mögliche Brücken: die App fragt dich, ob du dieses Datum zu deinem Gerätekalender hinzufügen möchtest\n\n\n* MEINE TERMINE\n\n\nWIE KANN ICH DAS FEIERTAGSLAND ÄNDERN?\n\nAuf der Seite 'Meine Termine' findest du ein Dropdown-Menü, wo du eines der 14 verfügbaren Länder auswählen kannst. Diese Funktion ist besonders nützlich, wenn du eine Reise planst und die lokalen Brücken des Ziellandes kennen möchtest.\n\nKANN ICH DIE LISTE DER NATIONALEN FEIERTAGE ÄNDERN?\n\nDu kannst die Standardliste nicht ändern, aber du kannst einige Feiertage von der Berechnung ausschließen, die du nicht feiern möchtest oder kannst. Wähle sie einfach in der Liste ab.\n\nWIE STELLE ICH DIE FEIERTAGE MEINES LANDES WIEDER HER?\n\nWenn du die Feiertage eines anderen Landes ausgewählt hast, erscheint eine Schaltfläche neben dem Auswahlmenü, mit der du schnell das Standardland wiederherstellen kannst.\n\nKANN ICH PERSÖNLICHE FEIERTAGE HINZUFÜGEN?\n\nJa! Auf der Seite 'Meine Termine' kannst du deine besonderen Tage hinzufügen, wie das Fest des lokalen Schutzheiligen oder andere persönliche Anlässe. Du hast zwei Optionen:\n\n- Eintägige Ereignisse: für Feiertage, die an einem bestimmten Datum stattfinden\n- Mehrtägige Zeiträume: für Ereignisse, die mehrere aufeinanderfolgende Tage dauern\n\nKÖNNEN SICH PERSÖNLICHE TERMINE JEDES JAHR WIEDERHOLEN?\n\nJa, wenn du ein persönliches Datum hinzufügst, kannst du wählen, ob es sich automatisch jedes Jahr wiederholen soll. Du hast zwei Wiederholungsmodi:\n\n- Nach Datum: zum Beispiel immer am 7. Dezember\n- Nach Tag des Monats: zum Beispiel immer am dritten Donnerstag im November\n\nWIE KANN ICH PERSÖNLICHE TERMINE BEARBEITEN ODER LÖSCHEN?\n\nPersönliche Termine können entweder einzeln oder in Gruppen direkt auf der Seite 'Meine Termine' bearbeitet oder gelöscht werden.\n\n\n* TEILEN\n\n\nKANN ICH BRÜCKEN ODER TERMINE MIT ANDEREN PERSONEN TEILEN?\n\nJa! Ponti e Ferie! ermöglicht es dir, sowohl die von der App identifizierten Brücken als auch die persönlichen Termine, die du eingegeben hast, mit deinen Kontakten zu teilen. Diese Funktion ist nützlich, um Urlaub oder Veranstaltungen mit Kollegen, Freunden und Familie zu koordinieren.\n\nWIE FUNKTIONIERT DAS TEILEN?\n\nWenn du ein Element teilst, generiert die App eine Nachricht, die Folgendes enthält:\n\n- für identifizierte Brücken: Brückeninformationen (Datum und Dauer) und den Link zum Herunterladen der App\n- für persönliche Termine: Ereignisdetails und einen speziellen Link, der es dem Empfänger ermöglicht, dieses Datum automatisch zu seiner eigenen Ponti e Ferie! App hinzuzufügen (falls bereits installiert), plus den Link zum Herunterladen der App\n\nMUSS DER EMPFÄNGER PONTI E FERIE! INSTALLIERT HABEN?\n\nUm grundlegende Informationen anzuzeigen: nein, jeder kann die Details in der Nachricht lesen\nUm ein geteiltes persönliches Datum automatisch zur eigenen App hinzuzufügen: ja, es ist erforderlich, Ponti e Ferie! bereits installiert zu haben\n\nWELCHE DATEN WERDEN GETEILT?\n\nWenn du ein Element teilst, werden nur die spezifischen Informationen für dieses Datum oder diese Brücke (Beschreibung, Datum, Dauer) übermittelt. Keine anderen persönlichen Daten oder Einstellungen deiner App werden geteilt.\n\n\n* FILTER UND ANPASSUNG\n\n\nWELCHE FILTER KANN ICH FÜR DIE BRÜCKENBERECHNUNG EINSTELLEN?\n\nAuf der Seite 'Filter' kannst du die Brückenberechnung vollständig nach deinen Bedürfnissen anpassen:\n\n- Brückendauer: von 1 bis 3 Tagen\n- Wöchentliche Feiertage: du kannst auswählen, welche Tage als Feiertage betrachtet werden sollen (Standard Samstag und Sonntag)\n- Feiertagslisten: du kannst wählen, ob nationale und/oder persönliche Feiertage einbezogen werden sollen\n\nKANN ICH ANDERE TAGE ALS SAMSTAG UND SONNTAG ALS FEIERTAGE BETRACHTEN?\n\nJa, im Abschnitt 'Wöchentliche Feiertage' kannst du jeden Wochentag nach deinen Arbeitsbedürfnissen aktivieren oder deaktivieren.\n\nWELCHE KATHOLISCHEN FEIERTAGE KANN ICH EINBEZIEHEN?\n\nPonti e Ferie! ermöglicht es dir, die wichtigsten katholischen Feiertage mit variablen Daten in die Berechnung einzubeziehen:\n\n⁃ Ostern\n⁃ Ostermontag\n⁃ Christi Himmelfahrt\n⁃ Pfingsten\n⁃ Pfingstmontag\n⁃ Fronleichnam\n\nDiese Feiertage sind besonders nützlich, wenn du in Länder reist, wo sie als nationale Feiertage gefeiert werden.\n\nKANN ICH TERMINE DIREKT VON DER FILTER-SEITE AUS ÄNDERN?\n\nJa, auf der Seite 'Filter' findest du eine Schaltfläche, die dich schnell zur Seite 'Meine Termine' weiterleitet, um die Feiertagsliste zu ändern.\n\n\n* DATENSCHUTZ UND SUPPORT\n\n\nWO FINDE ICH INFORMATIONEN ZUM DATENSCHUTZ?\n\nDu findest alle Datenschutzinformationen in der Schaltfläche 'Datenschutz-Info' und auf der Store-Seite zusammen mit dem Support und den vollständigen FAQs.\n\nWIE KANN ICH HILFE ERHALTEN ODER EIN PROBLEM MELDEN?\n\nDu kannst die vollständigen FAQs auf dieser Website konsultieren oder den Support kontaktieren, indem du an folgende Adresse schreibst: angelieassociati@gmail.com\n\n\n\n\n"
    ],
    'fr': [
      "FAQ: QU'EST-CE QUE PONTI E FERIE! ET À QUOI SERT-IL?\n\n\nPonti e Ferie! est une application qui vous aide à identifier automatiquement toutes les opportunités de pont entre les jours fériés. Grâce à un calendrier perpétuel qui défile dans le temps, l'application calcule quand il est possible d'obtenir des jours de repos supplémentaires en reliant les jours fériés et les week-ends, vous aidant à mieux planifier vos congés et voyages.\n\nL'APPLICATION AFFICHE-T-ELLE AUSSI LES PONTS PASSÉS?\n\nNon, Ponti e Ferie! calcule uniquement les ponts futurs à partir du mois en cours. Il n'est pas possible de visualiser les dates antérieures : l'objectif de l'application est de vous aider à planifier les prochains ponts disponibles.\n\nPOUR QUELS PAYS FONCTIONNE PONTI E FERIE!?\n\nL'application comprend les jours fériés nationaux fixes de 14 pays européens :\n\n⁃ 🇮🇹 Italie\n⁃ 🇦🇹 Autriche\n⁃ 🇨🇭 Suisse\n⁃ 🇫🇷 France\n⁃ 🇩🇪 Allemagne\n⁃ 🇪🇸 Espagne\n⁃ 🇵🇹 Portugal\n⁃ 🇧🇪 Belgique\n⁃ 🇳🇱 Pays-Bas\n⁃ 🇬🇧 Royaume-Uni\n⁃ 🇮🇪 Irlande\n⁃ 🇸🇮 Slovénie\n⁃ 🇭🇷 Croatie\n⁃ 🇬🇷 Grèce\n\n\n* CONSEILS D'UTILISATION\n\n\nCOMMENT UTILISER AU MIEUX PONTI E FERIE! POUR PLANIFIER MES VACANCES?\n\n1) Définissez vos jours fériés hebdomadaires dans la page 'Filtres'\n\n2) Ajoutez d'éventuels jours fériés personnels ou locaux dans 'Mes dates'\n\n3) Faites défiler le calendrier pour repérer les ponts surlignés en bleu\n\n4) Touchez les dates des ponts pour les ajouter au calendrier de votre appareil\n\n5) Planifiez vos congés en fonction des meilleures opportunités trouvées\n\nPUIS-JE UTILISER PONTI E FERIE! POUR DES VOYAGES À L'ÉTRANGER?\n\nCertainement ! Sélectionnez le pays de destination depuis la page 'Mes dates' pour visualiser les ponts basés sur les jours fériés locaux. Ainsi, vous pourrez planifier le voyage en tenant compte à la fois de vos jours fériés et de ceux du pays que vous visiterez.\n\nJUSQU'OÙ DANS LE FUTUR PUIS-JE PLANIFIER?\n\nLe calendrier défile à l'infini vers l'avant, vous pouvez donc planifier vos ponts avec n'importe quel délai souhaité, même pour les années futures.\n\n\n* LE CALENDRIER\n\n\nCOMMENT FONCTIONNE LE CALENDRIER DE PONTI E FERIE!?\n\nLe calendrier commence au mois en cours et défile à l'infini vers l'avant. Les dates sont affichées avec différentes couleurs pour vous aider à distinguer rapidement les différents types de jours.\n\nQUE SIGNIFIENT LES DIFFÉRENTES COULEURS DANS LE CALENDRIER?\n\n⁃ Texte noir simple : jours ouvrables\n⁃ Texte rouge gras : jours de la semaine que vous avez définis comme fériés (par ex. samedi et dimanche)\n⁃ Texte rouge cerclé : jours fériés nationaux ou dates personnelles que vous avez saisis\n⁃ Fond bleu avec texte blanc : ponts possibles identifiés par l'application\n\nQUE SE PASSE-T-IL LORSQUE JE TOUCHE UNE DATE DANS LE CALENDRIER?\n\nCela dépend du type de date :\n\n⁃ jours ouvrables : en maintenant une pression longue, vous pouvez ajouter cette date à vos jours fériés personnels\n⁃ week-end/jours fériés hebdomadaires : rien ne se passe\n⁃ jours fériés nationaux ou personnels : un message apparaît avec le nom de l'événement\n⁃ ponts possibles : l'application vous demande si vous voulez ajouter cette date au calendrier de votre appareil\n\n\n* MES DATES\n\n\nCOMMENT PUIS-JE CHANGER LE PAYS DES JOURS FÉRIÉS?\n\nDans la page 'Mes dates', vous trouverez un menu déroulant où vous pouvez sélectionner l'un des 14 pays disponibles. Cette fonction est particulièrement utile si vous planifiez un voyage et voulez connaître les ponts locaux du pays de destination.\n\nPUIS-JE MODIFIER LA LISTE DES JOURS FÉRIÉS NATIONAUX?\n\nVous ne pouvez pas modifier la liste par défaut, mais vous pouvez exclure du calcul certains jours fériés que vous ne souhaitez pas ou ne pouvez pas célébrer. Il suffit de les désélectionner dans la liste.\n\nCOMMENT RESTAURER LES JOURS FÉRIÉS DE MON PAYS?\n\nSi vous avez sélectionné les jours fériés d'un autre pays, un bouton apparaîtra à côté du menu de sélection qui vous permet de restaurer rapidement le pays par défaut.\n\nPUIS-JE AJOUTER DES JOURS FÉRIÉS PERSONNELS?\n\nOui ! Dans la page 'Mes dates', vous pouvez ajouter vos jours spéciaux, comme la fête du saint patron local ou d'autres occasions personnelles. Vous avez deux options :\n\n- Événements d'un jour : pour les jours fériés qui ont lieu à une date spécifique\n- Périodes de plusieurs jours : pour les événements qui durent plusieurs jours consécutifs\n\nLES DATES PERSONNELLES PEUVENT-ELLES SE RÉPÉTER CHAQUE ANNÉE?\n\nOui, lorsque vous ajoutez une date personnelle, vous pouvez choisir de la faire se répéter automatiquement chaque année. Vous avez deux modes de répétition :\n\n- Selon la date : par exemple toujours le 7 décembre\n- Selon le jour du mois : par exemple toujours le troisième jeudi de novembre\n\nCOMMENT PUIS-JE MODIFIER OU SUPPRIMER LES DATES PERSONNELLES?\n\nLes dates personnelles peuvent être modifiées ou supprimées individuellement ou en bloc directement depuis la page 'Mes dates'.\n\n\n* PARTAGE\n\n\nPUIS-JE PARTAGER LES PONTS OU LES DATES AVEC D'AUTRES PERSONNES?\n\nOui ! Ponti e Ferie! vous permet de partager avec vos contacts à la fois les ponts identifiés par l'application et les dates personnelles que vous avez saisies. Cette fonction est utile pour coordonner les congés ou événements avec des collègues, amis et famille.\n\nCOMMENT FONCTIONNE LE PARTAGE?\n\nLorsque vous partagez un élément, l'application génère un message qui comprend :\n\n- pour les ponts identifiés : informations sur le pont (date et durée) et le lien pour télécharger l'application\n- pour les dates personnelles : détails de l'événement et un lien spécial qui permet au destinataire d'ajouter automatiquement cette date à sa propre application Ponti e Ferie! (si déjà installée), plus le lien pour télécharger l'application\n\nLE DESTINATAIRE DOIT-IL AVOIR PONTI E FERIE! INSTALLÉ?\n\nPour visualiser les informations de base : non, tout le monde peut lire les détails dans le message\nPour ajouter automatiquement une date personnelle partagée à sa propre application : oui, il faut avoir Ponti e Ferie! déjà installé\n\nQUELLES DONNÉES SONT PARTAGÉES?\n\nLorsque vous partagez un élément, seules les informations spécifiques de cette date ou ce pont (description, date, durée) sont transmises. Aucune autre donnée personnelle ou préférence de votre application n'est partagée.\n\n\n* FILTRES ET PERSONNALISATION\n\n\nQUELS FILTRES PUIS-JE DÉFINIR POUR LE CALCUL DES PONTS?\n\nDans la page 'Filtres', vous pouvez personnaliser complètement le calcul des ponts selon vos besoins :\n\n- Durée du pont : de 1 à 3 jours\n- Jours fériés hebdomadaires : vous pouvez sélectionner quels jours considérer comme fériés (par défaut samedi et dimanche)\n- Listes de jours fériés : vous pouvez choisir d'inclure les jours fériés nationaux et/ou personnels\n\nPUIS-JE CONSIDÉRER DES JOURS AUTRES QUE SAMEDI ET DIMANCHE COMME FÉRIÉS?\n\nOui, dans la section 'Jours fériés hebdomadaires', vous pouvez activer ou désactiver n'importe quel jour de la semaine selon vos besoins professionnels.\n\nQUELLES FÊTES CATHOLIQUES PUIS-JE INCLURE?\n\nPonti e Ferie! vous permet d'inclure dans le calcul les principales fêtes catholiques à date variable :\n\n⁃ Pâques\n⁃ Lundi de Pâques\n⁃ Ascension\n⁃ Pentecôte\n⁃ Lundi de Pentecôte\n⁃ Fête-Dieu\n\nCes fêtes sont particulièrement utiles si vous voyagez dans des pays où elles sont célébrées comme jours fériés nationaux.\n\nPUIS-JE MODIFIER LES DATES DIRECTEMENT DEPUIS LA PAGE FILTRES?\n\nOui, dans la page 'Filtres', vous trouverez un bouton qui vous renvoie rapidement à la page 'Mes dates' pour modifier la liste des jours fériés.\n\n\n* CONFIDENTIALITÉ ET SUPPORT\n\n\nOÙ PUIS-JE TROUVER DES INFORMATIONS SUR LA CONFIDENTIALITÉ?\n\nVous trouverez toutes les informations sur la confidentialité dans le bouton 'Info Confidentialité' et sur la page du store avec le support et les FAQ complètes.\n\nCOMMENT PUIS-JE OBTENIR DE L'AIDE OU SIGNALER UN PROBLÈME?\n\nVous pouvez consulter les FAQ complètes sur ce site web ou contacter le support en écrivant à : angelieassociati@gmail.com\n\n\n\n\n"
    ],
    'es': [
      "\nFAQ: ¿QUÉ ES PONTI E FERIE! Y PARA QUÉ SIRVE?\n\n\nPonti e Ferie! es una app que te ayuda a identificar automáticamente todas las oportunidades de puente entre festivos. Gracias a un calendario perpetuo que se desplaza en el tiempo, la app calcula cuándo es posible obtener días de descanso extra conectando festivos y fines de semana, ayudándote a planificar mejor tus vacaciones y viajes.\n\n¿LA APP TAMBIÉN MUESTRA PUENTES PASADOS?\n\nNo, Ponti e Ferie! calcula solo los puentes futuros a partir del mes actual. No es posible visualizar fechas anteriores: el objetivo de la app es ayudarte a planificar los próximos puentes disponibles.\n¿Para qué países funciona Ponti e Ferie!?\n\nLa app incluye los festivos nacionales fijos de 14 países europeos:\n\n⁃ 🇮🇹 Italia\n⁃ 🇦🇹 Austria\n⁃ 🇨🇭 Suiza\n⁃ 🇫🇷 Francia\n⁃ 🇩🇪 Alemania\n⁃ 🇪🇸 España\n⁃ 🇵🇹 Portugal\n⁃ 🇧🇪 Bélgica\n⁃ 🇳🇱 Países Bajos\n⁃ 🇬🇧 Reino Unido\n⁃ 🇮🇪 Irlanda\n⁃ 🇸🇮 Eslovenia\n⁃ 🇭🇷 Croacia\n⁃ 🇬🇷 Grecia\n\n\n* CONSEJOS DE USO\n\n\n¿CÓMO APROVECHO MEJOR PONTI E FERIE! PARA PLANIFICAR MIS VACACIONES?\n\n1) Configura tus días festivos semanales en la página 'Filtros'\n2) Añade posibles festivos personales o locales en 'Mis fechas'\n3) Desplázate por el calendario para identificar los puentes resaltados en azul\n4) Toca las fechas de los puentes para añadirlas al calendario de tu dispositivo\n5) Planifica tus vacaciones según las mejores oportunidades encontradas\n\n¿PUEDO USAR PONTI E FERIE! PARA VIAJES AL EXTRANJERO?\n\n¡Por supuesto! Selecciona el país de destino desde la página 'Mis fechas' para visualizar los puentes basados en los festivos locales. De este modo podrás planificar el viaje teniendo en cuenta tanto tus festivos como los del país que visitarás.\n\n¿HASTA QUÉ PUNTO EN EL FUTURO PUEDO PLANIFICAR?\n\nEl calendario se desplaza hacia adelante infinitamente, así que puedes planificar tus puentes con la antelación que desees, incluso para años futuros.\n\n\n* EL CALENDARIO\n\n\n¿CÓMO FUNCIONA EL CALENDARIO DE PONTI E FERIE!?\n\nEl calendario parte del mes actual y se desplaza hacia adelante infinitamente. Las fechas se visualizan con diferentes colores para ayudarte a distinguir rápidamente los diferentes tipos de días.\n\n¿QUÉ SIGNIFICAN LOS DIFERENTES COLORES EN EL CALENDARIO?\n\n⁃Texto negro simple: días laborables\n⁃Texto rojo en negrita: días de la semana que has configurado como festivos (ej. sábado y domingo)\n⁃Texto rojo con círculo: festivos nacionales o fechas personales que has introducido\n⁃Fondo azul con texto blanco: posibles puentes identificados por la app\n\n¿QUÉ SUCEDE CUANDO TOCO UNA FECHA EN EL CALENDARIO?\n\nDepende del tipo de fecha:\n⁃días laborables: manteniendo pulsado puedes añadir esa fecha a tus festivos personales\n⁃fin de semana/festivos semanales: no sucede nada\n⁃festivos nacionales o personales: aparece un mensaje con el nombre del evento\n⁃posibles puentes: la app te pregunta si quieres añadir esa fecha al calendario de tu dispositivo\n\n\n* MIS FECHAS\n\n\n¿CÓMO PUEDO CAMBIAR EL PAÍS DE LOS FESTIVOS?\n\nEn la página 'Mis fechas' encontrarás un menú desplegable donde puedes seleccionar uno de los 14 países disponibles. Esta función es particularmente útil si estás planificando un viaje y quieres conocer los puentes locales del país de destino.\n\n¿PUEDO MODIFICAR LA LISTA DE FESTIVOS NACIONALES?\n\nNo puedes modificar la lista predeterminada, pero puedes excluir del cálculo algunos festivos que no deseas o no puedes celebrar. Basta con deseleccionarlos de la lista.\n\n¿CÓMO RESTAURO LOS FESTIVOS DE MI PAÍS?\n\nSi has seleccionado los festivos de otro país, aparecerá un botón junto al menú de selección que te permite restaurar rápidamente el país predeterminado.\n\n¿PUEDO AÑADIR FESTIVOS PERSONALES?\n\n¡Sí! En la página 'Mis fechas' puedes añadir tus días especiales, como la fiesta del santo patrón local u otras ocasiones personales. Tienes dos opciones:\n- Eventos de un día: para festivos que ocurren en una fecha específica\n- Períodos de varios días: para eventos que duran varios días consecutivos\n\n¿LAS FECHAS PERSONALES SE PUEDEN REPETIR CADA AÑO?\n\nSí, cuando añades una fecha personal puedes elegir si hacerla repetir automáticamente cada año. Tienes dos modalidades de repetición:\n- Según la fecha: por ejemplo siempre el 7 de diciembre\n- Según el día del mes: por ejemplo siempre el tercer jueves de noviembre\n\n¿CÓMO PUEDO MODIFICAR O ELIMINAR LAS FECHAS PERSONALES?\n\nLas fechas personales pueden ser editadas o eliminadas tanto individualmente como en bloque directamente desde la página 'Mis fechas'.\n\n\n* COMPARTIR\n\n\n¿PUEDO COMPARTIR LOS PUENTES O LAS FECHAS CON OTRAS PERSONAS?\n\n¡Sí! Ponti e Ferie! te permite compartir con tus contactos tanto los puentes identificados por la app como las fechas personales que has introducido. Esta función es útil para coordinar vacaciones o eventos con compañeros, amigos y familiares.\n\n¿CÓMO FUNCIONA EL COMPARTIR?\n\nCuando compartes un elemento, la app genera un mensaje que incluye:\n- para los puentes identificados: información sobre el puente (fecha y duración) y el enlace para descargar la app\n- para las fechas personales: los detalles del evento y un enlace especial que permite al destinatario añadir automáticamente esa fecha a su propia app Ponti e Ferie! (si ya está instalada), además del enlace para descargar la app\n\n¿EL DESTINATARIO DEBE TENER PONTI E FERIE! INSTALADA?\n\nPara visualizar la información básica: no, cualquiera puede leer los detalles en el mensaje\nPara añadir automáticamente una fecha personal compartida a su propia app: sí, es necesario tener Ponti e Ferie! ya instalada\n\n¿QUÉ DATOS SE COMPARTEN?\n\nCuando compartes un elemento, se transmiten solo las informaciones específicas de esa fecha o puente (descripción, fecha, duración). Ningún otro dato personal o preferencia de tu app se comparte.\n\n\n* FILTROS Y PERSONALIZACIÓN\n\n\n¿QUÉ FILTROS PUEDO CONFIGURAR PARA EL CÁLCULO DE LOS PUENTES?\n\nEn la página 'Filtros' puedes personalizar completamente el cálculo de los puentes según tus necesidades:\n- Duración del puente: de 1 a 3 días\n- Días festivos semanales: puedes seleccionar qué días considerar como festivos (por defecto sábado y domingo)\n- Listas de festivos: puedes elegir si incluir los festivos nacionales y/o los personales\n\n¿PUEDO CONSIDERAR FESTIVOS DÍAS DIFERENTES A SÁBADO Y DOMINGO?\n\nSí, en la sección 'Días festivos semanales' puedes activar o desactivar cualquier día de la semana según tus necesidades laborales.\n\n¿QUÉ FESTIVOS CATÓLICOS PUEDO INCLUIR?\n\nPonti e Ferie! te permite incluir en el cálculo las principales festividades católicas de fecha variable:\n-Pascua\n⁃Lunes de Pascua\n⁃Ascensión\n⁃Pentecostés\n⁃Lunes de Pentecostés\n⁃Corpus Christi\nEstas festividades son particularmente útiles si viajas a países donde se celebran como días festivos nacionales.\n\n¿PUEDO MODIFICAR LAS FECHAS DIRECTAMENTE DESDE LA PÁGINA FILTROS?\n\nSí, en la página 'Filtros' encontrarás un botón que te remite rápidamente a la página 'Mis fechas' para modificar la lista de festivos.\n\n\n* PRIVACIDAD Y SOPORTE\n\n\n¿DÓNDE ENCUENTRO INFORMACIÓN SOBRE PRIVACIDAD?\n\nEncontrarás toda la información sobre privacidad en el botón 'Info Privacidad' y en la página de la tienda junto con el soporte y las FAQ completas.\n\n¿CÓMO PUEDO OBTENER AYUDA O REPORTAR UN PROBLEMA?\n\nPuedes consultar las FAQ completas en este sitio web o contactar con el soporte escribiendo a: angelieassociati@gmail.com\n\n\n\n\n"
    ]

  }
  return dataLabel[language][item];
}

export function splashCarousel(language, item) {
  const dataLabel = {
    'it': [
      'Stacca la spina e parti!',
      '',
      ' Trova tutti i ponti nascosti nel calendario',
      'Con Ponti e Ferie',
      'scopri la magia',
      'Ogni festività diventa una vacanza',
      'Via verso la tua',
      'prossima avventura!',
      'Il tuo boss può aspettare 😎'
    ],
    'fr': [
      'Débranche et pars !',                             // 0
      '',                                                // 1
      ' Trouve tous les ponts cachés dans le calendrier', // 2
      'Avec Ponti e Ferie',                                   // 3
      'découvre la magie !',                             // 4
      'Chaque fête devient des vacances',                // 5
      'En route vers ta',                                // 6
      'prochaine aventure !',                            // 7
      'Ton patron peut attendre 😎'                      // 8
    ],
    'es': [
      '¡Desconecta y vete!',                             // 0
      '',                                                // 1
      ' Encuentra todos los puentes ocultos en el calendario', // 2
      'Con Ponti e Ferie',                                    // 3
      '¡descubre la magia!',                             // 4
      'Cada festivo se convierte en vacaciones',         // 5
      'Rumbo a tu',                                      // 6
      '¡próxima aventura!',                              // 7
      'Tu jefe puede esperar 😎'                         // 8
    ],
    'de': [
      'Steck aus und los!',                              // 0
      '',                                                // 1
      ' Finde alle versteckten Brücken im Kalender',     // 2
      'Mit Ponti e Ferie',                                    // 3
      'entdeckst du die Magie!',                         // 4
      'Jeder Feiertag wird zum Urlaub',                  // 5
      'Auf zu deinem',                                   // 6
      'nächsten Abenteuer!',                             // 7
      'Dein Chef kann warten 😎'                         // 8
    ],
    'en': [
      'Unplug and go!',                                  // 0
      '',                                                // 1
      ' Find all hidden bridges in the calendar',        // 2
      'With Ponti e Ferie',                                   // 3
      'discover the magic!',                             // 4
      'Every holiday becomes a vacation',                // 5
      'Off to your',                                     // 6
      'next adventure!',                                 // 7
      'Your boss can wait 😎'                            // 8
    ],
    'nl': [
      'Trek de stekker eruit en ga!',                    // 0
      '',                                                // 1
      ' Vind alle verborgen bruggen in de kalender',     // 2
      'Met Ponti e Ferie',                                    // 3
      'ontdek je de magie!',                             // 4
      'Elke feestdag wordt een vakantie',                // 5
      'Op naar je',                                      // 6
      'volgende avontuur!',                              // 7
      'Je baas kan wachten 😎'                           // 8
    ],
    'pt': [
      'Desliga e vai!',                                  // 0
      '',                                                // 1
      ' Encontra todas as pontes escondidas no calendário', // 2
      'Com Ponti e Ferie',                                    // 3
      'descobre a magia!',                               // 4
      'Cada feriado vira férias',                        // 5
      'Rumo à tua',                                      // 6
      'próxima aventura!',                               // 7
      'O teu chefe pode esperar 😎'                      // 8
    ],
    'hr': [
      'Isključi se i kreni!',                            // 0
      '',                                                // 1
      ' Pronađi sve skrivene mostove u kalendaru',       // 2
      'S Ponti e Ferie',                                      // 3
      'otkrij čaroliju!',                                // 4
      'Svaki praznik postaje odmor',                     // 5
      'Na put prema tvojoj',                             // 6
      'sljedećoj avanturi!',                             // 7
      'Tvoj šef može čekati 😎'                          // 8
    ],
    'si': [
      'Odklopi in pojdi!',                               // 0
      '',                                                // 1
      ' Najdi vse skrite mostove v koledarju',           // 2
      'S Ponti e Ferie',                                      // 3
      'odkrij magijo!',                                  // 4
      'Vsak praznik postane počitnice',                  // 5
      'Naprej k tvoji',                                  // 6
      'naslednji pustolovščini!',                        // 7
      'Tvoj šef lahko počaka 😎'                         // 8
    ],
    'gr': [
      'Αποσυνδέσου και φύγε!',                           // 0
      '',                                                // 1
      ' Βρες όλες τις κρυφές γέφυρες στο ημερολόγιο',    // 2
      'Με το Ponti e Ferie',                                  // 3
      'ανακάλυψε τη μαγεία!',                            // 4
      'Κάθε γιορτή γίνεται διακοπές',                    // 5
      'Πάμε στην',                                       // 6
      'επόμενη περιπέτειά σου!',                         // 7
      'Ο αφεντικό σου μπορεί να περιμένει 😎'            // 8
    ]
  }
  return dataLabel[language][item];
}