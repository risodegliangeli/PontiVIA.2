// TRADUZIONI //
// NB QUESTO FILE RACCOGLIE TUTTE LE LABEL DELLE PAGINE TRADOTTE IN 10 LINGUE

// LABEL USATE IN splittedBar.tsx
export function splittedBarLabel(language, item) {
    const countryLabels = {
        'it':[
            'Le mie date', 
            'Filtri'
        ],
        'fr': [
            'Mes Dates', 
            'Filtres'
        ],
        'es': [
            'Mis Fechas', 
            'Filtros'
        ],
        'de': [
            'Meine Daten', 
            'Filter'
        ],
        'en': [
            'My Dates', 
            'Filters'
        ],
        'nl': [
            'Mijn Data', 
            'Filters'
        ],
        'pt': [
            'Minhas Datas', 
            'Filtros'
        ],
        'hr': [
            'Moji datumi',
            'Filteri',        
        ],
        'si': [
            'Moji datumi',
            'Filtri',        
        ],
        'gr': [
            'Οι ημερομηνίες μου',
            'Φίλτρα',        
        ],
    };
    return countryLabels[language][item];
}

// LABEL USATE IN index.tsx
export function indexLabels(language, item) {
  const dataLabel = {
    'it': ['Nessun ponte in vista?\nScorri il calendario e imposta\ni filtri e i tuoi giorni'],
    'fr': ['Pas de pont en vue?\nFaites défiler le calendrier\net définissez les filtres et vos dates'],
    'es': ['¿Ningún puente a la vista?\nDesliza el calendario y configura\nlos filtros y tus días'],
    'de': ['Keine Brücke in Sicht?\nBlättern Sie im Kalender vorwärts\nund stellen Sie die Filter und Ihre Daten ein'],
    'en': ['No bridge in sight?\nScroll the calendar and set\nfilters and your days'],
    'nl': ['Geen brug in zicht?\nScroll door de kalender en stel\nfilters en je dagen in'],
    'pt': ['Nenhuma ponte à vista?\nDeslize o calendário e configure\nos filtros e seus dias'],
    'hr': ['Nema mosta na vidiku?\nSkrolaj kalendar i postavi\nfiltere i svoje dane'],
    'si': ['Ni mosta na vidiku?\nDrsaj po koledarju in nastavi\nfiltre in svoje dni'],
    'gr': ['Καμία γέφυρα στον ορίζοντα;\nΚύλισε το ημερολόγιο και όρισε\nφίλτρα και τις μέρες σου']
  };
  return dataLabel[language][item];
}

// LABEL USATE IN calendarUtils.tsx e preferences.tsx
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
    ],  
    'de':[
        'Meine Termine',                                            // 0
        'Füge besonderen Tage hinzu',                         // 1
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
    ]
    };
    return dataLabel[language][item];
}

// LABEL USATE IN calendarScreen.tsx
export function calendarScrenLabels(language, item) {
    const dataLabel: any = {
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
            'Aggiungi'                                  // 11
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
            'Ajouter'                                   // 11
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
            'Añadir'                                    // 11
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
            'Hinzufügen'                                // 11
        ],  
        'en':[
            'Bridge!',                                  // 0
            'PontiVIA! found this bridge for you',      // 1
            'bridges found!',                           // 2
            'bridge found!',                            // 3
            'From ',                                    // 4
            ' to ',                                     // 5
            ' days)',                                   // 6
            'On ',                                      // 7
            ' (1 day)',                                 // 8
            'Possible bridge!',                         // 9
            'Cancel',                                   // 10
            'Add'                                       // 11
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
            'Toevoegen'                                 // 11
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
            'Adicionar'                                 // 11
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
            'Dodaj'                                     // 11
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
            'Dodaj'                                     // 11
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
            'Προσθήκη'                                  // 11
        ]
    };
    return dataLabel[language][item];
}

// LABEL USATE IN NewDatepicker
export function datepickerLabels(language, item) {
    const dataLabel: any = {
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

