import React, { createContext, useContext, useCallback } from 'react';
import ToastMessage from '../components/Toast';

interface ToastData {
  addToast(): void;
  removeToast(): void;
}

export const ToastContext = createContext<ToastData>({} as ToastData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastMessage />
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
