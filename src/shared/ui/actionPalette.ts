import type { ThemeColor, ThemeTokens } from '@/shared/config/theme';

export type ActionVariant = 'solid' | 'outline';
export type ActionAccent = 'primary' | 'secondary' | 'danger' | 'warning' | 'streak' | 'legendary';

export interface ActionPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly border: ThemeColor;
  readonly borderWidth: number;
  readonly content: ThemeColor;
  readonly hoverFace?: ThemeColor;
}

/**
 * Shared colour resolution for filled/outlined action surfaces.
 * Button and IconButton must stay visually in sync, so neither owns this map.
 */
export function resolveActionPalette(
  tokens: ThemeTokens,
  variant: ActionVariant,
  accent: ActionAccent,
  disabled: boolean,
): ActionPalette {
  if (disabled) {
    return {
      face: tokens.colors.bgDisabled,
      lip: tokens.colors.bgDisabled,
      border: tokens.colors.bgDisabled,
      borderWidth: tokens.borderWidths.none,
      content: tokens.colors.textDisabled,
    };
  }

  if (variant === 'outline') {
    return {
      face: tokens.colors.bgCanvas,
      lip: tokens.colors.borderLip,
      border: tokens.colors.borderDefault,
      borderWidth: tokens.borderWidths.default,
      content: tokens.colors.textPrimary,
      hoverFace: tokens.colors.bgSurface,
    };
  }

  const accentTokens = tokens.colors[accent];

  return {
    face: accentTokens.base,
    lip: accentTokens.lip,
    border: accentTokens.base,
    borderWidth: tokens.borderWidths.none,
    content: tokens.colors.textOnAccent,
    hoverFace: accent === 'primary' ? tokens.colors.primaryHover : undefined,
  };
}
