import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

export interface UseSpinOptions {
  /** Keeps the indicator static (for example when loading has finished). */
  readonly disabled?: boolean;
}

export interface UseSpinResult {
  readonly animatedStyle: AnimatedStyle<ViewStyle>;
}

/**
 * Continuous 360° rotation for loading indicators.
 *
 * The duration comes from `tokens.motion.spinner.duration` and the animation is
 * skipped entirely when the OS asks for reduced motion.
 */
export function useSpin({ disabled = false }: UseSpinOptions = {}): UseSpinResult {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const rotation = useSharedValue(0);
  const { duration } = tokens.motion.spinner;

  useEffect(() => {
    if (disabled || reduceMotion) {
      cancelAnimation(rotation);
      rotation.set(0);

      return;
    }

    rotation.set(withRepeat(withTiming(360, { duration, easing: Easing.linear }), -1, false));

    return () => {
      cancelAnimation(rotation);
    };
  }, [disabled, duration, reduceMotion, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.get()}deg` }],
  }));

  return { animatedStyle };
}
