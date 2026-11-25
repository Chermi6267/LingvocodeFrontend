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
    overlay: {
      maxWidth: 560,
      feedbackIconSize: 48,
      enterOffsetY: 16,
    },
    form: {
      maxWidth: 440,
    },
    control: {
      hitTarget: 44,
      indicator: 28,
      switchWidth: 52,
      switchHeight: 32,
      switchThumb: 24,
      sliderTrackHeight: 12,
      sliderThumb: 28,
      optionHeight: 44,
    },
  },
  effects: {
    /** Tactile depth is a hard edge: blur is disabled by design. */
    shadowBlur: 0,
    lipHeight: 4,
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
      duration: 250,
      fromScale: 0.85,
      overshootScale: 1.03,
      toScale: 1,
      easing: [0.34, 1.56, 0.64, 1],
    },
    spring: {
      duration: 250,
      easing: [0.34, 1.56, 0.64, 1],
    },
    progressFill: {
      duration: 400,
      easing: [0.34, 1.56, 0.64, 1],
    },
    spinner: {
      duration: 800,
    },
    skeleton: {
      duration: 1000,
      minOpacity: 0.5,
    },
    shake: {
      duration: 300,
      offsets: [-6, 6, -4, 4, 0],
    },
    overlay: {
      backdropIn: 150,
      backdropOut: 160,
      backdropRestore: 150,
      contentIn: 120,
    },
    sheet: {
      spring: {
        damping: 22,
        stiffness: 220,
        mass: 0.9,
      },
      slideOut: 220,
      maxHeightRatio: 0.85,
      minVisibleRatio: 0.3,
      dragStartThreshold: 4,
      backdropFadeRatio: 0.6,
      closeDistanceRatio: 0.28,
      maxCloseDistance: 140,
      closeVelocityThreshold: 1.1,
    },
    toast: {
      enter: 180,
      slideIn: 220,
      duration: 3500,
      hitSlop: 8,
    },
  },
};
