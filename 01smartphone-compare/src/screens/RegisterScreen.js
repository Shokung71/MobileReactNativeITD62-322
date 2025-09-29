// หน้า Register: สมัครผู้ใช้ใหม่ (role=user เสมอ)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '../services/auth';
import { api } from '../services/api';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const u = username.trim();
        const p = password.trim();
        if (!u || !p) return Alert.alert('กรอกข้อมูลให้ครบ');

        // ตัวอย่างการเช็คว่ามี username นี้แล้วหรือยัง (บน JSON Server)
        const exists = await api.get(`/users?username=${encodeURIComponent(u)}`);
        if (exists?.length) return Alert.alert('มี username นี้แล้ว');

        await register({ username: u, password: p });
        Alert.alert('สมัครสำเร็จ', 'โปรดเข้าสู่ระบบที่แท็บ User');
        setUsername('');
        setPassword('');
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>สมัครสมาชิก</Text>
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
            <Button title="สมัครสมาชิก" onPress={handleRegister} />
        </View>
    );
}
