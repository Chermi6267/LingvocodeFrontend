import { useContext } from 'react';

import type { ToastContextValue } from './Toast.types';
import { ToastContext } from './ToastContext';

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
