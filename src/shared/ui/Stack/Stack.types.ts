import type { ViewProps } from 'react-native';

import type { SpacingToken } from '@/shared/config/theme';

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackVisualProps {
  /** Defaults to `vertical`. */
  readonly direction?: StackDirection;
  /** Gap from the spacing scale. */
  readonly gap?: SpacingToken;
  /** Cross-axis alignment. */
  readonly align?: StackAlign;
  /** Main-axis distribution of free space. */
  readonly justify?: StackJustify;
  readonly wrap?: boolean;
  readonly reverse?: boolean;
  /** Lets the stack consume free space from its parent. */
  readonly flex?: number;
}

export interface StackProps extends ViewProps, StackVisualProps {}

export type VStackProps = Omit<StackProps, 'direction'>;
export type HStackProps = VStackProps;
