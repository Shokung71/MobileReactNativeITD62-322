import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGet, apiPost } from '../api';

export default function UserScreen({ navigation }) {
    const [me, setMe] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const refresh = async () => {
        const str = await AsyncStorage.getItem('session_user');
        setMe(str ? JSON.parse(str) : null);
    };
    useEffect(() => { const unsub = navigation.addListener('focus', refresh); return unsub; }, [navigation]);

    const handleLogin = async () => {
        const users = await apiGet(`/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        if (users?.length) {
            await AsyncStorage.setItem('session_user', JSON.stringify(users[0]));
            setUsername(''); setPassword('');
            refresh();
        } else {
            Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'username/password ไม่ถูกต้อง');
        }
    };

    const handleLogout = async () => { await AsyncStorage.removeItem('session_user'); refresh(); };


    const handleRegister = async () => {
        if (!username || !password) return Alert.alert('กรอกข้อมูลให้ครบ');
        const payload = { username, password, role_type: 'user', img_profile_base64: null };
        await apiPost('/users', payload);
        Alert.alert('สมัครสำเร็จ', 'โปรดเข้าสู่ระบบ');
        setShowRegister(false); setUsername(''); setPassword('');
    };

    if (me) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
                <View style={{ flex: 1, padding: 16 }}>
                    <View style={{ alignItems: 'center', marginVertical: 16 }}>
                        {me.img_profile_base64 ? (
                            <Image source={{ uri: `data:image/jpeg;base64,${me.img_profile_base64}` }} style={{ width: 90, height: 90, borderRadius: 60, marginBottom: 8 }} />
                        ) : (
                            <View style={{ width: 72, height: 72, borderRadius: 36, marginBottom: 8, backgroundColor: '#e5e7eb' }} />
                        )}
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{me.username}</Text>
                        <Text style={{ color: '#6b7280' }}>{me.role_type.toUpperCase()}</Text>
                    </View>
                    {me.role_type === 'admin' && (
                        <View style={{ marginBottom: 16 }}>
                            <Button title="Admin Panel" onPress={() => navigation.navigate('AdminPanel')} />
                        </View>
                    )}
                    <Button title="ออกจากระบบ" color="#ef4444" onPress={handleLogout} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>{showRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</Text>
                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 }} />
                <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 }} />
                {showRegister ? (
                    <Button title="สมัครสมาชิก" onPress={handleRegister} />
                ) : (
                    <Button title="เข้าสู่ระบบ" onPress={handleLogin} />
                )}
                <TouchableOpacity onPress={() => Alert.alert('ลืมรหัสผ่าน', 'เดโม: โปรดติดต่อผู้ดูแลระบบ')} style={{ marginTop: 12 }}>
                    <Text style={{ color: '#2563eb' }}>ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowRegister(v => !v)} style={{ marginTop: 12 }}>
                    <Text>{showRegister ? 'มีบัญชีแล้ว? ' : 'ยังไม่มีบัญชี? '}<Text style={{ color: '#2563eb' }}>{showRegister ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}