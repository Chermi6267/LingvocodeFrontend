import type { TextProps as RNTextProps } from 'react-native';

import type {
  ThemeColorLike,
  ThemeTone,
  ThemeTypography,
  TypographyVariants,
} from '@/shared/config/theme';

export type TypographyVariantToken = keyof TypographyVariants;

/** Token variants plus semantic aliases required by the UI kit. */
export type TextVariant = TypographyVariantToken | 'h1' | 'h2' | 'h3' | 'label';

export type TextTone = ThemeTone;

export type TextFont = keyof ThemeTypography['families'];

export interface TextProps extends RNTextProps {
  /** Typography token or semantic alias. Defaults to `body`. */
  readonly variant?: TextVariant;
  /** Semantic colour role. Defaults to `primary`. */
  readonly tone?: TextTone;
  /** Token path or explicit colour; wins over `tone`. */
  readonly color?: ThemeColorLike;
  /** Font family token; by default the family comes from the variant. */
  readonly font?: TextFont;
}
