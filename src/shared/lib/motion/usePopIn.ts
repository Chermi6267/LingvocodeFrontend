import { useCallback, useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  type AnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import type { ThemeTokens } from '@/shared/config/theme';
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

export interface UsePopInResult {
  readonly animatedStyle: AnimatedStyle<ViewStyle>;
  readonly play: () => void;
}

/**
 * Explicit 0.85 → 1.03 → 1.0 keyframes from the design spec.
 *
 * Using both the overshoot scale token and the overshoot easing token on the
 * same segment would double the bounce, so the settle segment uses a neutral
 * easing. Shared with Modal so overlays cannot drift out of sync with badges.
 */
export function playPopInAnimation(
  scale: SharedValue<number>,
  popInTokens: ThemeTokens['motion']['popIn'],
  delay = 0,
): void {
  const { duration, easing, fromScale, overshootScale, toScale } = popInTokens;
  const riseDuration = Math.round(duration * 0.6);

  scale.set(fromScale);
  scale.set(
    withDelay(
      delay,
      withSequence(
        withTiming(overshootScale, {
          duration: riseDuration,
          easing: resolveEasing(easing),
        }),
        withTiming(toScale, {
          duration: duration - riseDuration,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
    ),
  );
}

/** Pop-in preset for modals, badges and standalone icons. */
export function usePopIn({
  autoPlay = true,
  delay = 0,
  disabled = false,
}: UsePopInOptions = {}): UsePopInResult {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const skip = disabled || reduceMotion;

  const popIn = tokens.motion.popIn;
  const scale = useSharedValue(skip ? popIn.toScale : popIn.fromScale);

  const play = useCallback(() => {
    if (skip) {
      scale.set(popIn.toScale);

      return;
    }

    playPopInAnimation(scale, popIn, delay);
  }, [delay, popIn, scale, skip]);

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
