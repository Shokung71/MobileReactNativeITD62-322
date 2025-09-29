import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/auth';

export const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async (username, password) => {},
  signOut: async () => {},
  register: async (payload) => {},
  refresh: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('session_user');
      if (raw) setUser(JSON.parse(raw));
      setLoading(false);
    })();
  }, []);

  const signIn = async (username, password) => {
    const u = await authService.login(username, password);
    setUser(u);
    await AsyncStorage.setItem('session_user', JSON.stringify(u));
    return u;
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('session_user');
  };

  const register = async (payload) => {
    const u = await authService.register(payload);
    return u;
  };

  const refresh = async () => {
    const raw = await AsyncStorage.getItem('session_user');
    if (raw) setUser(JSON.parse(raw));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, register, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
