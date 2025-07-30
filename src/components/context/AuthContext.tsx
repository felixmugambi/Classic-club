'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import API from '../../api/axios';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
  groups: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  refreshUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await API.get('/auth/user/', { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
  
      if (refresh) {
        await API.post("/auth/logout/", { refresh });
      }
  
      localStorage.clear(); // Optional: you can be more specific
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error("Logout failed:", err);
      // Fallback in case of backend error
      localStorage.clear();
      setUser(null);
      router.push('/auth/login');
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser: fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  ); // ✅ this was missing a wrapping parentheses or mismatched
}

export const useAuth = () => useContext(AuthContext);
