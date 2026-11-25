import { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  View,
  type KeyDownEvent,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { resolveThemeColorValue } from '@/shared/config/theme';
import { consumeKey, isSpaceKey } from '@/shared/lib/a11y';
import { useSpringValue } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Text } from '../Text';
import { resolveTabInteractionStyle, useTabsStyles } from './Tabs.styles';
import type { TabsProps } from './Tabs.types';

type FocusableRef = { focus?: () => void };

/**
 * In-screen subsection switcher. The indicator is measured from real tab
 * widths and slides with the shared spring token, so labels may have any length.
 *
 * Selection is fully controlled through `value` + `onValueChange`, or kept
 * locally when only `defaultValue` is provided.
 */
export function Tabs<T extends string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  accentColor = 'secondary.base',
  disabled = false,
  accessibilityLabel,
  style,
  ...rest
}: TabsProps<T>) {
  const styles = useTabsStyles();
  const { tokens } = useTheme();
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue ?? tabs[0]?.value);
  const [widths, setWidths] = useState<number[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<FocusableRef | null>>([]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : (internalValue ?? tabs[0]?.value);
  const activeIndex = Math.max(
    tabs.findIndex((tab) => tab.value === currentValue),
    0,
  );

  const select = useCallback(
    (index: number) => {
      const tab = tabs[index];

      if (disabled || !tab || tab.disabled || tab.value === currentValue) {
        return;
      }

      if (!isControlled) {
        setInternalValue(tab.value);
      }

      onValueChange?.(tab.value);
    },
    [currentValue, disabled, isControlled, onValueChange, tabs],
  );

  const handleKeyDown = useCallback(
    (index: number, event: KeyDownEvent) => {
      if (disabled) {
        return;
      }

      const key = event.nativeEvent.key;

      if (isSpaceKey(key)) {
        consumeKey(event);
        select(index);

        return;
      }

      const enabledIndexes = tabs.flatMap((tab, tabIndex) => (tab.disabled ? [] : [tabIndex]));

      if (enabledIndexes.length === 0) {
        return;
      }

      let targetIndex: number | undefined;
      const position = enabledIndexes.indexOf(index);

      if (key === 'Home') {
        targetIndex = enabledIndexes[0];
      } else if (key === 'End') {
        targetIndex = enabledIndexes[enabledIndexes.length - 1];
      } else if (key === 'ArrowRight') {
        targetIndex = enabledIndexes[(position + 1) % enabledIndexes.length];
      } else if (key === 'ArrowLeft') {
        const previous = (position - 1 + enabledIndexes.length) % enabledIndexes.length;
        targetIndex = enabledIndexes[previous];
      }

      if (targetIndex === undefined) {
        return;
      }

      consumeKey(event);
      select(targetIndex);
      tabRefs.current[targetIndex]?.focus?.();
    },
    [disabled, select, tabs],
  );

  const handleLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const measuredWidth = event.nativeEvent.layout.width;

      setWidths((current) => {
        const next =
          current.length === tabs.length ? [...current] : new Array<number>(tabs.length).fill(0);

        if (next[index] === measuredWidth) {
          return current;
        }

        next[index] = measuredWidth;

        return next;
      });
    },
    [tabs.length],
  );

  const measuredWidths = widths.length === tabs.length ? widths : undefined;
  const indicatorWidth = measuredWidths?.[activeIndex] ?? 0;
  const indicatorOffset = measuredWidths
    ? measuredWidths.slice(0, activeIndex).reduce((sum, width) => sum + width, 0)
    : 0;

  const animatedOffset = useSpringValue(indicatorOffset);
  const animatedWidth = useSpringValue(indicatorWidth);
  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.get(),
    transform: [{ translateX: animatedOffset.get() }],
  }));

  const accent = resolveThemeColorValue(tokens, accentColor);
  const indicatorStyle: ViewStyle = { backgroundColor: accent };

  return (
    <View
      {...rest}
      style={[styles.root, style]}
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}>
      <View style={styles.row}>
        {tabs.map((tab, index) => {
          const selected = currentValue !== undefined && tab.value === currentValue;
          const interactive = !disabled && !tab.disabled;

          return (
            <Pressable
              key={tab.value}
              ref={(instance) => {
                tabRefs.current[index] = instance as unknown as FocusableRef | null;
              }}
              disabled={!interactive}
              onPress={() => select(index)}
              onLayout={(event) => handleLayout(index, event)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex((current) => (current === index ? null : current))}
              onKeyDown={(event) => handleKeyDown(index, event)}
              accessibilityRole="tab"
              accessibilityLabel={tab.accessibilityLabel ?? tab.label}
              accessibilityState={{ selected, disabled: !interactive }}
              style={({ pressed }) => [
                styles.tab,
                resolveTabInteractionStyle(tokens, pressed, focusedIndex === index, !interactive),
              ]}>
              <Text
                variant="tab"
                tone={!interactive ? 'disabled' : selected ? 'primary' : 'secondary'}
                color={interactive && selected ? accent : undefined}
                style={styles.label}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Animated.View
        pointerEvents="none"
        accessible={false}
        style={[styles.indicator, indicatorStyle, indicatorAnimatedStyle]}
      />
    </View>
  );
}
