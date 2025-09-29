import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import UserProfile from './screens/UserProfile';
import UserList from './screens/UserList';

const Stack = createStackNavigator();

function Home() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello! Home Screen</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {/* ถ้าไม่กำหนด initalRouteName ตัว Stack ที่อยู่ */}
        {/* <Stack.Screen name="Main Page" component={Home} /> */}
        <Stack.Screen name="Login Page" component={LoginScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="User Profile" component={UserProfile} options={{ headerShown: true }}/>
        <Stack.Screen name="UserList" component={UserList} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}