"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest, RegisterRequest } from '@/lib/api/types/auth';
import { User } from '@/lib/api/types/users';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '@/lib/api/auth/auth';
import { cookies } from '@/utils/cookies';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = cookies.get('token');
    const userCookie = cookies.get('user');
    if (token && userCookie) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userCookie));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const loggedInUser = await apiLogin(credentials);
      setIsAuthenticated(true);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const register = async (credentials: RegisterRequest) => {
    try {
      const registeredUser = await apiRegister(credentials);
      setIsAuthenticated(true);
      setUser(registeredUser);
    } catch (error) {
      console.error('Registration failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      cookies.remove('token');
      cookies.remove('user');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};