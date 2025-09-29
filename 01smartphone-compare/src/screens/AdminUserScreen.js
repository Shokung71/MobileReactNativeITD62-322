// Admin จัดการผู้ใช้: ค้นหา username, เปลี่ยน role (user/admin), อัปโหลดรูปโปรไฟล์ (base64)
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../services/api';
import { getUserImageSource } from '../utils/imageSource';

export default function AdminUserScreen() {
    const [list, setList] = useState([]);
    const [query, setQuery] = useState('');

    const load = async () => {
        const users = await api.get('/users');
        setList(users || []);
    };

    useEffect(() => {
        load();
    }, []);

    const changeRole = async (user, role) => {
        await api.patch(`/users/${user.id}`, { role_type: role });
        load();
    };

    const pickProfile = async (user) => {
        // เลือกรูปจากเครื่อง -> base64 -> เก็บเป็น img_profile_base64
        const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.8 });
        if (!res.canceled && res.assets?.[0]?.base64) {
            await api.patch(`/users/${user.id}`, { img_profile_base64: res.assets[0].base64, img_profile: null });
            load();
        }
    };

    const filtered = list.filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="ค้นหา username"
                value={query}
                onChangeText={setQuery}
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 }}
            />

            <FlatList
                data={filtered}
                keyExtractor={(i) => String(i.id)}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
                        {getUserImageSource(item) && (
                            <Image source={getUserImageSource(item)} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 8 }} />
                        )}
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600' }}>{item.username}</Text>
                            <Text style={{ color: '#6b7280' }}>{item.role_type}</Text>
                        </View>
                        <View style={{ marginRight: 6 }}>
                            <Button title="โปรไฟล์" onPress={() => pickProfile(item)} />
                        </View>
                        <View style={{ marginRight: 6 }}>
                            <Button title="เป็น user" onPress={() => changeRole(item, 'user')} />
                        </View>
                        <Button title="เป็น admin" onPress={() => changeRole(item, 'admin')} />
                    </View>
                )}
            />
        </View>
    );
}
