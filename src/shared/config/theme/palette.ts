import type { AccentColorTokens, AccentTokenName, ThemeColors } from './types';

/**
 * Accent triads from duolingo_ui.txt. They intentionally do not depend on the
 * light/dark scheme: a new theme only needs to supply its neutral colours and
 * any scheme-specific overrides.
 */
export const sharedAccentPalette: Record<AccentTokenName, AccentColorTokens> = {
  primary: { base: '#58CC02', lip: '#58A700', tint: '#D7FFB8' },
  secondary: { base: '#1CB0F6', lip: '#1899D6', tint: '#DDF4FF' },
  danger: { base: '#FF4B4B', lip: '#EA2B2B', tint: '#FFDFE0' },
  warning: { base: '#FFC800', lip: '#E5A400', tint: '#FFF5CC' },
  streak: { base: '#FF9600', lip: '#CC7800', tint: '#FFE7C2' },
  legendary: { base: '#CE82FF', lip: '#A560E8', tint: '#F3E5FF' },
};

type SharedColorTokens = Pick<
  ThemeColors,
  AccentTokenName | 'primaryHover' | 'textOnAccent' | 'progressHighlight' | 'backdrop'
>;

/** Colours that are identical in every theme. */
export const sharedThemeColors: SharedColorTokens = {
  ...sharedAccentPalette,
  primaryHover: '#61E002',
  textOnAccent: '#FFFFFF',
  progressHighlight: 'rgba(255, 255, 255, 0.25)',
  backdrop: 'rgba(0, 0, 0, 0.45)',
};

/** Status roles reuse accent colors so themes cannot drift from the palette. */
export const sharedFeedbackRoles = {
  success: {
    heading: sharedAccentPalette.primary.lip,
    icon: sharedAccentPalette.primary.base,
  },
  error: {
    heading: sharedAccentPalette.danger.lip,
    icon: sharedAccentPalette.danger.base,
  },
} as const;
