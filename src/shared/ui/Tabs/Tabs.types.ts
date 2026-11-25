import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemeColorLike } from '@/shared/config/theme';

export interface TabItem<T extends string = string> {
  readonly value: T;
  readonly label: string;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
}

export interface TabsProps<T extends string = string> extends Omit<ViewProps, 'children'> {
  readonly tabs: readonly TabItem<T>[];

  /** Controlled selection. Omit for uncontrolled usage with `defaultValue`. */
  readonly value?: T;
  readonly defaultValue?: T;
  readonly onValueChange?: (value: T) => void;

  /** Active label and sliding indicator colour. Defaults to `secondary.base`. */
  readonly accentColor?: ThemeColorLike;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
}
