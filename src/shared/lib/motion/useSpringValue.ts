import { useEffect } from 'react';
import {
  useReducedMotion,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

import { resolveEasing } from './easings';

export interface UseSpringValueOptions {
  /** Jumps to the target instead of animating (disabled controls, first mount). */
  readonly disabled?: boolean;
}

/**
 * Animates a numeric value with the central `motion.spring` token.
 *
 * Used by the switch knob and other controls that need the overshooting spring
 * curve without duplicating easing math in a component.
 */
export function useSpringValue(
  target: number,
  { disabled = false }: UseSpringValueOptions = {},
): SharedValue<number> {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const value = useSharedValue(target);

  const { duration, easing } = tokens.motion.spring;

  useEffect(() => {
    if (disabled || reduceMotion) {
      value.set(target);

      return;
    }

    value.set(withTiming(target, { duration, easing: resolveEasing(easing) }));
  }, [disabled, duration, easing, reduceMotion, target, value]);

  return value;
}
