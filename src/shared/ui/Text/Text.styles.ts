import type { TextStyle } from 'react-native';

import { resolveThemeColorValue, resolveToneColor, type ThemeTokens } from '@/shared/config/theme';

import type {
  TextFont,
  TextProps,
  TextTone,
  TextVariant,
  TypographyVariantToken,
} from './Text.types';

/** Semantic aliases keep the public API small without duplicating token values. */
export function resolveTypographyVariant(variant: TextVariant): TypographyVariantToken {
  switch (variant) {
    case 'h1':
      return 'display';
    case 'h2':
      return 'heading';
    case 'h3':
      return 'title';
    case 'label':
      return 'bodySmall';
    default:
      return variant;
  }
}

interface TextVisualProps {
  readonly variant: TextVariant;
  readonly tone: TextTone;
  readonly color: TextProps['color'];
  readonly font: TextFont | undefined;
}

export function resolveTextStyle(tokens: ThemeTokens, visual: TextVisualProps): TextStyle {
  const variantStyle = tokens.typography.variants[resolveTypographyVariant(visual.variant)];
  const family = visual.font ? tokens.typography.families[visual.font] : variantStyle.fontFamily;
  const color = visual.color
    ? resolveThemeColorValue(tokens, visual.color)
    : resolveToneColor(tokens, visual.tone);

  return { ...variantStyle, fontFamily: family, color };
}
