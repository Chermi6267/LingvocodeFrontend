import type { ThemeColor, ThemeColors, ThemeTokens } from './types';

/** Dot paths of every semantic colour token (for example `primary.lip`). */
type ColorTokenPath<T> = {
  [K in keyof T & string]: T[K] extends ThemeColor ? K : `${K}.${ColorTokenPath<T[K]>}`;
}[keyof T & string];

export type ThemeColorToken = ColorTokenPath<ThemeColors>;

/** A token path or an explicit colour produced from tokens by another primitive. */
export type ThemeColorLike = ThemeColor | ThemeColorToken;

/** Semantic roles shared by text and icon primitives. */
export type ThemeTone = 'primary' | 'secondary' | 'disabled' | 'onAccent';

type ColorTokenMap = Record<ThemeColorToken, ThemeColor>;

function getColorTokenMap(tokens: ThemeTokens): ColorTokenMap {
  return {
    'primary.base': tokens.colors.primary.base,
    'primary.lip': tokens.colors.primary.lip,
    'primary.tint': tokens.colors.primary.tint,
    'secondary.base': tokens.colors.secondary.base,
    'secondary.lip': tokens.colors.secondary.lip,
    'secondary.tint': tokens.colors.secondary.tint,
    'danger.base': tokens.colors.danger.base,
    'danger.lip': tokens.colors.danger.lip,
    'danger.tint': tokens.colors.danger.tint,
    'warning.base': tokens.colors.warning.base,
    'warning.lip': tokens.colors.warning.lip,
    'warning.tint': tokens.colors.warning.tint,
    'streak.base': tokens.colors.streak.base,
    'streak.lip': tokens.colors.streak.lip,
    'streak.tint': tokens.colors.streak.tint,
    'legendary.base': tokens.colors.legendary.base,
    'legendary.lip': tokens.colors.legendary.lip,
    'legendary.tint': tokens.colors.legendary.tint,
    bgCanvas: tokens.colors.bgCanvas,
    bgSurface: tokens.colors.bgSurface,
    bgElevated: tokens.colors.bgElevated,
    borderDefault: tokens.colors.borderDefault,
    borderLip: tokens.colors.borderLip,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    bgDisabled: tokens.colors.bgDisabled,
    textDisabled: tokens.colors.textDisabled,
    backdrop: tokens.colors.backdrop,
    primaryHover: tokens.colors.primaryHover,
    textOnAccent: tokens.colors.textOnAccent,
    progressHighlight: tokens.colors.progressHighlight,
    'choiceCardSelected.background': tokens.colors.choiceCardSelected.background,
    'choiceCardSelected.border': tokens.colors.choiceCardSelected.border,
    'choiceCardSelected.lip': tokens.colors.choiceCardSelected.lip,
    'choiceCardSelected.text': tokens.colors.choiceCardSelected.text,
    'feedback.success.background': tokens.colors.feedback.success.background,
    'feedback.success.heading': tokens.colors.feedback.success.heading,
    'feedback.success.icon': tokens.colors.feedback.success.icon,
    'feedback.error.background': tokens.colors.feedback.error.background,
    'feedback.error.heading': tokens.colors.feedback.error.heading,
    'feedback.error.icon': tokens.colors.feedback.error.icon,
  };
}

export function resolveColorToken(tokens: ThemeTokens, token: ThemeColorToken): ThemeColor {
  return getColorTokenMap(tokens)[token];
}

function isColorToken(value: ThemeColorLike, colorMap: ColorTokenMap): value is ThemeColorToken {
  return Object.prototype.hasOwnProperty.call(colorMap, value);
}

/** Accepts both a token path and a colour already resolved from tokens. */
export function resolveThemeColorValue(tokens: ThemeTokens, value: ThemeColorLike): ThemeColor {
  const colorMap = getColorTokenMap(tokens);

  return isColorToken(value, colorMap) ? colorMap[value] : value;
}

const toneColorTokens: Record<ThemeTone, ThemeColorToken> = {
  primary: 'textPrimary',
  secondary: 'textSecondary',
  disabled: 'textDisabled',
  onAccent: 'textOnAccent',
};

export function resolveToneColor(tokens: ThemeTokens, tone: ThemeTone): ThemeColor {
  return resolveColorToken(tokens, toneColorTokens[tone]);
}
