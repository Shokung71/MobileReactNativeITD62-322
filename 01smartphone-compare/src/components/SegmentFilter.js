// ปุ่มเลือก segment (budget/midrange/flagship)
// ใช้ใน Home / Compare
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SEGMENTS } from '../constants/specs';

export default function SegmentFilter({ value, onChange }) {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {SEGMENTS.map((seg) => (
                <TouchableOpacity
                    key={seg.key}
                    onPress={() => onChange(seg.key)}
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        backgroundColor: value === seg.key ? '#111' : '#e5e7eb',
                        marginRight: 8
                    }}
                >
                    <Text style={{ color: value === seg.key ? '#fff' : '#111' }}>{seg.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
