// หน้า Home: ดึง products ตาม segment แล้วแสดงด้วย FlatList
// เด็ก ๆ จะเห็นการใช้ useEffect, การเรียก API, การทำ RefreshControl, และการกรอง segment
import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import SegmentFilter from '../components/SegmentFilter';

export default function HomeScreen() {
    const [segment, setSegment] = useState('midrange'); // ค่าเริ่มต้น
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const list = await api.get(`/products?segment=${segment}`);
        setData(list || []);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [segment]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {/* ฟิลเตอร์ segment */}
            <SegmentFilter value={segment} onChange={setSegment} />

            {/* ลิสต์สินค้า */}
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCard item={item} />}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
                ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 16 }}>ยังไม่มีสินค้าในกลุ่มนี้</Text>}
            />
        </View>
    );
}
