import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  readonly label: string;
  readonly onPress: () => void;
}

export interface ToastOptions {
  readonly id?: string;
  readonly variant?: ToastVariant;
  readonly message: ReactNode;
  /** Auto-hide duration in ms. Set 0 to disable auto-hide. Defaults to `motion.toast.duration`. */
  readonly duration?: number;
  readonly action?: ToastAction;
  /** Shows manual close button. Defaults to `true`. */
  readonly closable?: boolean;
}

export interface ToastRecord extends Omit<
  ToastOptions,
  'id' | 'variant' | 'duration' | 'closable'
> {
  readonly id: string;
  readonly variant: ToastVariant;
  readonly duration: number;
  readonly closable: boolean;
}

export interface ToastContextValue {
  readonly toasts: readonly ToastRecord[];
  readonly showToast: (options: ToastOptions) => string;
  readonly hideToast: (id: string) => void;
  readonly clearToasts: () => void;
}
