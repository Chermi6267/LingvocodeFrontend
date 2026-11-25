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

export interface UsePulseOptions {
  /** Keeps the placeholder fully opaque. */
  readonly disabled?: boolean;
  /** Overrides `tokens.motion.skeleton.minOpacity`. */
  readonly minOpacity?: number;
}

export interface UsePulseResult {
  readonly animatedStyle: AnimatedStyle<ViewStyle>;
}

/**
 * Gentle opacity pulse for skeleton placeholders.
 *
 * Timing and the default low opacity are theme tokens; reduced motion renders
 * a static block instead of animating.
 */
export function usePulse({ disabled = false, minOpacity }: UsePulseOptions = {}): UsePulseResult {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(1);
  const { duration, minOpacity: tokenMinOpacity } = tokens.motion.skeleton;
  const targetOpacity = minOpacity ?? tokenMinOpacity;

  useEffect(() => {
    if (disabled || reduceMotion) {
      cancelAnimation(opacity);
      opacity.set(1);

      return;
    }

    opacity.set(
      withRepeat(
        withTiming(targetOpacity, { duration, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    return () => {
      cancelAnimation(opacity);
    };
  }, [disabled, duration, opacity, reduceMotion, targetOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
  }));

  return { animatedStyle };
}
