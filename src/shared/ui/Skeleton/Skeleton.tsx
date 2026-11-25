import Animated from 'react-native-reanimated';

import { usePulse } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { resolveSkeletonStyle } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

/**
 * Pulsing placeholder for loading states.
 *
 * Shape presets, sizes and radius come from existing theme tokens; the pulse
 * reuses the shared `motion.skeleton` preset and respects reduced motion.
 */
export function Skeleton({
  shape = 'line',
  width,
  height,
  radius,
  color = 'bgDisabled',
  pulse = true,
  style,
  ...rest
}: SkeletonProps) {
  const { tokens } = useTheme();
  const { animatedStyle } = usePulse({ disabled: !pulse });
  const resolvedStyle = resolveSkeletonStyle(tokens, {
    shape,
    width,
    height,
    radius,
    color,
  });

  return (
    <Animated.View
      {...rest}
      style={[resolvedStyle, animatedStyle, style]}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
