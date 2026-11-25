import { useCallback, useEffect, useState } from 'react';
import { View, type KeyDownEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import { resolveSelectionPalette } from '@/shared/config/theme';
import { consumeKey, useSpaceActivation } from '@/shared/lib/a11y';
import { usePopIn } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { Text } from '../Text';
import { useRadioStyles } from './Radio.styles';
import type { RadioProps } from './Radio.types';
import { useRadioGroup } from './RadioGroup.context';

type FocusEventArgs = Parameters<NonNullable<RadioProps['onFocus']>>[0];

function SelectedDot({ disabled }: { readonly disabled: boolean }) {
  const styles = useRadioStyles();
  const { animatedStyle } = usePopIn();

  return (
    <Animated.View
      style={[styles.dot, disabled && styles.dotDisabled, animatedStyle]}
      pointerEvents="none"
    />
  );
}

/**
 * Single radio option. Use inside `RadioGroup` for strict one-of-N selection,
 * or standalone with `checked` / `defaultChecked`.
 */
export function Radio({
  value,
  checked,
  defaultChecked = false,
  onSelect,
  label,
  labelPosition = 'right',
  disabled = false,
  accessibilityLabel,
  accessibilityState,
  onFocus,
  onKeyDown,
  style,
  ...rest
}: RadioProps) {
  const { tokens } = useTheme();
  const styles = useRadioStyles();
  const group = useRadioGroup();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isDisabled = disabled || (group?.disabled ?? false);
  const isChecked = group ? group.value === value : (checked ?? internalChecked);
  const register = group?.register;

  useEffect(() => {
    return register?.(value, isDisabled);
  }, [isDisabled, register, value]);

  const select = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (group) {
      group.select(value);

      return;
    }

    if (checked === undefined) {
      setInternalChecked(true);
    }

    onSelect?.(value);
  }, [checked, group, isDisabled, onSelect, value]);

  const handleSpace = useSpaceActivation(select, isDisabled);
  const handleFocus = useCallback(
    (event: FocusEventArgs) => {
      group?.setActiveValue(value);
      onFocus?.(event);
    },
    [group, onFocus, value],
  );
  const handleKeyDown = useCallback(
    (event: KeyDownEvent) => {
      if (group && !isDisabled) {
        const key = event.nativeEvent.key;
        const delta =
          key === 'ArrowRight' || key === 'ArrowDown'
            ? 1
            : key === 'ArrowLeft' || key === 'ArrowUp'
              ? -1
              : 0;

        if (delta !== 0) {
          consumeKey(event);
          group.move(group.activeValue ?? value, delta);
        }
      }

      handleSpace(event);
      onKeyDown?.(event);
    },
    [group, handleSpace, isDisabled, onKeyDown, value],
  );

  const palette = resolveSelectionPalette(tokens, isChecked, isDisabled);
  const indicatorStyle = [
    styles.indicator,
    isChecked ? styles.indicatorSelected : styles.indicatorIdle,
    isDisabled && styles.indicatorDisabled,
  ];
  const resolvedLabel = accessibilityLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <Pressable3D
      {...rest}
      disabled={isDisabled}
      faceColor={palette.face}
      lipColor={palette.lip}
      hoverFaceColor={palette.hoverFace}
      radius={tokens.radii.md}
      faceStyle={styles.face}
      style={[styles.root, style]}
      onPress={select}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      accessibilityRole="radio"
      accessibilityLabel={resolvedLabel}
      accessibilityState={{ ...accessibilityState, checked: isChecked, disabled: isDisabled }}>
      {labelPosition === 'left' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View style={indicatorStyle} pointerEvents="none">
        {isChecked ? <SelectedDot disabled={isDisabled} /> : null}
      </View>
      {labelPosition === 'right' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Pressable3D>
  );
}
