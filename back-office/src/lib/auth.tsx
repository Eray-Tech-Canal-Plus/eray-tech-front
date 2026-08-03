import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from './api';

interface AdminUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('auth_user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/admins/login', { email, password });
    const data = res.data;
    const newToken = data.token || data.access_token;
    if (!newToken) throw new Error('Token non reçu de l\'API');
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);

    const adminUser: AdminUser = {
      name: data.user?.name || data.name || email,
      email: data.user?.email || data.email || email,
    };
    localStorage.setItem('auth_user', JSON.stringify(adminUser));
    setUser(adminUser);
  }, []);

  const logout = useCallback(() => {
    api.post('/logout').catch(() => {});
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
