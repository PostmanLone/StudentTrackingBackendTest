import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('token');
      const r = await SecureStore.getItemAsync('role');
      const p = await SecureStore.getItemAsync('profile');
      if (t) setToken(t);
      if (r) setRole(r);
      if (p) setProfile(JSON.parse(p));
    })();
  }, []);

  const signIn = async ({ access_token, user }) => {
    setToken(access_token);
    setRole(user?.role || 'parent');
    setProfile(user || null);
    await SecureStore.setItemAsync('token', access_token);
    await SecureStore.setItemAsync('role', user?.role || 'parent');
    await SecureStore.setItemAsync('profile', JSON.stringify(user || {}));
  };

  const signOut = async () => {
    setToken(null); setRole(null); setProfile(null);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('role');
    await SecureStore.deleteItemAsync('profile');
  };

  return (
    <AuthContext.Provider value={{ token, role, profile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
