import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';

import {
  defaultThemeName,
  systemThemeByColorScheme,
  themeNames,
  themeRegistry,
  type ThemeName,
} from '@/shared/config/theme';

import { ThemeContext, type ThemeContextValue } from './ThemeContext';
import { useSystemColorScheme } from './useSystemColorScheme';

export type ThemeProviderProps = PropsWithChildren<{
  /** Forces a theme and disables following the system color scheme. */
  readonly initialTheme?: ThemeName;
}>;

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [selectedThemeName, setSelectedThemeName] = useState<ThemeName | null>(
    initialTheme ?? null,
  );

  const systemThemeName = systemColorScheme
    ? systemThemeByColorScheme[systemColorScheme]
    : defaultThemeName;
  const themeName = selectedThemeName ?? systemThemeName;
  const theme = themeRegistry[themeName];

  const setTheme = useCallback((nextThemeName: ThemeName) => {
    setSelectedThemeName(nextThemeName);
  }, []);

  const toggleTheme = useCallback(() => {
    setSelectedThemeName((currentThemeName) => {
      const activeThemeName = currentThemeName ?? systemThemeName;
      const currentIndex = themeNames.indexOf(activeThemeName);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeNames.length;

      return themeNames[nextIndex] ?? defaultThemeName;
    });
  }, [systemThemeName]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      colorScheme: theme.colorScheme,
      isDark: theme.colorScheme === 'dark',
      tokens: theme.tokens,
      setTheme,
      toggleTheme,
    }),
    [themeName, theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
