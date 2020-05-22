import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastMessage from '../components/Toast';

interface ToastData {
  addToast(message: Omit<ToastMessageData, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessageData {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastContext = createContext<ToastData>({} as ToastData);

export const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<ToastMessageData[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageData, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessage([...message, toast]);
    },
    [message],
  );

  const removeToast = useCallback((id: string) => {
    setMessage((state) => state.filter((messages) => messages.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastMessage message={message} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used.');
  }

  return context;
}
