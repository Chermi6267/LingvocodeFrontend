import type { ThemeColor, ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

export interface SelectPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly border: ThemeColor;
  readonly borderWidth: number;
  readonly value: ThemeColor;
  readonly hoverFace: ThemeColor;
}

export function resolveSelectPalette(
  tokens: ThemeTokens,
  disabled: boolean,
  open: boolean,
): SelectPalette {
  if (disabled) {
    return {
      face: tokens.colors.bgDisabled,
      lip: tokens.colors.bgDisabled,
      border: tokens.colors.bgDisabled,
      borderWidth: tokens.borderWidths.none,
      value: tokens.colors.textDisabled,
      hoverFace: tokens.colors.bgDisabled,
    };
  }

  return {
    face: tokens.colors.bgSurface,
    lip: tokens.colors.borderLip,
    border: open ? tokens.colors.secondary.base : tokens.colors.borderDefault,
    borderWidth: tokens.borderWidths.default,
    value: tokens.colors.textPrimary,
    hoverFace: tokens.colors.bgElevated,
  };
}

export const useSelectStyles = createStyles((tokens) => ({
  root: {
    position: 'relative',
    alignSelf: 'stretch',
  },
  rootCompact: {
    alignSelf: 'flex-start',
  },
  label: {
    marginBottom: tokens.spacing.xs,
  },
  triggerHost: {
    position: 'relative',
    zIndex: 2,
  },
  triggerFace: {
    minHeight: tokens.components.input.minHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.components.input.paddingHorizontal,
    paddingVertical: tokens.components.input.paddingVertical,
  },
  triggerValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: tokens.spacing.xs,
  },
  value: {
    flexShrink: 1,
  },
  chevron: {
    width: tokens.spacing.sm,
    height: tokens.spacing.sm,
    borderRightWidth: tokens.borderWidths.default,
    borderBottomWidth: tokens.borderWidths.default,
    borderColor: tokens.colors.textSecondary,
    transform: [{ rotate: '45deg' }],
  },
  chevronOpen: {
    transform: [{ rotate: '225deg' }],
  },
  overlay: {
    position: 'absolute',
  },
  menu: {
    position: 'absolute',
    zIndex: 3,
    borderRadius: tokens.radii.md,
    borderWidth: tokens.borderWidths.default,
    borderColor: tokens.colors.borderDefault,
  },
  menuScroll: {
    borderRadius: tokens.radii.md,
  },
  optionPressable: {
    minHeight: tokens.components.control.optionHeight,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.md,
  },
  optionFocused: {
    outlineWidth: tokens.borderWidths.default,
    outlineStyle: 'solid',
    outlineColor: tokens.colors.textPrimary,
    outlineOffset: -tokens.borderWidths.default,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
  },
  optionActive: {
    backgroundColor: tokens.colors.bgSurface,
  },
  optionSelected: {
    backgroundColor: tokens.colors.choiceCardSelected.background,
  },
  optionDisabled: {
    backgroundColor: tokens.colors.bgDisabled,
  },
}));
