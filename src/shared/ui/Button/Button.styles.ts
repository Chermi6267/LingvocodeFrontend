import { StyleSheet } from 'react-native';

import type { ThemeColor, ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

import type { ButtonVariant } from './Button.types';

export interface ButtonPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly border: ThemeColor;
  readonly borderWidth: number;
  readonly content: ThemeColor;
  readonly hoverFace?: ThemeColor;
  /** Filled and ghost variants keep the 2.5D edge; disabled is always flat. */
  readonly showLip: boolean;
}

/**
 * Maps a semantic variant to the accent triad of the active theme.
 * Disabled always wins: flat surface, no lip, disabled token pair.
 */
export function resolveButtonPalette(
  tokens: ThemeTokens,
  variant: ButtonVariant,
  disabled: boolean,
): ButtonPalette {
  if (disabled) {
    return {
      face: tokens.colors.bgDisabled,
      lip: tokens.colors.bgDisabled,
      border: tokens.colors.bgDisabled,
      borderWidth: tokens.borderWidths.none,
      content: tokens.colors.textDisabled,
      showLip: false,
    };
  }

  switch (variant) {
    case 'secondary':
      return {
        face: tokens.colors.secondary.base,
        lip: tokens.colors.secondary.lip,
        border: tokens.colors.secondary.base,
        borderWidth: tokens.borderWidths.none,
        content: tokens.colors.textOnAccent,
        hoverFace: tokens.colors.secondary.lip,
        showLip: true,
      };
    case 'danger':
      return {
        face: tokens.colors.danger.base,
        lip: tokens.colors.danger.lip,
        border: tokens.colors.danger.base,
        borderWidth: tokens.borderWidths.none,
        content: tokens.colors.textOnAccent,
        hoverFace: tokens.colors.danger.lip,
        showLip: true,
      };
    case 'ghost':
      return {
        face: tokens.colors.bgCanvas,
        lip: tokens.colors.borderLip,
        border: tokens.colors.bgCanvas,
        borderWidth: tokens.borderWidths.none,
        content: tokens.colors.textPrimary,
        hoverFace: tokens.colors.bgSurface,
        showLip: true,
      };
    case 'primary':
    default:
      return {
        face: tokens.colors.primary.base,
        lip: tokens.colors.primary.lip,
        border: tokens.colors.primary.base,
        borderWidth: tokens.borderWidths.none,
        content: tokens.colors.textOnAccent,
        hoverFace: tokens.colors.primaryHover,
        showLip: true,
      };
  }
}

export const useButtonStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  face: {
    minHeight: tokens.components.button.minHeight,
    paddingHorizontal: tokens.components.button.paddingHorizontal,
    paddingVertical: tokens.components.button.paddingVertical,
    justifyContent: 'center',
    userSelect: 'none',
  },
  label: {
    userSelect: 'none',
  },
  content: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
  },
  hidden: {
    opacity: 0,
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
