/* FUNZIONE ESTERNALIZZATA PERCHE' RICHIAMATA 
DA  preferences.tsx E calendarUtils.tsx
 */


export function dataLabel(language: string, item: number) {
    const countryLabels: any = {
        'it':[
            'Pasqua',                               // 0
            'Lunedì dell\'Angelo',                  // 1
            'Ascensione',                           // 2
            "Pentecoste",                           // 3
            "Lunedì di Pentecoste",                 // 4
            "Corpus Domini",                        // 5
            "Possibile ponte!",                     // 6 // le voci fino qui sono usate in 'calendarUtils'
            'Festività nazionali',                  // 7 // le ultime 4 vengono richiamate 'preferences'
            'Festività locali',                     // 8
            'Giorni speciali',                      // 9
            'Periodi di ferie',                     // 10
        ],
        'fr': [
            'Pâques',                                  // 0
            'Lundi de Pâques',                         // 1
            'Ascension',                               // 2
            'Pentecôte',                               // 3
            'Lundi de Pentecôte',                      // 4
            'Fête-Dieu',                               // 5
            'Pont possible!',                          // 6
            'Fêtes nationales',                          // 7
            'Fêtes locales',                             // 8
            'Jours spéciaux',                            // 9
            'Périodes de vacances',                      // 10        
            ],
        'es': [
            'Pascua',                                   // 0
            'Lunes de Pascua',                         // 1
            'Ascensión',                               // 2
            'Pentecostés',                             // 3
            'Lunes de Pentecostés',                    // 4
            'Corpus Christi',                          // 5
            '¡Posible puente!',                         // 6
            'Festividades nacionales',                   // 7
            'Festividades locales',                      // 8
            'Días especiales',                           // 9
            'Períodos de vacaciones',                    // 10        
            ],
        'de': [
            'Ostern',                                  // 0
            'Ostermontag',                             // 1
            'Christi Himmelfahrt',                     // 2
            'Pfingsten',                               // 3
            'Pfingstmontag',                           // 4
            'Fronleichnam',                            // 5
            'Mögliche Brücke!',                         // 6
            'Nationale Feiertage',                       // 7
            'Lokale Feiertage',                          // 8
            'Besondere Tage',                            // 9
            'Ferienzeiten',                              // 10        
            ],
        'en': [
            'Easter',                                  // 0
            'Easter Monday',                           // 1
            'Ascension',                               // 2
            'Pentecost',                               // 3
            'Whit Monday',                             // 4
            'Corpus Christi',                          // 5
            'Possible bridge!',                         // 6
            'National holidays',                         // 7
            'Local holidays',                            // 8
            'Special days',                              // 9
            'Holiday periods',                           // 10
            ],
        'nl': [
            'Pasen',                                   // 0
            'Paasmaandag',                             // 1
            'Hemelvaart',                              // 2
            'Pinksteren',                              // 3
            'Pinkstermaandag',                         // 4
            'Sacramentsdag',                           // 5
            'Mogelijke brug!',                          // 6
            'Nationale feestdagen',                      // 7
            'Lokale feestdagen',                         // 8
            'Speciale dagen',                            // 9
            'Vakantieperiodes',                          // 10
            ],
        'pt': [
            'Páscoa',                                  // 0
            'Segunda-feira de Páscoa',                 // 1
            'Ascensão',                                // 2
            'Pentecostes',                             // 3
            'Segunda de Pentecostes',                  // 4
            'Corpus Christi',                          // 5
            'Ponte possível!',                          // 6
            'Feriados nacionais',                        // 7
            'Feriados locais',                           // 8
            'Dias especiais',                            // 9
            'Períodos de férias',                        // 10        
            ],
        'hr': [
            'Uskrs',                                   // 0
            'Uskršnji ponedjeljak',                    // 1
            'Uzašašće',                                // 2
            'Duhovi',                                  // 3
            'Duhovni ponedjeljak',                     // 4
            'Tijelovo',                                // 5
            'Moguć most!',                              // 6
            'Nacionalni praznici',                       // 7
            'Lokalni praznici',                          // 8
            'Posebni dani',                              // 9
            'Periodi odmora',                            // 10
            ],
        'si': [
            'Velika noč',                              // 0
            'Velikonočni ponedeljek',                  // 1
            'Vnebovzetje',                             // 2
            'Binkošti',                                // 3
            'Binkošti ponedeljek',                     // 4
            'Rešnje telo',                             // 5
            'Možen most!',                              // 6
            'Državni prazniki',                          // 7
            'Lokalni prazniki',                          // 8
            'Posebni dnevi',                             // 9
            'Počitniška obdobja',                        // 10
        ],
        'gr': [
            'Πάσχα',                                   // 0
            'Δευτέρα του Πάσχα',                       // 1
            'Ανάληψη',                                 // 2
            'Πεντηκοστή',                              // 3
            'Δευτέρα της Πεντηκοστής',                 // 4
            'Θεοφάνεια',                               // 5
            'Πιθανή γέφυρα!',                           // 6
            'Εθνικές γιορτές',                           // 7
            'Τοπικές γιορτές',                           // 8
            'Ειδικές μέρες',                             // 9
            'Περίοδοι διακοπών',                         // 10   
        ]
    };
    return countryLabels[language][item];
}