
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configura il comportamento delle notifiche quando l'app è in primo piano
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// Richiede i permessi per le notifiche
export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return false;
    }

    return true;
}

// Schedula una notifica locale
export async function scheduleLocalNotification(title: string, body: string, data: any = {}) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data,
            sound: 'default',
        },
        trigger: null, // null trigger means show immediately
    });
}

// Verifica se i permessi notifiche sono concessi
export async function checkNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
}

// Apre le impostazioni di sistema per le notifiche
export async function openNotificationSettings() {
    const { Linking } = require('react-native');
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        // Android - apri le impostazioni dell'app
        Linking.openSettings();
    }
}
