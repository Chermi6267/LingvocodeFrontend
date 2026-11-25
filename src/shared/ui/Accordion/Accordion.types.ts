import type { ReactNode } from 'react';

import type { Pressable3DProps } from '../Pressable3D';

export interface AccordionProps extends Omit<
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
  | 'onPress'
  | 'accessibilityRole'
  | 'accessibilityState'
> {
  /** Always-visible header label. */
  readonly title: ReactNode;
  /** Collapsible content; stays mounted so nested state is preserved. */
  readonly children: ReactNode;
  /** Controlled expansion state. */
  readonly expanded?: boolean;
  /** Initial state for uncontrolled usage. */
  readonly defaultExpanded?: boolean;
  readonly onExpandedChange?: (expanded: boolean) => void;
  readonly disabled?: boolean;
}
