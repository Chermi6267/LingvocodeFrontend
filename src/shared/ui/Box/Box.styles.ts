import type { ViewStyle } from 'react-native';

import { resolveThemeColorValue, type ThemeTokens } from '@/shared/config/theme';

import type { BoxVisualProps } from './Box.types';

export function resolveBoxStyle(tokens: ThemeTokens, visual: BoxVisualProps): ViewStyle {
  const hasBorder = visual.borderWidth !== undefined || visual.borderColor !== undefined;

  return {
    width: visual.width,
    height: visual.height,
    minWidth: visual.minWidth,
    minHeight: visual.minHeight,
    maxWidth: visual.maxWidth,
    maxHeight: visual.maxHeight,
    flex: visual.flex,

    padding: visual.padding === undefined ? undefined : tokens.spacing[visual.padding],
    paddingHorizontal:
      visual.paddingHorizontal === undefined ? undefined : tokens.spacing[visual.paddingHorizontal],
    paddingVertical:
      visual.paddingVertical === undefined ? undefined : tokens.spacing[visual.paddingVertical],
    paddingTop: visual.paddingTop === undefined ? undefined : tokens.spacing[visual.paddingTop],
    paddingRight:
      visual.paddingRight === undefined ? undefined : tokens.spacing[visual.paddingRight],
    paddingBottom:
      visual.paddingBottom === undefined ? undefined : tokens.spacing[visual.paddingBottom],
    paddingLeft: visual.paddingLeft === undefined ? undefined : tokens.spacing[visual.paddingLeft],

    margin: visual.margin === undefined ? undefined : tokens.spacing[visual.margin],
    marginHorizontal:
      visual.marginHorizontal === undefined ? undefined : tokens.spacing[visual.marginHorizontal],
    marginVertical:
      visual.marginVertical === undefined ? undefined : tokens.spacing[visual.marginVertical],
    marginTop: visual.marginTop === undefined ? undefined : tokens.spacing[visual.marginTop],
    marginRight: visual.marginRight === undefined ? undefined : tokens.spacing[visual.marginRight],
    marginBottom:
      visual.marginBottom === undefined ? undefined : tokens.spacing[visual.marginBottom],
    marginLeft: visual.marginLeft === undefined ? undefined : tokens.spacing[visual.marginLeft],

    borderRadius: visual.radius === undefined ? undefined : tokens.radii[visual.radius],
    backgroundColor: visual.background
      ? resolveThemeColorValue(tokens, visual.background)
      : undefined,
    borderWidth: hasBorder ? tokens.borderWidths[visual.borderWidth ?? 'default'] : undefined,
    borderColor: hasBorder
      ? resolveThemeColorValue(tokens, visual.borderColor ?? 'borderDefault')
      : undefined,
  };
}
