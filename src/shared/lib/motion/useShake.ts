import { useCallback } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

export interface UseShakeResult {
  readonly animatedStyle: AnimatedStyle<ViewStyle>;
  readonly shake: () => void;
}

/**
 * Error shake preset: translateX(-6 → 6 → -4 → 4 → 0) in 300ms.
 *
 * The offsets and total duration come from `tokens.motion.shake`. The whole
 * sequence is skipped when the OS requests reduced motion.
 */
export function useShake(): UseShakeResult {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const translateX = useSharedValue(0);

  const { duration, offsets } = tokens.motion.shake;

  const shake = useCallback(() => {
    if (reduceMotion) {
      translateX.set(0);

      return;
    }

    const stepDuration = duration / offsets.length;
    const steps = offsets.map((offset) =>
      withTiming(offset, { duration: stepDuration, easing: Easing.linear }),
    );

    translateX.set(withSequence(steps[0], ...steps.slice(1)));
  }, [duration, offsets, reduceMotion, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.get() }],
  }));

  return { animatedStyle, shake };
}
