import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

/** Semantic action variants resolved exclusively from theme tokens. */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'hoverFaceColor'
  | 'hoverBorderColor'
  | 'faceStyle'
> {
  /** Visible label. Also becomes the accessibility label of the button. */
  readonly children: ReactNode;
  /** Defaults to `primary`. */
  readonly variant?: ButtonVariant;
  /** Stretches the button to the width of its container. */
  readonly fullWidth?: boolean;
  /**
   * Keeps the label in the layout (hidden with opacity), blocks input and
   * exposes `busy` to assistive technology. The 2.5D lip stays visible.
   */
  readonly loading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
}
