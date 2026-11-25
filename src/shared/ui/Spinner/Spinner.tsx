import type { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { resolveThemeColorValue } from '@/shared/config/theme';
import { useSpin } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { useSpinnerStyles } from './Spinner.styles';
import type { SpinnerProps } from './Spinner.types';

/**
 * Themed loading indicator: a rotating arc over a static ring.
 *
 * Rotation uses the shared `motion.spinner` token and stops automatically for
 * reduced motion or `animating={false}`. No blur or platform shadow is used.
 */
export function Spinner({
  size = 'md',
  color = 'primary.base',
  trackColor = 'bgDisabled',
  animating = true,
  style,
  accessibilityLabel = 'Загрузка',
  ...rest
}: SpinnerProps) {
  const { tokens } = useTheme();
  const styles = useSpinnerStyles();
  const { animatedStyle } = useSpin({ disabled: !animating });

  const ringStyle: ViewStyle = {
    width: tokens.iconSizes[size],
    height: tokens.iconSizes[size],
    borderRadius: tokens.radii.pill,
    borderWidth: tokens.borderWidths.default,
    borderColor: resolveThemeColorValue(tokens, trackColor),
    borderTopColor: resolveThemeColorValue(tokens, color),
  };

  return (
    <Animated.View
      {...rest}
      style={[styles.root, ringStyle, animatedStyle, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ busy: animating }}
    />
  );
}
