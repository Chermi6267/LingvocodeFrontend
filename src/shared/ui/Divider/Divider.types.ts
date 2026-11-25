import type { ViewProps } from 'react-native';

import type { BorderWidthToken, SpacingToken, ThemeColorLike } from '@/shared/config/theme';

export type DividerOrientation = 'horizontal' | 'vertical';

/** A positive border-width token (`lip` is allowed, `none` is not). */
export type DividerThickness = Exclude<BorderWidthToken, 'none'>;

export interface DividerProps extends ViewProps {
  /** Defaults to `horizontal`. */
  readonly orientation?: DividerOrientation;
  /** Border-width token. Defaults to `default`. */
  readonly thickness?: DividerThickness;
  /** Length along the divider axis; useful when the parent cannot stretch it. */
  readonly length?: SpacingToken;
  /** Defaults to `borderDefault`. */
  readonly color?: ThemeColorLike;
}
