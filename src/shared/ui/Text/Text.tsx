import { Text as RNText } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { resolveTextStyle } from './Text.styles';
import type { TextProps } from './Text.types';

/**
 * Themed typography primitive.
 *
 * Every variant comes from theme tokens: rounded family, weights >= 600,
 * uppercase button/tab labels and the spec's tracking values. `h1`–`h3` and
 * `label` are semantic aliases over the token variants.
 */
export function Text({
  variant = 'body',
  tone = 'primary',
  color,
  font,
  style,
  ...rest
}: TextProps) {
  const { tokens } = useTheme();
  const resolvedStyle = resolveTextStyle(tokens, { variant, tone, color, font });

  return <RNText {...rest} style={[resolvedStyle, style]} />;
}
