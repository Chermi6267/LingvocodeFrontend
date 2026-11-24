import type { BaseThemeTokens } from './types';

/**
 * Values shared by every theme.
 * They are taken from duolingo_ui.txt; a new theme should only provide colors.
 */
export const sharedTokens: BaseThemeTokens = {
  typography: {
    families: {
      nunito: 'Nunito',
      rubik: 'Rubik',
    },
    weights: {
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
    },
    variants: {
      display: {
        fontFamily: 'Nunito',
        fontSize: 32,
        lineHeight: 38,
        fontWeight: 800,
        letterSpacing: -0.32,
        textTransform: 'none',
      },
      heading: {
        fontFamily: 'Nunito',
        fontSize: 24,
        lineHeight: 29,
        fontWeight: 800,
        letterSpacing: -0.24,
        textTransform: 'none',
      },
      title: {
        fontFamily: 'Nunito',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: 700,
        letterSpacing: -0.2,
        textTransform: 'none',
      },
      body: {
        fontFamily: 'Nunito',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 600,
        letterSpacing: 0,
        textTransform: 'none',
      },
      bodySmall: {
        fontFamily: 'Nunito',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 600,
        letterSpacing: 0,
        textTransform: 'none',
      },
      caption: {
        fontFamily: 'Nunito',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 600,
        letterSpacing: 0,
        textTransform: 'none',
      },
      button: {
        fontFamily: 'Nunito',
        fontSize: 15,
        lineHeight: 20,
        fontWeight: 800,
        letterSpacing: 0.75,
        textTransform: 'uppercase',
      },
      tab: {
        fontFamily: 'Nunito',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 800,
        letterSpacing: 0.7,
        textTransform: 'uppercase',
      },
      badge: {
        fontFamily: 'Nunito',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: 'none',
      },
    },
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    huge: 64,
  },
  radii: {
    sm: 8,
    md: 14,
    lg: 16,
    pill: 9999,
  },
  borderWidths: {
    none: 0,
    default: 2,
    lip: 4,
  },
  iconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  },
  components: {
    button: {
      minHeight: 44,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    input: {
      minHeight: 52,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    choiceCard: {
      padding: 16,
      hotkeySize: 28,
      hotkeyRadius: 8,
    },
    progressBar: {
      height: 16,
      highlightHeight: 4,
      highlightInsetTop: 3,
      highlightInsetHorizontal: 8,
    },
    iconButton: {
      size: 44,
    },
  },
  effects: {
    shadowBlur: 0,
    lipHeight: 4,
    pressedOffsetY: 4,
  },
  motion: {
    press: {
      duration: 100,
      easing: 'ease',
    },
    hover: {
      duration: 150,
      easing: 'ease',
    },
    popIn: {
      minDuration: 250,
      maxDuration: 300,
      duration: 250,
      fromScale: 0.85,
      overshootScale: 1.03,
      toScale: 1,
      easing: [0.34, 1.56, 0.64, 1],
    },
    spring: {
      duration: 250,
      overshootScale: 1.03,
      easing: [0.34, 1.56, 0.64, 1],
    },
    progressFill: {
      duration: 400,
      easing: [0.34, 1.56, 0.64, 1],
    },
    shake: {
      duration: 300,
      offsets: [-6, 6, -4, 4, 0],
    },
  },
};
