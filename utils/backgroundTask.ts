console.log("Loading backgroundTask.ts - registering TaskManager definition...");
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCalendarGrid, createUTCDate } from '@/components/calendarUtils';
import { scheduleLocalNotification } from './notifications';
import { getLocales } from 'expo-localization';
import { dataLabel } from '@/constants/dataLabel';



export const BACKGROUND_BRIDGE_TASK = 'BACKGROUND_BRIDGE_DETECTION_TASK';
const STORAGE_PREFERENCES_KEY = 'PREFERENCES_KEY';
const STORAGE_NOTIFIED_BRIDGES_KEY = 'LAST_NOTIFIED_BRIDGES';

// Legge le preferenze
const getPreferences = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_PREFERENCES_KEY);
        // Se non ci sono preferenze salvate, usa dei default minimi:
        // ATTENZIONE: createCalendarGrid ha bisogno di una struttura preferences completa,
        // l'app dovrebbe averle salvate al primo avvio.
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error reading preferences:', e);
        return null;
    }
};

TaskManager.defineTask(BACKGROUND_BRIDGE_TASK, async () => {

    const now = new Date();
    console.log(`[${now.toISOString()}] Esecuzione Background Task Ponti e Ferie...`);

    // Ottieni lingua e paese direttamente (non possiamo usare React hooks qui!)
    const myLanguage = getLocales()[0].languageTag;
    const myCountry = myLanguage; // Usa la lingua come fallback per il paese

    try {
        // 1. Carica preferenze
        const preferences = await getPreferences();
        if (!preferences) {

            return BackgroundTask.BackgroundTaskResult.Success; // console.log('Nessuna preferenza trovata. skip.');
        }

        // Verifica se la feature è abilitata nelle preferenze (se decidiamo di salvarlo lì)
        // Ma la registrazione del task viene gestita dalla UI, quindi se siamo qui, il task è attivo.

        // 2. Parametri base
        //      const myLanguage = getLocales()[0].languageTag;
        //      const myCountry = preferences.myCountry || myLanguage;
        // In un contesto reale, `newPersonalHolydays` dovrebbe essere letto da storage separato se presente
        // Per ora assumiamo vuoto o leggiamo se esiste
        const personalHolydaysJson = await AsyncStorage.getItem('newPersonalHolydays');
        const newPersonalHolydays = personalHolydaysJson ? JSON.parse(personalHolydaysJson) : [];
        const nationalExcludedJson = await AsyncStorage.getItem('nationalExcluded');
        const nationalExcluded = nationalExcludedJson ? JSON.parse(nationalExcludedJson) : [];

        // Converti date stringhe in oggetti Date per personalHolydays
        const convertedPersonalHolydays = newPersonalHolydays.map((h: any) => ({
            ...h,
            startDate: new Date(h.startDate),
            endDate: h.endDate ? new Date(h.endDate) : null
        }));


        // 3. Determina finestra temporale (lookahead)
        // Default 30 giorni se non specificato
        const lookaheadDays = preferences.bridgeLookaheaddays || 30;

        // 4. Genera Griglia (Mese corrente + prossimo dovrebbero bastare per 30/60gg)
        const currentMonthStart = createUTCDate(now.getFullYear(), now.getMonth(), 1);
        // Carica 3 mesi per sicurezza
        const grid = createCalendarGrid(
            currentMonthStart,
            3,
            preferences.bridgeDuration || 3,
            convertedPersonalHolydays,
            myCountry,
            preferences,
            nationalExcluded
        );

        // 5. Cerca Ponti Nuovi
        let newBridgesFound = false;
        const lookaheadDate = new Date();
        lookaheadDate.setDate(now.getDate() + lookaheadDays);

        // Carica ponti già notificati
        const notifiedJson = await AsyncStorage.getItem(STORAGE_NOTIFIED_BRIDGES_KEY);
        let notifiedBridges: string[] = notifiedJson ? JSON.parse(notifiedJson) : [];

        for (const monthData of grid) {
            for (const bridge of monthData.bridges) {
                const bridgeStart = new Date(bridge.da);

                // Controlla se il ponte inizia nel futuro ed entro il lookahead
                if (bridgeStart >= now && bridgeStart <= lookaheadDate) {

                    // Crea ID unico per il ponte: "YYYY-MM-DD-Length"
                    const bridgeId = `${bridgeStart.toISOString().split('T')[0]}-${bridge.length}`;

                    if (!notifiedBridges.includes(bridgeId)) {
                        // TROVATO NUOVO PONTE!
                        newBridgesFound = true;

                        const msg = `${bridgeStart.toLocaleDateString()} (${bridge.length} days)!`;

                        await scheduleLocalNotification(
                            `${dataLabel(myLanguage, 6)} 🎉`,  // Possibile ponte!
                            msg,                               // messaggio
                            { bridgeId }                       // ID del ponte
                        );

                        notifiedBridges.push(bridgeId);
                    }
                }
            }
        }

        // 6. Aggiorna lista notificati e pulizia vecchi
        if (newBridgesFound) {
            // Pulisci ID vecchi (ponti passati da più di X giorni) per non intasare storage
            // ... (logica di pulizia semplificata: teniamo ultimi 50)
            if (notifiedBridges.length > 50) {
                notifiedBridges = notifiedBridges.slice(-50);
            }
            await AsyncStorage.setItem(STORAGE_NOTIFIED_BRIDGES_KEY, JSON.stringify(notifiedBridges));
            return BackgroundTask.BackgroundTaskResult.Success;
        }

        return BackgroundTask.BackgroundTaskResult.Success;

    } catch (error) {
        console.error('Background task failed:', error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
});
