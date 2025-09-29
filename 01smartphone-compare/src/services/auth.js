// ฟังก์ชันเกี่ยวกับ Auth แบบง่าย ๆ (ตามข้อกำหนด ไม่โฟกัสความปลอดภัยในเดโม่นี้)
// login: ค้นหาผู้ใช้ด้วย username/password จาก JSON Server
// register: สร้างผู้ใช้ใหม่ role=user เสมอ
// session: เก็บ/อ่าน/ลบ จาก AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export async function login(username, password) {
    const users = await api.get(`/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (users?.length) {
        // เดโม่: เก็บข้อมูล user ทั้งก้อนเป็น session (รวม password) ตามสเปกที่ขอ (ยังไม่โฟกัสเรื่องความปลอดภัย)
        await AsyncStorage.setItem('session_user', JSON.stringify(users[0]));
        return users[0];
    }
    return null;
}

export async function register({ username, password, img_profile }) {
    const payload = {
        username,
        password,
        role_type: 'user', // สมัครใหม่เป็น user เสมอ
        img_profile: img_profile || 'alice.png',
        img_profile_base64: null
    };
    return api.post('/users', payload);
}

export async function getSession() {
    const str = await AsyncStorage.getItem('session_user');
    return str ? JSON.parse(str) : null;
}

export async function logout() {
    await AsyncStorage.removeItem('session_user');
}
