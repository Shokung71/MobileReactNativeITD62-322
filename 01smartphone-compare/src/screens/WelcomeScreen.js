// Splash/หน้าต้อนรับ: แสดงชื่อแอป แล้วเปลี่ยนหน้าเป็น Main Tabs อัตโนมัติ
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    useEffect(() => {
        const t = setTimeout(() => navigation.replace('Main'), 1200);
        return () => clearTimeout(t);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827' }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>SmartCompare</Text>
        </View>
    );
}
