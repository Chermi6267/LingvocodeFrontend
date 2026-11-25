import type { TextStyle, ViewStyle } from 'react-native';

import {
  resolveThemeColorValue,
  type ThemeColorLike,
  type ThemeTokens,
} from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

import type { AppBarAlignment } from './AppBar.types';

export const useAppBarStyles = createStyles((tokens) => ({
  root: {
    flex: 0,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    minHeight: tokens.components.iconButton.size + tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
  },
  side: {
    minWidth: tokens.components.iconButton.size,
    justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  titleSlot: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  title: {
    flexShrink: 1,
  },
  balancedSide: {
    flex: 1,
  },
  centeredSlot: {
    flex: 2,
    alignItems: 'center',
  },
  centeredTitle: {
    textAlign: 'center',
  },
  autoSide: {
    flex: 0,
  },
  leadingSlot: {
    flex: 1,
    alignItems: 'flex-start',
  },
  leadingTitle: {
    textAlign: 'left',
  },
}));

export interface AppBarAlignmentStyles {
  readonly side: ViewStyle;
  readonly slot: ViewStyle;
  readonly title: TextStyle;
}

/** Layout-only presets; all sizes still come from the style factory above. */
export function resolveAppBarAlignment(
  styles: ReturnType<typeof useAppBarStyles>,
  align: AppBarAlignment,
): AppBarAlignmentStyles {
  if (align === 'leading') {
    return {
      side: styles.autoSide,
      slot: styles.leadingSlot,
      title: styles.leadingTitle,
    };
  }

  return {
    side: styles.balancedSide,
    slot: styles.centeredSlot,
    title: styles.centeredTitle,
  };
}

export function resolveAppBarBorder(
  tokens: ThemeTokens,
  showBorder: boolean,
  borderColor: ThemeColorLike,
): ViewStyle {
  return {
    borderBottomWidth: showBorder ? tokens.borderWidths.default : tokens.borderWidths.none,
    borderBottomColor: resolveThemeColorValue(tokens, borderColor),
  };
}
