import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AppRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  hasRole: (roles: AppRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@prf.gov.br': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@prf.gov.br',
      name: 'Administrador',
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString(),
    },
  },
  'gerente@prf.gov.br': {
    password: 'gerente123',
    user: {
      id: '2',
      email: 'gerente@prf.gov.br',
      name: 'Gerente Operacional',
      role: 'gerencia',
      active: true,
      createdAt: new Date().toISOString(),
    },
  },
  'clinica@prf.gov.br': {
    password: 'clinica123',
    user: {
      id: '3',
      email: 'clinica@prf.gov.br',
      name: 'Responsável Clínica',
      role: 'setor_clinica',
      sector: 'Clínica',
      active: true,
      createdAt: new Date().toISOString(),
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('prf_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = mockUsers[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Credenciais inválidas');
    }

    setUser(mockUser.user);
    localStorage.setItem('prf_user', JSON.stringify(mockUser.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prf_user');
  };

  const hasRole = (roles: AppRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
