// TRADUZIONI: 
// QUESTO FILE RACCOGLIE TUTTE LE LABEL DELLE PAGINE 
// TRADOTTE IN 10 LINGUE

// LABEL USATE IN splittedBar.tsx
export function splittedBarLabel(language, item) {
    const countryLabels = {
        'it':[
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
        'Cosa puoi fare con PontiVIA?'
    ],
    'fr': [
        'Pas de pont en vue?\nFaites défiler le calendrier\net définissez les filtres et vos dates',
        'MES DATES : ajoutez ici vos congés et tous les jours où vous ne travaillez pas (ex. anniversaire, fête du saint patron, etc.)',  // 32
        'LES FILTRES : sélectionnez ici les jours libres de la semaine et choisissez quelles fêtes inclure dans le calcul',  // 33
        'LE CALENDRIER : découvrez ici les ponts parfaits pour planifier vos vacances idéales !',  // 34
        'Que pouvez-vous faire avec PontiVIA ?'                                     // 35
    ],
    'es': [
        '¿Ningún puente a la vista?\nDesliza el calendario y configura\nlos filtros y tus días',
        'MIS FECHAS: añade aquí tus vacaciones y todos los días en que no trabajas (ej. cumpleaños, patrón de la ciudad, etc.)',  // 32
        'LOS FILTROS: selecciona aquí los días libres de la semana y elige qué festividades incluir en el cálculo',  // 33
        'EL CALENDARIO: ¡descubre aquí los puentes perfectos para planificar tus vacaciones ideales!',  // 34
        '¿Qué puedes hacer con PontiVIA?'                                           // 35
    ],
    'de': [
        'Keine Brücke in Sicht?\nBlättern Sie im Kalender vorwärts\nund stellen Sie die Filter und Ihre Daten ein',
        'MEINE TERMINE: Fügen Sie hier Ihren Urlaub und alle Tage hinzu, an denen Sie nicht arbeiten (z.B. Geburtstag, Stadtpatron usw.)',  // 32
        'DIE FILTER: Wählen Sie hier die freien Wochentage aus und entscheiden Sie, welche Feiertage in die Berechnung einbezogen werden sollen',  // 33
        'DER KALENDER: Entdecken Sie hier die perfekten Brücken, um Ihren idealen Urlaub zu planen!',  // 34
        'Was können Sie mit PontiVIA tun?'                                          // 35

    ],
    'en': [
        'No bridge in sight?\nScroll the calendar and set\nfilters and your days',
        'MY DATES: add here your holidays and all the days when you don\'t work (e.g. birthday, city patron saint, etc.)',  // 32
        'FILTERS: select here your weekly days off and choose which holidays to include in the calculation',  // 33
        'THE CALENDAR: discover here the perfect bridges to plan your ideal vacations!',  // 34
        'What can you do with PontiVIA?'                                            // 35
    ],
    'nl': [
        'Geen brug in zicht?\nScroll door de kalender en stel\nfilters en je dagen in',
        'MIJN DATUMS: voeg hier je vakanties en alle dagen waarop je niet werkt toe (bijv. verjaardag, stadspatroon, enz.)',  // 32
        'DE FILTERS: selecteer hier je vrije weekdagen en kies welke feestdagen je in de berekening wilt opnemen',  // 33
        'DE KALENDER: ontdek hier de perfecte bruggen om je ideale vakanties te plannen!',  // 34
        'Wat kun je doen met PontiVIA?'                                             // 35
    ],
    'pt': [
        'Nenhuma ponte à vista?\nDeslize o calendário e configure\nos filtros e seus dias',
        'MINHAS DATAS: adicione aqui suas férias e todos os dias em que você não trabalha (ex. aniversário, padroeiro da cidade, etc.)',  // 32
        'OS FILTROS: selecione aqui os dias livres da semana e escolha quais feriados incluir no cálculo',  // 33
        'O CALENDÁRIO: descubra aqui as pontes perfeitas para planejar suas férias ideais!',  // 34
        'O que você pode fazer com PontiVIA?'                                       // 35
    ],
    'hr': [
        'Nema mosta na vidiku?\nSkrolaj kalendar i postavi\nfiltere i svoje dane',
        'MOJI DATUMI: dodaj ovdje svoj godišnji odmor i sve dane kada ne radiš (npr. rođendan, gradski svetac patron, itd.)',  // 32
        'FILTERI: odaberi ovdje slobodne dane u tjednu i odaberi koje praznike uključiti u izračun',  // 33
        'KALENDAR: otkrij ovdje savršene mostove za planiranje svojih idealnih praznika!',  // 34
        'Što možeš raditi s PontiVIA?'                                              // 35
    ],
    'si': [
        'Ni mosta na vidiku?\nDrsaj po koledarju in nastavi\nfiltre in svoje dni',
        'MOJI DATUMI: dodaj tukaj svoj letni dopust in vse dni, ko ne delaš (npr. rojstni dan, mestni zavetnik, itd.)',  // 32
        'FILTRI: izberi tukaj proste tedenske dni in izberi, katere praznike vključiti v izračun',  // 33
        'KOLEDAR: odkrij tukaj popolne mostove za načrtovanje svojih idealnih počitnic!',  // 34
        'Kaj lahko narediš s PontiVIA?'                                             // 35
    ],
    'gr': [
        'Καμία γέφυρα στον ορίζοντα;\nΚύλισε το ημερολόγιο και όρισε\nφίλτρα και τις μέρες σου',
        'ΟΙ ΗΜΕΡΟΜΗΝΙΕΣ ΜΟΥ: προσθέστε εδώ τις διακοπές σας και όλες τις μέρες που δεν εργάζεστε (π.χ. γενέθλια, πολιούχος της πόλης, κ.λπ.)',  // 32
        'ΤΑ ΦΙΛΤΡΑ: επιλέξτε εδώ τις ελεύθερες ημέρες της εβδομάδας και διαλέξτε ποιες αργίες να συμπεριληφθούν στον υπολογισμό',  // 33
        'ΤΟ ΗΜΕΡΟΛΟΓΙΟ: ανακαλύψτε εδώ τις τέλειες γέφυρες για να σχεδιάσετε τις ιδανικές σας διακοπές!',  // 34
        'Τι μπορείτε να κάνετε με το PontiVIA;'    
    ]
  };
  return dataLabel[language][item];
}

// LABEL USATE IN calendarUtils.tsx E preferences.tsx
export function dataLabel(language, item) {
    const countryLabels = {
        'it':[
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
            'Info Privacy',                    // 17
            'Stai per essere indirizzato verso una pagina esterna. Vuoi proseguire?',    // 30
            'Prosegui',                                                 // 31
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
            'Infos Confidentialité',           // 17
            'Vous allez être redirigé vers une page externe. Voulez-vous continuer ?',  // 30
            'Continuer',                                                // 31

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
            '¿Cómo funciona?',                  // 16
            'Info Privacidad',           // 17
            'Está a punto de ser redirigido a una página externa. ¿Desea continuar?', // 30
            'Continuar',                                                // 31
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
            'Wie funktioniert es?',                  // 16
            'Datenschutz-Info',           // 17
            'Sie werden zu einer externen Seite weitergeleitet. Möchten Sie fortfahren?', // 30
            'Fortfahren',                                               // 31
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
            'How does it work?',                  // 16
            'Privacy Info',           // 17
            'You are about to be redirected to an external page. Do you want to continue?', // 30
            'Continue',                                                 // 31
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
            'Hoe werkt het?',                  // 16
            'Privacy Info',           // 17
            'U wordt doorgestuurd naar een externe pagina. Wilt u doorgaan?',// 30
            'Doorgaan',                                                 // 31
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
            'Como funciona?',                  // 16
            'Info Privacidade',           // 17
            'Você está prestes a ser redirecionado para uma página externa. Deseja continuar?',  // 30
            'Continuar',                                                // 31
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
            'Kako funkcionira?',                  // 16
            'Info o privatnosti',           // 17
            'Bit ćete preusmjereni na vanjsku stranicu. Želite li nastaviti?', // 30
            'Nastavi',                                                  // 31
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
            'Kako deluje?',                  // 16
            'Info o zasebnosti',           // 17
            'Preusmerjeni boste na zunanjo stran. Želite nadaljevati?', // 30
            'Nadaljuj',                                                 // 31
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
            'Πληροφορίες Απορρήτου',          // 17
            'Πρόκειται να ανακατευθυνθείτε σε εξωτερική σελίδα. Θέλετε να συνεχίσετε;',  // 18
            'Συνέχεια',                             // 19
        ]
    };
    return countryLabels[language][item];
}

// LABEL USATE IN holydays.tsx
export function holydayLabels(language,item) {
    const dataLabel = {
    'it':[
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
        'Info Privacy',                                       // 27 ex 'Info Privacy'
        'Vorrei condividere con te questo evento:',                 // 28
        'Scarica PontiVIA!',                                        // 29
        'Stai per essere indirizzato verso una pagina esterna. Vuoi proseguire?',    // 30
        'Prosegui',                                                 // 31
    ],
    'fr':[
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
        'Voulez-vous supprimer toutes les dates de cette section ?', // 18
        '(ex. une date fixe qui revient chaque année)',             // 19
        '(ex. une période de vacances)',                            // 20
        'La date de début coïncide avec une fête nationale',        // 21
        'Cette date fait partie d\'une période existante',          // 22
        'Attention, l\'événement chevauche ',                       // 23
        'Attention, l\'événement est en conflit avec ',             // 24
        'Cette date est déjà présente ',                            // 25
        'Comment ça marche ?',                                      // 26
        'Infos Confidentialité',                              // 27
        'Je voudrais partager cet événement avec toi :',            // 28
        'Télécharge PontiVIA !',                                    // 29
        'Vous allez être redirigé vers une page externe. Voulez-vous continuer ?',  // 30
        'Continuer',                                                // 31
    ],  
    'es':[
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
        'Info Privacidad',                                    // 27
        'Me gustaría compartir este evento contigo:',               // 28
        '¡Descarga PontiVIA!',                                      // 29
        'Está a punto de ser redirigido a una página externa. ¿Desea continuar?', // 30
        'Continuar',                                                // 31
    ],  
    'de':[
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
        'Datenschutz-Info',                                   // 17
        'Ich möchte dieses Ereignis mit dir teilen:',               // 28
        'Lade PontiVIA herunter!',                                  // 29
        'Sie werden zu einer externen Seite weitergeleitet. Möchten Sie fortfahren?', // 30
        'Fortfahren',                                               // 31
    ],
    'en':[
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
        'How does it work?',                                        // 16
        'Privacy Info',                                       // 17
        'I would like to share this event with you:',               // 28
        'Download PontiVIA!',                                       // 29
        'You are about to be redirected to an external page. Do you want to continue?', // 30
        'Continue',                                                 // 31
    ],
    'nl':[
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
        'Hoe werkt het?',                                           // 16
        'Privacy Info',                                       // 17
        'Ik wil deze gebeurtenis met je delen:',                    // 28
        'Download PontiVIA!',                                       // 29
        'U wordt doorgestuurd naar een externe pagina. Wilt u doorgaan?',// 30
        'Doorgaan',                                                 // 31
    ],
    'pt':[
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
        'Como funciona?',                                           // 16
        'Info Privacidade',                                   // 17
        'Gostaria de compartilhar este evento com você:',           // 28
        'Baixe PontiVIA!',                                          // 29
        'Você está prestes a ser redirecionado para uma página externa. Deseja continuar?',  // 30
        'Continuar',                                                // 31
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
        'Kako funkcionira?',                                        // 16
        'Info o privatnosti',                                 // 17
        'Želio bih podijeliti ovaj događaj s tobom:',               // 28
        'Preuzmi PontiVIA!',                                        // 29
        'Bit ćete preusmjereni na vanjsku stranicu. Želite li nastaviti?', // 30
        'Nastavi',                                                  // 31

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
        'Kako deluje?',                                             // 16
        'Info o zasebnosti',                                  // 17
        'Rad bi delil ta dogodek s teboj:',                         // 28
        'Prenesi PontiVIA!',                                        // 29
        'Preusmerjeni boste na zunanjo stran. Želite nadaljevati?', // 30
        'Nadaljuj',                                                 // 31
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
        'Πώς λειτουργεί;',                                          // 16
        'Πληροφορίες Απορρήτου',                              // 17
        'Θα ήθελα να μοιραστώ αυτό το γεγονός μαζί σου:',           // 28
        'Κατέβασε το PontiVIA!',                                    // 29
        'Πρόκειται να ανακατευθυνθείτε σε εξωτερική σελίδα. Θέλετε να συνεχίσετε;',  // 30
        'Συνέχεια',                                                 // 31
    ]
    };
    return dataLabel[language][item];
}

// LABEL USATE IN calendarScreen.tsx
export function calendarScrenLabels(language, item) {
    const dataLabel = {
        'it': [
            'Ponte!',                                   // 0
            'PontiVIA! ha trovato questo ponte per te', // 1
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
            'Scarica PontiVIA!'                         // 13
        ],
        'fr':[
            'Pont !',                                   // 0
            'PontiVIA! a trouvé ce pont pour vous',     // 1
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
            'Je voudrais partager cet événement avec toi :',            // 28
            'Télécharge PontiVIA !'                                     // 29

        ],
        'es':[
            '¡Puente!',                                 // 0
            '¡PontiVIA! encontró este puente para ti',  // 1
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
            'Me gustaría compartir este evento contigo:',               // 28
            '¡Descarga PontiVIA!'                                       // 29
        ],
        'de':[
            'Brücke!',                                  // 0
            'PontiVIA! hat diese Brücke für dich gefunden', // 1
            'Brücken gefunden!',                        // 2
            'Brücke gefunden!',                         // 3
            'Vom ',                                     // 4
            ' bis ',                                    // 5
            ' Tage)',                                   // 6
            'Am ',                                      // 7
            ' (1 Tag)',                                 // 8
            'Mögliche Brücke!',                         // 9
            'Abbrechen',                                // 10
            'Hinzufügen',                                // 11
            'Ich möchte dieses Ereignis mit dir teilen:',               // 28
            'Lade PontiVIA herunter!'                                   // 29
        ],  
        'en':[
            'Bridge!',                                  // 0
            'PontiVIA! found this bridge for you',      // 1
            'bridges found!',                           // 2
            'bridge day found!',                            // 3
            'From ',                                    // 4
            ' to ',                                     // 5
            ' days)',                                   // 6
            'On ',                                      // 7
            ' (1 day)',                                 // 8
            'Possible bridge!',                         // 9
            'Cancel',                                   // 10
            'Add',                                       // 11
            'I would like to share this event with you:',               // 28
            'Download PontiVIA!'                                        // 29
        ],
        'nl':[
            'Brug!',                                    // 0
            'PontiVIA! vond deze brug voor jou',        // 1
            'bruggen gevonden!',                        // 2
            'brug gevonden!',                           // 3
            'Van ',                                     // 4
            ' tot ',                                    // 5
            ' dagen)',                                  // 6
            'Op ',                                      // 7
            ' (1 dag)',                                 // 8
            'Mogelijke brug!',                          // 9
            'Annuleren',                                // 10
            'Toevoegen',                                 // 11
            'Ik wil deze gebeurtenis met je delen:',                    // 28
            'Download PontiVIA!'                                        // 29
        ],
        'pt':[
            'Ponte!',                                   // 0
            'PontiVIA! encontrou esta ponte para você', // 1
            'pontes encontradas!',                      // 2
            'ponte encontrada!',                        // 3
            'De ',                                      // 4
            ' até ',                                    // 5
            ' dias)',                                   // 6
            'Em ',                                      // 7
            ' (1 dia)',                                 // 8
            'Ponte possível!',                          // 9
            'Cancelar',                                 // 10
            'Adicionar',                                 // 11
            'Gostaria de compartilhar este evento com você:',           // 28
            'Baixe PontiVIA!'                                           // 29
        ],
        'hr': [
            'Most!',                                    // 0
            'PontiVIA! je pronašao ovaj most za tebe',  // 1
            'mostovi pronađeni!',                       // 2
            'most pronađen!',                           // 3
            'Od ',                                      // 4
            ' do ',                                     // 5
            ' dana)',                                   // 6
            'Na ',                                      // 7
            ' (1 dan)',                                 // 8
            'Moguć most!',                              // 9
            'Otkaži',                                   // 10
            'Dodaj',                                     // 11
            'Želio bih podijeliti ovaj događaj s tobom:',               // 28
            'Preuzmi PontiVIA!'                                         // 29
        ],
        'si': [
            'Most!',                                    // 0
            'PontiVIA! je našel ta most za tebe',       // 1
            'mostovi najdeni!',                         // 2
            'most najden!',                             // 3
            'Od ',                                      // 4
            ' do ',                                     // 5
            ' dni)',                                    // 6
            'Na ',                                      // 7
            ' (1 dan)',                                 // 8
            'Možen most!',                              // 9
            'Prekliči',                                 // 10
            'Dodaj',                                     // 11
            'Rad bi delil ta dogodek s teboj:',                         // 28
            'Prenesi PontiVIA!'                                         // 29
        ],
        'gr': [
            'Γέφυρα!',                                  // 0
            'Το PontiVIA! βρήκε αυτή τη γέφυρα για σας', // 1
            'γέφυρες βρέθηκαν!',                        // 2
            'γέφυρα βρέθηκε!',                          // 3
            'Από ',                                     // 4
            ' έως ',                                    // 5
            ' μέρες)',                                  // 6
            'Στις ',                                    // 7
            ' (1 μέρα)',                                // 8
            'Πιθανή γέφυρα!',                           // 9
            'Ακύρωση',                                  // 10
            'Προσθήκη',                                  // 11
            'Θα ήθελα να μοιραστώ αυτό το γεγονός μαζί σου:',           // 28
            'Κατέβασε το PontiVIA!'                                     // 29
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
            'Privacy Policy\nLast updated: 11/2025\n\nPontiVia! respects user privacy and is committed to protecting personal data in compliance with the General Data Protection Regulation (GDPR) and applicable regulations.\n\n2. Data Controller\nAngeli & Associati - Milan\nangelieassociati@gmail.com\n\n3. Data Collected\n3.1 Data provided directly by the user:\n- personal events: holidays, anniversaries and appointments voluntarily entered into the application,\n- preferences: selection of the reference country for holidays, language settings and search filters.\n\n3.2 Automatically collected data\nPontiVia! DOES NOT collect:\n- location data\n- contact information\n- login credentials\n- browsing or usage data\n- device identifiers\n\nWhen the user chooses to share dates or bridges with third parties through the app\'s sharing function, the shared information (event description, date, duration) is transmitted through the user\'s device sharing system. The app does not store or track what content is shared, with whom, or when. Sharing occurs exclusively at the user\'s voluntary initiative and under their full control.\n\nThe app works completely offline and does not transmit any data to external servers.\n\n4. Purpose of Processing\nPersonal data entered by the user (events, holidays, preferences) are processed exclusively to:\n- calculate available bridges between holidays\n- display the personalized calendar\n- provide application functionality\n\n5. Legal Basis for Processing\nProcessing is based on user consent (Article 6(1)(a) GDPR) provided through voluntary use of the application.\n\n6. Data Retention\nAll entered data is stored exclusively locally on the user\'s device. It is not transferred, synchronized or stored on external servers. Data remains on the device until:\n- the user manually deletes it\n- the application is uninstalled\n\n7. Data Sharing\nPontiVia! DOES NOT share, sell or transmit any personal data to third parties. The app does not contain:\n- social network integrations\n- cloud or automatic backup services\n\n8. User Rights\nIn accordance with GDPR, users have the right to:\n- access: view their data (available directly in the app)\n- rectification: modify entered data through the app interface\n- erasure: delete all data by uninstalling the application or manually deleting events\n- objection: cease using the application at any time\n\n9. Data Security\nPontiVia! adopts appropriate technical measures to protect data:\n- secure local storage on the device\n- no data transmission via internet\n- data access limited to the device user\n\n10. Minor Users\nThe application is suitable for users of all ages. It does not intentionally collect personal data from minors under 13 years of age. Since the app does not require registration nor collect identifying data, it can be used by minors under parental or guardian supervision.\n\n11. Changes to the Policy\nWe reserve the right to update this policy. Changes will be communicated through app updates or Store notifications.\n\n12. Contact\nFor privacy-related questions or requests, contact: angelieassociati@gmail.com\n\n13. Supervisory Authority\nUsers have the right to lodge a complaint with the competent supervisory authority:\nItaly: Data Protection Authority (www.garanteprivacy.it)\nUK: Information Commissioner\'s Office (ICO) (www.ico.org.uk)\nEU: Find your national authority at https://edpb.europa.eu/about-edpb/about-edpb/members_en\n'
        ]
    }
    return dataLabel[language][item];
}