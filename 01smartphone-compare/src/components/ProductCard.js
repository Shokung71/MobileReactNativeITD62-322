// Card แสดงสินค้าแบบเรียบง่าย ใช้ใน HomeScreen
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getProductImageSource } from '../utils/imageSource';

export default function ProductCard({ item, onPress }) {
    return (
        <TouchableOpacity
            onPress={() => onPress?.(item)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 12,
                marginVertical: 6,
                shadowOpacity: 0.1,
                shadowRadius: 4
            }}
        >
            <Image source={getProductImageSource(item)} style={{ width: 56, height: 56, borderRadius: 8, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.product_name}</Text>
                <Text style={{ color: '#6b7280' }}>{item.segment}</Text>
            </View>
        </TouchableOpacity>
    );
}
