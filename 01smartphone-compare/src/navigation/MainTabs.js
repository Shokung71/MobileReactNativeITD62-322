// Bottom Tabs 3 ปุ่ม: Home / Compare / User
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CompareScreen from '../screens/CompareScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Compare" component={CompareScreen} />
            <Tab.Screen name="User" component={LoginScreen} />
        </Tab.Navigator>
    );
}
