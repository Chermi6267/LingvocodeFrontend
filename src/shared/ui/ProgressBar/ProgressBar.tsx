import { useCallback } from 'react';
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { resolveThemeColorValue } from '@/shared/config/theme';
import { useProgressValue } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { clamp } from '../measure';
import { useProgressBarStyles } from './ProgressBar.styles';
import type { ProgressBarProps } from './ProgressBar.types';

/**
 * Glossy 16px pill progress bar.
 *
 * The fill is absolutely positioned, so animating its width never moves a
 * neighbour. `useProgressValue` supplies the central spring easing and reduced
 * motion support; the highlight reuses the same tokens as Slider.
 */
export function ProgressBar({
  value,
  min = 0,
  max = 100,
  color = 'primary.base',
  trackColor = 'bgDisabled',
  showHighlight = true,
  formatValue,
  style,
  accessibilityLabel,
  ...rest
}: ProgressBarProps) {
  const { tokens } = useTheme();
  const styles = useProgressBarStyles();

  const safeMax = max > min ? max : min + 1;
  const clampedValue = clamp(value, min, safeMax);
  const ratio = (clampedValue - min) / (safeMax - min);

  const progress = useProgressValue(ratio);
  const trackWidth = useSharedValue(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      trackWidth.set(event.nativeEvent.layout.width);
    },
    [trackWidth],
  );

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: Math.min(Math.max(progress.get(), 0), 1) * trackWidth.get(),
  }));

  const trackDynamicStyle: ViewStyle = {
    backgroundColor: resolveThemeColorValue(tokens, trackColor),
  };
  const fillDynamicStyle: ViewStyle = {
    backgroundColor: resolveThemeColorValue(tokens, color),
  };
  const highlightDynamicStyle: ViewStyle = {
    backgroundColor: tokens.colors.progressHighlight,
  };

  return (
    <View
      {...rest}
      style={[styles.track, trackDynamicStyle, style]}
      onLayout={handleLayout}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min,
        max: safeMax,
        now: clampedValue,
        text: formatValue ? formatValue(ratio) : `${Math.round(ratio * 100)}%`,
      }}>
      <Animated.View
        style={[styles.fill, fillDynamicStyle, fillAnimatedStyle]}
        pointerEvents="none"
        accessible={false}>
        {showHighlight ? (
          <View style={[styles.highlight, highlightDynamicStyle]} pointerEvents="none" />
        ) : null}
      </Animated.View>
    </View>
  );
}
