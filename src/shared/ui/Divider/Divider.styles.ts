import type { ViewStyle } from 'react-native';

import { resolveThemeColorValue, type ThemeTokens } from '@/shared/config/theme';

import type { DividerProps } from './Divider.types';

export function resolveDividerStyle(tokens: ThemeTokens, visual: DividerProps): ViewStyle {
  const thickness = tokens.borderWidths[visual.thickness ?? 'default'];
  const color = resolveThemeColorValue(tokens, visual.color ?? 'borderDefault');
  const length = visual.length === undefined ? '100%' : tokens.spacing[visual.length];

  return visual.orientation === 'vertical'
    ? { width: thickness, height: length, backgroundColor: color }
    : { height: thickness, width: length, backgroundColor: color };
}
