import { useMemo } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import type { ThemeTokens } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/theme';

export type NamedStyle = ViewStyle | TextStyle | ImageStyle;
export type NamedStyles = Record<string, NamedStyle>;
export type StyleFactory<T extends NamedStyles> = (tokens: ThemeTokens) => T;

/**
 * Creates a hook that turns theme tokens into a registered StyleSheet.
 *
 * Keep the factory at module scope: the hook only rebuilds styles when the
 * active theme changes. This keeps theming out of inline style literals and
 * satisfies the `react-native/no-inline-styles` rule.
 */
export function createStyles<T extends NamedStyles>(factory: StyleFactory<T>) {
  return function useStyles(): T {
    const { tokens } = useTheme();

    return useMemo(() => StyleSheet.create(factory(tokens)) as T, [tokens]);
  };
}
