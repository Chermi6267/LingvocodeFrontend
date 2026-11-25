import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  PanResponder,
  View,
  type AccessibilityActionEvent,
  type AccessibilityActionInfo,
  type GestureResponderEvent,
  type KeyDownEvent,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { consumeKey, isArrowKey } from '@/shared/lib/a11y';
import { usePressDepth, useProgressValue } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { clamp } from '../measure';
import { TactileLayers } from '../TactileLayers';
import { Text } from '../Text';
import { useSliderStyles } from './Slider.styles';
import type { SliderProps } from './Slider.types';
import { fromRatio, snapToStep, toRatio } from './Slider.utils';

type FocusEventArgs = Parameters<NonNullable<SliderProps['onFocus']>>[0];
type BlurEventArgs = Parameters<NonNullable<SliderProps['onBlur']>>[0];

const accessibilityActions = [
  { name: 'increment' },
  { name: 'decrement' },
] as const satisfies readonly AccessibilityActionInfo[];

/**
 * Numeric range control with snapping, drag, pointer taps and full keyboard
 * support. The fill and the knob use transform-only animations, so neither the
 * track nor any neighbour is re-laid out while sliding.
 */
export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  label,
  accessibilityLabel,
  accessibilityHint,
  formatValue,
  showValue = true,
  disabled = false,
  testID,
  onKeyDown,
  onFocus,
  onBlur,
  style,
  ...rest
}: SliderProps) {
  const { tokens } = useTheme();
  const styles = useSliderStyles();

  const [internalValue, setValue] = useState(defaultValue);
  const [trackWidth, setTrackWidth] = useState(0);
  const [focused, setFocused] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? clamp(value, min, max) : internalValue;

  const thumbSize = tokens.components.control.sliderThumb;
  const lipHeight = tokens.effects.lipHeight;
  const ratio = toRatio(currentValue, min, max);
  const valueText = formatValue ? formatValue(currentValue) : String(currentValue);

  const widthValue = useSharedValue(0);
  const originRatioValue = useSharedValue(0);
  const lastValue = useSharedValue(currentValue);
  const fillProgress = useProgressValue(ratio, { disabled });

  useEffect(() => {
    widthValue.set(trackWidth);
  }, [trackWidth, widthValue]);

  useEffect(() => {
    lastValue.set(currentValue);
  }, [currentValue, lastValue]);

  const {
    animatedStyle: thumbPressStyle,
    pressIn,
    pressOut,
  } = usePressDepth({
    disabled,
    lipHeight,
  });

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (fillProgress.get() - 1) * widthValue.get() }],
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: fillProgress.get() * Math.max(widthValue.get() - thumbSize, 0) }],
  }));

  const commit = useCallback(
    (next: number) => {
      const snapped = snapToStep(next, min, max, step);

      lastValue.set(snapped);

      if (snapped === currentValue) {
        return;
      }

      if (!isControlled) {
        setValue(snapped);
      }

      onValueChange?.(snapped);
    },
    [currentValue, isControlled, lastValue, max, min, onValueChange, step],
  );

  const complete = useCallback(() => {
    onSlidingComplete?.(lastValue.get());
  }, [lastValue, onSlidingComplete]);

  const ratioFromX = useCallback(
    (x: number) => {
      const usable = Math.max(trackWidth - thumbSize, 1);

      return clamp((x - thumbSize / 2) / usable, 0, 1);
    },
    [thumbSize, trackWidth],
  );

  const handleGrant = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) {
        return;
      }

      pressIn();
      originRatioValue.set(ratioFromX(event.nativeEvent.locationX));
      commit(fromRatio(originRatioValue.get(), min, max));
    },
    [commit, disabled, max, min, originRatioValue, pressIn, ratioFromX],
  );

  const handleMove = useCallback(
    (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      if (disabled) {
        return;
      }

      const usable = Math.max(trackWidth - thumbSize, 1);
      const nextRatio = clamp(originRatioValue.get() + gesture.dx / usable, 0, 1);

      commit(fromRatio(nextRatio, min, max));
    },
    [commit, disabled, max, min, originRatioValue, thumbSize, trackWidth],
  );

  const handleRelease = useCallback(() => {
    pressOut();
    complete();
  }, [complete, pressOut]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: handleGrant,
        onPanResponderMove: handleMove,
        onPanResponderRelease: handleRelease,
        onPanResponderTerminate: handleRelease,
      }),
    [disabled, handleGrant, handleMove, handleRelease],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyDownEvent) => {
      if (disabled) {
        return;
      }

      const key = event.nativeEvent.key;
      const delta = step > 0 ? step : 1;
      let next: number | null = null;

      if (key === 'ArrowRight' || key === 'ArrowUp') {
        next = currentValue + delta;
      } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
        next = currentValue - delta;
      } else if (key === 'PageUp') {
        next = currentValue + delta * 10;
      } else if (key === 'PageDown') {
        next = currentValue - delta * 10;
      } else if (key === 'Home') {
        next = min;
      } else if (key === 'End') {
        next = max;
      }

      if (next !== null) {
        if (isArrowKey(key) || key === 'PageUp' || key === 'PageDown') {
          consumeKey(event);
        }

        commit(next);
        complete();
      }

      onKeyDown?.(event);
    },
    [commit, complete, currentValue, disabled, max, min, onKeyDown, step],
  );

  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (disabled) {
        return;
      }

      const delta = step > 0 ? step : 1;

      if (event.nativeEvent.actionName === 'increment') {
        commit(currentValue + delta);
        complete();
      } else if (event.nativeEvent.actionName === 'decrement') {
        commit(currentValue - delta);
        complete();
      }
    },
    [commit, complete, currentValue, disabled, step],
  );

  const handleFocus = useCallback(
    (event: FocusEventArgs) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: BlurEventArgs) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <View style={[styles.root, style]} {...rest}>
      {label !== undefined || showValue ? (
        <View style={styles.header}>
          {label !== undefined ? <Text variant="label">{label}</Text> : <View />}
          {showValue ? (
            <Text
              variant="bodySmall"
              tone={disabled ? 'disabled' : 'primary'}
              style={styles.valueText}>
              {valueText}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View style={styles.trackArea} onLayout={handleLayout}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, disabled && styles.fillDisabled, fillStyle]}>
            <View style={styles.highlight} pointerEvents="none" />
          </Animated.View>
        </View>
        <Animated.View style={[styles.thumbPosition, thumbStyle]} pointerEvents="none">
          <Animated.View style={thumbPressStyle}>
            <TactileLayers
              faceColor={disabled ? tokens.colors.textDisabled : tokens.colors.textOnAccent}
              lipColor={disabled ? tokens.colors.bgDisabled : tokens.colors.primary.lip}
              borderWidth={tokens.borderWidths.none}
              radius={tokens.radii.pill}
              lipHeight={lipHeight}
              showLip={!disabled}>
              <View />
            </TactileLayers>
          </Animated.View>
        </Animated.View>
        <View
          {...panResponder.panHandlers}
          style={[styles.hitArea, focused && styles.hitAreaFocused]}
          testID={testID}
          accessible
          accessibilityRole="slider"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={accessibilityHint}
          accessibilityValue={{ min, max, now: currentValue, text: valueText }}
          accessibilityState={{ disabled }}
          accessibilityActions={accessibilityActions}
          onAccessibilityAction={handleAccessibilityAction}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          focusable={!disabled}
          tabIndex={disabled ? -1 : 0}
        />
      </View>
    </View>
  );
}
