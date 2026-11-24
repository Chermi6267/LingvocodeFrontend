import { Easing, type EasingFunction, type EasingFunctionFactory } from 'react-native-reanimated';

import type { MotionEasing } from '@/shared/config/theme';

export type ResolvedEasing = EasingFunction | EasingFunctionFactory;

/** Maps a motion token to the easing accepted by Reanimated animations. */
export function resolveEasing(easing: MotionEasing): ResolvedEasing {
  return easing === 'ease' ? Easing.ease : Easing.bezier(...easing);
}
