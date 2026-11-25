import type { ViewProps } from 'react-native';

import type { IconSizeToken, ThemeColorLike } from '@/shared/config/theme';

export interface SpinnerProps extends Omit<ViewProps, 'children'> {
  /** Diameter from `tokens.iconSizes`. Defaults to `md`. */
  readonly size?: IconSizeToken;
  /** Colour of the rotating arc. Defaults to `primary.base`. */
  readonly color?: ThemeColorLike;
  /** Colour of the static ring. Defaults to `bgDisabled`. */
  readonly trackColor?: ThemeColorLike;
  /** Stops the rotation when false. */
  readonly animating?: boolean;
  readonly accessibilityLabel?: string;
}
