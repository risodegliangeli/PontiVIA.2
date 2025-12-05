/**
 * Storage Utilities
 * 
 * Funzioni centralizzate per la gestione di AsyncStorage con error handling
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Carica dati da AsyncStorage (JSDoc comments)
 * 
 * @param key - Chiave dello storage
 * @param defaultValue - Valore di default in caso di errore o dato mancante
 * @returns I dati parsati o il valore di default
 */
export async function loadData<T = any>(
    key: string,
    defaultValue: T | null = null
): Promise<T | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(key);

        if (jsonValue === null) {
            return defaultValue;
        }

        return JSON.parse(jsonValue) as T;
    } catch (error) {
        console.error(`[Storage] Errore durante la lettura di "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Salva dati su AsyncStorage
 * 
 * @param key - Chiave dello storage
 * @param data - Dati da salvare (verranno stringificati automaticamente)
 * @returns true se il salvataggio ha avuto successo, false altrimenti
 */
export async function saveData<T = any>(
    key: string,
    data: T
): Promise<boolean> {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        console.error(`[Storage] Errore durante il salvataggio di "${key}":`, error);
        return false;
    }
}

/**
 * Rimuove un dato da AsyncStorage
 * 
 * @param key - Chiave dello storage da rimuovere
 * @returns true se la rimozione ha avuto successo, false altrimenti
 */
export async function removeData(key: string): Promise<boolean> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`[Storage] Errore durante la rimozione di "${key}":`, error);
        return false;
    }
}

/**
 * Verifica se una chiave esiste in AsyncStorage
 * 
 * @param key - Chiave da verificare
 * @returns true se la chiave esiste, false altrimenti
 */
export async function hasData(key: string): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null;
    } catch (error) {
        console.error(`[Storage] Errore durante la verifica di "${key}":`, error);
        return false;
    }
}

/**
 * Pulisce tutti i dati da AsyncStorage
 * ⚠️ ATTENZIONE: Questa operazione è irreversibile!
 * 
 * @returns true se la pulizia ha avuto successo, false altrimenti
 */
export async function clearAllData(): Promise<boolean> {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.error('[Storage] Errore durante la pulizia dello storage:', error);
        return false;
    }
}

// Chiavi di storage predefinite (per evitare typo)
export const STORAGE_KEYS = {
    NEW_PERSONAL_HOLYDAYS: 'newPersonalHolydays',
    NATIONAL_EXCLUDED: 'nationalExcluded',
    MY_COUNTRY: 'myCountry',
    PREFERENCES: 'PREFERENCES_KEY',
    SPLASH_CAROUSEL: 'splashCarousel',
} as const;
