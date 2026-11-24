import { useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

import { resolveEasing } from './easings';

export interface UsePressDepthOptions {
  /** While disabled the face never moves and any running animation is reset. */
  readonly disabled?: boolean;
  /** Distance the face travels down, normally `tokens.effects.lipHeight`. */
  readonly lipHeight: number;
}

/**
 * Drives the Tactile 2.5D press.
 *
 * Press-in is a hard 100ms ease; release uses the spring curve (with a small
 * overshoot). The shared value is expressed as `0..1` so any visual layer can
 * consume it (translation today, scale or color in the future).
 *
 * The consumer only has to animate `transform`. Because the lip itself lives
 * outside the layout flow, animating the face never triggers a layout pass.
 */
export function usePressDepth({ disabled = false, lipHeight }: UsePressDepthOptions) {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const depth = useSharedValue(0);

  const { duration: releaseDuration, easing: releaseEasing } = tokens.motion.spring;
  const { duration: pressDuration, easing: pressEasing } = tokens.motion.press;

  useEffect(() => {
    if (disabled) {
      depth.set(0);
    }
  }, [depth, disabled]);

  const pressIn = useCallback(() => {
    if (disabled) {
      return;
    }

    depth.set(
      withTiming(1, {
        duration: reduceMotion ? 0 : pressDuration,
        easing: resolveEasing(pressEasing),
      }),
    );
  }, [depth, disabled, pressDuration, pressEasing, reduceMotion]);

  const pressOut = useCallback(() => {
    if (disabled) {
      return;
    }

    depth.set(
      withTiming(0, {
        duration: reduceMotion ? 0 : releaseDuration,
        easing: resolveEasing(releaseEasing),
      }),
    );
  }, [depth, disabled, reduceMotion, releaseDuration, releaseEasing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: depth.get() * lipHeight }],
  }));

  return { depth, animatedStyle, pressIn, pressOut };
}
