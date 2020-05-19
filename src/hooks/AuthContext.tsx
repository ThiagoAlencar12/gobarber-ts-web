import React, { createContext, useCallback, useState, useContext } from 'react';
import apiSession from '../services/apiSession';

interface Context {
  user: object;
  singIn(credentials: SignCredentials): Promise<void>;
  logOut(): void;
}

interface SignCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<Context>({} as Context);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const singIn = useCallback(async ({ email, password }) => {
    const response = await apiSession.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, singIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used');
  }

  return context;
}
