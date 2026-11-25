import type { ViewProps } from 'react-native';

import type { ThemeColorLike } from '@/shared/config/theme';

export interface ProgressBarProps extends Omit<ViewProps, 'children' | 'onLayout'> {
  /** Current progress, clamped to `min..max`. */
  readonly value: number;
  readonly min?: number;
  readonly max?: number;
  /** Defaults to `primary.base`. */
  readonly color?: ThemeColorLike;
  /** Defaults to `bgDisabled`. */
  readonly trackColor?: ThemeColorLike;
  /** Renders the glossy inner highlight. Defaults to true. */
  readonly showHighlight?: boolean;
  /** Overrides the screen-reader percentage text. */
  readonly formatValue?: (ratio: number) => string;
  readonly accessibilityLabel?: string;
}
