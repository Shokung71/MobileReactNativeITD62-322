// แถวสเปค 1 บรรทัด: label | ค่าเครื่อง A | ค่าเครื่อง B
import React from 'react';
import { View, Text } from 'react-native';

export default function SpecRow({ label, a, b }) {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ width: 120, fontWeight: '600' }}>{label}</Text>
            <Text style={{ flex: 1, paddingRight: 8 }}>{a ?? '-'}</Text>
            <Text style={{ flex: 1 }}>{b ?? '-'}</Text>
        </View>
    );
}
