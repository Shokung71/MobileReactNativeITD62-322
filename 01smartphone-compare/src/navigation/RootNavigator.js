// สร้าง Native Stack หลักของแอป และครอบด้วย NavigationContainer
// เริ่มที่ Welcome (Splash) แล้ว replace ไปยัง Main Tabs
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabs from './MainTabs';
import RegisterScreen from '../screens/RegisterScreen';
import AdminProductScreen from '../screens/AdminProductScreen';
import AdminUserScreen from '../screens/AdminUserScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
                <Stack.Screen name="AdminProduct" component={AdminProductScreen} options={{ title: 'Admin: Products' }} />
                <Stack.Screen name="AdminUser" component={AdminUserScreen} options={{ title: 'Admin: Users' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
