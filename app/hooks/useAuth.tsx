import { getParent, Parent } from '@/lib/services/parent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';


export interface AuthData {
  parent: any; // You can import Parent from services/parent if you want strict typing
  token?: string;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

interface AuthContextProps {
  auth: Parent | null;
  loading: boolean;
  setAuth: (data: AuthData | null) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: null,
  loading: true,
  setAuth: async () => { },
  logout: async () => { },
  token: null,
  refresh: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuthState] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  // Refresh function to re-fetch parent/auth data
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem("arqelion_auth");
      if (stored) {
        const parsedStored = JSON.parse(stored);
        const payload = jwtDecode<{ id: string; uid: string }>(parsedStored.token);
        if (!payload || !payload.id) {
          throw new Error('Invalid token payload');
        }
        const res = await getParent(payload.id as string, parsedStored.token as string);
        setAuthState(res);
        setToken(parsedStored.token || null);
      }
    } catch (error) {
      console.error("Failed to retrieve auth data:", error);
      setToken(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setAuth = useCallback(async (data: AuthData | null) => {
    if (data) {
      await AsyncStorage.setItem("arqelion_auth", JSON.stringify(data));
      // setAuthState(data);
      setToken(data.token || null);
    } else {
      await AsyncStorage.removeItem("arqelion_auth");
      setAuthState(null);
      setToken(null);
    }
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("arqelion_auth");
    setAuthState(null);
    router.replace('/login');

  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, setAuth, logout, token, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
