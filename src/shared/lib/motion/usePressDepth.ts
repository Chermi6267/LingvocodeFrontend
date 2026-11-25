import { useCallback, useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/lib/theme';

import { resolveEasing } from './easings';

export interface UsePressDepthOptions {
  /** While disabled the face never moves and any running animation is reset. */
  readonly disabled?: boolean;
  /** Distance the face travels down, normally `tokens.effects.lipHeight`. */
  readonly lipHeight: number;
}

export interface UsePressDepthResult {
  readonly animatedStyle: AnimatedStyle<ViewStyle>;
  readonly pressIn: () => void;
  readonly pressOut: () => void;
}

/**
 * Drives the Tactile 2.5D press.
 *
 * Both press-in and release use the hard 100ms ease from the design spec: a
 * button must never feel sticky or bounce above its resting position. The lip
 * lives outside the layout flow, so animating the face never triggers layout.
 */
export function usePressDepth({
  disabled = false,
  lipHeight,
}: UsePressDepthOptions): UsePressDepthResult {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const depth = useSharedValue(0);

  const { duration, easing } = tokens.motion.press;

  useEffect(() => {
    if (disabled) {
      depth.set(0);
    }
  }, [depth, disabled]);

  const animateTo = useCallback(
    (target: 0 | 1) => {
      if (disabled) {
        return;
      }

      depth.set(
        withTiming(target, {
          duration: reduceMotion ? 0 : duration,
          easing: resolveEasing(easing),
        }),
      );
    },
    [depth, disabled, duration, easing, reduceMotion],
  );

  const pressIn = useCallback(() => animateTo(1), [animateTo]);
  const pressOut = useCallback(() => animateTo(0), [animateTo]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: depth.get() * lipHeight }],
  }));

  return { animatedStyle, pressIn, pressOut };
}
