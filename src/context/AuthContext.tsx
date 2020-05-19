import React, { createContext, useCallback } from 'react';
import apiSession from '../services/apiSession';

interface Context {
  name: string;
  singIn(credentials: SignCredentials): Promise<void>;
}

interface SignCredentials {
  email: string;
  password: string;
}

export const AuthContext = createContext<Context>({} as Context);

export const AuthProvider: React.FC = ({ children }) => {
  const singIn = useCallback(async ({ email, password }) => {
    const response = await apiSession.post('sessions', {
      email,
      password,
    });
    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Thiago', singIn }}>
      {children}
    </AuthContext.Provider>
  );
};
