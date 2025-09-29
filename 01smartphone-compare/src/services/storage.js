// ตัวช่วยบันทึก/อ่านค่า JSON ง่าย ๆ ลง AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function save(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function load(key, fallback = null) {
    const str = await AsyncStorage.getItem(key);
    return str ? JSON.parse(str) : fallback;
}
