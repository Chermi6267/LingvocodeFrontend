import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

export interface SwitchProps extends Omit<
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
  /** Controlled state. Omit it to let the switch manage its own state. */
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onValueChange?: (checked: boolean) => void;
  readonly label?: ReactNode;
  readonly labelPosition?: 'left' | 'right';
  /** Required when `label` is not a plain string. */
  readonly accessibilityLabel?: string;
}
