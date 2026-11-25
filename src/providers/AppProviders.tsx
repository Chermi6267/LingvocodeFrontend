import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/shared/lib/theme';
import { ToastProvider } from '@/shared/ui';

import { NavigationThemeProvider } from './NavigationThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NavigationThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
