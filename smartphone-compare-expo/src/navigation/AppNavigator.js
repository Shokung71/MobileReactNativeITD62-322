import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CompareScreen from '../screens/CompareScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminProductsScreen from '../screens/AdminProductsScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import { Ionicons } from '@expo/vector-icons';

const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const CompareStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Smartphones' }} />
    </HomeStack.Navigator>
  );
}

function CompareStackScreen() {
  return (
    <CompareStack.Navigator>
      <CompareStack.Screen name="Compare" component={CompareScreen} options={{ title: 'Compare' }} />
    </CompareStack.Navigator>
  );
}

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Login" component={LoginScreen} options={{ title: 'User' }} />
      <UserStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      <UserStack.Screen name="AdminProducts" component={AdminProductsScreen} options={{ title: 'Admin • Products' }} />
      <UserStack.Screen name="AdminUsers" component={AdminUsersScreen} options={{ title: 'Admin • Users' }} />
    </UserStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon = 'home-outline';
          if (route.name === 'HomeTab') icon = focused ? 'home' : 'home-outline';
          if (route.name === 'CompareTab') icon = focused ? 'git-compare' : 'git-compare-outline';
          if (route.name === 'UserTab') icon = focused ? 'person' : 'person-outline';
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1f6feb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="CompareTab" component={CompareStackScreen} options={{ title: 'Compare' }} />
      <Tab.Screen name="UserTab" component={UserStackScreen} options={{ title: 'User' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Navigator>
  );
}
