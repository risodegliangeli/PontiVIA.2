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
            'Scarica PontiVIA!',                                        // 29
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
            'Télécharge PontiVIA !',                                    // 29
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
            '¡Descarga PontiVIA!',                                      // 29
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
            'Lade PontiVIA herunter!',                                  // 29
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
            'Download PontiVIA!',                                       // 29
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
            'Download PontiVIA!',                                       // 29
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
            'Baixe PontiVIA!',                                          // 29
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
            'Preuzmi PontiVIA!',                                        // 29
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
            'Prenesi PontiVIA!',                                        // 29
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
            'Κατέβασε το PontiVIA!',                                    // 29
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
            'Scarica PontiVIA!',                        // 13
            'Aggiungilo al tuo calendario: ',          // 14
            'Permesso Calendario Richiesto',            // 15
            'Per salvare eventi nel calendario, PontiVIA ha bisogno del permesso di accesso al calendario. Senza questo permesso non potrai salvare i ponti trovati nel tuo calendario.', // 16
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
            'Je voudrais partager cet événement avec toi :',// 12
            'Télécharge PontiVIA !',                    // 13
            'Ajoute-le à ton calendrier: ',            // 14
            'Permission Calendrier Requise',            // 15
            'Pour enregistrer des événements dans le calendrier, PontiVIA a besoin de la permission d\'accès au calendrier. Sans cette permission, vous ne pourrez pas enregistrer les ponts trouvés dans votre calendrier.', // 16
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
            'Me gustaría compartir este evento contigo:', // 12
            '¡Descarga PontiVIA!',                      // 13
            'Añádelo a tu calendario: ',               // 14
            'Permiso de Calendario Requerido',          // 15
            'Para guardar eventos en el calendario, PontiVIA necesita permiso de acceso al calendario. Sin este permiso no podrás guardar los puentes encontrados en tu calendario.', // 16
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
            'Hinzufügen',                               // 11
            'Ich möchte dieses Ereignis mit dir teilen:', // 12
            'Lade PontiVIA herunter!',                  // 13
            'Füge es zu deinem Kalender hinzu: ',      // 14
            'Kalenderberechtigung Erforderlich',        // 15
            'Um Ereignisse im Kalender zu speichern, benötigt PontiVIA die Berechtigung zum Zugriff auf den Kalender. Ohne diese Berechtigung können Sie die gefundenen Brücken nicht in Ihrem Kalender speichern.', // 16
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
            'PontiVIA! found this bridge for you',      // 1
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
            'Download PontiVIA!',                       // 13
            'Add it to your calendar: ',               // 14
            'Calendar Permission Required',             // 15
            'To save events to the calendar, PontiVIA needs permission to access the calendar. Without this permission you will not be able to save the bridges found to your calendar.', // 16
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
            'Toevoegen',                                // 11
            'Ik wil deze gebeurtenis met je delen:',    // 12
            'Download PontiVIA!',                       // 13
            'Voeg het toe aan je kalender: ',          // 14
            'Kalendertoestemming Vereist',              // 15
            'Om gebeurtenissen op te slaan in de kalender, heeft PontiVIA toestemming nodig voor toegang tot de kalender. Zonder deze toestemming kunt u de gevonden bruggen niet opslaan in uw kalender.', // 16
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
            'Adicionar',                                // 11
            'Gostaria de compartilhar este evento com você:',// 12
            'Baixe PontiVIA!',                          // 13
            'Adicione ao seu calendário: ',            // 14
            'Permissão de Calendário Necessária',        // 15
            'Para salvar eventos no calendário, PontiVIA precisa de permissão para acessar o calendário. Sem esta permissão você não poderá salvar as pontes encontradas no seu calendário.', // 16
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
            'Dodaj',                                    // 11
            'Želio bih podijeliti ovaj događaj s tobom:',// 12
            'Preuzmi PontiVIA!',                        // 13
            'Dodaj u svoj kalendar: ',                 // 14
            'Potrebna Dozvola za Kalendar',             // 15
            'Za spremanje događaja u kalendar, PontiVIA treba dozvolu za pristup kalendaru. Bez ove dozvole nećeš moći spremiti pronađene mostove u svoj kalendar.', // 16
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
            'Dodaj',                                    // 11
            'Rad bi delil ta dogodek s teboj:',         // 12
            'Prenesi PontiVIA!',                        // 13
            'Dodaj v svoj koledar: ',                  // 14
            'Potrebno Dovoljenje za Koledar',           // 15
            'Za shranjevanje dogodkov v koledar, PontiVIA potrebuje dovoljenje za dostop do koledarja. Brez tega dovoljenja ne boste mogli shraniti najdenih mostov v svoj koledar.', // 16
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
            'Προσθήκη',                                 // 11
            'Θα ήθελα να μοιραστώ αυτό το γεγονός μαζί σου:',// 12
            'Κατέβασε το PontiVIA!',                    // 13
            'πρόσθεσέ το στο ημερολόγιό σου: ',         // 14
            'Απαιτείται Άδεια Ημερολογίου',             // 15
            'Για να αποθηκεύσετε γεγονότα στο ημερολόγιο, το PontiVIA χρειάζεται άδεια πρόσβασης στο ημερολόγιο. Χωρίς αυτήν την άδεια δεν θα μπορείτε να αποθηκεύσετε τις γέφυρες που βρέθηκαν στο ημερολόγιό σας.', // 16
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
            'Privacy Policy\nLast updated: 11/2025\n\nPontiVia! respects user privacy and is committed to protecting personal data in compliance with the General Data Protection Regulation (GDPR) and applicable regulations.\n\n2. Data Controller\nAngeli & Associati - Milan\nangelieassociati@gmail.com\n\n3. Data Collected\n3.1 Data provided directly by the user:\n- personal events: holidays, anniversaries and appointments voluntarily entered into the application,\n- preferences: selection of the reference country for holidays, language settings and search filters.\n\n3.2 Automatically collected data\nPontiVia! DOES NOT collect:\n- location data\n- contact information\n- login credentials\n- browsing or usage data\n- device identifiers\n\nWhen the user chooses to share dates or bridges with third parties through the app\'s sharing function, the shared information (event description, date, duration) is transmitted through the user\'s device sharing system. The app does not store or track what content is shared, with whom, or when. Sharing occurs exclusively at the user\'s voluntary initiative and under their full control.\n\nThe app works completely offline and does not transmit any data to external servers.\n\n4. Purpose of Processing\nPersonal data entered by the user (events, holidays, preferences) are processed exclusively to:\n- calculate available bridges between holidays\n- display the personalized calendar\n- provide application functionality\n\n5. Legal Basis for Processing\nProcessing is based on user consent (Article 6(1)(a) GDPR) provided through voluntary use of the application.\n\n6. Data Retention\nAll entered data is stored exclusively locally on the user\'s device. It is not transferred, synchronized or stored on external servers. Data remains on the device until:\n- the user manually deletes it\n- the application is uninstalled\n\n7. Data Sharing\nPontiVia! DOES NOT share, sell or transmit any personal data to third parties. The app does not contain:\n- social network integrations\n- cloud or automatic backup services\n\n8. User Rights\nIn accordance with GDPR, users have the right to:\n- access: view their data (available directly in the app)\n- rectification: modify entered data through the app interface\n- erasure: delete all data by uninstalling the application or manually deleting events\n- objection: cease using the application at any time\n\n9. Data Security\nPontiVia! adopts appropriate technical measures to protect data:\n- secure local storage on the device\n- no data transmission via internet\n- data access limited to the device user\n\n10. Minor Users\nThe application is suitable for users of all ages. It does not intentionally collect personal data from minors under 13 years of age. Since the app does not require registration nor collect identifying data, it can be used by minors under parental or guardian supervision.\n\n11. Changes to the Policy\nWe reserve the right to update this policy. Changes will be communicated through app updates or Store notifications.\n\n12. Contact\nFor privacy-related questions or requests, contact: angelieassociati@gmail.com\n\n13. Supervisory Authority\nUsers have the right to lodge a complaint with the competent supervisory authority:\nItaly: Data Protection Authority (www.garanteprivacy.it)\nUK: Information Commissioner\'s Office (ICO) (www.ico.org.uk)\nEU: Find your national authority at https://edpb.europa.eu/about-edpb/about-edpb/members_en \n\n\n\n\n\n\n\n'
        ]
    }
    return dataLabel[language][item];
}

export function faq(language, item) {
    const dataLabel = {
        'it': [
            "\n\nFAQ - COS'È PONTIVIA! E A COSA SERVE?\n————————————————————\n\nPontiVIA! è un'app che ti aiuta a individuare automaticamente tutte le opportunità di ponte tra le festività. Grazie a un calendario perpetuo che scorre nel tempo, l'app calcola quando è possibile ottenere giorni di riposo extra collegando festività e weekend, aiutandoti a pianificare al meglio ferie e viaggi.\n\n\n[ L’app mostra anche i ponti passati? ]\n\nNo, PontiVIA! calcola solo i ponti futuri a partire dal mese corrente. Non è possibile visualizzare date precedenti: l'obiettivo dell'app è aiutarti a pianificare i prossimi ponti disponibili.\n\n\n[ Per quali Paesi funziona PontiVIA!? ]\n\nL'app include le festività nazionali fisse di 14 Paesi europei:\n\n	⁃	🇮🇹 Italia,\n	⁃	🇦🇹 Austria,\n	⁃	🇨🇭 Svizzera,\n	⁃	🇫🇷 Francia,\n	⁃	🇩🇪 Germania,\n	⁃	🇪🇸 Spagna,\n	⁃	🇵🇹 Portogallo,\n	⁃	🇧🇪 Belgio,\n	⁃	🇳🇱 Olanda,\n	⁃	🇬🇧 Regno Unito,\n	⁃	🇮🇪 Irlanda,\n	⁃	🇸🇮 Slovenia,\n	⁃	🇵🇹 Croazia,\n	⁃	🇬🇷 Grecia.\n\n\nCONSIGLI PER L'USO\n————————————————————\n\n[ Come sfrutto al meglio PontiVIA! per pianificare le mie vacanze? ]\n\n1) Imposta i tuoi giorni festivi settimanali nella pagina 'Filtri'\n\n2) Aggiungi eventuali festività personali o locali in 'Le mie date'\n\n3) Scorri il calendario per individuare i ponti evidenziati in blu\n\n4) Tocca le date dei ponti per aggiungerle al calendario del tuo dispositivo\n\n5) Pianifica le tue ferie in base alle migliori opportunità trovate\n\n\n[ Posso usare PontiVIA! per viaggi all'estero? ]\n\nCertamente! Seleziona il Paese di destinazione dalla pagina 'Le mie date' per visualizzare i ponti basati sulle festività locali. In questo modo potrai pianificare il viaggio tenendo conto sia delle tue festività che di quelle del Paese che visiterai.\n\n\n[ Quanto lontano nel futuro posso pianificare? ]\n\nIl calendario scorre in avanti all'infinito, quindi puoi pianificare i tuoi ponti con qualsiasi anticipo desideri, anche per anni futuri.\n\n\nIL CALENDARIO\n————————————————————\n\n[ Come funziona il calendario di PontiVIA!? ]\n\nIl calendario parte dal mese corrente e scorre in avanti all'infinito. Le date sono visualizzate con colori diversi per aiutarti a distinguere rapidamente i diversi tipi di giorni.\n\n\n[ Cosa significano i diversi colori nel calendario? ]\n\n	⁃	Carattere nero semplice: giorni feriali\n	⁃	Carattere rosso grassetto: giorni della settimana che hai impostato come festivi (es. sabato e domenica)\n	⁃	Carattere rosso cerchiato: festività nazionali o date personali che hai inserito\n	⁃	Sfondo blu con carattere bianco: possibili ponti identificati dall'app\n\n\n[ Cosa succede quando tocco una data nel calendario? ]\n\nDipende dal tipo di data:\n\n	⁃	giorni feriali: tenendo premuto a lungo puoi aggiungere quella data alle tue festività personali\n	⁃	weekend/festivi settimanali: non succede niente\n	⁃	festività nazionali o personali: appare un messaggio con il nome dell'evento\n	⁃	possibili ponti: l'app ti chiede se vuoi aggiungere quella data al calendario del tuo dispositivo\n\n\nLE MIE DATE\n————————————————————\n\n[ Come posso cambiare il Paese delle festività? ]\n\nNella pagina 'Le mie date' trovi un menu a tendina dove puoi selezionare uno dei 14 Paesi disponibili. Questa funzione è particolarmente utile se stai pianificando un viaggio e vuoi conoscere i ponti locali del Paese di destinazione.\n\n\n[ Posso modificare l'elenco delle festività nazionali? ]\n\nNon puoi modificare l'elenco predefinito, ma puoi escludere dal calcolo alcune festività che non desideri o non puoi celebrare. Basta deselezionarle dall'elenco.\n\n\n[ Come faccio a ripristinare le festività del mio Paese? ]\n\nSe hai selezionato le festività di un altro Paese, comparirà un pulsante accanto al menu di selezione che ti permette di ripristinare rapidamente il Paese di default.\n\n\n[ Posso aggiungere festività personali? ]\n\nSì! Nella pagina 'Le mie date' puoi aggiungere i tuoi giorni speciali, come la festa del santo patrono locale o altre ricorrenze personali. Hai due opzioni:\n\n- Eventi di un giorno: per festività che ricorrono in una data specifica\n- Periodi di più giorni: per eventi che durano più giorni consecutivi\n\n\n[ Le date personali si possono ripetere ogni anno? ]\n\nSì, quando aggiungi una data personale puoi scegliere se farla ripetere automaticamente ogni anno. Hai due modalità di ripetizione:\n\n- In base alla data: ad esempio sempre il 7 dicembre\n- In base al giorno del mese: ad esempio sempre il terzo giovedì di novembre\n\n\n[ Come posso modificare o eliminare le date personali? ]\n\nLe date personali possono essere editate o eliminate sia singolarmente che in blocco direttamente dalla pagina 'Le mie date'.\n\n\nCONDIVISIONE\n————————————————————\n\n[ Posso condividere i ponti o le date con altre persone? ]\n\nSì! PontiVIA! ti permette di condividere con i tuoi contatti sia i ponti identificati dall'app che le date personali che hai inserito. Questa funzione è utile per coordinare ferie o eventi con colleghi, amici e familiari.\n\n\n[ Come funziona la condivisione? ]\n\nQuando condividi un elemento, l'app genera un messaggio che include:\n\n- per i ponti identificati: informazioni sul ponte (data e durata) e il link per scaricare l'app\n- per le date personali: i dettagli dell'evento e un link speciale che permette al destinatario di aggiungere automaticamente quella data alla propria app PontiVIA! (se già installata), oltre al link per scaricare l'app\n\n\n[ Chi riceve la condivisione deve avere PontiVIA! installata? ]\n\nPer visualizzare le informazioni base: no, chiunque può leggere i dettagli nel messaggio Per aggiungere automaticamente una data personale condivisa alla propria app: sì, è necessario avere PontiVIA! già installata\n\n\n[ Quali dati vengono condivisi? ]\n\nQuando condividi un elemento, vengono trasmesse solo le informazioni specifiche di quella data o ponte (descrizione, data, durata). Nessun altro dato personale o preferenza della tua app viene condiviso.\n\n\nFILTRI E PERSONALIZZAZIONE\n————————————————————\n\n[ Quali filtri posso impostare per il calcolo dei ponti? ]\n\nNella pagina 'Filtri' puoi personalizzare completamente il calcolo dei ponti secondo le tue esigenze:\n\n- Durata del ponte: da 1 a 3 giorni\n- Giorni della settimana festivi: puoi selezionare quali giorni considerare come festivi (di default sabato e domenica)\n- Elenchi di festività: puoi scegliere se includere le festività nazionali e/o quelle personali\n\n\n[ Posso considerare festivi giorni diversi da sabato e domenica? ]\n\nSì, nella sezione 'Giorni della settimana festivi' puoi attivare o disattivare qualsiasi giorno della settimana secondo le tue esigenze lavorative.\n\n\n[ Quali festività cattoliche posso includere? ]\n\nPontiVIA! ti permette di includere nel calcolo le principali festività cattoliche a data variabile:\n\n	⁃	Pasqua\n	⁃	Lunedì dell'Angelo\n	⁃	Ascensione\n	⁃	Pentecoste\n	⁃	Lunedì di Pentecoste\n	⁃	Corpus Domini\n\nQueste festività sono particolarmente utili se viaggi in Paesi dove vengono celebrate come giorni festivi nazionali.\n\n\n[ Posso modificare le date direttamente dalla pagina Filtri? ]\n\nSì, nella pagina 'Filtri' trovi un pulsante che ti rimanda rapidamente alla pagina 'Le mie date' per modificare l'elenco delle festività.\n\n\nPRIVACY E SUPPORTO\n————————————————————\n\n[ Dove trovo informazioni sulla privacy? ]\n\nTroverai tutte le informazioni sulla privacy nel pulsante “Info Privacy” e nella pagina dello store insieme al supporto con le FAQ complete.\n\n\n[ Come posso ottenere aiuto o segnalare un problema? ]\n\nPuoi consultare le FAQ complete in questo sito web o contattare il supporto scrivendo a: angelieassociati@gmail.com\n\n\n\n\n\n\n\n"
        ],
        'en': [
            "\n\nFAQ - WHAT IS PONTIVIA! AND WHAT IS IT FOR?\n————————————————————\n\nPontiVIA! is an app that helps you automatically identify all bridge opportunities between holidays. Thanks to a perpetual calendar that scrolls through time, the app calculates when it's possible to get extra days off by connecting holidays and weekends, helping you better plan vacations and trips.\n\n\n[ Does the app also show past bridges? ]\n\nNo, PontiVIA! only calculates future bridges starting from the current month. It's not possible to view previous dates: the app's goal is to help you plan upcoming available bridges.\n\n\n[ Which countries does PontiVIA! work for? ]\n\nThe app includes fixed national holidays from 14 European countries:\n\n	⁃	🇮🇹 Italy,\n	⁃	🇦🇹 Austria,\n	⁃	🇨🇭 Switzerland,\n	⁃	🇫🇷 France,\n	⁃	🇩🇪 Germany,\n	⁃	🇪🇸 Spain,\n	⁃	🇵🇹 Portugal,\n	⁃	🇧🇪 Belgium,\n	⁃	🇳🇱 Netherlands,\n	⁃	🇬🇧 United Kingdom,\n	⁃	🇮🇪 Ireland,\n	⁃	🇸🇮 Slovenia,\n	⁃	🇭🇷 Croatia,\n	⁃	🇬🇷 Greece.\n\n\nUSAGE TIPS\n————————————————————\n\n[ How do I best use PontiVIA! to plan my vacations? ]\n\n1) Set your weekly holidays in the 'Filters' page\n\n2) Add any personal or local holidays in 'My dates'\n\n3) Scroll through the calendar to identify bridges highlighted in blue\n\n4) Tap on bridge dates to add them to your device calendar\n\n5) Plan your holidays based on the best opportunities found\n\n\n[ Can I use PontiVIA! for trips abroad? ]\n\nCertainly! Select the destination country from the 'My dates' page to view bridges based on local holidays. This way you can plan your trip taking into account both your holidays and those of the country you'll visit.\n\n\n[ How far into the future can I plan? ]\n\nThe calendar scrolls forward infinitely, so you can plan your bridges with any advance notice you wish, even for future years.\n\n\nTHE CALENDAR\n————————————————————\n\n[ How does the PontiVIA! calendar work? ]\n\nThe calendar starts from the current month and scrolls forward infinitely. Dates are displayed with different colors to help you quickly distinguish different types of days.\n\n\n[ What do the different colors in the calendar mean? ]\n\n	⁃	Simple black text: working days\n	⁃	Bold red text: days of the week you've set as holidays (e.g. Saturday and Sunday)\n	⁃	Circled red text: national holidays or personal dates you've entered\n	⁃	Blue background with white text: possible bridges identified by the app\n\n\n[ What happens when I tap a date in the calendar? ]\n\nIt depends on the type of date:\n\n	⁃	working days: by long pressing you can add that date to your personal holidays\n	⁃	weekend/weekly holidays: nothing happens\n	⁃	national or personal holidays: a message appears with the event name\n	⁃	possible bridges: the app asks if you want to add that date to your device calendar\n\n\nMY DATES\n————————————————————\n\n[ How can I change the holiday country? ]\n\nOn the 'My dates' page you'll find a dropdown menu where you can select one of the 14 available countries. This feature is particularly useful if you're planning a trip and want to know the local bridges of the destination country.\n\n\n[ Can I modify the list of national holidays? ]\n\nYou can't modify the default list, but you can exclude from calculation some holidays you don't want or can't celebrate. Just deselect them from the list.\n\n\n[ How do I restore my country's holidays? ]\n\nIf you've selected another country's holidays, a button will appear next to the selection menu that allows you to quickly restore the default country.\n\n\n[ Can I add personal holidays? ]\n\nYes! On the 'My dates' page you can add your special days, such as local patron saint festivals or other personal occasions. You have two options:\n\n- Single-day events: for holidays that occur on a specific date\n- Multi-day periods: for events lasting several consecutive days\n\n\n[ Can personal dates repeat every year? ]\n\nYes, when you add a personal date you can choose whether to make it repeat automatically every year. You have two repeat modes:\n\n- By date: for example always on December 7th\n- By day of month: for example always on the third Thursday of November\n\n\n[ How can I edit or delete personal dates? ]\n\nPersonal dates can be edited or deleted either individually or in bulk directly from the 'My dates' page.\n\n\nSHARING\n————————————————————\n\n[ Can I share bridges or dates with other people? ]\n\nYes! PontiVIA! allows you to share with your contacts both the bridges identified by the app and the personal dates you've entered. This feature is useful for coordinating holidays or events with colleagues, friends and family.\n\n\n[ How does sharing work? ]\n\nWhen you share an item, the app generates a message that includes:\n\n- for identified bridges: bridge information (date and duration) and the link to download the app\n- for personal dates: event details and a special link that allows the recipient to automatically add that date to their own PontiVIA! app (if already installed), plus the link to download the app\n\n\n[ Does the recipient need to have PontiVIA! installed? ]\n\nTo view basic information: no, anyone can read the details in the message\nTo automatically add a shared personal date to their own app: yes, they need to have PontiVIA! already installed\n\n\n[ What data is shared? ]\n\nWhen you share an item, only the specific information for that date or bridge (description, date, duration) is transmitted. No other personal data or preferences from your app are shared.\n\n\nFILTERS AND CUSTOMIZATION\n————————————————————\n\n[ What filters can I set for bridge calculation? ]\n\nOn the 'Filters' page you can completely customize bridge calculation according to your needs:\n\n- Bridge duration: from 1 to 3 days\n- Weekly holidays: you can select which days to consider as holidays (default Saturday and Sunday)\n- Holiday lists: you can choose whether to include national and/or personal holidays\n\n\n[ Can I consider days other than Saturday and Sunday as holidays? ]\n\nYes, in the 'Weekly holidays' section you can enable or disable any day of the week according to your work needs.\n\n\n[ Which Catholic holidays can I include? ]\n\nPontiVIA! allows you to include in the calculation the main Catholic holidays with variable dates:\n\n	⁃	Easter\n	⁃	Easter Monday\n	⁃	Ascension\n	⁃	Pentecost\n	⁃	Whit Monday\n	⁃	Corpus Christi\n\nThese holidays are particularly useful if you travel to countries where they are celebrated as national holidays.\n\n\n[ Can I modify dates directly from the Filters page? ]\n\nYes, on the 'Filters' page you'll find a button that quickly redirects you to the 'My dates' page to modify the holiday list.\n\n\nPRIVACY AND SUPPORT\n————————————————————\n\n[ Where can I find privacy information? ]\n\nYou'll find all privacy information in the 'Privacy Info' button and on the store page along with support and complete FAQs.\n\n\n[ How can I get help or report an issue? ]\n\nYou can consult the complete FAQs on this website or contact support by writing to: angelieassociati@gmail.com\n\n\n\n\n\n\n\n"
        ],
        'de': [
            "\n\nFAQ - WAS IST PONTIVIA! UND WOFÜR DIENT ES?\n————————————————————\n\nPontiVIA! ist eine App, die dir hilft, automatisch alle Brückenmöglichkeiten zwischen Feiertagen zu identifizieren. Dank eines ewigen Kalenders, der durch die Zeit scrollt, berechnet die App, wann es möglich ist, zusätzliche freie Tage zu bekommen, indem Feiertage und Wochenenden verbunden werden, und hilft dir so, Urlaub und Reisen optimal zu planen.\n\n\n[ Zeigt die App auch vergangene Brücken? ]\n\nNein, PontiVIA! berechnet nur zukünftige Brücken ab dem aktuellen Monat. Es ist nicht möglich, vorherige Daten anzuzeigen: Das Ziel der App ist es, dir zu helfen, die kommenden verfügbaren Brücken zu planen.\n\n\n[ Für welche Länder funktioniert PontiVIA!? ]\n\nDie App enthält feste nationale Feiertage aus 14 europäischen Ländern:\n\n	⁃	🇮🇹 Italien,\n\n	⁃	🇦🇹 Österreich,\n\n	⁃	🇨🇭 Schweiz,\n\n	⁃	🇫🇷 Frankreich,\n\n	⁃	🇩🇪 Deutschland,\n\n	⁃	🇪🇸 Spanien,\n\n	⁃	🇵🇹 Portugal,\n\n	⁃	🇧🇪 Belgien,\n\n	⁃	🇳🇱 Niederlande,\n\n	⁃	🇬🇧 Vereinigtes Königreich,\n\n	⁃	🇮🇪 Irland,\n\n	⁃	🇸🇮 Slowenien,\n\n	⁃	🇭🇷 Kroatien,\n\n	⁃	🇬🇷 Griechenland.\n\n\nNUTZUNGSTIPPS\n\n————————————————————\n\n[ Wie nutze ich PontiVIA! am besten, um meinen Urlaub zu planen? ]\n\n1) Lege deine wöchentlichen freien Tage auf der Seite 'Filter' fest\n\n2) Füge eventuelle persönliche oder lokale Feiertage unter 'Meine Termine' hinzu\n\n3) Scrolle durch den Kalender, um die blau hervorgehobenen Brücken zu finden\n\n4) Tippe auf die Brückendaten, um sie zu deinem Gerätekalender hinzuzufügen\n\n5) Plane deinen Urlaub basierend auf den besten gefundenen Möglichkeiten\n\n\n[ Kann ich PontiVIA! für Reisen ins Ausland nutzen? ]\n\nAuf jeden Fall! Wähle das Zielland auf der Seite 'Meine Termine' aus, um Brücken basierend auf den lokalen Feiertagen anzuzeigen. So kannst du deine Reise unter Berücksichtigung sowohl deiner Feiertage als auch der des Landes, das du besuchst, planen.\n\n\n[ Wie weit in die Zukunft kann ich planen? ]\n\nDer Kalender scrollt unendlich nach vorne, sodass du deine Brücken mit beliebigem Vorlauf planen kannst, auch für zukünftige Jahre.\n\n\nDER KALENDER\n\n————————————————————\n\n[ Wie funktioniert der PontiVIA! Kalender? ]\n\nDer Kalender beginnt beim aktuellen Monat und scrollt unendlich nach vorne. Die Daten werden mit verschiedenen Farben angezeigt, um dir zu helfen, schnell verschiedene Tagestypen zu unterscheiden.\n\n\n[ Was bedeuten die verschiedenen Farben im Kalender? ]\n\n	⁃	Einfacher schwarzer Text: Arbeitstage\n\n	⁃	Fetter roter Text: Wochentage, die du als Feiertage festgelegt hast (z.B. Samstag und Sonntag)\n\n	⁃	Rot umkreister Text: Nationale Feiertage oder persönliche Termine, die du eingetragen hast\n\n	⁃	Blauer Hintergrund mit weißem Text: Mögliche Brücken, die von der App identifiziert wurden\n\n\n[ Was passiert, wenn ich ein Datum im Kalender antippe? ]\n\nDas hängt vom Datumstyp ab:\n\n	⁃	Arbeitstage: durch langes Drücken kannst du dieses Datum zu deinen persönlichen Feiertagen hinzufügen\n\n	⁃	Wochenende/wöchentliche Feiertage: nichts passiert\n\n	⁃	Nationale oder persönliche Feiertage: es erscheint eine Nachricht mit dem Ereignisnamen\n\n	⁃	Mögliche Brücken: die App fragt dich, ob du dieses Datum zu deinem Gerätekalender hinzufügen möchtest\n\n\nMEINE TERMINE\n\n————————————————————\n\n[ Wie kann ich das Feiertagsland ändern? ]\n\nAuf der Seite 'Meine Termine' findest du ein Dropdown-Menü, wo du eines der 14 verfügbaren Länder auswählen kannst. Diese Funktion ist besonders nützlich, wenn du eine Reise planst und die lokalen Brücken des Ziellandes kennen möchtest.\n\n\n[ Kann ich die Liste der nationalen Feiertage ändern? ]\n\nDu kannst die Standardliste nicht ändern, aber du kannst einige Feiertage von der Berechnung ausschließen, die du nicht feiern möchtest oder kannst. Wähle sie einfach in der Liste ab.\n\n\n[ Wie stelle ich die Feiertage meines Landes wieder her? ]\n\nWenn du die Feiertage eines anderen Landes ausgewählt hast, erscheint eine Schaltfläche neben dem Auswahlmenü, mit der du schnell das Standardland wiederherstellen kannst.\n\n\n[ Kann ich persönliche Feiertage hinzufügen? ]\n\nJa! Auf der Seite 'Meine Termine' kannst du deine besonderen Tage hinzufügen, wie das Fest des lokalen Schutzheiligen oder andere persönliche Anlässe. Du hast zwei Optionen:\n\n- Eintägige Ereignisse: für Feiertage, die an einem bestimmten Datum stattfinden\n\n- Mehrtägige Zeiträume: für Ereignisse, die mehrere aufeinanderfolgende Tage dauern\n\n\n[ Können sich persönliche Termine jedes Jahr wiederholen? ]\n\nJa, wenn du ein persönliches Datum hinzufügst, kannst du wählen, ob es sich automatisch jedes Jahr wiederholen soll. Du hast zwei Wiederholungsmodi:\n\n- Nach Datum: zum Beispiel immer am 7. Dezember\n\n- Nach Tag des Monats: zum Beispiel immer am dritten Donnerstag im November\n\n\n[ Wie kann ich persönliche Termine bearbeiten oder löschen? ]\n\nPersönliche Termine können entweder einzeln oder in Gruppen direkt auf der Seite 'Meine Termine' bearbeitet oder gelöscht werden.\n\n\nTEILEN\n\n————————————————————\n\n[ Kann ich Brücken oder Termine mit anderen Personen teilen? ]\n\nJa! PontiVIA! ermöglicht es dir, sowohl die von der App identifizierten Brücken als auch die persönlichen Termine, die du eingegeben hast, mit deinen Kontakten zu teilen. Diese Funktion ist nützlich, um Urlaub oder Veranstaltungen mit Kollegen, Freunden und Familie zu koordinieren.\n\n\n[ Wie funktioniert das Teilen? ]\n\nWenn du ein Element teilst, generiert die App eine Nachricht, die Folgendes enthält:\n\n- für identifizierte Brücken: Brückeninformationen (Datum und Dauer) und den Link zum Herunterladen der App\n\n- für persönliche Termine: Ereignisdetails und einen speziellen Link, der es dem Empfänger ermöglicht, dieses Datum automatisch zu seiner eigenen PontiVIA! App hinzuzufügen (falls bereits installiert), plus den Link zum Herunterladen der App\n\n\n[ Muss der Empfänger PontiVIA! installiert haben? ]\n\nUm grundlegende Informationen anzuzeigen: nein, jeder kann die Details in der Nachricht lesen\n\nUm ein geteiltes persönliches Datum automatisch zur eigenen App hinzuzufügen: ja, es ist erforderlich, PontiVIA! bereits installiert zu haben\n\n\n[ Welche Daten werden geteilt? ]\n\nWenn du ein Element teilst, werden nur die spezifischen Informationen für dieses Datum oder diese Brücke (Beschreibung, Datum, Dauer) übermittelt. Keine anderen persönlichen Daten oder Einstellungen deiner App werden geteilt.\n\n\nFILTER UND ANPASSUNG\n\n————————————————————\n\n[ Welche Filter kann ich für die Brückenberechnung einstellen? ]\n\nAuf der Seite 'Filter' kannst du die Brückenberechnung vollständig nach deinen Bedürfnissen anpassen:\n\n- Brückendauer: von 1 bis 3 Tagen\n\n- Wöchentliche Feiertage: du kannst auswählen, welche Tage als Feiertage betrachtet werden sollen (Standard Samstag und Sonntag)\n\n- Feiertagslisten: du kannst wählen, ob nationale und/oder persönliche Feiertage einbezogen werden sollen\n\n\n[ Kann ich andere Tage als Samstag und Sonntag als Feiertage betrachten? ]\n\nJa, im Abschnitt 'Wöchentliche Feiertage' kannst du jeden Wochentag nach deinen Arbeitsbedürfnissen aktivieren oder deaktivieren.\n\n\n[ Welche katholischen Feiertage kann ich einbeziehen? ]\n\nPontiVIA! ermöglicht es dir, die wichtigsten katholischen Feiertage mit variablen Daten in die Berechnung einzubeziehen:\n\n	⁃	Ostern\n\n	⁃	Ostermontag\n\n	⁃	Christi Himmelfahrt\n\n	⁃	Pfingsten\n\n	⁃	Pfingstmontag\n\n	⁃	Fronleichnam\n\nDiese Feiertage sind besonders nützlich, wenn du in Länder reist, wo sie als nationale Feiertage gefeiert werden.\n\n\n[ Kann ich Termine direkt von der Filter-Seite aus ändern? ]\n\nJa, auf der Seite 'Filter' findest du eine Schaltfläche, die dich schnell zur Seite 'Meine Termine' weiterleitet, um die Feiertagsliste zu ändern.\n\n\nDATENSCHUTZ UND SUPPORT\n\n————————————————————\n\n[ Wo finde ich Informationen zum Datenschutz? ]\n\nDu findest alle Datenschutzinformationen in der Schaltfläche 'Datenschutz-Info' und auf der Store-Seite zusammen mit dem Support und den vollständigen FAQs.\n\n\n[ Wie kann ich Hilfe erhalten oder ein Problem melden? ]\n\nDu kannst die vollständigen FAQs auf dieser Website konsultieren oder den Support kontaktieren, indem du an folgende Adresse schreibst: angelieassociati@gmail.com\n\n\n\n\n\n\n\n"
        ],
        'fr': [
            "\n\nFAQ - QU'EST-CE QUE PONTIVIA! ET À QUOI SERT-IL?\n\n————————————————————\n\n\nPontiVIA! est une application qui vous aide à identifier automatiquement toutes les opportunités de pont entre les jours fériés. Grâce à un calendrier perpétuel qui défile dans le temps, l'application calcule quand il est possible d'obtenir des jours de repos supplémentaires en reliant les jours fériés et les week-ends, vous aidant à mieux planifier vos congés et voyages.\n\n\n[ L'application affiche-t-elle aussi les ponts passés? ]\n\n\nNon, PontiVIA! calcule uniquement les ponts futurs à partir du mois en cours. Il n'est pas possible de visualiser les dates antérieures : l'objectif de l'application est de vous aider à planifier les prochains ponts disponibles.\n\n\n[ Pour quels pays fonctionne PontiVIA!? ]\n\n\nL'application comprend les jours fériés nationaux fixes de 14 pays européens :\n\n\n	⁃	🇮🇹 Italie,\n\n	⁃	🇦🇹 Autriche,\n\n	⁃	🇨🇭 Suisse,\n\n	⁃	🇫🇷 France,\n\n	⁃	🇩🇪 Allemagne,\n\n	⁃	🇪🇸 Espagne,\n\n	⁃	🇵🇹 Portugal,\n\n	⁃	🇧🇪 Belgique,\n\n	⁃	🇳🇱 Pays-Bas,\n\n	⁃	🇬🇧 Royaume-Uni,\n\n	⁃	🇮🇪 Irlande,\n\n	⁃	🇸🇮 Slovénie,\n\n	⁃	🇭🇷 Croatie,\n\n	⁃	🇬🇷 Grèce.\n\n\nCONSEILS D'UTILISATION\n\n————————————————————\n\n\n[ Comment utiliser au mieux PontiVIA! pour planifier mes vacances? ]\n\n\n1) Définissez vos jours fériés hebdomadaires dans la page 'Filtres'\n\n\n2) Ajoutez d'éventuels jours fériés personnels ou locaux dans 'Mes dates'\n\n\n3) Faites défiler le calendrier pour repérer les ponts surlignés en bleu\n\n\n4) Touchez les dates des ponts pour les ajouter au calendrier de votre appareil\n\n\n5) Planifiez vos congés en fonction des meilleures opportunités trouvées\n\n\n[ Puis-je utiliser PontiVIA! pour des voyages à l'étranger? ]\n\n\nCertainement ! Sélectionnez le pays de destination depuis la page 'Mes dates' pour visualiser les ponts basés sur les jours fériés locaux. Ainsi, vous pourrez planifier le voyage en tenant compte à la fois de vos jours fériés et de ceux du pays que vous visiterez.\n\n\n[ Jusqu'où dans le futur puis-je planifier? ]\n\n\nLe calendrier défile à l'infini vers l'avant, vous pouvez donc planifier vos ponts avec n'importe quel délai souhaité, même pour les années futures.\n\n\nLE CALENDRIER\n\n————————————————————\n\n\n[ Comment fonctionne le calendrier de PontiVIA!? ]\n\n\nLe calendrier commence au mois en cours et défile à l'infini vers l'avant. Les dates sont affichées avec différentes couleurs pour vous aider à distinguer rapidement les différents types de jours.\n\n\n[ Que signifient les différentes couleurs dans le calendrier? ]\n\n\n	⁃	Texte noir simple : jours ouvrables\n\n	⁃	Texte rouge gras : jours de la semaine que vous avez définis comme fériés (par ex. samedi et dimanche)\n\n	⁃	Texte rouge cerclé : jours fériés nationaux ou dates personnelles que vous avez saisis\n\n	⁃	Fond bleu avec texte blanc : ponts possibles identifiés par l'application\n\n\n[ Que se passe-t-il lorsque je touche une date dans le calendrier? ]\n\n\nCela dépend du type de date :\n\n\n	⁃	jours ouvrables : en maintenant une pression longue, vous pouvez ajouter cette date à vos jours fériés personnels\n\n	⁃	week-end/jours fériés hebdomadaires : rien ne se passe\n\n	⁃	jours fériés nationaux ou personnels : un message apparaît avec le nom de l'événement\n\n	⁃	ponts possibles : l'application vous demande si vous voulez ajouter cette date au calendrier de votre appareil\n\n\nMES DATES\n\n————————————————————\n\n\n[ Comment puis-je changer le pays des jours fériés? ]\n\n\nDans la page 'Mes dates', vous trouverez un menu déroulant où vous pouvez sélectionner l'un des 14 pays disponibles. Cette fonction est particulièrement utile si vous planifiez un voyage et voulez connaître les ponts locaux du pays de destination.\n\n\n[ Puis-je modifier la liste des jours fériés nationaux? ]\n\n\nVous ne pouvez pas modifier la liste par défaut, mais vous pouvez exclure du calcul certains jours fériés que vous ne souhaitez pas ou ne pouvez pas célébrer. Il suffit de les désélectionner dans la liste.\n\n\n[ Comment restaurer les jours fériés de mon pays? ]\n\n\nSi vous avez sélectionné les jours fériés d'un autre pays, un bouton apparaîtra à côté du menu de sélection qui vous permet de restaurer rapidement le pays par défaut.\n\n\n[ Puis-je ajouter des jours fériés personnels? ]\n\n\nOui ! Dans la page 'Mes dates', vous pouvez ajouter vos jours spéciaux, comme la fête du saint patron local ou d'autres occasions personnelles. Vous avez deux options :\n\n\n- Événements d'un jour : pour les jours fériés qui ont lieu à une date spécifique\n\n- Périodes de plusieurs jours : pour les événements qui durent plusieurs jours consécutifs\n\n\n[ Les dates personnelles peuvent-elles se répéter chaque année? ]\n\n\nOui, lorsque vous ajoutez une date personnelle, vous pouvez choisir de la faire se répéter automatiquement chaque année. Vous avez deux modes de répétition :\n\n\n- Selon la date : par exemple toujours le 7 décembre\n\n- Selon le jour du mois : par exemple toujours le troisième jeudi de novembre\n\n\n[ Comment puis-je modifier ou supprimer les dates personnelles? ]\n\n\nLes dates personnelles peuvent être modifiées ou supprimées individuellement ou en bloc directement depuis la page 'Mes dates'.\n\n\nPARTAGE\n\n————————————————————\n\n\n[ Puis-je partager les ponts ou les dates avec d'autres personnes? ]\n\n\nOui ! PontiVIA! vous permet de partager avec vos contacts à la fois les ponts identifiés par l'application et les dates personnelles que vous avez saisies. Cette fonction est utile pour coordonner les congés ou événements avec des collègues, amis et famille.\n\n\n[ Comment fonctionne le partage? ]\n\n\nLorsque vous partagez un élément, l'application génère un message qui comprend :\n\n\n- pour les ponts identifiés : informations sur le pont (date et durée) et le lien pour télécharger l'application\n\n- pour les dates personnelles : détails de l'événement et un lien spécial qui permet au destinataire d'ajouter automatiquement cette date à sa propre application PontiVIA! (si déjà installée), plus le lien pour télécharger l'application\n\n\n[ Le destinataire doit-il avoir PontiVIA! installé? ]\n\n\nPour visualiser les informations de base : non, tout le monde peut lire les détails dans le message\n\nPour ajouter automatiquement une date personnelle partagée à sa propre application : oui, il faut avoir PontiVIA! déjà installé\n\n\n[ Quelles données sont partagées? ]\n\n\nLorsque vous partagez un élément, seules les informations spécifiques de cette date ou ce pont (description, date, durée) sont transmises. Aucune autre donnée personnelle ou préférence de votre application n'est partagée.\n\n\nFILTRES ET PERSONNALISATION\n\n————————————————————\n\n\n[ Quels filtres puis-je définir pour le calcul des ponts? ]\n\n\nDans la page 'Filtres', vous pouvez personnaliser complètement le calcul des ponts selon vos besoins :\n\n\n- Durée du pont : de 1 à 3 jours\n\n- Jours fériés hebdomadaires : vous pouvez sélectionner quels jours considérer comme fériés (par défaut samedi et dimanche)\n\n- Listes de jours fériés : vous pouvez choisir d'inclure les jours fériés nationaux et/ou personnels\n\n\n[ Puis-je considérer des jours autres que samedi et dimanche comme fériés? ]\n\n\nOui, dans la section 'Jours fériés hebdomadaires', vous pouvez activer ou désactiver n'importe quel jour de la semaine selon vos besoins professionnels.\n\n\n[ Quelles fêtes catholiques puis-je inclure? ]\n\n\nPontiVIA! vous permet d'inclure dans le calcul les principales fêtes catholiques à date variable :\n\n\n	⁃	Pâques\n\n	⁃	Lundi de Pâques\n\n	⁃	Ascension\n\n	⁃	Pentecôte\n\n	⁃	Lundi de Pentecôte\n\n	⁃	Fête-Dieu\n\n\nCes fêtes sont particulièrement utiles si vous voyagez dans des pays où elles sont célébrées comme jours fériés nationaux.\n\n\n[ Puis-je modifier les dates directement depuis la page Filtres? ]\n\n\nOui, dans la page 'Filtres', vous trouverez un bouton qui vous renvoie rapidement à la page 'Mes dates' pour modifier la liste des jours fériés.\n\n\nCONFIDENTIALITÉ ET SUPPORT\n\n————————————————————\n\n\n[ Où puis-je trouver des informations sur la confidentialité? ]\n\n\nVous trouverez toutes les informations sur la confidentialité dans le bouton 'Info Confidentialité' et sur la page du store avec le support et les FAQ complètes.\n\n\n[ Comment puis-je obtenir de l'aide ou signaler un problème? ]\n\n\nVous pouvez consulter les FAQ complètes sur ce site web ou contacter le support en écrivant à: angelieassociati@gmail.com\n\n\n\n\n\n\n\n"
        ],
        'es': [
            "\n\nFAQ - ¿QUÉ ES PONTIVIA! Y PARA QUÉ SIRVE?\n————————————————————\n\nPontiVIA! es una app que te ayuda a identificar automáticamente todas las oportunidades de puente entre festivos. Gracias a un calendario perpetuo que se desplaza en el tiempo, la app calcula cuándo es posible obtener días de descanso extra conectando festivos y fines de semana, ayudándote a planificar mejor tus vacaciones y viajes.\n\n\n[ ¿La app también muestra puentes pasados? ]\n\nNo, PontiVIA! calcula solo los puentes futuros a partir del mes actual. No es posible visualizar fechas anteriores: el objetivo de la app es ayudarte a planificar los próximos puentes disponibles.\n\n\n[ ¿Para qué países funciona PontiVIA!? ]\n\nLa app incluye los festivos nacionales fijos de 14 países europeos:\n\n	⁃	🇮🇹 Italia,\n	⁃	🇦🇹 Austria,\n	⁃	🇨🇭 Suiza,\n	⁃	🇫🇷 Francia,\n	⁃	🇩🇪 Alemania,\n	⁃	🇪🇸 España,\n	⁃	🇵🇹 Portugal,\n	⁃	🇧🇪 Bélgica,\n	⁃	🇳🇱 Países Bajos,\n	⁃	🇬🇧 Reino Unido,\n	⁃	🇮🇪 Irlanda,\n	⁃	🇸🇮 Eslovenia,\n	⁃	🇭🇷 Croacia,\n	⁃	🇬🇷 Grecia.\n\n\nCONSEJOS DE USO\n————————————————————\n\n[ ¿Cómo aprovecho mejor PontiVIA! para planificar mis vacaciones? ]\n\n1) Configura tus días festivos semanales en la página 'Filtros'\n\n2) Añade posibles festivos personales o locales en 'Mis fechas'\n\n3) Desplázate por el calendario para identificar los puentes resaltados en azul\n\n4) Toca las fechas de los puentes para añadirlas al calendario de tu dispositivo\n\n5) Planifica tus vacaciones según las mejores oportunidades encontradas\n\n\n[ ¿Puedo usar PontiVIA! para viajes al extranjero? ]\n\n¡Por supuesto! Selecciona el país de destino desde la página 'Mis fechas' para visualizar los puentes basados en los festivos locales. De este modo podrás planificar el viaje teniendo en cuenta tanto tus festivos como los del país que visitarás.\n\n\n[ ¿Hasta qué punto en el futuro puedo planificar? ]\n\nEl calendario se desplaza hacia adelante infinitamente, así que puedes planificar tus puentes con la antelación que desees, incluso para años futuros.\n\n\nEL CALENDARIO\n————————————————————\n\n[ ¿Cómo funciona el calendario de PontiVIA!? ]\n\nEl calendario parte del mes actual y se desplaza hacia adelante infinitamente. Las fechas se visualizan con diferentes colores para ayudarte a distinguir rápidamente los diferentes tipos de días.\n\n\n[ ¿Qué significan los diferentes colores en el calendario? ]\n\n	⁃	Texto negro simple: días laborables\n	⁃	Texto rojo en negrita: días de la semana que has configurado como festivos (ej. sábado y domingo)\n	⁃	Texto rojo con círculo: festivos nacionales o fechas personales que has introducido\n	⁃	Fondo azul con texto blanco: posibles puentes identificados por la app\n\n\n[ ¿Qué sucede cuando toco una fecha en el calendario? ]\n\nDepende del tipo de fecha:\n\n	⁃	días laborables: manteniendo pulsado puedes añadir esa fecha a tus festivos personales\n	⁃	fin de semana/festivos semanales: no sucede nada\n	⁃	festivos nacionales o personales: aparece un mensaje con el nombre del evento\n	⁃	posibles puentes: la app te pregunta si quieres añadir esa fecha al calendario de tu dispositivo\n\n\nMIS FECHAS\n————————————————————\n\n[ ¿Cómo puedo cambiar el país de los festivos? ]\n\nEn la página 'Mis fechas' encontrarás un menú desplegable donde puedes seleccionar uno de los 14 países disponibles. Esta función es particularmente útil si estás planificando un viaje y quieres conocer los puentes locales del país de destino.\n\n\n[ ¿Puedo modificar la lista de festivos nacionales? ]\n\nNo puedes modificar la lista predeterminada, pero puedes excluir del cálculo algunos festivos que no deseas o no puedes celebrar. Basta con deseleccionarlos de la lista.\n\n\n[ ¿Cómo restauro los festivos de mi país? ]\n\nSi has seleccionado los festivos de otro país, aparecerá un botón junto al menú de selección que te permite restaurar rápidamente el país predeterminado.\n\n\n[ ¿Puedo añadir festivos personales? ]\n\n¡Sí! En la página 'Mis fechas' puedes añadir tus días especiales, como la fiesta del santo patrón local u otras ocasiones personales. Tienes dos opciones:\n\n- Eventos de un día: para festivos que ocurren en una fecha específica\n- Períodos de varios días: para eventos que duran varios días consecutivos\n\n\n[ ¿Las fechas personales se pueden repetir cada año? ]\n\nSí, cuando añades una fecha personal puedes elegir si hacerla repetir automáticamente cada año. Tienes dos modalidades de repetición:\n\n- Según la fecha: por ejemplo siempre el 7 de diciembre\n- Según el día del mes: por ejemplo siempre el tercer jueves de noviembre\n\n\n[ ¿Cómo puedo modificar o eliminar las fechas personales? ]\n\nLas fechas personales pueden ser editadas o eliminadas tanto individualmente como en bloque directamente desde la página 'Mis fechas'.\n\n\nCOMPARTIR\n————————————————————\n\n[ ¿Puedo compartir los puentes o las fechas con otras personas? ]\n\n¡Sí! PontiVIA! te permite compartir con tus contactos tanto los puentes identificados por la app como las fechas personales que has introducido. Esta función es útil para coordinar vacaciones o eventos con compañeros, amigos y familiares.\n\n\n[ ¿Cómo funciona el compartir? ]\n\nCuando compartes un elemento, la app genera un mensaje que incluye:\n\n- para los puentes identificados: información sobre el puente (fecha y duración) y el enlace para descargar la app\n- para las fechas personales: los detalles del evento y un enlace especial que permite al destinatario añadir automáticamente esa fecha a su propia app PontiVIA! (si ya está instalada), además del enlace para descargar la app\n\n\n[ ¿El destinatario debe tener PontiVIA! instalada? ]\n\nPara visualizar la información básica: no, cualquiera puede leer los detalles en el mensaje\nPara añadir automáticamente una fecha personal compartida a su propia app: sí, es necesario tener PontiVIA! ya instalada\n\n\n[ ¿Qué datos se comparten? ]\n\nCuando compartes un elemento, se transmiten solo las informaciones específicas de esa fecha o puente (descripción, fecha, duración). Ningún otro dato personal o preferencia de tu app se comparte.\n\n\nFILTROS Y PERSONALIZACIÓN\n————————————————————\n\n[ ¿Qué filtros puedo configurar para el cálculo de los puentes? ]\n\nEn la página 'Filtros' puedes personalizar completamente el cálculo de los puentes según tus necesidades:\n\n- Duración del puente: de 1 a 3 días\n- Días festivos semanales: puedes seleccionar qué días considerar como festivos (por defecto sábado y domingo)\n- Listas de festivos: puedes elegir si incluir los festivos nacionales y/o los personales\n\n\n[ ¿Puedo considerar festivos días diferentes a sábado y domingo? ]\n\nSí, en la sección 'Días festivos semanales' puedes activar o desactivar cualquier día de la semana según tus necesidades laborales.\n\n\n[ ¿Qué festivos católicos puedo incluir? ]\n\nPontiVIA! te permite incluir en el cálculo las principales festividades católicas de fecha variable:\n\n	⁃	Pascua\n	⁃	Lunes de Pascua\n	⁃	Ascensión\n	⁃	Pentecostés\n	⁃	Lunes de Pentecostés\n	⁃	Corpus Christi\n\nEstas festividades son particularmente útiles si viajas a países donde se celebran como días festivos nacionales.\n\n\n[ ¿Puedo modificar las fechas directamente desde la página Filtros? ]\n\nSí, en la página 'Filtros' encontrarás un botón que te remite rápidamente a la página 'Mis fechas' para modificar la lista de festivos.\n\n\nPRIVACIDAD Y SOPORTE\n————————————————————\n\n[ ¿Dónde encuentro información sobre privacidad? ]\n\nEncontrarás toda la información sobre privacidad en el botón 'Info Privacidad' y en la página de la tienda junto con el soporte y las FAQ completas.\n\n\n[ ¿Cómo puedo obtener ayuda o reportar un problema? ]\n\nPuedes consultar las FAQ completas en este sitio web o contactar con el soporte escribiendo a: angelieassociati@gmail.com\n\n\n\n\n\n\n\n"
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
            'Con PontiVIA',
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
            'Avec PontiVIA',                                   // 3
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
            'Con PontiVIA',                                    // 3
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
            'Mit PontiVIA',                                    // 3
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
            'With PontiVIA',                                   // 3
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
            'Met PontiVIA',                                    // 3
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
            'Com PontiVIA',                                    // 3
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
            'S PontiVIA',                                      // 3
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
            'S PontiVIA',                                      // 3
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
            'Με το PontiVIA',                                  // 3
            'ανακάλυψε τη μαγεία!',                            // 4
            'Κάθε γιορτή γίνεται διακοπές',                    // 5
            'Πάμε στην',                                       // 6
            'επόμενη περιπέτειά σου!',                         // 7
            'Ο αφεντικό σου μπορεί να περιμένει 😎'            // 8
        ]
    }
    return dataLabel[language][item];
}