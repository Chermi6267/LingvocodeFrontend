import type { TextStyle } from 'react-native';

/**
 * Color literal formats accepted by the design system.
 * Keeping the format narrow prevents accidental CSS keywords such as "red".
 */
export type ThemeColor = `#${string}` | `rgba(${number}, ${number}, ${number}, ${number})`;

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

export interface RadiusTokens {
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly pill: number;
}

export interface BorderWidthTokens {
  readonly none: number;
  readonly default: number;
  readonly lip: number;
}

export interface IconSizeTokens {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
}

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
}

/** Geometry of the Tactile 2.5D effect. Blur is always disabled by design. */
export interface EffectTokens {
  readonly shadowBlur: number;
  readonly lipHeight: number;
  readonly pressedOffsetY: number;
}

export type CubicBezier = readonly [number, number, number, number];
export type MotionEasing = 'ease' | CubicBezier;

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
    readonly minDuration: number;
    readonly maxDuration: number;
    readonly duration: number;
    readonly fromScale: number;
    readonly overshootScale: number;
    readonly toScale: number;
    readonly easing: MotionEasing;
  };
  readonly spring: {
    readonly duration: number;
    readonly overshootScale: number;
    readonly easing: MotionEasing;
  };
  readonly progressFill: {
    readonly duration: number;
    readonly easing: MotionEasing;
  };
  readonly shake: {
    readonly duration: number;
    readonly offsets: readonly [number, number, number, number, number];
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
