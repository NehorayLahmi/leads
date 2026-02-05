"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

interface AuthError {
  type: string;
  message: string;
}

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean; // נדרש ע"י App.tsx שלך
  authError: AuthError | null;
  navigateToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoadingAuth(true);
        // בדיקה אם יש טוקן ב-URL/Params
        if (appParams.token) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // אם אין טוקן, נשלח לשגיאת auth_required כפי שה-App מצפה
          setAuthError({ type: 'auth_required', message: 'No token found' });
        }
      } catch (error: any) {
        console.error("Auth check failed", error);
        setAuthError({ 
          type: error.status === 403 ? 'user_not_registered' : 'auth_required', 
          message: error.message 
        });
      } finally {
        setIsLoadingAuth(false);
      }
    };

    initAuth();
  }, []);

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth, 
      isLoadingPublicSettings, 
      authError, 
      navigateToLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};