import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

export interface ListItemProps extends Omit<
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
  /** Main label. Strings are rendered with the kit's typography token. */
  readonly title: ReactNode;
  /** Optional secondary line under the title. */
  readonly subtitle?: ReactNode;
  /** Leading slot: icon, avatar, checkbox, etc. */
  readonly leftSlot?: ReactNode;
  /** Trailing slot: chevron, value, switch, button, etc. */
  readonly rightSlot?: ReactNode;
}
