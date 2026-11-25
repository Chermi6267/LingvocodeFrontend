import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

/** Result feedback shown after a choice has been checked. */
export type CardStatus = 'correct' | 'wrong';

/**
 * `info` is a static informational surface; `choice` is an interactive answer
 * tile. When omitted, the mode is inferred from the presence of `onPress`.
 */
export type CardVariant = 'info' | 'choice';

export interface CardProps extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'hoverFaceColor'
  | 'faceStyle'
  | 'radius'
  | 'lipHeight'
  | 'showLip'
  | 'accessibilityRole'
> {
  readonly children: ReactNode;
  readonly variant?: CardVariant;
  readonly selected?: boolean;
  readonly status?: CardStatus;
  /** Optional 28×28 number / hotkey badge rendered before the content. */
  readonly badge?: string | number;
  /** Defaults to `tokens.radii.lg` (16px). */
  readonly radius?: number;
}
