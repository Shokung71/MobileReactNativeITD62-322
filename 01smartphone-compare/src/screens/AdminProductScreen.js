// Admin จัดการสินค้า: แสดงรายการ + เพิ่ม/แก้ไข/ลบ + อัปโหลดรูป (base64)
// อัปโหลดด้วย expo-image-picker แล้วเก็บเป็น image_base64 ใน JSON Server
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../services/api';
import { SEGMENTS } from '../constants/specs';
import { getProductImageSource } from '../utils/imageSource';

const empty = {
    product_name: '',
    segment: 'midrange',
    spec_list: { cpu: '', gpu: '', display_size: '', display_type: '', ram: '', rom: '', battery: '' },
    image: null,
    image_base64: null
};

export default function AdminProductScreen() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState(empty);
    const [editId, setEditId] = useState(null);

    const load = async () => {
        const data = await api.get('/products');
        setList(data || []);
    };

    useEffect(() => {
        load();
    }, []);

    const pickImage = async () => {
        // เปิดคลังรูป เลือกรูป -> ได้ base64 -> เก็บลง form.image_base64
        const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.8 });
        if (!res.canceled && res.assets?.[0]?.base64) {
            setForm((prev) => ({ ...prev, image_base64: res.assets[0].base64, image: null }));
        }
    };

    const save = async () => {
        if (!form.product_name) return Alert.alert('กรอกชื่อสินค้า');
        if (editId) {
            await api.patch(`/products/${editId}`, form);
        } else {
            await api.post('/products', form);
        }
        setForm(empty);
        setEditId(null);
        load();
    };

    const del = async (id) => {
        await api.del(`/products/${id}`);
        load();
    };

    const edit = (item) => {
        setEditId(item.id);
        setForm({
            product_name: item.product_name,
            segment: item.segment,
            spec_list: { ...item.spec_list },
            image: item.image || null,
            image_base64: item.image_base64 || null
        });
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{editId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</Text>

            <TextInput
                placeholder="ชื่อสินค้า"
                value={form.product_name}
                onChangeText={(t) => setForm((p) => ({ ...p, product_name: t }))}
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 6 }}
            />

            <Text>ช่วงราคา/ระดับ</Text>
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                {SEGMENTS.map((s) => (
                    <View key={s.key} style={{ marginRight: 6 }}>
                        <Button title={s.label} onPress={() => setForm((p) => ({ ...p, segment: s.key }))} color={form.segment === s.key ? '#111' : '#9ca3af'} />
                    </View>
                ))}
            </View>

            {['cpu', 'gpu', 'display_size', 'display_type', 'ram', 'rom', 'battery'].map((k) => (
                <TextInput
                    key={k}
                    placeholder={k}
                    value={form.spec_list[k]}
                    onChangeText={(t) => setForm((p) => ({ ...p, spec_list: { ...p.spec_list, [k]: t } }))}
                    style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 6 }}
                />
            ))}

            <Button title="เลือกรูปภาพ" onPress={pickImage} />
            <View style={{ height: 8 }} />

            {(form.image_base64 || form.image) && (
                <Image
                    source={form.image_base64 ? { uri: `data:image/jpeg;base64,${form.image_base64}` } : getProductImageSource({ image: form.image })}
                    style={{ width: 80, height: 80, borderRadius: 8 }}
                />
            )}

            <View style={{ height: 8 }} />
            <Button title={editId ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'} onPress={save} />

            <View style={{ height: 16 }} />

            {/* ลิสต์สินค้าในระบบ */}
            <FlatList
                data={list}
                keyExtractor={(i) => String(i.id)}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
                        <Image source={getProductImageSource(item)} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 8 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600' }}>{item.product_name}</Text>
                            <Text style={{ color: '#6b7280' }}>{item.segment}</Text>
                        </View>
                        <View style={{ marginRight: 6 }}>
                            <Button title="แก้ไข" onPress={() => edit(item)} />
                        </View>
                        <Button title="ลบ" color="#ef4444" onPress={() => del(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}
