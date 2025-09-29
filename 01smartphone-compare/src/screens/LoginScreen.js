// หน้า Login: กรอก username/password -> login() -> เก็บ session ใน AsyncStorage
// ถ้าเป็น admin จะแสดงปุ่มไปหน้า AdminProduct / AdminUser
// มีปุ่ม "ลืมรหัสผ่าน" (เดโม: แสดง Alert) และลิงก์ไปหน้า Register
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { login, getSession, logout } from '../services/auth';
import { getUserImageSource } from '../utils/imageSource';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [me, setMe] = useState(null);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const refresh = async () => {
        const s = await getSession();
        setMe(s);
    };

    useEffect(() => {
        if (isFocused) refresh();
    }, [isFocused]);

    const handleLogin = async () => {
        const u = await login(username, password);
        if (!u) return Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'username/password ไม่ถูกต้อง');
        setUsername('');
        setPassword('');
        refresh();
    };

    const handleLogout = async () => {
        await logout();
        refresh();
    };

    if (me) {
        return (
            <View style={{ flex: 1, padding: 16 }}>
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    {getUserImageSource(me) && (
                        <Image source={getUserImageSource(me)} style={{ width: 72, height: 72, borderRadius: 36, marginBottom: 8 }} />
                    )}
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{me.username}</Text>
                    <Text style={{ color: '#6b7280' }}>{me.role_type.toUpperCase()}</Text>
                </View>

                {/* ปุ่มเมนูแอดมิน: แสดงเฉพาะ role admin */}
                {me.role_type === 'admin' && (
                    <View style={{ gap: 8, marginBottom: 16 }}>
                        <Button title="Admin: จัดการสินค้า" onPress={() => navigation.navigate('AdminProduct')} />
                        <Button title="Admin: จัดการผู้ใช้" onPress={() => navigation.navigate('AdminUser')} />
                    </View>
                )}

                <Button title="ออกจากระบบ" color="#ef4444" onPress={handleLogout} />
            </View>
        );
    }

    // ยังไม่ล็อกอิน
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>เข้าสู่ระบบ</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 }}
            />
            <Button title="เข้าสู่ระบบ" onPress={handleLogin} />

            <TouchableOpacity onPress={() => Alert.alert('ลืมรหัสผ่าน', 'เดโม: โปรดติดต่อผู้ดูแลระบบ')} style={{ marginTop: 12 }}>
                <Text style={{ color: '#2563eb' }}>ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 12 }}>
                <Text>
                    ยังไม่มีบัญชี? <Text style={{ color: '#2563eb' }}>สมัครสมาชิก</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
