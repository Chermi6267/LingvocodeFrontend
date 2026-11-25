import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

import type { SpacingToken } from '@/shared/config/theme';

import type { Pressable3DProps } from '../Pressable3D';

/** Radio groups compare primitive values by identity. */
export type RadioValue = string | number;

export interface RadioProps extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'faceStyle'
  | 'radius'
  | 'hoverFaceColor'
  | 'onPress'
  | 'accessibilityRole'
> {
  /** Value represented by this option. Required inside a RadioGroup. */
  readonly value: RadioValue;
  /** Standalone controlled state. Inside a group the group value wins. */
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onSelect?: (value: RadioValue) => void;
  readonly label?: ReactNode;
  readonly labelPosition?: 'left' | 'right';
  readonly accessibilityLabel?: string;
}

export interface RadioGroupProps extends Omit<ViewProps, 'children'> {
  readonly children: ReactNode;
  /** Controlled selected value. */
  readonly value?: RadioValue | null;
  readonly defaultValue?: RadioValue | null;
  readonly onValueChange?: (value: RadioValue) => void;
  readonly disabled?: boolean;
  /** Optional visible heading; a string is also the group accessibility label. */
  readonly label?: ReactNode;
  readonly direction?: 'horizontal' | 'vertical';
  readonly gap?: SpacingToken;
}
