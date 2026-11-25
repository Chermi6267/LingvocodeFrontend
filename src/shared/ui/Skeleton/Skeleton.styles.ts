import type { ViewStyle } from 'react-native';

import {
  resolveThemeColorValue,
  type RadiusToken,
  type ThemeColorLike,
  type ThemeTokens,
} from '@/shared/config/theme';

import type { BoxDimension } from '../Box';
import type { SkeletonShape } from './Skeleton.types';

interface SkeletonPreset {
  readonly width: BoxDimension;
  readonly height: BoxDimension;
  readonly radius: RadiusToken;
}

function getPreset(tokens: ThemeTokens, shape: SkeletonShape): SkeletonPreset {
  switch (shape) {
    case 'circle':
      return {
        width: tokens.iconSizes.lg,
        height: tokens.iconSizes.lg,
        radius: 'pill',
      };
    case 'rect':
      return {
        width: '100%',
        height: tokens.spacing.xxl,
        radius: 'md',
      };
    case 'pill':
      return {
        width: '100%',
        height: tokens.spacing.lg,
        radius: 'pill',
      };
    case 'line':
    default:
      return {
        width: '100%',
        height: tokens.spacing.lg,
        radius: 'sm',
      };
  }
}

export interface ResolveSkeletonStyleOptions {
  readonly shape: SkeletonShape;
  readonly width: BoxDimension | undefined;
  readonly height: BoxDimension | undefined;
  readonly radius: RadiusToken | undefined;
  readonly color: ThemeColorLike;
}

/** Turns shape/token options into a static placeholder style. */
export function resolveSkeletonStyle(
  tokens: ThemeTokens,
  { shape, width, height, radius, color }: ResolveSkeletonStyleOptions,
): ViewStyle {
  const preset = getPreset(tokens, shape);

  return {
    width: width ?? preset.width,
    height: height ?? preset.height,
    borderRadius: tokens.radii[radius ?? preset.radius],
    backgroundColor: resolveThemeColorValue(tokens, color),
  };
}
