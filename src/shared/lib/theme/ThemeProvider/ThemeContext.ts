import { createContext } from 'react';

import type { ThemeColorScheme, ThemeName, ThemeTokens } from '@/shared/config/theme';

export interface ThemeContextValue {
  readonly themeName: ThemeName;
  readonly colorScheme: ThemeColorScheme;
  readonly isDark: boolean;
  readonly tokens: ThemeTokens;
  readonly setTheme: (themeName: ThemeName) => void;
  /** Cycles through the registry; with the default registry it toggles light/dark. */
  readonly toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
