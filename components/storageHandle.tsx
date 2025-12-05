// import AsyncStorage from "@react-native-async-storage/async-storage";

// /* ---------------------------------------------------------------┐ 
// FUNZIONE DI LETTURA DA STORAGE DATI
// └---------------------------------------------------------------- */
// export const loadData = async (key: string) => {
//   console.log('* moved loadData');
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     console.error(`Errore ${key} nella lettura da locale:`, e);
//     return null;
//   }
// };

// /* ---------------------------------------------------------------┐ 
// FUNZIONE DI SCRITURA SU STORAGE DATI
// └---------------------------------------------------------------- */
// export const saveData = async (data: any, key: string) => {
//   console.log('* moved saveData');
//   try {
//     const jsonValue = JSON.stringify(data);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     console.error(`Errore ${key} nel salvataggio locale: `, e);
//   }
// };


