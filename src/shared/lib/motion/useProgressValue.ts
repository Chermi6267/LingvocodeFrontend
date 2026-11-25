import { useEffect } from 'react';
import {
  useReducedMotion,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

import { resolveEasing } from './easings';

export interface UseProgressValueOptions {
  /** Jumps to the target instead of animating. */
  readonly disabled?: boolean;
}

/**
 * Numerically animates a 0..1 progress value with `motion.progressFill`.
 *
 * The Slider fill consumes it through `useAnimatedStyle`, so no layout metric
 * (width) is animated directly and no neighbours are pushed around.
 */
export function useProgressValue(
  target: number,
  { disabled = false }: UseProgressValueOptions = {},
): SharedValue<number> {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const value = useSharedValue(target);

  const { duration, easing } = tokens.motion.progressFill;

  useEffect(() => {
    if (disabled || reduceMotion) {
      value.set(target);

      return;
    }

    value.set(withTiming(target, { duration, easing: resolveEasing(easing) }));
  }, [disabled, duration, easing, reduceMotion, target, value]);

  return value;
}
