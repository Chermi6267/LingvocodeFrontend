import { useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

import { resolveEasing } from './easings';

export interface UsePopInOptions {
  /** Plays automatically on mount. Defaults to `true`. */
  readonly autoPlay?: boolean;
  /** Delay before the entrance starts, in milliseconds. */
  readonly delay?: number;
  /** Skips the animation and keeps the element at scale 1. */
  readonly disabled?: boolean;
}

/**
 * Pop-in preset for modals, badges and standalone icons.
 *
 * The token curve already overshoots (0.34, 1.56, 0.64, 1), so a single timing
 * animation from `fromScale` to `toScale` produces the 0.85 → 1.03 → 1.0 feel
 * described by the design spec.
 */
export function usePopIn({ autoPlay = true, delay = 0, disabled = false }: UsePopInOptions = {}) {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const skip = disabled || reduceMotion;

  const { duration, easing, fromScale, toScale } = tokens.motion.popIn;
  const scale = useSharedValue(skip ? toScale : fromScale);

  const play = useCallback(() => {
    if (skip) {
      scale.set(toScale);

      return;
    }

    scale.set(
      withDelay(
        delay,
        withTiming(toScale, {
          duration,
          easing: resolveEasing(easing),
        }),
      ),
    );
  }, [delay, duration, easing, scale, skip, toScale]);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, [autoPlay, play]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  return { animatedStyle, play };
}
