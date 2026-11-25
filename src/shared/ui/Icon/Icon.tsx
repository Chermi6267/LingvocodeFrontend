import { SymbolView } from 'expo-symbols';

import { resolveThemeColorValue, resolveToneColor } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/theme';

import type { IconProps } from './Icon.types';

/**
 * Unified wrapper over `expo-symbols`.
 *
 * Sizes come from `tokens.iconSizes`, colours from semantic theme tokens, and
 * all platform-specific symbol rendering stays in the existing library.
 */
export function Icon({ name, size = 'md', tone = 'primary', color, ...rest }: IconProps) {
  const { tokens } = useTheme();
  const tintColor = color ? resolveThemeColorValue(tokens, color) : resolveToneColor(tokens, tone);

  return <SymbolView {...rest} name={name} size={tokens.iconSizes[size]} tintColor={tintColor} />;
}
