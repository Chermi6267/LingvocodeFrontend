import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

export interface CheckboxProps extends Omit<
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
  /** Controlled state. Omit it to let the checkbox manage its own state. */
  readonly checked?: boolean;
  /** Initial state for the uncontrolled variant. Defaults to `false`. */
  readonly defaultChecked?: boolean;
  /** Called with the next checked state. */
  readonly onValueChange?: (checked: boolean) => void;
  /** Optional visible label; a string is also used as the accessibility label. */
  readonly label?: ReactNode;
  readonly labelPosition?: 'left' | 'right';
  /**
   * Required when `label` is not a plain string: icon-only controls have no
   * text for screen readers to announce.
   */
  readonly accessibilityLabel?: string;
}
