import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { resolveSelectionPalette } from '@/shared/config/theme';
import { useSpaceActivation } from '@/shared/lib/a11y';
import { usePopIn } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { Text } from '../Text';
import { useCheckboxStyles } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

/** Mounted only while checked, so every check draws its own pop-in. */
function Checkmark() {
  const styles = useCheckboxStyles();
  const { animatedStyle } = usePopIn();

  return (
    <Animated.View style={animatedStyle} pointerEvents="none">
      <Text variant="title" color="textOnAccent" style={styles.glyph}>
        ✓
      </Text>
    </Animated.View>
  );
}

/**
 * Controlled/uncontrolled checkbox with a Tactile 2.5D press surface.
 *
 * Keyboard: Enter is handled by Pressable; Space is handled explicitly because
 * the `checkbox` role is not button-like in react-native-web.
 */
export function Checkbox({
  checked,
  defaultChecked = false,
  onValueChange,
  label,
  labelPosition = 'right',
  disabled = false,
  accessibilityLabel,
  accessibilityState,
  onKeyDown,
  style,
  ...rest
}: CheckboxProps) {
  const { tokens } = useTheme();
  const styles = useCheckboxStyles();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const next = !isChecked;

    if (!isControlled) {
      setInternalChecked(next);
    }

    onValueChange?.(next);
  }, [disabled, isChecked, isControlled, onValueChange]);

  const handleSpace = useSpaceActivation(toggle, disabled);
  const handleKeyDown = useCallback(
    (event: Parameters<NonNullable<CheckboxProps['onKeyDown']>>[0]) => {
      handleSpace(event);
      onKeyDown?.(event);
    },
    [handleSpace, onKeyDown],
  );

  const palette = resolveSelectionPalette(tokens, isChecked, disabled);
  const indicatorStyle = [
    styles.indicator,
    isChecked ? styles.indicatorChecked : styles.indicatorUnchecked,
    disabled && styles.indicatorDisabled,
  ];

  const indicator = (
    <View style={indicatorStyle} pointerEvents="none">
      {isChecked ? <Checkmark /> : null}
    </View>
  );

  // A plain-text label is also the accessible name of the control.
  const resolvedLabel = accessibilityLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <Pressable3D
      {...rest}
      disabled={disabled}
      faceColor={palette.face}
      lipColor={palette.lip}
      hoverFaceColor={palette.hoverFace}
      radius={tokens.radii.sm}
      faceStyle={styles.face}
      style={[styles.root, style]}
      onPress={toggle}
      onKeyDown={handleKeyDown}
      accessibilityRole="checkbox"
      accessibilityLabel={resolvedLabel}
      accessibilityState={{ ...accessibilityState, checked: isChecked, disabled }}>
      {labelPosition === 'left' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
      {indicator}
      {labelPosition === 'right' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Pressable3D>
  );
}
