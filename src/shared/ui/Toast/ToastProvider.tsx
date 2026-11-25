import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';

import { useTheme } from '@/shared/lib/theme';

import type { ToastContextValue, ToastOptions, ToastRecord } from './Toast.types';
import { ToastContext } from './ToastContext';
import { ToastHost } from './ToastHost';

let toastCounter = 0;

function createToastId() {
  toastCounter += 1;
  return `toast-${toastCounter}`;
}

export function ToastProvider({ children }: PropsWithChildren) {
  const { tokens } = useTheme();
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const hideToast = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    [clearTimer],
  );

  const clearToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? createToastId();
      const record: ToastRecord = {
        id,
        variant: options.variant ?? 'info',
        message: options.message,
        duration: options.duration ?? tokens.motion.toast.duration,
        action: options.action,
        closable: options.closable ?? true,
      };

      setToasts((prev) => {
        const withoutExisting = prev.filter((toast) => toast.id !== id);
        return [...withoutExisting, record];
      });

      clearTimer(id);
      if (record.duration > 0) {
        const timer = setTimeout(() => {
          hideToast(id);
        }, record.duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [clearTimer, hideToast, tokens.motion.toast.duration],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, showToast, hideToast, clearToasts }),
    [clearToasts, hideToast, showToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastHost toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  );
}
