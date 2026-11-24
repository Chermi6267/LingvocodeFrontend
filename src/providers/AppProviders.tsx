import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/shared/lib/theme';

import { NavigationThemeProvider } from './NavigationThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NavigationThemeProvider>{children}</NavigationThemeProvider>
    </ThemeProvider>
  );
}
