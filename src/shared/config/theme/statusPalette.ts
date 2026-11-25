import type { ThemeColor, ThemeTokens } from './types';

export type StatusVariant = 'info' | 'success' | 'warning' | 'error';

/** One semantic status palette shared by alerts, toasts, cards and sheets. */
export interface StatusPalette {
  readonly background: ThemeColor;
  readonly border: ThemeColor;
  readonly lip: ThemeColor;
  readonly heading: ThemeColor;
  readonly icon: ThemeColor;
  readonly glyph: string;
  readonly text: ThemeColor;
}

/** Resolves status colors from the active theme without duplicating palettes. */
export function resolveStatusPalette(tokens: ThemeTokens, variant: StatusVariant): StatusPalette {
  const colors = tokens.colors;
  const text = colors.textPrimary;

  switch (variant) {
    case 'success':
      return {
        background: colors.feedback.success.background,
        border: colors.primary.base,
        lip: colors.primary.lip,
        heading: colors.feedback.success.heading,
        icon: colors.feedback.success.icon,
        glyph: '✓',
        text,
      };
    case 'error':
      return {
        background: colors.feedback.error.background,
        border: colors.danger.base,
        lip: colors.danger.lip,
        heading: colors.feedback.error.heading,
        icon: colors.feedback.error.icon,
        glyph: '!',
        text,
      };
    case 'warning':
      return {
        background: colors.warning.tint,
        border: colors.warning.base,
        lip: colors.warning.lip,
        heading: colors.warning.lip,
        icon: colors.warning.base,
        glyph: '!',
        text,
      };
    case 'info':
    default:
      return {
        background: colors.secondary.tint,
        border: colors.secondary.base,
        lip: colors.secondary.lip,
        heading: colors.secondary.lip,
        icon: colors.secondary.base,
        glyph: 'i',
        text,
      };
  }
}

/** Maps a feedback status to the CTA variant used by bottom sheets. */
export function resolveStatusActionVariant(variant: StatusVariant): 'primary' | 'danger' {
  return variant === 'error' ? 'danger' : 'primary';
}
