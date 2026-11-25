import type { TextStyle } from 'react-native';

/**
 * Color literal formats accepted by the design system.
 * Keeping the format narrow prevents accidental CSS keywords such as "red".
 */
export type ThemeColor = `#${string}` | `rgba(${number}, ${number}, ${number}, ${number})`;

/** Names of the six accent triads defined by the design specification. */
export type AccentTokenName =
  'primary' | 'secondary' | 'danger' | 'warning' | 'streak' | 'legendary';

/** A semantic accent exists as a base / lip / tint triad. */
export interface AccentColorTokens {
  readonly base: ThemeColor;
  readonly lip: ThemeColor;
  readonly tint: ThemeColor;
}

/** Colors of a selected choice card (tests, settings, lists). */
export interface ChoiceCardSelectedTokens {
  readonly background: ThemeColor;
  readonly border: ThemeColor;
  readonly lip: ThemeColor;
  readonly text: ThemeColor;
}

/** Colors of a bottom feedback sheet. */
export interface FeedbackStatusTokens {
  readonly background: ThemeColor;
  readonly heading: ThemeColor;
  readonly icon: ThemeColor;
}

export interface ThemeColors {
  readonly primary: AccentColorTokens;
  readonly secondary: AccentColorTokens;
  readonly danger: AccentColorTokens;
  readonly warning: AccentColorTokens;
  readonly streak: AccentColorTokens;
  readonly legendary: AccentColorTokens;

  readonly bgCanvas: ThemeColor;
  readonly bgSurface: ThemeColor;
  readonly bgElevated: ThemeColor;
  readonly borderDefault: ThemeColor;
  readonly borderLip: ThemeColor;
  readonly textPrimary: ThemeColor;
  readonly textSecondary: ThemeColor;
  readonly bgDisabled: ThemeColor;
  readonly textDisabled: ThemeColor;
  /** Scrim behind modals and bottom sheets. */
  readonly backdrop: ThemeColor;

  /** Explicit hover color from the Duolingo CTA example. */
  readonly primaryHover: ThemeColor;
  /** Text placed on top of any saturated accent. */
  readonly textOnAccent: ThemeColor;
  /** Glossy highlight inside the progress bar fill. */
  readonly progressHighlight: ThemeColor;

  readonly choiceCardSelected: ChoiceCardSelectedTokens;

  readonly feedback: {
    readonly success: FeedbackStatusTokens;
    readonly error: FeedbackStatusTokens;
  };
}

export type FontWeight = NonNullable<TextStyle['fontWeight']>;
export type TextTransform = NonNullable<TextStyle['textTransform']>;

export interface TypographyVariant {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontWeight: FontWeight;
  readonly letterSpacing: number;
  readonly textTransform: TextTransform;
}

export interface TypographyVariants {
  readonly display: TypographyVariant;
  readonly heading: TypographyVariant;
  readonly title: TypographyVariant;
  readonly body: TypographyVariant;
  readonly bodySmall: TypographyVariant;
  readonly caption: TypographyVariant;
  readonly button: TypographyVariant;
  readonly tab: TypographyVariant;
  readonly badge: TypographyVariant;
}

export interface ThemeTypography {
  readonly families: {
    readonly nunito: string;
    readonly rubik: string;
  };
  readonly weights: {
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
    readonly extraBold: 800;
  };
  readonly variants: TypographyVariants;
}

export interface SpacingTokens {
  readonly none: number;
  readonly xxs: number;
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly xxl: number;
  readonly xxxl: number;
  readonly huge: number;
}

export type SpacingToken = keyof SpacingTokens;

export interface RadiusTokens {
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly pill: number;
}

export type RadiusToken = keyof RadiusTokens;

export interface BorderWidthTokens {
  readonly none: number;
  readonly default: number;
  readonly lip: number;
}

export type BorderWidthToken = keyof BorderWidthTokens;

export interface IconSizeTokens {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
}

export type IconSizeToken = keyof IconSizeTokens;

export interface ComponentSizeTokens {
  readonly button: {
    readonly minHeight: number;
    readonly paddingHorizontal: number;
    readonly paddingVertical: number;
  };
  readonly input: {
    readonly minHeight: number;
    readonly paddingHorizontal: number;
    readonly paddingVertical: number;
  };
  readonly choiceCard: {
    readonly padding: number;
    readonly hotkeySize: number;
    readonly hotkeyRadius: number;
  };
  readonly progressBar: {
    readonly height: number;
    readonly highlightHeight: number;
    readonly highlightInsetTop: number;
    readonly highlightInsetHorizontal: number;
  };
  readonly iconButton: {
    readonly size: number;
  };
  /** Shared geometry for modal, toast and feedback overlays. */
  readonly overlay: {
    readonly maxWidth: number;
    readonly feedbackIconSize: number;
    readonly enterOffsetY: number;
  };
  /** Preferred width of centered form/layout columns. */
  readonly form: {
    readonly maxWidth: number;
  };
  /** Shared geometry for form controls (hit targets, indicators, tracks). */
  readonly control: {
    readonly hitTarget: number;
    readonly indicator: number;
    readonly switchWidth: number;
    readonly switchHeight: number;
    readonly switchThumb: number;
    readonly sliderTrackHeight: number;
    readonly sliderThumb: number;
    readonly optionHeight: number;
  };
}

/** Geometry of the Tactile 2.5D effect. Blur is always disabled by design. */
export interface EffectTokens {
  readonly shadowBlur: number;
  readonly lipHeight: number;
}

export type CubicBezier = readonly [number, number, number, number];
export type MotionEasing = 'ease' | CubicBezier;

/** Physics used by sheet and overlay transitions. */
export interface SpringConfigToken {
  readonly damping: number;
  readonly stiffness: number;
  readonly mass: number;
}

export interface MotionTokens {
  readonly press: {
    readonly duration: number;
    readonly easing: MotionEasing;
  };
  readonly hover: {
    readonly duration: number;
    readonly easing: MotionEasing;
  };
  readonly popIn: {
    readonly duration: number;
    readonly fromScale: number;
    readonly overshootScale: number;
    readonly toScale: number;
    readonly easing: MotionEasing;
  };
  readonly spring: {
    readonly duration: number;
    readonly easing: MotionEasing;
  };
  readonly progressFill: {
    readonly duration: number;
    readonly easing: MotionEasing;
  };
  /** Continuous rotation used by the loading indicator. */
  readonly spinner: {
    readonly duration: number;
  };
  /** Opacity pulse used by placeholder blocks. */
  readonly skeleton: {
    readonly duration: number;
    readonly minOpacity: number;
  };
  readonly shake: {
    readonly duration: number;
    readonly offsets: readonly [number, number, number, number, number];
  };
  /** Backdrop and content fades shared by modal, sheet and toast overlays. */
  readonly overlay: {
    readonly backdropIn: number;
    readonly backdropOut: number;
    readonly backdropRestore: number;
    readonly contentIn: number;
  };
  /** Bottom-sheet motion and gesture thresholds. */
  readonly sheet: {
    readonly spring: SpringConfigToken;
    readonly slideOut: number;
    readonly maxHeightRatio: number;
    readonly minVisibleRatio: number;
    readonly dragStartThreshold: number;
    readonly backdropFadeRatio: number;
    readonly closeDistanceRatio: number;
    readonly maxCloseDistance: number;
    readonly closeVelocityThreshold: number;
  };
  /** Toast entrance and lifetime. */
  readonly toast: {
    readonly enter: number;
    readonly slideIn: number;
    readonly duration: number;
    readonly hitSlop: number;
  };
}

export interface ThemeTokens {
  readonly colors: ThemeColors;
  readonly typography: ThemeTypography;
  readonly spacing: SpacingTokens;
  readonly radii: RadiusTokens;
  readonly borderWidths: BorderWidthTokens;
  readonly iconSizes: IconSizeTokens;
  readonly components: ComponentSizeTokens;
  readonly effects: EffectTokens;
  readonly motion: MotionTokens;
}

/**
 * Structural tokens are shared between themes. A theme only supplies its colors.
 */
export type BaseThemeTokens = Omit<ThemeTokens, 'colors'>;

export type ThemeColorScheme = 'light' | 'dark';

export interface ThemeDefinition {
  readonly name: string;
  readonly colorScheme: ThemeColorScheme;
  readonly tokens: ThemeTokens;
}
