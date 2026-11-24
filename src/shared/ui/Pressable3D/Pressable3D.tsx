import { useCallback, useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import type { ThemeColor } from '@/shared/config/theme';
import { usePressDepth } from '@/shared/lib/motion';
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
  readonly hoverBorderColor?: ThemeColor;
  /** Defaults to `tokens.colors.textPrimary` for a consistent contrast ring. */
  readonly focusRingColor?: ThemeColor;
}

/**
 * Interactive Tactile 2.5D surface.
 *
 * Use it as the base for every pressable component: Button, IconButton,
 * ChoiceCard, etc. It owns press animation, hover, focus ring and a11y state
 * merging, so no component has to reimplement the lip.
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
  hoverBorderColor,
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
  const [isHovered, setIsHovered] = useState(false);
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
      setIsHovered(true);
      onHoverIn?.(event);
    },
    [onHoverIn],
  );

  const handleHoverOut = useCallback<NonNullable<PressableProps['onHoverOut']>>(
    (event) => {
      setIsHovered(false);
      onHoverOut?.(event);
    },
    [onHoverOut],
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

  const hoverActive = isHovered && !disabled;
  const resolvedFaceColor = hoverActive && hoverFaceColor ? hoverFaceColor : faceColor;
  const resolvedBorderColor = hoverActive && hoverBorderColor ? hoverBorderColor : borderColor;

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
        faceColor={resolvedFaceColor}
        lipColor={lipColor}
        borderColor={resolvedBorderColor}
        borderWidth={resolvedBorderWidth}
        radius={resolvedRadius}
        lipHeight={resolvedLipHeight}
        showLip={shouldShowLip}
        faceStyle={resolvedFaceStyle}
        animatedFaceStyle={animatedStyle}>
        {children}
      </TactileLayers>
    </Pressable>
  );
}
