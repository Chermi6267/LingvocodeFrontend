import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { Edges } from 'react-native-safe-area-context';

import type { ThemeColorLike } from '@/shared/config/theme';

import type { IconButtonProps } from '../IconButton';
import type { SafeAreaWrapperProps } from '../SafeAreaWrapper';
import type { TextVariant } from '../Text';

/** Centring keeps the title independent of the back button / action slot widths. */
export type AppBarAlignment = 'center' | 'leading';

export interface AppBarProps extends Omit<
  SafeAreaWrapperProps,
  'children' | 'background' | 'style' | 'statusBar' | 'edges'
> {
  readonly title: string;
  readonly titleVariant?: TextVariant;
  readonly titleColor?: ThemeColorLike;
  readonly numberOfLines?: number;

  /** Renders the themed back button only when a callback is provided. */
  readonly onBackPress?: () => void;
  readonly backIcon?: IconButtonProps['icon'];
  readonly backAccessibilityLabel?: string;

  /** Free-form trailing slot (icons, counters, menu triggers). */
  readonly actions?: ReactNode;
  readonly align?: AppBarAlignment;

  /** Both colours are token paths or values resolved from the active theme. */
  readonly background?: ThemeColorLike;
  readonly borderColor?: ThemeColorLike;
  readonly showBorder?: boolean;

  /** Disable when the screen is already wrapped in `SafeAreaWrapper`. */
  readonly safeArea?: boolean;
  readonly edges?: Edges;
  readonly style?: StyleProp<ViewStyle>;
}

/** `Header` is a naming alias for the same navigation primitive. */
export type HeaderProps = AppBarProps;
