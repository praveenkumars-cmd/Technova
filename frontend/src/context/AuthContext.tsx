import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { authApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedRole = localStorage.getItem('pulsecare-user-role') as UserRole;
    return savedRole && mockUsers[savedRole] ? mockUsers[savedRole] : mockUsers.doctor;
  });

  const login = async (role: UserRole, email?: string) => {
    const defaultEmail = email || mockUsers[role]?.email || 'user@pulsecare.com';
    
    // Attempt backend API login
    const response = await authApi.login(defaultEmail, role);

    if (response.data && response.data.user) {
      setUser(response.data.user);
      localStorage.setItem('pulsecare-auth-token', response.data.token);
      localStorage.setItem('pulsecare-user-role', role);
    } else {
      // Fallback to local mock user data if backend is offline/mock mode
      const selectedUser = mockUsers[role] || mockUsers.doctor;
      setUser(selectedUser);
      localStorage.setItem('pulsecare-user-role', role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pulsecare-user-role');
    localStorage.removeItem('pulsecare-auth-token');
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
