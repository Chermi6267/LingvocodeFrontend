import type { StatusBarAnimation, StatusBarStyle } from 'expo-status-bar';
import type { Edges, SafeAreaViewProps } from 'react-native-safe-area-context';

import type { ThemeColorLike } from '@/shared/config/theme';

export interface SafeAreaWrapperProps extends SafeAreaViewProps {
  /**
   * Safe-area edges to respect. Defaults to all four: status bar / cutouts,
   * home indicator / system navigation bar and left/right insets.
   */
  readonly edges?: Edges;
  /** Adds safe insets to padding (default) or margin. */
  readonly mode?: 'padding' | 'margin';
  /** Screen background, including the area behind system bars. */
  readonly background?: ThemeColorLike;
  /** Renders the themed status bar configuration. Defaults to `true`. */
  readonly statusBar?: boolean;
  /** Defaults to `auto`, so iOS/Android pick the right icon contrast. */
  readonly statusBarStyle?: StatusBarStyle;
  readonly statusBarHidden?: boolean;
  readonly statusBarAnimation?: StatusBarAnimation;
}
