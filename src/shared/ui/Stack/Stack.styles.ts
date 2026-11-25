import type { ViewStyle } from 'react-native';

import type { ThemeTokens } from '@/shared/config/theme';

import type { StackAlign, StackJustify, StackVisualProps } from './Stack.types';

const alignItems: Record<StackAlign, NonNullable<ViewStyle['alignItems']>> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyContent: Record<StackJustify, NonNullable<ViewStyle['justifyContent']>> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export function resolveStackStyle(tokens: ThemeTokens, visual: StackVisualProps): ViewStyle {
  const isHorizontal = visual.direction === 'horizontal';
  const flexDirection = isHorizontal ? 'row' : 'column';

  return {
    flexDirection: visual.reverse ? `${flexDirection}-reverse` : flexDirection,
    gap: visual.gap === undefined ? undefined : tokens.spacing[visual.gap],
    alignItems: visual.align === undefined ? undefined : alignItems[visual.align],
    justifyContent: visual.justify === undefined ? undefined : justifyContent[visual.justify],
    flexWrap: visual.wrap ? 'wrap' : undefined,
    flex: visual.flex,
  };
}
