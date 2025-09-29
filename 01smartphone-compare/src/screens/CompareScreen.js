// หน้า Compare: บังคับเลือก 2 รุ่นใน segment เดียวกัน แล้วแสดงตารางเทียบสเปค + รูป
// โฟลว์: เลือก segment -> โหลดรายการใน segment -> เลือกได้ 0..2 รุ่น -> เมื่อครบ 2 จะเห็นตารางเทียบ
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { api } from '../services/api';
import SegmentFilter from '../components/SegmentFilter';
import { SPEC_FIELDS } from '../constants/specs';
import { getProductImageSource } from '../utils/imageSource';
import SpecRow from '../components/SpecRow';

export default function CompareScreen() {
    const [segment, setSegment] = useState('midrange');
    const [data, setData] = useState([]);
    const [picked, setPicked] = useState([]); // เก็บ 0..2 ตัว

    const load = async () => {
        const list = await api.get(`/products?segment=${segment}`);
        setData(list || []);
        setPicked([]); // เปลี่ยน segment แล้วรีเซ็ตการเลือก
    };

    useEffect(() => {
        load();
    }, [segment]);

    const togglePick = (item) => {
        // เลือก/เอาออกจาก picked (จำกัดไม่เกิน 2 ชิ้น)
        const exists = picked.find((p) => p.id === item.id);
        let next = exists ? picked.filter((p) => p.id !== item.id) : [...picked, item];
        if (next.length > 2) next = next.slice(1); // คงไว้ 2 ตัวล่าสุด
        setPicked(next);
    };

    const A = picked[0];
    const B = picked[1];

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <SegmentFilter value={segment} onChange={setSegment} />

            {/* รายการเลือกแนวนอน */}
            <FlatList
                data={data}
                keyExtractor={(i) => String(i.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 8 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => togglePick(item)}
                        style={{
                            alignItems: 'center',
                            padding: 10,
                            marginRight: 12,
                            borderWidth: 1,
                            borderColor: picked.some((p) => p.id === item.id) ? '#111' : '#e5e7eb',
                            borderRadius: 12
                        }}
                    >
                        <Image source={getProductImageSource(item)} style={{ width: 64, height: 64, borderRadius: 8, marginBottom: 6 }} />
                        <Text style={{ maxWidth: 120, textAlign: 'center' }}>{item.product_name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ color: '#6b7280', marginTop: 8 }}>ยังไม่มีสินค้าในกลุ่มนี้</Text>}
            />

            {/* ตารางเทียบสเปค */}
            <View style={{ marginTop: 12, padding: 12, backgroundColor: '#fff', borderRadius: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ width: 120 }} />
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: '600' }}>{A?.product_name ?? 'เลือกรุ่นที่ 1'}</Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: '600' }}>{B?.product_name ?? 'เลือกรุ่นที่ 2'}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ width: 120 }} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {A ? (
                            <Image source={getProductImageSource(A)} style={{ width: 60, height: 60, borderRadius: 8 }} />
                        ) : (
                            <Text>เลือกรุ่นที่ 1</Text>
                        )}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {B ? (
                            <Image source={getProductImageSource(B)} style={{ width: 60, height: 60, borderRadius: 8 }} />
                        ) : (
                            <Text>เลือกรุ่นที่ 2</Text>
                        )}
                    </View>
                </View>

                {/* แถวสเปคตาม SPEC_FIELDS */}
                {SPEC_FIELDS.map(({ key, label }) => (
                    <SpecRow key={key} label={label} a={A?.spec_list?.[key]} b={B?.spec_list?.[key]} />
                ))}
            </View>
        </View>
    );
}
