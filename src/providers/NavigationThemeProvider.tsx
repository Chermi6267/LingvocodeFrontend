import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useMemo, type PropsWithChildren } from 'react';

import { useTheme } from '@/shared/lib/theme';

/**
 * Bridges design tokens into the navigation theme.
 * Lives in the app layer because it knows about expo-router.
 */
export function NavigationThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme, tokens } = useTheme();

  const navigationTheme = useMemo(() => {
    const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: tokens.colors.primary.base,
        background: tokens.colors.bgCanvas,
        card: tokens.colors.bgElevated,
        text: tokens.colors.textPrimary,
        border: tokens.colors.borderDefault,
        notification: tokens.colors.danger.base,
      },
    };
  }, [colorScheme, tokens]);

  return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>;
}
