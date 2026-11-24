import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import type { ThemeColor, ThemeTokens, TypographyVariants } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/theme';

export type TextVariant = keyof TypographyVariants;

export type TextTone = 'primary' | 'secondary' | 'disabled' | 'onAccent';

export interface TextProps extends RNTextProps {
  /** Typography token. Defaults to `body`. */
  readonly variant?: TextVariant;
  /** Semantic colour token. Defaults to `primary`. */
  readonly tone?: TextTone;
  /** Explicit token colour; wins over `tone`. */
  readonly color?: ThemeColor;
}

function resolveToneColor(tokens: ThemeTokens, tone: TextTone): ThemeColor {
  switch (tone) {
    case 'secondary':
      return tokens.colors.textSecondary;
    case 'disabled':
      return tokens.colors.textDisabled;
    case 'onAccent':
      return tokens.colors.textOnAccent;
    case 'primary':
    default:
      return tokens.colors.textPrimary;
  }
}

/**
 * Themed typography primitive.
 *
 * Every variant comes from theme tokens: rounded family, weights >= 600,
 * uppercase button/tab labels and the spec's tracking values.
 */
export function Text({ variant = 'body', tone = 'primary', color, style, ...rest }: TextProps) {
  const { tokens } = useTheme();

  const variantStyle = tokens.typography.variants[variant];
  const colorStyle = { color: color ?? resolveToneColor(tokens, tone) };

  return <RNText {...rest} style={[variantStyle, colorStyle, style]} />;
}
