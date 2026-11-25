import type { ViewProps } from 'react-native';

import type { RadiusToken, ThemeColorLike } from '@/shared/config/theme';

import type { BoxDimension } from '../Box';

export type SkeletonShape = 'line' | 'rect' | 'circle' | 'pill';

export interface SkeletonProps extends Omit<ViewProps, 'children'> {
  /** Preset radius/size combination; defaults to `line`. */
  readonly shape?: SkeletonShape;
  /** Overrides the preset width. */
  readonly width?: BoxDimension;
  /** Overrides the preset height. */
  readonly height?: BoxDimension;
  /** Overrides the preset radius from `tokens.radii`. */
  readonly radius?: RadiusToken;
  /** Defaults to `bgDisabled`. */
  readonly color?: ThemeColorLike;
  /** Enables the themed opacity pulse. Defaults to true. */
  readonly pulse?: boolean;
}
