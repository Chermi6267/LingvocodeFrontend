import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { ThemeColor } from '@/shared/config/theme';
import { resolveEasing, usePressDepth } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { TactileLayers } from '../TactileLayers';

const baseStyle: ViewStyle = { position: 'relative' };

const webCursorStyle: ViewStyle = Platform.OS === 'web' ? { cursor: 'pointer' } : {};

const webDisabledCursorStyle: ViewStyle = Platform.OS === 'web' ? { cursor: 'not-allowed' } : {};

export interface Pressable3DProps extends Omit<PressableProps, 'children' | 'style'> {
  readonly children?: ReactNode;

  /** Background of the front surface. Must stay opaque to hide the lip. */
  readonly faceColor: ThemeColor;
  /** Colour of the visible bottom edge. */
  readonly lipColor: ThemeColor;
  readonly borderColor?: ThemeColor;
  /** Defaults to 2 when a border colour is provided, otherwise 0. */
  readonly borderWidth?: number;
  /** Defaults to `tokens.radii.md`. */
  readonly radius?: number;
  /** Defaults to `tokens.effects.lipHeight` (4px). */
  readonly lipHeight?: number;
  /**
   * Defaults to `!disabled`. Disabled surfaces are always flat; loading
   * surfaces may opt back into the lip while staying non-interactive.
   */
  readonly showLip?: boolean;

  readonly faceStyle?: StyleProp<ViewStyle>;
  readonly style?: StyleProp<ViewStyle>;

  /** Optional hover surface colour (web/desktop pointers). */
  readonly hoverFaceColor?: ThemeColor;
  /** Defaults to `tokens.colors.textPrimary` for a consistent contrast ring. */
  readonly focusRingColor?: ThemeColor;
}

/**
 * Interactive Tactile 2.5D surface.
 *
 * Use it as the base for every pressable component: Button, IconButton,
 * ChoiceCard, etc. It owns press animation, hover fade, focus ring and a11y
 * state merging, so no component has to reimplement the lip.
 */
export function Pressable3D({
  children,
  faceColor,
  lipColor,
  borderColor,
  borderWidth,
  radius,
  lipHeight,
  showLip,
  faceStyle,
  style,
  hoverFaceColor,
  focusRingColor,
  disabled = false,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  accessibilityState,
  ...rest
}: Pressable3DProps) {
  const { tokens } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const resolvedRadius = radius ?? tokens.radii.md;
  const resolvedLipHeight = lipHeight ?? tokens.effects.lipHeight;
  const resolvedBorderWidth =
    borderWidth ?? (borderColor ? tokens.borderWidths.default : tokens.borderWidths.none);
  const shouldShowLip = showLip ?? !disabled;

  const { animatedStyle, pressIn, pressOut } = usePressDepth({
    disabled: disabled || !shouldShowLip,
    lipHeight: resolvedLipHeight,
  });

  const hoverProgress = useSharedValue(0);
  const hoverOverlayStyle = useAnimatedStyle(() => ({ opacity: hoverProgress.get() }));
  const hoverOverlayBaseStyle = useMemo<ViewStyle>(
    () => ({
      ...StyleSheet.absoluteFill,
      backgroundColor: hoverFaceColor ?? faceColor,
    }),
    [faceColor, hoverFaceColor],
  );

  const fadeHover = useCallback(
    (target: 0 | 1) => {
      const { duration, easing } = tokens.motion.hover;

      hoverProgress.set(
        withTiming(target, {
          duration: disabled ? 0 : duration,
          easing: resolveEasing(easing),
        }),
      );
    },
    [disabled, hoverProgress, tokens.motion.hover],
  );

  useEffect(() => {
    if (disabled) {
      fadeHover(0);
    }
  }, [disabled, fadeHover]);

  const handlePressIn = useCallback<NonNullable<PressableProps['onPressIn']>>(
    (event) => {
      pressIn();
      onPressIn?.(event);
    },
    [onPressIn, pressIn],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps['onPressOut']>>(
    (event) => {
      pressOut();
      onPressOut?.(event);
    },
    [onPressOut, pressOut],
  );

  const handleHoverIn = useCallback<NonNullable<PressableProps['onHoverIn']>>(
    (event) => {
      fadeHover(1);
      onHoverIn?.(event);
    },
    [fadeHover, onHoverIn],
  );

  const handleHoverOut = useCallback<NonNullable<PressableProps['onHoverOut']>>(
    (event) => {
      fadeHover(0);
      onHoverOut?.(event);
    },
    [fadeHover, onHoverOut],
  );

  const handleFocus = useCallback<NonNullable<PressableProps['onFocus']>>(
    (event) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback<NonNullable<PressableProps['onBlur']>>(
    (event) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const focusStyle: ViewStyle | undefined =
    isFocused && !disabled
      ? {
          outlineWidth: tokens.borderWidths.default,
          outlineStyle: 'solid',
          outlineColor: focusRingColor ?? tokens.colors.textPrimary,
          outlineOffset: tokens.borderWidths.default,
        }
      : undefined;

  const resolvedFaceStyle: StyleProp<ViewStyle> = focusStyle ? [faceStyle, focusStyle] : faceStyle;

  const cursorStyle = disabled ? webDisabledCursorStyle : webCursorStyle;

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      accessibilityState={disabled ? { ...accessibilityState, disabled: true } : accessibilityState}
      style={[baseStyle, cursorStyle, style]}>
      <TactileLayers
        faceColor={faceColor}
        lipColor={lipColor}
        borderColor={borderColor}
        borderWidth={resolvedBorderWidth}
        radius={resolvedRadius}
        lipHeight={resolvedLipHeight}
        showLip={shouldShowLip}
        faceStyle={resolvedFaceStyle}
        animatedFaceStyle={animatedStyle}>
        {hoverFaceColor ? (
          <Animated.View
            pointerEvents="none"
            accessible={false}
            style={[hoverOverlayBaseStyle, hoverOverlayStyle]}
          />
        ) : null}
        {children}
      </TactileLayers>
    </Pressable>
  );
}
