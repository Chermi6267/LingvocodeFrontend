import type { ViewProps } from 'react-native';

import type {
  BorderWidthToken,
  RadiusToken,
  SpacingToken,
  ThemeColorLike,
} from '@/shared/config/theme';

/** Layout dimensions: a number, a percentage or `auto`. */
export type BoxDimension = number | `${number}%` | 'auto';

/**
 * Token-driven visual props.
 *
 * Spacing, radii, borders and colours accept token names; dimensions accept
 * numbers/percentages for component-specific sizes.
 */
export interface BoxVisualProps {
  readonly width?: BoxDimension;
  readonly height?: BoxDimension;
  readonly minWidth?: BoxDimension;
  readonly minHeight?: BoxDimension;
  readonly maxWidth?: BoxDimension;
  readonly maxHeight?: BoxDimension;
  readonly flex?: number;

  readonly padding?: SpacingToken;
  readonly paddingHorizontal?: SpacingToken;
  readonly paddingVertical?: SpacingToken;
  readonly paddingTop?: SpacingToken;
  readonly paddingRight?: SpacingToken;
  readonly paddingBottom?: SpacingToken;
  readonly paddingLeft?: SpacingToken;

  readonly margin?: SpacingToken;
  readonly marginHorizontal?: SpacingToken;
  readonly marginVertical?: SpacingToken;
  readonly marginTop?: SpacingToken;
  readonly marginRight?: SpacingToken;
  readonly marginBottom?: SpacingToken;
  readonly marginLeft?: SpacingToken;

  readonly radius?: RadiusToken;
  readonly background?: ThemeColorLike;
  readonly borderWidth?: BorderWidthToken;
  readonly borderColor?: ThemeColorLike;
}

export interface BoxProps extends ViewProps, BoxVisualProps {}
