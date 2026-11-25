import type { ViewStyle } from 'react-native';

import type { ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

export const useTabsStyles = createStyles((tokens) => ({
  root: {
    borderBottomWidth: tokens.borderWidths.default,
    borderBottomColor: tokens.colors.borderDefault,
    backgroundColor: tokens.colors.bgCanvas,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tab: {
    flexShrink: 0,
    minHeight: tokens.components.control.hitTarget,
    paddingHorizontal: tokens.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    left: tokens.spacing.none,
    bottom: tokens.spacing.none,
    height: tokens.borderWidths.lip,
    borderRadius: tokens.radii.pill,
  },
}));

/** Interaction-only surface styles; colours and sizes stay in tokens. */
export function resolveTabInteractionStyle(
  tokens: ThemeTokens,
  pressed: boolean,
  focused: boolean,
  disabled: boolean,
): ViewStyle {
  if (disabled) {
    return {};
  }

  const surfaceStyle: ViewStyle = pressed ? { backgroundColor: tokens.colors.bgSurface } : {};
  // Outline instead of border: the focus ring must not change tab geometry.
  const focusStyle: ViewStyle = focused
    ? {
        outlineWidth: tokens.borderWidths.default,
        outlineStyle: 'solid',
        outlineColor: tokens.colors.textPrimary,
        outlineOffset: tokens.spacing.xxs,
      }
    : {};

  return { ...surfaceStyle, ...focusStyle };
}
