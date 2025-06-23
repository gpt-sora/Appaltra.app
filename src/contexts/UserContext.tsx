import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🎯 TIPI TypeScript - Definisco la struttura dati
export type UserRole = 'Privato' | 'Azienda' | 'Professionista' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserContextType {
  // STATO
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  // AZIONI
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  setUserRole: (role: UserRole) => Promise<void>;
}

// 🏗️ CREAZIONE CONTEXT - Con valore default
const UserContext = createContext<UserContextType | undefined>(undefined);

// 🎯 STORAGE KEYS - Costanti per AsyncStorage
const STORAGE_KEYS = {
  USER: '@appaltra:user',
  ROLE: '@appaltra:role',
  LOGIN_STATE: '@appaltra:isLoggedIn'
} as const;

// 🚀 PROVIDER COMPONENT - Wrapper che fornisce il context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 📊 STATI LOCALI
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 💾 FUNZIONI ASYNC STORAGE
  const saveToStorage = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  };

  const loadFromStorage = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return null;
    }
  };

  // 🔐 MOCK LOGIN FUNCTION - Sempre successo per MVP
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // ⏰ Simula chiamata API (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 👤 Crea utente mock basato sul ruolo
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0], // Nome dal email
        email,
        role
      };

      // 💾 Salva tutto in AsyncStorage
      await Promise.all([
        saveToStorage(STORAGE_KEYS.USER, mockUser),
        saveToStorage(STORAGE_KEYS.LOGIN_STATE, true),
        saveToStorage(STORAGE_KEYS.ROLE, role)
      ]);

      // 🔄 Aggiorna stati
      setUser(mockUser);
      setIsLoggedIn(true);
      
      console.log('✅ Login success:', { email, role });
      return true;
      
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 🚪 LOGOUT FUNCTION
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // 🗑️ Rimuovi da AsyncStorage
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.LOGIN_STATE),
        AsyncStorage.removeItem(STORAGE_KEYS.ROLE)
      ]);

      // 🔄 Reset stati
      setUser(null);
      setIsLoggedIn(false);
      
      console.log('✅ Logout success');
      
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎭 SET USER ROLE - Per onboarding
  const setUserRole = async (role: UserRole): Promise<void> => {
    try {
      await saveToStorage(STORAGE_KEYS.ROLE, role);
      
      // 👤 Crea utente temporaneo con il ruolo selezionato
      if (role) {
        const tempUser: User = {
          id: `temp_${Date.now()}`,
          name: `Utente ${role}`, // Nome temporaneo
          email: `temp@${role.toLowerCase()}.com`, // Email temporanea
          role
        };
        
        await saveToStorage(STORAGE_KEYS.USER, tempUser);
        setUser(tempUser);
        setIsLoggedIn(false); // Ancora non loggato, solo ruolo selezionato
      }
      
      console.log('✅ Role set:', role);
      
    } catch (error) {
      console.error('❌ Set role error:', error);
    }
  };

  // 🔄 LOAD PERSISTED DATA - Al mount del component
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        setIsLoading(true);
        
        // 📖 Carica dati da AsyncStorage
        const [savedUser, savedLoginState] = await Promise.all([
          loadFromStorage(STORAGE_KEYS.USER),
          loadFromStorage(STORAGE_KEYS.LOGIN_STATE)
        ]);

        if (savedUser && savedLoginState) {
          setUser(savedUser);
          setIsLoggedIn(true);
          console.log('✅ Restored session:', savedUser.email, savedUser.role);
        } else {
          console.log('ℹ️ No saved session found');
        }
        
      } catch (error) {
        console.error('❌ Load persisted data error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedData();
  }, []);

  // 📦 CONTEXT VALUE - Oggetto che fornisce ai children
  const contextValue: UserContextType = {
    // Stato
    user,
    isLoggedIn,
    isLoading,
    
    // Azioni
    login,
    logout,
    setUserRole
  };

  return (
    <UserContext value={contextValue}>
      {children}
    </UserContext>
  );
};

// 🪝 CUSTOM HOOK - Per usare il context facilmente
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}; 