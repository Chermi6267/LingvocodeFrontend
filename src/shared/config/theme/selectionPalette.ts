import type { ThemeColor, ThemeTokens } from './types';

/** Surface of a selected or disabled selectable row (checkbox, radio). */
export interface SelectionPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly hoverFace: ThemeColor;
}

/** Single source of truth for checkbox/radio selection surfaces. */
export function resolveSelectionPalette(
  tokens: ThemeTokens,
  selected: boolean,
  disabled: boolean,
): SelectionPalette {
  const colors = tokens.colors;

  if (disabled) {
    return {
      face: colors.bgDisabled,
      lip: colors.bgDisabled,
      hoverFace: colors.bgDisabled,
    };
  }

  if (selected) {
    return {
      face: colors.choiceCardSelected.background,
      lip: colors.choiceCardSelected.lip,
      hoverFace: colors.choiceCardSelected.background,
    };
  }

  return {
    face: colors.bgCanvas,
    lip: colors.borderLip,
    hoverFace: colors.bgSurface,
  };
}
