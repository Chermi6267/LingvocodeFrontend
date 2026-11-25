import type { SymbolViewProps } from 'expo-symbols';

import type { IconSizeToken, ThemeColorLike, ThemeTone } from '@/shared/config/theme';

/** Platform-aware name accepted by the existing `expo-symbols` library. */
export type IconName = SymbolViewProps['name'];

export interface IconProps extends Omit<SymbolViewProps, 'size' | 'tintColor' | 'colors'> {
  /** Size token instead of a raw pixel value. Defaults to `md`. */
  readonly size?: IconSizeToken;
  /** Semantic colour role. Defaults to `primary`. */
  readonly tone?: ThemeTone;
  /** Token path or explicit colour; wins over `tone`. */
  readonly color?: ThemeColorLike;
}
